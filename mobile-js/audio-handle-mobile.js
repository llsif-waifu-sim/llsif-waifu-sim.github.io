var globalAudio = null;
var globalWaifu = 'honoka';
var maxNumOfCard = id_log[id_log.length-1][0];
var language = 'english';
var background_playing = false;
var maxNumBackground = 105;


var away = false;
var timerRanOut = false;
var orientationMode = 'portrait'


function getCurrentOrientation()
{
	if(window.innerHeight > window.innerWidth){
	    orientationMode = 'portrait';
	    document.getElementById("speech-font").style.font = "9px arial";
	} else {
		orientationMode = 'landscape';
		document.getElementById("speech-font").style.font = "14px arial";
	}
}

$(window).bind("orientationchange", function(e){
   var ow = (e.orientation=="portrait" ? "p" : "l");
   if(ow == "p")
   {
   		orientationMode = 'portrait';
   		document.getElementById("speech-font").style.font = "9px arial";
   } else {
   		orientationMode = 'landscape';
   		document.getElementById("speech-font").style.font = "14px arial";
   }	
});




function isAqours(waifu)
{
	if(waifu == 'chika' || waifu == 'you' || waifu == 'riko' ||
		waifu == 'hanamaru' || waifu == 'yoshiko' || waifu == 'ruby' ||
		waifu == 'kanan' || waifu == 'mari' || waifu == 'dia'){

		return true;

	}else {
		return false;
	}
}

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
var countdown = 20000;

/* Commented out so that inactivity does not happen
$(document).on('mousemove', function(){

	clearTimeout(timeout);

	
	timeout = setTimeout(inactiveSpeech, countdown);

})
*/

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

function specialQuoteSpeech()
{
	// Activate special quote
	var audioPath = "special-quotes/"
	var id = id_log[globalIndex][0];

	var indexAr = searchQuoteIndexByID(id);

	var chosenIndex = indexAr[0];
	var maxIndex = indexAr[1]; 

	
	// If the card does not have a special quote
	if (chosenIndex == -1)
	{
		return -1;
	}

	
	var addValue = Math.floor(Math.random() * maxIndex);
	
	

	var filePath = "".concat(id,"-", addValue.toString());
	var superString = "".concat(audioPath, filePath, ".mp3");


	globalAudio = new Audio(superString);
    globalAudio.volume = voiceVolume;
    globalAudio.play();


    var fileIndex = chosenIndex  + addValue;
    var pathString = "".concat(audioPath);
    //alert(pathString);
    changeSpeechText(pathString, fileIndex);
    refreshBubble();

    return 0;
}


function forgotSpeech()
{
	
    var audioPath = "audio/";
    var waifuName = globalWaifu + "/";
    var file = 'forget/';

    $('#select-waifu').val(globalWaifu).selectmenu('refresh');

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
        $('#select-idol').val('yes').selectmenu('refresh');
    }else{
        path = "./scraped-images/" + name +  "/" + id + ".png";
        $('#select-idol').val('no').selectmenu('refresh');
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
	$.mobile.changePage('#updateModal');
	// Preform cookie checks
	checkCookie();
	checkBackgroundCookie();
	checkVolumeCookie();
	checkWaifuVoiceEnableCookie();
	checkLiveshowPlayerEnableCookie();
	checkBGMCookie();
	

    var backgroundAudio=document.getElementById("origin-music-player");
	backgroundAudio.volume= musicVolume;

    getCurrentOrientation();

    //commandSelect(0);
	
}

$(document).on("mobileinit", function(){


	$.mobile.changePage.defaults.changeHash = false;
});


function updateVolumeMusic(soundValue) {
    musicVolume = soundValue/100;
    storeVolumeMusicCookie(musicVolume);
    playBackgroundMusic();
    background_playing = true;
}

function updateVolumeVoice(soundValue) {
    voiceVolume = soundValue/100;
    storeVolumeVoiceCookie(voiceVolume);
    commandSelect(0);
}



function pauseBackgroundMusic()
{
	var audio = document.getElementById("origin-music-player"); // For the main background
	audio.pause();
	background_playing = false;
}

