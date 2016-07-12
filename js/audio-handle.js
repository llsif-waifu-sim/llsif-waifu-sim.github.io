var globalAudio = null;
var globalWaifu = 'honoka';
var maxNumOfCard = 960;
var language = 'english';

var away = false;




function forgetWaifuRNG(maxRandNum)
{
	// Random number generation for forget speech

	var n = Math.floor(Math.random() * maxRandNum);

	// Forget speech
	if(n == maxRandNum - 1){
		var neg = changeWaifuLoadRandom();
		if(neg == -1)
		{
			return -1;
		}

		forgotSpeech();
		return 0;
		
	}
	return -1;
}


var timeout;
var countdown = 30000;

$(document).on('mousemove', function(){

	clearTimeout(timeout);

	
	timeout = setTimeout(inactiveSpeech, countdown);

})


function inactiveSpeech()
{
	var id = parseInt(id_log[globalIndex][0]);
	var name = id_log[globalIndex][1];
	var idolized = id_log[globalIndex][2];
			
	
	if(!away){
		timeSpeech();
		clearTimeout(timeout);
		timeout = setTimeout(inactiveSpeech, countdown);
	} else {
		return;
	}
}


function forgotSpeech()
{
	
    var audioPath = "audio/";
    var waifuName = globalWaifu + "/";
    var file = 'forget/';

    var maxRandNum = 2;
    var n = Math.floor(Math.random() * maxRandNum);


    var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
    globalAudio = new Audio(superString);
    globalAudio.volume = voiceVolume;
    globalAudio.play();
        

    var pathString = "".concat(audioPath, waifuName, file);
    changeSpeechText(pathString, n);
    refreshBubble();


}

function forgetWaifuLoad(index)
{

    var id = parseInt(id_log[index][0]);
    var name = id_log[index][1];
    var idolized = id_log[index][2];


    // Once we get the info, get the image
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

  


}




function changeWaifuLoadRandom() {
    var index=getCookie("saved-waifu-index-1");
    var index2=getCookie("saved-waifu-index-2");
    var index3=getCookie("saved-waifu-index-3");



    if((index == null && index == "") && (index2 == null && index2 == "") && (index3 == null && index3 == ""))
    {
    	return -1;
    }



    var nums = [1,2,3],
    ranNums = [],
    i = nums.length,
    j = 0;

	while (i--) {
	    j = Math.floor(Math.random() * (i+1));
	    ranNums.push(nums[j]);
	    if(nums[j] == 1){
	    	 if (index != null && index != "") {
		        globalIndex = index;
		        forgetWaifuLoad(index);
		        return 1;  
		    }
	    } else if (nums[j] == 2){
	    	if (index2 != null && index2 != "") {
		        globalIndex = index2;
		        forgetWaifuLoad(index2);
		        return 2;	        
		    }
	    } else if (nums[j] == 3){
			if (index3 != null && index3 != "") {
		        globalIndex = index3;
		        forgetWaifuLoad(index3);
		        return 3;
		    } 
	    }
	    
	    nums.splice(j,1);
	}





     

    return -1;
}




function seasonSpeech()
{
	var today;
	today = new Date();
	var curr_year = today.getFullYear();
	var curr_month = today.getMonth() + 1;


	var audioPath = "audio/";
	var waifuName = globalWaifu + "/";
	var file = 'months/';
	var n;


	// setFullYear(Year, month, day)
	if(curr_month >= 3 &&  curr_month <= 5){
		// Between 3/1 and 5/31
		n = 0;
	} else if(curr_month >= 6  &&  curr_month <= 8){
		// Between 6/1 and 8/31
		n = 1;
	} else if(curr_month >= 9 && curr_month <= 11){
		// 9/1 to 11/30
		n = 2;
	} else if( curr_month >= 12 || curr_month <= 2){
		// 12/1/(year) to 2/29/(year + 1)
		n = 3;
	}

	var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
	globalAudio = new Audio(superString);
	globalAudio.volume = voiceVolume;
	globalAudio.play();
		

	var pathString = "".concat(audioPath, waifuName, file);
	changeSpeechText(pathString, n);
	refreshBubble();
}

