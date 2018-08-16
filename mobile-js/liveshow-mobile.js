var numOfSongs = numOfSongsMuseAll;
var subPath = 'muse-together/'
var songlist_ar = muse_together_ar;


var currSong = 0;
var currplayingSong = 0;

var musicPlaying = false;
var musicPaused = true;
var musicStopped = true;
var musicChanged = false;
var beginning = true;

var changedCategory = false;
var currcategoryID = 0;
var prevCategoryID = 0;
var displayingPlayBut = 1;


var prevMusic = document.getElementById("background-music-player");
var originMusic = document.getElementById("origin-music-player");

var random_mode = false;
var random_ar = generate_random_ar();    // contains an ordered list of song names
var random_sorted_ar = generateSortedRandomArray(); // contains an ordered list of song indexes
var random_counter_ar = generateRandomSongArray(); // contains a shuffled list of song indexes
var random_category = 0;

var random_index = 0
var firstRandom = false;
var loop_mode = false;


$('#background-music-player').on('ended', function() {

	stopClick();
	if(!loop_mode){
		if(random_mode){
			// If engaged in random mode
			changeSongRandom(); 
		} else {
		    changeSong();  	
		}
		playClick();

	} else {
		loopPlay();
	}
	
});

function loopPlay()
{
	//prevCategoryID = currcategoryID;
	musicPlaying = true;
	musicPaused = false;
	musicChanged = false;
	beginning = false;
	musicStopped = false;

	backgroundAudio=document.getElementById("background-music-player");
	backgroundAudio.play();
	displayingPlayBut = false;

	if(!changedCategory && (currplayingSong == currSong))
	{
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
	}
}

function randomSwitch()
{
	if(random_mode){
		// Turn off random mode
		random_mode = false;


		$("#leftSongBut").removeClass('ui-disabled');
		document.getElementById("randomBut").style.background = "#2ECCFA"; // blue

	} else {
		// Turn on radnom mode

		random_counter_ar = generateRandomSongArray();
		random_index = -1;
		random_mode = true;


		document.getElementById("randomBut").style.background = "#33cc33"; // green
		$("#leftSongBut").addClass('ui-disabled');

		if(!musicPlaying)
		{
			// If no music was playing when we activated random button
			random_index = -1;

			firstRandom = true;

			stopClick();
			changeSongRandom();
			playClick();

			prevCategoryID = currcategoryID;

		}

	}
}

function loopSwitch()
{
	if (loop_mode)
	{
		loop_mode = false;

		document.getElementById("loopBut").style.background = "#2ECCFA";
	} else {
		loop_mode = true;

		document.getElementById("loopBut").style.background = "#33cc33";
	}
}

function test()
{
	stopClick();

	if(random_mode){
		changeSongRandom(); 
	} else {
	    changeSong();  	
	}
	playClick();
}




function playClick()
{
	if(beginning || musicStopped || (changedCategory && !random_mode) ||(!(currplayingSong == currSong) && musicPlaying)  ||  (!musicPlaying && !(currplayingSong == currSong))  ){
		// Play music from beginning 
		// OR We are currently playing something, but not at our original song
		// OR we paused and switched to a different song

	
		prevCategoryID = currcategoryID;
	
		musicPlaying = true;
		musicPaused = false;
		musicChanged = false;
		beginning = false;
		musicStopped = false;

		originMusic.pause();
		prevMusic.pause();

		var oggMusic = document.getElementById("background-music-player");
		var mp3Music = document.getElementById("background-music-player");


		var songPath = "".concat("https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-songs-mp3/master/songs-mp3/",subPath, currSong, ".mp3");
		var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		
		currplayingSong = currSong;

		document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong][0];
		assignLyricsMobile(songlist_ar[currSong][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];

		document.getElementById("liveshowAlbum").src =  picPath;

		oggMusic.src = songPath;

		prevMusic.volume = musicVolume;
		prevMusic.play();


		
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
		displayingPlayBut = false;
		

	}else if((musicPaused || musicStopped) && !musicPlaying && !beginning && !musicChanged){
		// Continue music
		originMusic.pause();
		prevMusic.play();
		beginning = false;
		musicPlaying = true;
		currplayingSong = currSong;
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
		displayingPlayBut = false;

	} else {
		// Pause music
		
		prevMusic.pause();
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		displayingPlayBut = true;
		musicPaused = true;
		musicChanged = false;
		musicPlaying = false;
	}
	changedCategory = false;
}


function stopClick()
{
	var prevMusic = document.getElementById("background-music-player");
	prevMusic.pause();

	prevMusic.currentTime = 0;

	if(changedCategory && musicPlaying   && !(prevCategoryID == currcategoryID)){
		musicChanged = true;

	}else if((currplayingSong == currSong)  && musicPlaying){
		// We haven't switched songs and music is currently playing
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		displayingPlayBut = true;
		musicChanged = false;
	} else if ( !(currplayingSong == currSong)  ){
		// We switched music
		musicChanged = true;
	} 
	$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
	musicPlaying = false;
	musicStopped = true;
}

