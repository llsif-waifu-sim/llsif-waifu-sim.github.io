var numOfSongs = numOfSongsMuseAll;
var subPath = 'muse-together/';
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
var random_ar_original = generate_random_ar(); // contains an ordered list of song names
var random_ar = random_ar_original;    
var random_sorted_ar = generateSortedRandomArray(); // contains an ordered list of song indexes
var random_counter_ar = generateRandomSongArray(); // contains a shuffled list of song indexes
var random_category = 0;

var random_index = 0;

var playlist_index = 0;

var firstRandom = false;
var loop_mode = false;


var savedPlayList = [];


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

function everySongSecUnchecked(){
	var iterAr = ["MuseTogether","MuseSubIdol","MuseOther","AqoursTogether","AqoursSubIdol","AqoursOther","OtherIdol"];
	for(var i = 0; i < iterAr.length; i++){
		var checkbox = document.getElementById(iterAr[i] + "CheckBox");
		if(checkbox.checked){
			return false;
		}

	}
	return true;
}

function liveshowSettingButClick(){
	if($('#liveshowSettingDiv:visible').length == 0){
		$("#liveshowSettingDiv").show();
	
	} else {
		$("#liveshowSettingDiv").hide();
	}
	
}

function getSongSecInRandom(selfId, numCmp){

	var checkbox = document.getElementById(selfId);

	// Check if everything is unchecked first 
	if(everySongSecUnchecked()){
		// Everything unchecked 
		checkbox.checked = true;
		alert('You must have at least one song section enabled for shuffle mode.');
		return;		
	}
	


	if(!checkbox.checked && numCmp == 0){
		removedSecList.push(["MuseTogether",0]);
	} else if(numCmp == 0){

		removedSecList = removeArrayFromArray(removedSecList,["MuseTogether",0]);
	}

	if(!checkbox.checked && numCmp == 1){
		removedSecList.push(["MuseSubIdol",1]);
	} else if(numCmp == 1){

		removedSecList = removeArrayFromArray(removedSecList,["MuseSubIdol",1]);
	}

	if(!checkbox.checked && numCmp == 2){
		removedSecList.push(["MuseOther",2]);
	} else if(numCmp == 2){

		removedSecList = removeArrayFromArray(removedSecList,["MuseOther",2]);
	}

	if(!checkbox.checked && numCmp == 3){
		removedSecList.push(["AqoursTogether",3]);
	} else if(numCmp == 3){
		removedSecList = removeArrayFromArray(removedSecList,["AqoursTogether",3]);
	}

	if(!checkbox.checked && numCmp == 4){
		removedSecList.push(["AqoursSubIdol",4]);
	} else if(numCmp == 4){
		removedSecList = removeArrayFromArray(removedSecList,["AqoursSubIdol",4]);
	}

	if(!checkbox.checked && numCmp == 5){
		removedSecList.push(["AqoursOther",5]);
	} else if(numCmp == 5){
		removedSecList = removeArrayFromArray(removedSecList,["AqoursOther",5]);
	}

	if(!checkbox.checked && numCmp == 6){
		removedSecList.push(["Other",6]);
	} else if(numCmp == 6){
		removedSecList = removeArrayFromArray(removedSecList,["Other",6])
	}
	random_ar = generate_random_ar();

	return;
}


function updatePlaylistBut(){

	if(document.getElementById("songCategorySelect").value == "mySongList"){
		// We are in My Playlist
		$("#saveToPlaylistBut").hide()

	}else if(isSavedInPlayList(songlist_ar[currSong])){
		// Show that is is already added to playlist
		$("#saveToPlaylistBut").show()
		$("#saveToPlaylistBut").removeClass('btn-default').addClass('btn-danger');
		document.getElementById("saveToPlaylistBut").innerHTML = '<span class="glyphicon glyphicon glyphicon-heart"> <font face="verdana" size="3"><b>Liked</b></font>';

	} else {
		// Show that it is not in playlist

		$("#saveToPlaylistBut").show()
		$("#saveToPlaylistBut").removeClass('btn-danger').addClass('btn-default');
		document.getElementById("saveToPlaylistBut").innerHTML = '<span class="glyphicon glyphicon glyphicon-heart"> <font face="verdana" size="3"><b>Like</b></font>';

	}


}