function playBackgroundMusic()
{
	var bgmusic = document.getElementById("select-bgmusic").value;

	var audio = document.getElementById("origin-music-player"); // For the main background
	var mainAudio = document.getElementById("background-music-player"); // For the music player
	mainAudio.pause();
	audio.pause();
	audio.volume = musicVolume;
	if(bgmusic == 0)
	{
		// Muse background music
		audio.src = 'audio/background-music.mp3';
	} else if(bgmusic == 1){
		audio.src = 'audio/background-music1.mp3';
	}
	audio.play();
	background_playing = true;
}


function changeBGMusic()
{
	var bgmusic = document.getElementById("select-bgmusic").value;
	var audio = document.getElementById("origin-music-player");

	audio.pause();

	if(bgmusic == 0)
	{
		// Muse background music
		audio.src = 'audio/background-music.mp3';
		storeBGMusicCookie('MU');
	} else if(bgmusic == 1){
		// Aqours background music
		audio.src = 'audio/background-music1.mp3';
		storeBGMusicCookie('AQ');

	}
	audio.play();
}


function changeBackground()
{
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


function getWaifuAr(name)
{
	var newArray = [];

	if(name == 'ruby')
	{
		for (var i = 0; i < ruby_ar.length; i++){
		    newArray[i] = ruby_ar[i].slice();
		}
	} else if(name== 'hanamaru'){
		for (var i = 0; i < hanamaru_ar.length; i++){
		    newArray[i] = hanamaru_ar[i].slice();
		}
	} else if(name== 'yoshiko'){
		for (var i = 0; i < yoshiko_ar.length; i++){
		    newArray[i] = yoshiko_ar[i].slice();
		}
	} else if(name== 'chika'){
		for (var i = 0; i < chika_ar.length; i++){
		    newArray[i] = chika_ar[i].slice();
		}
	} else if(name== 'you'){
		for (var i = 0; i < you_ar.length; i++){
		    newArray[i] = you_ar[i].slice();
		}
	} else if(name== 'riko'){
		for (var i = 0; i < riko_ar.length; i++){
		    newArray[i] = riko_ar[i].slice();
		}
	} else if(name== 'dia'){
		for (var i = 0; i < dia_ar.length; i++){
		    newArray[i] = dia_ar[i].slice();
		}
	} else if(name== 'mari'){
		for (var i = 0; i < mari_ar.length; i++){
		    newArray[i] = mari_ar[i].slice();
		}
	} else if(name== 'kanan'){
		for (var i = 0; i < kanan_ar.length; i++){
		    newArray[i] = kanan_ar[i].slice();
		}

	} else if(name== 'hanayo'){
		for (var i = 0; i < hanayo_ar.length; i++){
		    newArray[i] = hanayo_ar[i].slice();
		}
	} else if(name== 'maki'){
		for (var i = 0; i < maki_ar.length; i++){
		    newArray[i] = maki_ar[i].slice();
		}
	} else if(name== 'rin'){
		for (var i = 0; i < rin_ar.length; i++){
		    newArray[i] = rin_ar[i].slice();
		}
	} else if(name== 'honoka'){
		for (var i = 0; i < honoka_ar.length; i++){
		    newArray[i] = honoka_ar[i].slice();
		}
	} else if(name== 'umi'){
		for (var i = 0; i < umi_ar.length; i++){
		    newArray[i] = umi_ar[i].slice();
		}
	} else if(name== 'kotori'){
		for (var i = 0; i < kotori_ar.length; i++){
		    newArray[i] = kotori_ar[i].slice();
		}
	} else if(name== 'eli'){
		for (var i = 0; i < eli_ar.length; i++){
		    newArray[i] = eli_ar[i].slice();
		}
	} else if(name== 'nico'){
		for (var i = 0; i < nico_ar.length; i++){
		    newArray[i] = nico_ar[i].slice();
		}
	} else if(name== 'nozomi'){
		for (var i = 0; i < nozomi_ar.length; i++){
		    newArray[i] = nozomi_ar[i].slice();
		}
	


	} else if(name== 'tsubasa'){
		for (var i = 0; i < tsubasa_ar.length; i++){
		    newArray[i] = tsubasa_ar[i].slice();
		}
	} else if(name== 'anju'){
		for (var i = 0; i < anju_ar.length; i++){
		    newArray[i] = anju_ar[i].slice();
		}
	} else if(name== 'erena'){
		for (var i = 0; i < erena_ar.length; i++){
		    newArray[i] = erena_ar[i].slice();
		}

	} else {
		alert('getWaifuAr() has failed');
		return null;
	} 



	return newArray;
}


function cardRNG()
{
	var temp_ar = getWaifuAr(globalWaifu);

	var maxNum = temp_ar.length;
	var n = Math.floor(Math.random() * maxNum);
	
	var temp_index = n;
	var temp_id = temp_ar[temp_index][0];
	var temp_idolized = temp_ar[temp_index][2];



	// Get the index from the main id_log array
	return searchIndexById(temp_id, temp_idolized);

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

		$('#select-idol').val('yes').selectmenu('refresh');
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
		$('#select-idol').val('no').selectmenu('refresh');
		
	}
    //file exists
	document.getElementById("idol_img").src=path;

	nameAssign(name);
	$('#select-waifu').val(name).selectmenu('refresh');

	document.getElementById("card_id").value = id;

	if(orientationMode == 'landscape'){
		$('html, body').animate({
	    scrollTop: $('#container').offset().top
	  });
		
	}
	

	if (globalAudio!=null){
		globalAudio.pause();
	}	
	commandSelect(0);
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
		$('#select-idol').val('yes').selectmenu('refresh');
	}else{
		path = "./scraped-images/" + name +  "/" + id + ".png";
		$('#select-idol').val('no').selectmenu('refresh');
	}
    //file exists
	document.getElementById("idol_img").src=path;
	nameAssign(name);
	document.getElementById("card_id").value = id;

	if(orientationMode == 'landscape'){
		$('html, body').animate({
	    scrollTop: $('#container').offset().top
	  });
	}


	if (globalAudio!=null){
		globalAudio.pause();
	}
	commandSelect(0);
	storeCookie(i);
}

