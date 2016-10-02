var idIndex;
var currID = '';
function getURL()
{
	return searchURLById(globalWaifu);

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

	var URLlink = getURL();
	if(URLlink == "none")
	{
		document.getElementById('StoryLabel').innerHTML = 'Video not avaliable yet :(';
		document.getElementById('storyVideoPlayer').src = "";
	} else {
		document.getElementById('StoryLabel').innerHTML = storyAr[idIndex][2];
		//alert(URLlink);
		document.getElementById('storyVideoPlayer').src = URLlink;
	}
}