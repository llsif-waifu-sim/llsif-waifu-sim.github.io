var globalAudio = null;
var globalWaifu = 'honoka';
var maxNumOfCard = 960;
var voiceVolume = 0.3;
var musicVolume = 0.3;

var background = 0;


window.onload = function() {
    var backgroundAudio=document.getElementById("background-music-player");
	backgroundAudio.volume= musicVolume;


    setTimeout(function() {
    	commandSelect(0);
	}, 1000, true)

	checkCookie();
}


function updateVolumeMusic(soundValue) {
    musicVolume = soundValue/100;
    playBackgroundMusic();
}

function updateVolumeVoice(soundValue) {
    voiceVolume = soundValue/100;
    commandSelect(0);
}



function pauseBackgroundMusic()
{
	var audio = document.getElementById("background-music-player");
	audio.pause();
}

function playBackgroundMusic()
{
	var audio = document.getElementById("background-music-player");
	audio.pause();
	audio.volume = musicVolume;
	audio.play();
}


function changeBackground()
{
	var maxNumBackground = 77;
	if(background < maxNumBackground-1)
	{
		background = background + 1;
	}else {
		background = 0;
	}
	var backpath = 'images/background/background' + background.toString() + '.png';

	document.getElementById("homeScreen").src=backpath;
}

function changeBackgroundBack()
{
	var maxNumBackground = 77;
	if(background <= 0)
	{
		background = maxNumBackground-1;
		
	}else {
		background = background - 1;
	}
	var backpath = 'images/background/background' + background.toString() + '.png';

	document.getElementById("homeScreen").src=backpath;
}


function refreshBubble()
{
	$(document).ready(function(){
		$("#speech-bubble").hide();
		$("#speech-bubble").fadeIn();
	});
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function nameAssign(name)
{
	globalWaifu = name;
	var replacement_name = 'Random ' + capitalizeFirstLetter(name);
	document.getElementById('random-nameplace').innerHTML = replacement_name;

	
}

function waifuRNG()
{
	var maxNum = id_log.length;
	return Math.floor(Math.random() * maxNum);
}

function cardRNG()
{
	while(true){
		var maxNum = id_log.length;
		var n = Math.floor(Math.random() * maxNum);
		var remainder = id_log.length - n;

		var i;
		for(i = n; n < remainder; i++)
		{
			if(id_log[i][1] == globalWaifu)
			{
				return i;
			}
		}
	}

}



function getRandomWaifu()
{
	var i = waifuRNG();
	var id = parseInt(id_log[i][0]);
	var name = id_log[i][1];
	var idolized = id_log[i][2];
	
	var path;

	if(idolized == 'yes')
	{
		path = "./scraped-images/" + name + "/" + id + "_id.png";
		document.querySelector("input[value='yes']").checked = true;
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
		document.querySelector("input[value='no']").checked = true;
	}


    //file exists
	document.getElementById("idol_img").src=path;

	nameAssign(name);

	document.getElementById("card_id").value = id;

	if (globalAudio!=null){
		globalAudio.pause();
	}


	setTimeout(function() {
		commandSelect(0);
	}, 500, true)

	storeCookie(i);


}


function getRandomCard()
{
	var i = cardRNG();
	var id = parseInt(id_log[i][0]);
	var name = id_log[i][1];
	var idolized = id_log[i][2];
	
	var path;

	if(idolized == 'yes')
	{
		path = "./scraped-images/" + name + "/" + id + "_id.png";
		document.querySelector("input[value='yes']").checked = true;
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
		document.querySelector("input[value='no']").checked = true;
	}


    //file exists
	document.getElementById("idol_img").src=path;

	nameAssign(name);

	document.getElementById("card_id").value = id;
	

	if (globalAudio!=null){
		globalAudio.pause();
	}


	setTimeout(function() {
		commandSelect(0);
	}, 500, true)

	storeCookie(i);

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function mainWaifuSet(index)
{
	var id = parseInt(id_log[index][0]);
	var name = id_log[index][1];
	var idolized = id_log[index][2];
	

	// Once we get the info, get the image
	var path;

	if(idolized == 'yes')
	{
		path = "./scraped-images/" + name + "/" + id + "_id.png";
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
	}




	//file exists
	document.getElementById("idol_img").src=path;

	nameAssign(name);
	document.getElementById("card_id").value = id;

	if (globalAudio!=null){
		globalAudio.pause();
	}

	
}

function checkCookie() {
    var index=getCookie("waifu-index");
    if (index != null && index != "") {
        mainWaifuSet(index);
    } else{
    	document.getElementById("idol_img").src= 'images/waifu/honoka0.png';
    }
}

function storeCookie(index)
{
	setCookie("waifu-index", index, 6);
}



function searchNameById(id)
{
	var i;
	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][0] == id.toString())
		{
			return id_log[i][1];
		}
	}
	return 'none';
}


function searchIndexById(id, idolized)
{
	var i;
	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][0] == id.toString())
		{
			if(idolized == 'yes'){
				return i + 1;
			} else{
				return i;
			}
		}
	}
	return 'none';
}


function searchIdolizedById(id)
{
	var i;
	for(i = 0; i < id_log.length; i++)
	{
		if(id_log[i][0] == id.toString())
		{
			return id_log[i][2];
		}
	}
	return 'none';
}