function timeSpeech()
{
	var today;
	today = new Date();
	var curr_hour = today.getHours();


	var maxNum = 4;
	var n = Math.floor(Math.random() * maxNum);


	var audioPath = "audio/";
	var waifuName = globalWaifu + "/";
	var file = 'inactive/';
	var n;

	if(n == 0){
		// Play the 12:00am to 11:59pm clip
		n = 0;

	} else if(n == 1){

		if(curr_hour <= 5 && curr_hour >= 17){
			// 5am to 5pm
			n = 1;
		} else if(curr_hour <= 17  || curr_hour >= 4){
			// From 5pm to 4am
			n = 2;
		}

	} else if (n >= 2){

		if(curr_hour >= 5 && curr_hour <= 11){
			// 5am to 11am
			n = 3;
		} else if(curr_hour >= 11 && curr_hour <= 17){
			// 11am to 5pm
			n = 4;
		} else if(curr_hour >= 17 && curr_hour <= 22){
			// 5pm to 10pm
			n = 5;
		} else if(curr_hour >= 22 || curr_hour <= 5){
			// 10pm to 5am
			n = 6;
		}
	
	} else {
		alert('Something went wrong');
		return;
	}

	if (globalAudio!=null){
        globalAudio.pause();
    }

	var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
	globalAudio = new Audio(superString);
	globalAudio.volume = voiceVolume;
	globalAudio.play();
		

	var pathString = "".concat(audioPath, waifuName, file);
	changeSpeechText(pathString, n);
	refreshBubble();

}



window.onload = function() {

	// Preform cookie checks
	checkCookie();
	checkBackgroundCookie();
	checkVolumeCookie();
	

    var backgroundAudio=document.getElementById("background-music-player");
	backgroundAudio.volume= musicVolume;

    setTimeout(function() {
    	commandSelect(0);
	}, 1000, true)
}



function updateVolumeMusic(soundValue) {
    musicVolume = soundValue/100;
    storeVolumeMusicCookie(musicVolume);
    playBackgroundMusic();
}