function checkOutOfBoundsQuoteIndex(id)
{
	var i = 0;
	while(true)
	{
		// Check if we are out of bounds of the entire array
		if(quote_id_log.length <= id + i){
			return i - 1;
		}

		if(quote_id_log[id + i] != quote_id_log[id])
		{
			// If we are out of bounds of our card id number

			return i - 1;
		}
		i++;
	}
}


function searchQuoteIndexByID(id)
{
	// Get the quote index 
	var i;
	for(i = 0; i < quote_id_log.length; i++)
	{
		if(quote_id_log[i] == id)
		{
			return [i, checkOutOfBoundsQuoteIndex(i)];
		}
	}
	return [-1,-1];
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
			if(idolized == 'yes' && ( id_log[i+1][0] == id.toString() )){
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
	var idolized = $(".select-idol option:selected").val();
	

	if(!isInt(id) || parseInt(id) > maxNumOfCard){
		alert('Invalid id input');
		//alert('Invalid id input. Please enter a number between 28 and ' + maxNumOfCard.toString());
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
			$('#select-waifu').val(name).selectmenu('refresh');

			globalIndex = searchIndexById(id, idolized);

			if(orientationMode == 'landscape'){
				$('html, body').animate({
			    scrollTop: $('#container').offset().top
			  });
			}

			if (globalAudio!=null){
				globalAudio.pause();
			}

			var index = parseInt(searchIndexById(id, idolized));
		storeCookie(index);

			commandSelect(0);
			
			  }
		});

		

}