function changeSong()
{
	if(!random_mode){
		if(currSong >= numOfSongs - 1){
			// Reached end
			currSong = 0;
		} else {
			currSong = currSong + 1;
		}

		var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		


		$(document).ready(function(){
			$("#liveshowAlbum").hide();
			document.getElementById("liveshowAlbum").src =  picPath;
			$("#liveshowAlbum").fadeIn();
		});

		document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong][0];
		assignLyricsMobile(songlist_ar[currSong][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];

		if(   ((currplayingSong == currSong) && musicPlaying && (prevCategoryID == currcategoryID)) ){
			// We came back to our original song and music is playing
			$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
			displayingPlayBut = false;
			musicChanged = false;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
			displayingPlayBut = true;
			musicChanged = true;
		}
	} else {
				// We are in random_mode, going back
		var chosenNum = getNextRandomSong('-');  // choenNum is the index of the random array 
		var folder = random_ar[chosenNum][1];       // folder is the name of the folder the song is located in
		random_category = folder;
		changeCategoryRandom();
		$('#songCategorySelect').val(random_category).selectmenu('refresh');
		
		if(folder==0){
			subPath = 'muse-together/';
		} else if (folder==1){
			subPath = 'muse-sub-group/';
		} else if (folder==2){
			subPath = 'muse-individual/';
		} else if (folder==3){
			subPath = 'aqours-together/';
		} else if (folder==4){
			subPath = 'aqours-sub-group/';
		} else if (folder==5){
			subPath = 'aqours-individual/';
		} else if (folder==6){
			subPath = 'other-idols/';
		} else {
			alert('Something bad happened in changeSongRandom()');
			return;
		}

		var randSongInt = calc_random_local_index(chosenNum, folder);

		var picPath = "".concat("./images/album-covers/",subPath, randSongInt, ".jpg");
		
		$(document).ready(function(){
			$("#liveshowAlbum").hide();
			document.getElementById("liveshowAlbum").src =  picPath;
			$("#liveshowAlbum").fadeIn();
		});

		document.getElementById("song-title-tag").innerHTML =  random_ar[chosenNum][0];
		assignLyricsMobile(random_ar[chosenNum][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];

		currSong = randSongInt;

		if((currplayingSong == currSong) && musicPlaying && (prevCategoryID == currcategoryID)){
			// We came back to our original song and we have not changed categories
			musicChanged = false;
			$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
			displayingPlayBut = false;

			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
			displayingPlayBut = true;
			musicChanged = true;
		}



	}	

}

function changeSongBack()
{

	if(!random_mode){
		if(currSong <= 0){
			// Reached end
			currSong = numOfSongs - 1;
		} else {
			currSong = currSong - 1;
		}

		var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		
		$(document).ready(function(){
			$("#liveshowAlbum").hide();
			document.getElementById("liveshowAlbum").src =  picPath;
			$("#liveshowAlbum").fadeIn();
		});


		document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong][0];
		assignLyricsMobile(songlist_ar[currSong][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];

		

		if((currplayingSong == currSong) && musicPlaying && (prevCategoryID == currcategoryID)){
			// We came back to our original song and we have not changed categories
			musicChanged = false;
			$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
			displayingPlayBut = false;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
			displayingPlayBut = true;
			musicChanged = true;
		}
	} else {
				// We are in random_mode, going forward
		var chosenNum = getNextRandomSong('+');  // choenNum is the index of the random array 
		var folder = random_ar[chosenNum][1];       // folder is the name of the folder the song is located in

		random_category = folder;
		changeCategoryRandom();
		$('#songCategorySelect').val(random_category).selectmenu('refresh');
		
		if(folder==0){
			subPath = 'muse-together/';
		} else if (folder==1){
			subPath = 'muse-sub-group/';
		} else if (folder==2){
			subPath = 'muse-individual/';
		} else if (folder==3){
			subPath = 'aqours-together/';
		} else if (folder==4){
			subPath = 'aqours-sub-group/';
		} else if (folder==5){
			subPath = 'aqours-individual/';
		} else if (folder==6){
			subPath = 'other-idols/';
		} else {
			alert('Something bad happened in changeSongRandom()');
			return;
		}

		var randSongInt = calc_random_local_index(chosenNum, folder);
		var picPath = "".concat("./images/album-covers/",subPath, randSongInt, ".jpg");
		
		$(document).ready(function(){
			$("#liveshowAlbum").hide();
			document.getElementById("liveshowAlbum").src =  picPath;
			$("#liveshowAlbum").fadeIn();
		});

		document.getElementById("song-title-tag").innerHTML =  random_ar[chosenNum][0];
		assignLyricsMobile(random_ar[chosenNum][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];

		currSong = randSongInt;

		if(   ((currplayingSong == currSong) && musicPlaying) && (prevCategoryID == currcategoryID)){
			// We came back to our original song and music is playing
			//alert('1');
			$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
			displayingPlayBut = false;
			musicChanged = false;
			firstRandom = true;
			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			//alert('2');
			$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
			displayingPlayBut = true;
			musicChanged = true;
			firstRandom = false;
		}
	}

}

function changeSongRandom(){
	var chosenNum = getNextRandomSong('+');
	var folder = random_ar[chosenNum][1];

	random_category = folder;
	changeCategoryRandom();
	$('#songCategorySelect').val(random_category).selectmenu('refresh');

	var subPath = '';


	if(folder==0){
		subPath = 'muse-together/';
	} else if (folder==1){
		subPath = 'muse-sub-group/';
	} else if (folder==2){
		subPath = 'muse-individual/';
	} else if (folder==3){
		subPath = 'aqours-together/';
	} else if (folder==4){
		subPath = 'aqours-sub-group/';
	} else if (folder==5){
		subPath = 'aqours-individual/';
	} else if (folder==6){
			subPath = 'other-idols/';
	} else {
		alert('Something bad happened in changeSongRandom()');
		return;
	}
	var randSongInt = calc_random_local_index(chosenNum, folder);
	var picPath = "".concat("./images/album-covers/",subPath, randSongInt, ".jpg");
	
	$(document).ready(function(){
		$("#liveshowAlbum").hide();
		document.getElementById("liveshowAlbum").src =  picPath;
		$("#liveshowAlbum").fadeIn();
	});

	document.getElementById("song-title-tag").innerHTML =  random_ar[chosenNum][0];
	assignLyricsMobile(random_ar[chosenNum][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];
	currSong = randSongInt;

}


function changeCategory()
{
	var categoryID = document.getElementById("songCategorySelect").value;

	if(categoryID == 0)
	{
		// Muse all together
		numOfSongs = numOfSongsMuseAll;
		subPath = 'muse-together/';
		songlist_ar = muse_together_ar;

		currcategoryID = 0;

	} else if (categoryID == 1){
		// Muse sub group
		numOfSongs = numOfSongsMuseSub;
		subPath = 'muse-sub-group/';
		songlist_ar = muse_subgroup_ar;

		currcategoryID = 1;
	}else if (categoryID == 2){
		// Muse others
		numOfSongs = numOfSongsMuseOther;
		subPath = 'muse-individual/';
		songlist_ar = muse_individual_ar;

		currcategoryID = 2;
	}else if (categoryID == 3){
		// Aqours all together
		numOfSongs = numOfSongsAqoursTogether;
		subPath = 'aqours-together/';
		songlist_ar = aqours_together;

		currcategoryID = 3;
	}else if (categoryID == 4){
		// Aqours all together
		numOfSongs = numOfSongsAqoursSub;
		subPath = 'aqours-sub-group/';
		songlist_ar = aqours_subgroup_ar;

		currcategoryID = 4;
	}else if (categoryID == 5){
		// Aqours all together
		numOfSongs = numOfSongsAqoursOthers;
		subPath = 'aqours-individual/';
		songlist_ar = aqours_others_ar;

		currcategoryID = 5;
	}else if (categoryID == 6){
		// Aqours all together
		numOfSongs = numOfSongsIdolsOthers;
		subPath = 'other-idols/';
		songlist_ar = idol_others_ar;

		currcategoryID = 6;
	} else {
		alert('Something went wrong in changeCategory()')
	}

	if(currplayingSong != currSong){
		// If the current song is not equal to the currently playing song, we switched categories, and : don't change button to pause
		displayingPlayBut = true;
	} 

	currSong = 0;
	changedCategory = true;
	musicChanged = true;



	var songPath = "".concat("https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-songs-mp3/master/songs-mp3/",subPath, currSong, ".ogg");
	var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
	
	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong][0];
	assignLyrics(songlist_ar[currSong][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];
	document.getElementById("liveshowAlbum").src =  picPath;

	
	if(musicPlaying && (prevCategoryID != currcategoryID) && !displayingPlayBut){
		// To switch to play button if we switch categories
		// And to stay as play button if we 
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		displayingPlayBut = true;

	}	else if(currplayingSong==0 && prevCategoryID == currcategoryID){
		// If current playing song is 0 and we came back to the same category as the playing song, switch to pause
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
		displayingPlayBut = false;
		musicChanged = false;
	}

	
}

function changeCategoryRandom()
{
	var categoryID = document.getElementById("songCategorySelect").value;


	categoryID = random_category;
	

	if(categoryID == 0)
	{
		// Muse all together
		numOfSongs = numOfSongsMuseAll;
		subPath = 'muse-together/';
		songlist_ar = muse_together_ar;

		currcategoryID = 0;

	} else if (categoryID == 1){
		// Muse sub group
		numOfSongs = numOfSongsMuseSub;
		subPath = 'muse-sub-group/';
		songlist_ar = muse_subgroup_ar;

		currcategoryID = 1;
	}else if (categoryID == 2){
		// Muse others
		numOfSongs = numOfSongsMuseOther;
		subPath = 'muse-individual/';
		songlist_ar = muse_individual_ar;

		currcategoryID = 2;
	}else if (categoryID == 3){
		// Aqours all together
		numOfSongs = numOfSongsAqoursTogether;
		subPath = 'aqours-together/';
		songlist_ar = aqours_together;

		currcategoryID = 3;
	}else if (categoryID == 4){
		// Aqours all together
		numOfSongs = numOfSongsAqoursSub;
		subPath = 'aqours-sub-group/';
		songlist_ar = aqours_subgroup_ar;

		currcategoryID = 4;
	}else if (categoryID == 5){
		// Aqours all together
		numOfSongs = numOfSongsAqoursOthers;
		subPath = 'aqours-individual/';
		songlist_ar = aqours_others_ar;

		currcategoryID = 5;
	}else if (categoryID == 6){
		// Aqours all together
		numOfSongs = numOfSongsIdolsOthers;
		subPath = 'other-idols/';
		songlist_ar = idol_others_ar;

		currcategoryID = 6;
	} else {
		alert('Something went wrong in changeCategory()')
	}


	if(currplayingSong != currSong){
		// If the current song is not equal to the currently playing song, we switched categories, and : don't change button to pause
		displayingPlayBut = true;
	} 


	changedCategory = true;

	if(firstRandom) {
		// If we are playing our first random song
		musicChanged = false;
		
	}
	
	
}

function calc_random_local_index(chosenNum, folder)
{
	// Calculate the value to subtract from random_ar.length

	if(folder == 0){
		return chosenNum;
	} else if(folder == 1){
		var num = chosenNum - numOfSongsMuseAll;
		return num;
 
	} else if(folder == 2){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub;
		return num;

	} else if(folder == 3){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther;

		return num;

	} else if(folder == 4){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether;

		return num;
	} else if(folder == 5){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether - numOfSongsAqoursSub;

		return num;
	} else if(folder == 6){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether - numOfSongsAqoursSub - numOfSongsAqoursOthers;

		return num;
	} else {
		alert('Something went wrong in calc_random_local_index()');
		return;
	}
}

function generate_random_ar(){
	// Generate array that will store all songs of Love Live
	var temp0 = muse_together_ar.concat(muse_subgroup_ar);
	var temp1 = temp0.concat(muse_individual_ar);
	var temp2 = temp1.concat(aqours_together);
	var temp3 = temp2.concat(aqours_subgroup_ar);
	var temp4 = temp3.concat(aqours_others_ar);

	return temp4;
}

function generateRandomSongArray()
{
	var foo = [];
	for(var i = 0; i < random_ar.length; i++)
	{
		foo.push(i);
	}
	shuffleArray(foo);
	return foo;
}

function searchIndexByNameLiveShow(name)
{
	for(var i=0; i < random_sorted_ar.length; i++)
	{
		if(name.localeCompare(random_ar[i][0]) == 0)
		{
			return i;
		}
	}
	alert('Nothing found :(');
	return -1;
}

function generateSortedRandomArray()
{
	var foo = [];
	for(var i = 0; i < random_ar.length; i++)
	{
		foo.push(i);
	}
	return foo;
}


function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function getNextRandomSong(state)
{
	if(state=='+'){
		// Move the reference index
		if(random_index == random_counter_ar.length)
		{
			// We need to disable a button
			// We are at the end of song array
			random_index = 0;

			random_counter_ar = generateRandomSongArray();
			$("#leftSongBut").addClass('ui-disabled');
			return 0;

		} else {
			random_index = random_index + 1;

			if(random_index==0)
			{
				// If random index is still 0 after the increase, then keep left button disabled
				$("#leftSongBut").addClass('ui-disabled');
			} else {
				$("#leftSongBut").removeClass('ui-disabled');
			}		
		}
	} else if (state == '-'){
		// Move the reference index
		if(random_index == 0)
		{
			// We need to disable a button
			// We are at the end of song array
			$("#leftSongBut").addClass('ui-disabled');

			return 0;
		} else {
			random_index = random_index - 1;

			if(random_index <= 0)
			{
				$("#leftSongBut").addClass('ui-disabled');
			}
		}
	} else {
		alert('Something went wrong in getNextRandomSong() :(');
	}
	return random_counter_ar[random_index];
}
