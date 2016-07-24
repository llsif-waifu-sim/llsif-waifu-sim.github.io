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

$('#background-music-player').on('ended', function() {
	
   stopClick();
   changeSong();
   playClick();
});



function playClick()
{



	if(beginning || changedCategory ||(!(currplayingSong == currSong) && musicPlaying)  ||  (!musicPlaying && !(currplayingSong == currSong))  ){
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


		var songPath = "".concat("./songs-mp3/",subPath, currSong, ".mp3");
		var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
		
		currplayingSong = currSong;

		document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];
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
	
	


	if(changedCategory && musicPlaying){
		musicStopped = true;
		musicChanged = true;

	}else if((currplayingSong == currSong)  && musicPlaying){
		// We haven't switched songs and music is currently playing
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		displayingPlayBut = true;
		musicStopped = true;
		musicChanged = false;
	} else if ( !(currplayingSong == currSong)  ){
		// We switched music
		musicStopped = true;
		musicChanged = true;
	} 
	musicPlaying = false;
}

function changeSong()
{


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



	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];

	

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
	

}

function changeSongBack()
{

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


	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];

	

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



	var songPath = "".concat("./songs/",subPath, currSong, ".ogg");
	var picPath = "".concat("./images/album-covers/",subPath, currSong, ".jpg");
	
	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];
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
