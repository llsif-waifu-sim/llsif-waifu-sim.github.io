var numOfSongs = 48;
var currSong = 0;

function playClick()
{
	var prevMusic = document.getElementById("background-music-player");
	prevMusic.pause();

	var oggMusic = document.getElementById("background-music-player");
	var mp3Music = document.getElementById("background-music-player");


	var songPath = "".concat("./songs/", currSong, ".ogg");
	oggMusic.src = songPath;

	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];

	audio.volume = musicVolume;
	audio.play();
}

function changeSong()
{
	if(currSong >= numOfSongs - 1){
		// Reached end
		currSong = 0;
	} else {
		currSong = currSong + 1;
	}
	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];
}

function changeSongBack()
{
	if(currSong <= 0){
		// Reached end
		currSong = numOfSongs - 1;
	} else {
		currSong = currSong - 1;
	}
	document.getElementById("song-title-tag").innerHTML =  songlist_ar[currSong];
}