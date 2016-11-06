var idIndex;
var currID = '';

var playingSongInt = -1;



function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

$(document).on('hide.bs.modal','#storyModal', function () {
	sleep(600).then(() => {
    	closeStory();
	})
	
    
});



function getURL()
{
	return searchURLById(globalWaifu);

}

function closeStory()
{
	sleep(1000);
	if(playingSongInt == 0)
	{
		// Background music playing
		originMusic.play();

	} else if(playingSongInt == 1){
		// Music player playing

		prevMusic.play();
		beginning = false;
		musicPlaying = true;
		currplayingSong = currSong;
		$('#liveshow-play-but').find('span').removeClass('glyphicon-play').addClass('glyphicon-pause');
		displayingPlayBut = false;
	}

	document.getElementById('storyVideoPlayer').src = "";
	playingSongInt = -1;
}

function searchURLById()
{

	var i;
	for(i = 0; i < storyAr.length; i++)
	{
		if(storyAr[i][0] == currID.toString())
		{
			idIndex = i;
			return storyAr[i][1];
		}
	}
	return 'none';
}

function storyVideoShow(){
	currID = document.getElementById('card_id').value;

	storyClick();

	// Stop music in the playlist
	if(!originMusic.paused)
	{
		// Background music playing

		originMusic.pause();

		playingSongInt = 0;

	} else if(!prevMusic.paused){
		// If music player is running

		prevMusic.pause();
		$('#liveshow-play-but').find('span').removeClass('glyphicon-pause').addClass('glyphicon-play');
		displayingPlayBut = true;
		musicPaused = true;
		musicChanged = false;
		musicPlaying = false;

		playingSongInt = 1;

	}
	
	
	


	var URLlink = getURL();
	if(URLlink == "none")
	{
		document.getElementById('StoryLabel').innerHTML = 'Video not avaliable yet :(';
		document.getElementById('storyVideoPlayer').src = "";
		document.getElementById('StoryDiscriptionLabel').innerHTML = "<h4>We do not have a video of this particular idol card. Please check out another idol.</h4>";

	} else {
		document.getElementById('StoryLabel').innerHTML = storyAr[idIndex][2];
		document.getElementById('StoryDiscriptionLabel').innerHTML = "";
		document.getElementById('storyVideoPlayer').src = URLlink;
	}
}