function getIndexChangeWaifu(name)
{
	if(name=='hanayo'){
		return 14;
	}else if(name=='rin'){
		return 8;
	}else if(name=='maki'){
		return 10;
	}else if(name=='honoka'){
		return 0;
	}else if(name=='kotori'){
		return 4;
	}else if(name=='umi'){
		return 6;
	}else if(name=='eli'){
		return 2;
	}else if(name=='nozomi'){
		return 12;
	}else if(name=='nico'){
		return 16;
	}else if(name=='ruby'){
		return 794;
	}else if(name=='hanamaru'){
		return 792;
	}else if(name=='yoshiko'){
		return 791;
	}else if(name=='you'){
		return 790;
	}else if(name=='chika'){
		return 786;
	}else if(name=='riko'){
		return 787;
	}else if(name=='dia'){
		return 789;
	}else if(name=='mari'){
		return 793;
	}else if(name=='kanan'){
		return 788;
	} else {
		alert('Impossible state achieved in changeWaifu()');
		return -1;
	}

}


function changeWaifu(){

	var name = $(".select-waifu option:selected").val();

	var index = searchIndexById(getIndexChangeWaifu(name), 'no');

	var path = "images/waifu/" + name +"0.png";
	document.getElementById("idol_img").src=path;

	if(orientationMode == 'landscape'){
		$('html, body').animate({
	    scrollTop: $('#container').offset().top
	  });
	}

	globalIndex = index;

	nameAssign(name);

	if (globalAudio!=null){
			globalAudio.pause();
	}


	
    commandSelect(0);
	

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
			var maxNum = 17;
			n = Math.floor(Math.random() * maxNum);
			file = "home/";


			// Activate month speech
			if(n == maxNum - 1){
				seasonSpeech();
				return;
			}


			// Activate special quote
			if(n >= maxNum - 3){
				var errorCheck = -1;
				var errorCheck = specialQuoteSpeech();
				if(errorCheck == 0)
				{
					// If card had a quote, then we are done
					return;
				}
				// If not, recalculate random number generator
				maxNum = 15;
				n = Math.floor(Math.random() * maxNum);

				// Activate month speech
				if(n == maxNum - 1){
					seasonSpeech();
					return;
				}
				
				
				
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


		
		if(waifuVoiceEnable){
			var superString = "".concat(audioPath, waifuName, file, n, ".mp3");
			globalAudio = new Audio(superString);
			globalAudio.volume = voiceVolume;
			globalAudio.play();
		}

		var pathString = "".concat(audioPath, waifuName, file);

		changeSpeechText(pathString, n);
		refreshBubble();

	}

	function saveWaifu(but_id)
	{
		if(globalIndex == null || globalIndex == '' || isNaN(globalIndex)){
			globalIndex = 0;
		}
		
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
		} else if(clicked_id == 'liveshow_but'){
			document.getElementById("liveshow_but").src="images/buttons/liveshow-button-hover.png";


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
		} else if(clicked_id == 'liveshow_but'){
			document.getElementById("liveshow_but").src="images/buttons/liveshow-button.png";

		} else if(clicked_id == 'eng_but'){
			// If we hover out of the English button
			if(language == 'english'){
				document.getElementById("eng_but").src="images/buttons/english-icon-hover.png";
			} else {
				// The language is Japanese at the time we hovered out
				document.getElementById("eng_but").src="images/buttons/english-icon.png";
			}

		} else if(clicked_id == 'jap_but'){
			// If we hover out of the Japanese button
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


function countDown(n) {
    var seconds = n;
    var mins = 0;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 

        var current_minutes = mins-1
        seconds--;

        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            } else {
            	timerRanOut = true;
            	return;
            }
        }
    }
    if(away){
    	tick();
    }else {
    	return;
    }
    
}

function isPlaying(audelem) { 
	return !audelem.paused; 
}



// If we leave tab
$(window).blur(function() { 
	away = true;

	var audio = document.getElementById("origin-music-player"); // For the main background
	var mainAudio = document.getElementById("background-music-player"); // For the music player

	audio.pause();

	if(!liveshowBackground){
		mainAudio.pause();
	}


	

	//timerRanOut = false;
	//countDown(20);

});


// If we reenter tab
$(window).focus(function() { 


	if(away && background_playing){
		away = false;
		var audio = document.getElementById("origin-music-player");
		var mainAudio = document.getElementById("background-music-player"); 
		if(!isPlaying(mainAudio))
		{
			audio.play();
		} 
					

	}
});



function changeLanguage()
{

	
	var lang_num = $(".select-language option:selected").val();
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