function getNextSongMyList(state){

	if(state == '-'){
		// we change song forward
		if(playlist_index + 1 >= savedPlayList.length){
			playlist_index = 0;
		} else {
			playlist_index = playlist_index + 1;
		}
		

	} else if(state == '+'){
		if(playlist_index == 0){
			playlist_index = savedPlayList.length - 1;
		} else {
			playlist_index = playlist_index - 1;
		}
	}
	//savedPlayList[playlist_index][0]
	return playlist_index

}

function changeSongMyList(sign){
	var myListIndex = getNextSongMyList(sign);

	var chosenNum = -1;
	var folder = -1;
	for(var i=0; i < random_ar_original.length; i++){
		if(savedPlayList[myListIndex][0] == random_ar_original[i][0]){
			folder = random_ar_original[i][1];
			chosenNum = i;
			break;
		}
	}


	if(chosenNum < 0 || folder < 0){
		alert("Something went wrong. changeSongMyList() was not able to find anything");
	}

	random_category = folder;




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
		alert('Something bad happened in changeSongMyList()');
		return;
	}
	var myListSongInt = calc_random_local_index(chosenNum, folder);


	var picPath = "".concat("./images/album-covers/",subPath, myListSongInt, ".jpg");
	

	$(document).ready(function(){
		$("#liveshowAlbum").hide();
		document.getElementById("liveshowAlbum").src =  picPath;
		$("#liveshowAlbum").fadeIn();
	});

	document.getElementById("song-title-tag").innerHTML =  savedPlayList[myListIndex][0];
	assignLyrics(savedPlayList[myListIndex][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = savedPlayList[myListIndex][0];
	currSong = myListSongInt;


}



function switchToPlayListMode(){


	if(savedPlayList.length == 0){
		// Nothing is saved
		alert('There is nothing in your playlist. Try saving a few songs to your playlist first.');

		$('select[id=songCategorySelect]').val(currcategoryID);
		$('#songCategorySelect').selectpicker('refresh');

		return;
	}

	songlist_ar = savedPlayList;

	var folder = -1;
	var chosenNum = -1;
	for(var i=0; i < random_ar_original.length; i++){
		if(songlist_ar[0][0] == random_ar_original[i][0]){
			folder = random_ar_original[i][1];
			chosenNum = i;
			break;
		}
	}

	random_category = folder;


	if(folder==0){
		subPath = 'muse-together/';
		currcategoryID = 0;
		numOfSongs = numOfSongsMuseAll;

	} else if (folder==1){
		subPath = 'muse-sub-group/';
		numOfSongs = numOfSongsMuseSub;
		currcategoryID = 1;

	} else if (folder==2){
		subPath = 'muse-individual/';
		numOfSongs = numOfSongsMuseOther;
		currcategoryID = 2;

	} else if (folder==3){
		subPath = 'aqours-together/';
		numOfSongs = numOfSongsAqoursTogether;
		currcategoryID = 3;


	} else if (folder==4){
		subPath = 'aqours-sub-group/';
		numOfSongs = numOfSongsAqoursSub;
		currcategoryID = 4;


	} else if (folder==5){
		subPath = 'aqours-individual/';
		numOfSongs = numOfSongsAqoursOthers;

		currcategoryID = 5;


	} else if (folder==6){
		subPath = 'other-idols/';
		numOfSongs = numOfSongsIdolsOthers;
		currcategoryID = 6;


	} else {
		alert('Something bad happened in switchToPlayListMode()');
		return;
	}

	

	var randSongInt = calc_random_local_index(chosenNum, folder);
	var picPath = "".concat("./images/album-covers/",subPath, randSongInt, ".jpg");


	$(document).ready(function(){
		$("#liveshowAlbum").hide();
		document.getElementById("liveshowAlbum").src =  picPath;
		$("#liveshowAlbum").fadeIn();
	});

	document.getElementById("song-title-tag").innerHTML =  songlist_ar[0][0];
	assignLyrics(songlist_ar[0][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[0][0];
	updatePlaylistBut();

	playlist_index = 0;
	currSong = randSongInt;
	$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');

}



function isSavedInPlayList(cmpAr){
	for(var i = 0; i < savedPlayList.length; i++){
		if(savedPlayList[i][0] == cmpAr[0]){
			return true;
		}
	}
	return false
}

function saveToPlaylist(){

	if(isSavedInPlayList(songlist_ar[currSong])){
		// If we already saved in the list, we remove it
		savedPlayList = removeArrayFromArray(savedPlayList, songlist_ar[currSong])

	} else {
		savedPlayList.push(songlist_ar[currSong]);
	}

	storeMyPlaylistCookie(savedPlayList);
	updatePlaylistBut();
}

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
		$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
	}
}

function randomSwitch()
{
	if(random_mode){
		// Turn off random mode
		random_mode = false;


		document.getElementById("leftSongBut").disabled = false;
		$('#randomBut').removeClass('btn-success').addClass('btn-primary');
	} else {
		// Turn on radnom mode

		// This is to force us to go to first song sec if we are playing random button in My Playlist
		if(document.getElementById("songCategorySelect").value == "mySongList"){
			$('select[id=songCategorySelect]').val(0);
			changeCategory();
			$('#songCategorySelect').selectpicker('refresh');
		}

		random_ar = generate_random_ar();
		random_counter_ar = generateRandomSongArray();
		random_index = -1;
		random_mode = true;


		$('#randomBut').removeClass('btn-primary').addClass('btn-success');
		document.getElementById("leftSongBut").disabled = true;

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

		$('#loopBut').removeClass('btn-success').addClass('btn-primary');
	} else {
		loop_mode = true;

		$('#loopBut').removeClass('btn-primary').addClass('btn-success');
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


		var songPath = "".concat("https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-songs-ogg/master/songs/",subPath, currSong, ".ogg");
		var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		
	

		currplayingSong = currSong;


		oggMusic.src = songPath;

		prevMusic.volume = musicVolume;
		prevMusic.play();


		 $('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');

		displayingPlayBut = false;
		

	}else if((musicPaused || musicStopped) && !musicPlaying && !beginning && !musicChanged){
		// Continue music

		originMusic.pause();
		prevMusic.play();
		beginning = false;
		musicPlaying = true;
		currplayingSong = currSong;
		$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
		displayingPlayBut = false;

	} else {
		// Pause music

		prevMusic.pause();
		$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
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
	if(changedCategory && musicPlaying  && !(prevCategoryID == currcategoryID)){
		// We are in a different category
		musicChanged = true;


	}else if((currplayingSong == currSong)  && musicPlaying){
		// We haven't switched songs and music is currently playing
		$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
		displayingPlayBut = true;
		musicChanged = false;
	} else if ( !(currplayingSong == currSong)  ){
		// We switched music
		musicChanged = true;
	} 
	$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
	musicPlaying = false;
	musicStopped = true;
}

function changeSong()
{
	if(document.getElementById("songCategorySelect").value == "mySongList"){
		changeSongMyList('-');

		if((currplayingSong == currSong) && musicPlaying  && (prevCategoryID == currcategoryID)){
			// We came back to our original song and we have not changed categories
			musicChanged = false;
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;

			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
		}
		updatePlaylistBut();

		return;
	}


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
		assignLyrics(songlist_ar[currSong][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];


		if(   ((currplayingSong == currSong) && musicPlaying && (prevCategoryID == currcategoryID)) ){
			// We came back to our original song and music is playing
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;
			musicChanged = false;

		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
		}
	} else {
		// We are in random_mode, going back
		var chosenNum = getNextRandomSong('-');  // choenNum is the index of the random array 
		var folder = random_ar[chosenNum][1];       // folder is the name of the folder the song is located in
		random_category = folder;
		changeCategoryRandom();
		
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
			alert('Something bad happened in changeSong()');
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
		assignLyrics(random_ar[chosenNum][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];
		




		currSong = randSongInt;

		if((currplayingSong == currSong) && musicPlaying  && (prevCategoryID == currcategoryID)){
			// We came back to our original song and we have not changed categories
			musicChanged = false;
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;

			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
		}



	}
	updatePlaylistBut();
}

function changeSongBack()
{

	if(document.getElementById("songCategorySelect").value == "mySongList"){
		changeSongMyList('+');
		updatePlaylistBut();

		if(   ((currplayingSong == currSong) && musicPlaying)  && (prevCategoryID == currcategoryID)){
			// We came back to our original song and music is playing
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;
			musicChanged = false;
			firstRandom = true;
			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
			firstRandom = false;
		}

		return;
	}


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
		assignLyrics(songlist_ar[currSong][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];

		

		if((currplayingSong == currSong) && musicPlaying && (prevCategoryID == currcategoryID)){
			// We came back to our original song and we have not changed categories
			musicChanged = false;
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			//$('#liveshow-play-but').find('span').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
		}

	} else {
		// We are in random_mode, going forward
		var chosenNum = getNextRandomSong('+');  // choenNum is the index of the random array 
		var folder = random_ar[chosenNum][1];       // folder is the name of the folder the song is located in

		random_category = folder;
		changeCategoryRandom();
		
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
			alert('Something bad happened in changeSongBack()');
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
		assignLyrics(random_ar[chosenNum][0]);
		document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];

		currSong = randSongInt;
		


		if(   ((currplayingSong == currSong) && musicPlaying)  && (prevCategoryID == currcategoryID)){
			// We came back to our original song and music is playing
			$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
			displayingPlayBut = false;
			musicChanged = false;
			firstRandom = true;
			currplayingSong = currSong;
		} else if (!musicChanged &&  musicPlaying){
			// We are switching songs
			$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
			displayingPlayBut = true;
			musicChanged = true;
			firstRandom = false;
		}


	}

	updatePlaylistBut();

	
}


function changeSongRandom(){
	var chosenNum = getNextRandomSong('+');
	var folder = random_ar[chosenNum][1];

	random_category = folder;
	changeCategoryRandom();

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
	} else if(folder == 7){
			alert('Please still work on this');
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
	assignLyrics(random_ar[chosenNum][0]);
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
	}else if (categoryID == "mySongList"){
		if(random_mode == true){
			// So that we can traverse through My Playlist properly
			randomSwitch();
		}
		switchToPlayListMode();
		
		
		return;

	} else {
		alert('Something went wrong in changeCategory()')
	}


	if(currplayingSong != currSong){
		// If the current song is not equal to the currently playing song, we switched categories, and : don't change button to pause
		displayingPlayBut = true;
	} 


	changedCategory = true;
	musicChanged = true;


	
	currSong = 0;
	
	var songPath = "".concat("https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-songs-ogg/master/songs/",subPath, currSong, ".ogg");
	var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		
	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong][0];
	assignLyrics(songlist_ar[currSong][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = songlist_ar[currSong][0];
	document.getElementById("liveshowAlbum").src =  picPath;
	updatePlaylistBut();
	
	if(musicPlaying && (prevCategoryID != currcategoryID) && !displayingPlayBut){
		// To switch to play button if we switch categories
		// And to stay as play button if we 
		//$('#liveshow-play-but').find('span').toggleClass('glyphicon-pause').toggleClass('glyphicon-play');
		$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
		displayingPlayBut = true;

	}	else if(currplayingSong==0 && prevCategoryID == currcategoryID){
		// If current playing song is 0 and we came back to the same category as the playing song, switch to pause
		//$('#liveshow-play-but').find('span').toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
		$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
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
		alert('Something went wrong in changeCategoryRandom()')
	}

	//document.getElementById("songCategorySelect").value = currcategoryID.toString();

	$('select[id=songCategorySelect]').val(currcategoryID);
	$('#songCategorySelect').selectpicker('refresh');



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

function local_index_recal(num,folder){
	// Since we are removing several song sections from array, we have to re-add them into the result

	// We do not do this if we are at playlist
	var categoryID = document.getElementById("songCategorySelect").value;
	if(categoryID == "mySongList"){
		return num;
	}

	// Get removed section's song total and add them back
	for(var i=0;i < removedSecList.length; i++){
		if(folder > removedSecList[i][1]){
			var tarFold = removedSecList[i][1];
			if(tarFold == 0){
				num = num + numOfSongsMuseAll;
			} else if(tarFold == 1){
				num = num + numOfSongsMuseSub;
			}else if(tarFold == 2){
				num = num + numOfSongsMuseOther;
			}else if(tarFold == 3){
				num = num + numOfSongsAqoursTogether;
			}else if(tarFold == 4){
				num = num + numOfSongsAqoursSub;
			}else if(tarFold == 5){
				num = num + numOfSongsAqoursOthers;
			}

		}
	}


	return num;
}


function calc_random_local_index(chosenNum, folder)
{
	// Calculate the value to subtract from random_ar.length

	if(folder == 0){
		return chosenNum;
	} else if(folder == 1){
		var num = chosenNum - numOfSongsMuseAll;
		num = local_index_recal(num,folder);
		return num;
 
	} else if(folder == 2){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub;
		num = local_index_recal(num,folder);
		return num;

	} else if(folder == 3){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther;

		if (num > numOfSongsAqoursTogether)
		{
			return local_index_recal(num,folder) - numOfSongsAqoursTogether;
		}
		num = local_index_recal(num,folder);
		return num;

	} else if(folder == 4){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether;
		num = local_index_recal(num,folder);
		return num;
	} else if(folder == 5){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether - numOfSongsAqoursSub;
		num = local_index_recal(num,folder);
		return num;
	} else if(folder == 6){
		var num = chosenNum - numOfSongsMuseAll - numOfSongsMuseSub - numOfSongsMuseOther - numOfSongsAqoursTogether - numOfSongsAqoursSub - numOfSongsAqoursOthers;
		num = local_index_recal(num,folder);
		return num;
	} else {
		alert('Something went wrong in calc_random_local_index()');
		return;
	}
}








function isInRemoveSecList(strCmp){

	for(var i=0; i < removedSecList.length;i++){
		if(removedSecList[i][0] == strCmp){

			return true;
		}
	}

	return false;
}

function generate_random_ar(){
	// Generate array that will store all songs of Love Live
	temp0 = [];	
	if(!isInRemoveSecList("MuseTogether")){
		temp0 = temp0.concat(muse_together_ar);
	}
	if(!isInRemoveSecList("MuseSubIdol")){
		temp0 = temp0.concat(muse_subgroup_ar);
	}
	
	if(!isInRemoveSecList("MuseOther")){
		temp0 = temp0.concat(muse_individual_ar);
	}
	
	if(!isInRemoveSecList("AqoursTogether")){
		temp0 = temp0.concat(aqours_together);
	}
	
	if(!isInRemoveSecList("AqoursSubIdol")){
		temp0 = temp0.concat(aqours_subgroup_ar);
	}
	
	if(!isInRemoveSecList("AqoursOther")){
		temp0 = temp0.concat(aqours_others_ar);
	}
	
	if(!isInRemoveSecList("Other")){
		temp0 = temp0.concat(idol_others_ar);
	}


	return temp0;
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
			document.getElementById("leftSongBut").disabled = true;
			return 0;

		} else {
			random_index = random_index + 1;

			if(random_index==0)
			{
				// If random index is still 0 after the increase, then keep left button disabled
				document.getElementById("leftSongBut").disabled = true;
			} else {
				document.getElementById("leftSongBut").disabled = false;
			}		
		}
	} else if (state == '-'){
		// Move the reference index
		if(random_index == 0)
		{
			// We need to disable a button
			// We are at the end of song array
			document.getElementById("leftSongBut").disabled = true;

			return 0;
		} else {
			random_index = random_index - 1;

			if(random_index <= 0)
			{
				document.getElementById("leftSongBut").disabled = true;
			}
		}
	} else {
		alert('Something went wrong in getNextRandomSong() :(');
	}
	return random_counter_ar[random_index];
}


function switchToSongByName(songName){


	var folder = -1;
	var chosenNum = -1;
	for(var i=0; i < random_ar_original.length; i++){
		if(songName == random_ar_original[i][0]){
			folder = random_ar_original[i][1];
			chosenNum = i;
			break;
		}
	}

	if(folder == -1 || chosenNum == -1){
		return;
	}
	random_category = folder;
	changeCategoryRandom();

	if(folder==0){
		subPath = 'muse-together/';
		songlist_ar = muse_together_ar;
		currcategoryID = 0;
		numOfSongs = numOfSongsMuseAll;

	} else if (folder==1){
		subPath = 'muse-sub-group/';
		numOfSongs = numOfSongsMuseSub;
		songlist_ar = muse_subgroup_ar;
		currcategoryID = 1;

	} else if (folder==2){
		subPath = 'muse-individual/';
		numOfSongs = numOfSongsMuseOther;
		songlist_ar = muse_individual_ar;
		currcategoryID = 2;

	} else if (folder==3){
		subPath = 'aqours-together/';
		numOfSongs = numOfSongsAqoursTogether;
		songlist_ar = aqours_together;
		currcategoryID = 3;


	} else if (folder==4){
		subPath = 'aqours-sub-group/';
		numOfSongs = numOfSongsAqoursSub;
		songlist_ar = aqours_subgroup_ar;
		currcategoryID = 4;


	} else if (folder==5){
		subPath = 'aqours-individual/';
		numOfSongs = numOfSongsAqoursOthers;
		songlist_ar = aqours_others_ar;

		currcategoryID = 5;


	} else if (folder==6){
		subPath = 'other-idols/';
		numOfSongs = numOfSongsIdolsOthers;
		songlist_ar = idol_others_ar;
		currcategoryID = 6;


	} else {
		alert('Something bad happened in switchToSongByName()');
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
	assignLyrics(random_ar[chosenNum][0]);
	document.getElementById("lyricsTitleDiv").innerHTML = random_ar[chosenNum][0];

	currSong = randSongInt;

	stopClick();
	playClick();


}

function initalizeLiveShow(){
	checkMyPlaylist();
}

initalizeLiveShow();

