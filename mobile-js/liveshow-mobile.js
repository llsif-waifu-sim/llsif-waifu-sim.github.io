var numOfSongs = 48;

var currSong = 0;
var currplayingSong = 0;

var musicPlaying = false;
var musicPaused = true;
var musicStopped = true;
var musicChanged = false;
var beginning = true;


var prevMusic = document.getElementById("background-music-player");
var originMusic = document.getElementById("origin-music-player");

$('#background-music-player').on('ended', function() {
	
   stopClick();
   changeSong();
   playClick();
});



function playClick()
{



	if(beginning || (!(currplayingSong == currSong) && musicPlaying)  ||  (!musicPlaying && !(currplayingSong == currSong))  ){
		// Play music from beginning 
		// OR We are currently playing something, but not at our original song
		// OR we paused and switched to a different song

	
		musicPlaying = true;
		musicPaused = false;
		musicChanged = false;
		beginning = false;
		musicStopped = false;

		originMusic.pause();
		prevMusic.pause();

		var oggMusic = document.getElementById("background-music-player");
		var mp3Music = document.getElementById("background-music-player");


		var songPath = "".concat("./songs-mp3/", currSong, ".mp3");
		var picPath = "".concat("./images/album-covers/", currSong, ".jpg");
		
		currplayingSong = currSong;

		document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];
		document.getElementById("liveshowAlbum").src =  picPath;

		oggMusic.src = songPath;

		prevMusic.volume = musicVolume;
		prevMusic.play();


		
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
		

	}else if((musicPaused || musicStopped) && !musicPlaying && !beginning && !musicChanged){
		// Continue music
		originMusic.pause();
		prevMusic.play();
		beginning = false;
		musicPlaying = true;
		currplayingSong = currSong;
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');


	} else {
		// Pause music
		
		prevMusic.pause();
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		musicPaused = true;
		musicChanged = false;
		musicPlaying = false;
	}
}


function stopClick()
{
	var prevMusic = document.getElementById("background-music-player");
	prevMusic.pause();

	prevMusic.currentTime = 0;
	
	


	if((currplayingSong == currSong)  && musicPlaying){
		// We haven't switched songs and music is currently playing
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
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

	var picPath = "".concat("./images/album-covers/", currSong, ".jpg");
	


	$(document).ready(function(){
		$("#liveshowAlbum").hide();
		document.getElementById("liveshowAlbum").src =  picPath;
		$("#liveshowAlbum").fadeIn();
	});



	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];

	

	if(   (currplayingSong == currSong) && musicPlaying    ){
		// We came back to our original song and music is playing
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
		musicChanged = false;
	} else if (!musicChanged &&  musicPlaying){
		// We are switching songs
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
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

	var picPath = "".concat("./images/album-covers/", currSong, ".jpg");
	
	$(document).ready(function(){
		$("#liveshowAlbum").hide();
		document.getElementById("liveshowAlbum").src =  picPath;
		$("#liveshowAlbum").fadeIn();
	});


	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];

	

	if((currplayingSong == currSong) && musicPlaying){
		// We came back to our original song
		musicChanged = false;
		$('#liveshow-play-but').removeClass('ui-icon-play').addClass('ui-icon-pause').trigger('refresh');
	} else if (!musicChanged &&  musicPlaying){
		// We are switching songs
		$('#liveshow-play-but').removeClass('ui-icon-pause').addClass('ui-icon-play').trigger('refresh');
		musicChanged = true;
	}

	
}