function searchId()
{

	var id = document.getElementById("card_id").value;
	var idolized = $('input[id="radio-idol"]:checked').val();


	if(!isInt(id) || id > maxNumOfCard){
		alert('Invalid id input');
		return;
	} 
	
	var name = searchNameById(id);
	

	// Once we get the info, get the image
	var path;

	if(idolized == 'yes')
	{
		path = "./scraped-images/" + name + "/" + id + "_id.png";
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
	}



	$.ajax({
	    url:path,
	    type:'HEAD',
	    error: function()
	    {
	        //file not exists
	        alert('Idolized / Non-idolized version of card not found. Trying filling out the alternate option bubble.');
			commandSelect(0);
			return;
	    },
	    success: function()
	    {
	        //file exists
	        document.getElementById("idol_img").src=path;

			nameAssign(name);

			if (globalAudio!=null){
				globalAudio.pause();
			}


			setTimeout(function() {
				commandSelect(0);
			}, 500, true)
			  }
		});

		var index = parseInt(searchIndexById(id, idolized));
		storeCookie(index);

}


function changeWaifu(name, index){

	var path = "images/waifu/" + name +"0.png";
	document.getElementById("idol_img").src=path;

	nameAssign(name);

	if (globalAudio!=null){
			globalAudio.pause();
	}


	setTimeout(function() {
    	commandSelect(0);
	}, 500, true)

	storeCookie(index);

}

	function commandSelect(mode)
	{
		// mode == 0 is home button
		// mode == 1 is waifu button
		// mode == 2 is story button
		// mode == 3 is member button
		if (globalAudio!=null){
			globalAudio.pause();
		}
		

		var audioPath = "audio/";
		var waifuName = globalWaifu + "/";
		var file;


		// Number between 0 and maxNum
		

		var n = 0;

		if(mode == 0){
			// Home button RNG
			var maxNum = 14;
			n = Math.floor(Math.random() * maxNum);
			file = "home/";
		} else if (mode == 1){
			// Waifu button RNG
			var maxNum = 11;
			n = Math.floor(Math.random() * maxNum);
			file = "waifu/";
		} else if (mode == 2){
			// Story button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "story/";
		} else if (mode == 3){
			// Member button RNG
			var maxNum = 1;
			n = Math.floor(Math.random() * maxNum);
			file = "member/";
		}



		var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
		globalAudio = new Audio(superString);
		globalAudio.volume = voiceVolume;
		globalAudio.play();
		

		var pathString = "".concat(audioPath, waifuName, file);

		changeSpeechText(pathString, n);
		refreshBubble();

	}

	function homeClick() {
		//document.getElementById("home_but").src="images/home-button.png";


    	var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 0;
		commandSelect(mode);


	}


	function waifuClick()
	{
		
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 1;
		commandSelect(mode);
		
	}

	function storyClick()
	{

		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 2;
		commandSelect(mode);
	}

	function memberClick()
	{
		var x = document.getElementById("homeScreen").useMap = "#clickmap";

		var mode = 3;
		commandSelect(mode);
	}

	function hoverInBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/buttons/home-button-hover.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/buttons/story-button-hover.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/buttons/member-button-hover.png";
		} else if(clicked_id == 'settings_but'){
			document.getElementById("settings_but").src="images/buttons/settings-button-hover.png";
		} else if(clicked_id == 'camera_but'){
			document.getElementById("camera_but").src="images/buttons/camera-button-hover.png";
		}
		
	}

	function hoverOutBut(clicked_id)
	{
		if(clicked_id == 'home_but'){
			document.getElementById("home_but").src="images/buttons/home-button.png";
		} else if(clicked_id == 'story_but'){
			document.getElementById("story_but").src="images/buttons/story-button.png";
		} else if(clicked_id == 'member_but'){
			document.getElementById("member_but").src="images/buttons/member-button.png";
		} else if(clicked_id == 'settings_but'){
			document.getElementById("settings_but").src="images/buttons/settings-button.png";
		} else if(clicked_id == 'camera_but'){
			document.getElementById("camera_but").src="images/buttons/camera-button.png";
		}
	}



	function changeSpeechText (path, n) {
		
		var pathString = "".concat("./", path, "speech.txt");
		var client;
        if (window.XMLHttpRequest) {
		    // code for modern browsers
		    client = new XMLHttpRequest();
		} else {
		    // code for IE6, IE5
		    client = new ActiveXObject("Microsoft.XMLHTTP");
		}

        client.onreadystatechange = function()
        {
            if( client.responseText != '' )
            {
                var txt = client.responseText.split("\n");
                document.getElementById("speech-text").innerHTML = txt[n];
            }
        }
        client.open("GET", pathString, true);
        client.send();
    }

	function cameraClick()
	{
		var camera_path = 'audio/camera-shutter.mp3'
		var camera_audio = new Audio(camera_path);
		//camera_audio.volume = voiceVolume;
		camera_audio.play();





		
	}


	document.addEventListener('DOMContentLoaded',domloaded,false);
	function domloaded(){
	    // your code here.
	    var canvas = document.getElementById("snapshot-canvas");
		var ctx = canvas.getContext("2d");
		var data = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
		             "<foreignObject width='100%' height='100%'>" +
		               "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:20px'>" +
		                  "<table border='1'><tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr><tr><td>row 2, cell 1</td><td>row 2, cell 2</td></tr></table>" +
		               "</div>" +
		             "</foreignObject>" +
		           "</svg>";
		var DOMURL = self.URL || self.webkitURL || self;
		var img = new Image();
		var svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
		var url = DOMURL.createObjectURL(svg);
		
		    ctx.drawImage(img, 0, 0);
		    DOMURL.revokeObjectURL(url);
		img.src = url;
	}