function updateVolumeVoice(soundValue) {
    voiceVolume = soundValue/100;
    storeVolumeVoiceCookie(voiceVolume);
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
	storeBackgroundCookie(background);

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
	storeBackgroundCookie(background);

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

	var neg = forgetWaifuRNG(30);

	if(neg == 0){
		// forgetWaifu speech was successful
		return;
	}


	var i = waifuRNG();
	var id = parseInt(id_log[i][0]);
	var name = id_log[i][1];
	var idolized = id_log[i][2];
	
	var path;

	globalIndex = i;


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
	var neg = forgetWaifuRNG(30);

	if(neg == 0){
		// forgetWaifu speech was successful
		return;
	}


	var i = cardRNG();
	var id = parseInt(id_log[i][0]);
	var name = id_log[i][1];
	var idolized = id_log[i][2];
	
	var path;

	globalIndex = i;

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

			globalIndex = searchIndexById(id, idolized);

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


	globalIndex = index;

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
			var maxNum = 15;
			n = Math.floor(Math.random() * maxNum);
			file = "home/";


			// Activate month speech
			if(n == maxNum - 1){
				seasonSpeech();
				return;
			}

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

	function saveWaifu(but_id)
	{
	
		storeSaveWaifuCookie(globalIndex, but_id);
	
	    if(but_id == 'waifu_save_but_1'){



			var i = globalIndex;



			document.getElementById("waifu_load_but_1").disabled = false;
	        $('waifu_load_but_1').prop('disabled', false); 


			var id = parseInt(id_log[i][0]);
			var name = id_log[i][1];
			var idolized = id_log[i][2];


			var html_id = "ID: " + parseInt(id_log[i][0]);
		    var html_name = "Name: " + getFullName(id_log[i][1]);
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][2]);





		    document.getElementById("id-saved-1").innerHTML = html_id;
		    document.getElementById("name-saved-1").innerHTML = html_name;
		    document.getElementById("idolized-saved-1").innerHTML = html_idol;
		} else if(but_id == 'waifu_save_but_2'){


			var i = globalIndex;



			document.getElementById("waifu_load_but_2").disabled = false;
	        $('waifu_load_but_2').prop('disabled', false); 


			var id = parseInt(id_log[i][0]);
			var name = id_log[i][1];
			var idolized = id_log[i][2];


			var html_id = "ID: " + parseInt(id_log[i][0]);
		    var html_name = "Name: " + getFullName(id_log[i][1]);
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][2]);



		    document.getElementById("id-saved-2").innerHTML = html_id;
		    document.getElementById("name-saved-2").innerHTML = html_name;
		    document.getElementById("idolized-saved-2").innerHTML = html_idol;

		} else if(but_id == 'waifu_save_but_3'){

			
			var i = globalIndex;



			document.getElementById("waifu_load_but_3").disabled = false;
	        $('waifu_load_but_3').prop('disabled', false); 


			var id = parseInt(id_log[i][0]);
			var name = id_log[i][1];
			var idolized = id_log[i][2];


			var html_id = "ID: " + parseInt(id_log[i][0]);
		    var html_name = "Name: " + getFullName(id_log[i][1]);
		    var html_idol = "Idolized: " + capitalizeFirstLetter(id_log[i][2]);


		    document.getElementById("id-saved-3").innerHTML = html_id;
		    document.getElementById("name-saved-3").innerHTML = html_name;
		    document.getElementById("idolized-saved-3").innerHTML = html_idol;

		} 
	}

	function homeClick() {
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
		} else if(clicked_id == 'eng_but'){
			document.getElementById("eng_but").src="images/buttons/english-icon-hover.png";
		} else if(clicked_id == 'jap_but'){
			document.getElementById("jap_but").src="images/buttons/japanese-icon-hover.png";
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
		} else if(clicked_id == 'eng_but'){
			
			if(langauge =='english'){
				document.getElementById("eng_but").src="images/buttons/english-icon-hover.png";
			} else {
				document.getElementById("eng_but").src="images/buttons/english-icon.png";
			}

		} else if(clicked_id == 'jap_but'){

			if(language == 'japanese'){
				document.getElementById("jap_but").src="images/buttons/japanese-icon-hover.png";
			} else {
				document.getElementById("jap_but").src="images/buttons/japanese-icon.png";
			}

			
		} 
	}



	function changeSpeechText (path, n) {
		
		var pathString;
		if(language == 'english'){
			pathString = "".concat("./", path, "speech-en.txt");
		} else if(language == 'japanese'){
			pathString = "".concat("./", path, "speech.txt");
		} else {
			alert('Something went wrong');
		}
		
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
		camera_audio.play();

		var backgroundpath = 'images/background/background' + background.toString() + '.png';

		printPhotoCanvas(backgroundpath);

	}



$(window).blur(function() { 
	away = true;

	jQuery(function ($) {
	    var time_final = 20;

	    if(away){
	    	tabTimer(time_final, 1);
	    }
	    
	});

});



$(window).focus(function() { 
	if(away){
		away = false;

	}
});



function tabTimer(duration, lock) {
    var timer = duration, minutes, seconds;
    var interval;
	interval = setInterval(function () {
	        minutes = parseInt(timer / 60, 10)
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;



	        if ((--timer < 0) && !away && lock == 1) {
	        	
	            var neg = forgetWaifuRNG(7);

				if(neg == -1 && !away && lock == 1){
					// If forget waifu speech was not successful
					
					if(lock == 1){
						lock = 0;
			    		commandSelect(0);
					}

			    	clearInterval(interval);

					return;
				}
	            return;
	        }


	       

	    }, 1000);

	   return;
	

}

function changeLanguage(lang_num)
{
	var prev_lang = language;

	if(lang_num == 0)
	{
		// English
		language = 'english';
		document.getElementById('language-tag').innerHTML = 'Current: English';

		if(prev_lang == 'english')
		{
			return;
		}

		document.getElementById("jap_but").src="images/buttons/japanese-icon.png";

	} else if (lang_num == 1){
		language = 'japanese';
		document.getElementById('language-tag').innerHTML = 'Current: Japanese';
		if(prev_lang == 'japanese')
		{
			return;
		}

		document.getElementById("eng_but").src="images/buttons/english-icon.png";
	}
	commandSelect(0);
}


