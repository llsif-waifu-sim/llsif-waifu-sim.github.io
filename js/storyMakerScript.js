var c = document.getElementById("story-canvas");
    
var ctx = c.getContext("2d");

//var speechbubble = document.getElementById("speech-text");

var maxWidth = 420;
var remainder = maxWidth;
var letterWidth = ctx.measureText('W').width;  // gets the length of a single letter
var maxWidthChar = Math.floor(maxWidth/letterWidth);

var mainTxt = "";
function getStoryWaifuAr(name)
{
	var newArray = [];

	if(name == 'ruby')
	{
		for (var i = 0; i < rubyStoryAr.length; i++){
		    newArray[i] = rubyStoryAr[i].slice();
		}
	} else if(name== 'hanamaru'){
		for (var i = 0; i < hanamaruStoryAr.length; i++){
		    newArray[i] = hanamaruStoryAr[i].slice();
		}
	} else if(name== 'yoshiko'){
		for (var i = 0; i < yoshikoStoryAr.length; i++){
		    newArray[i] = yoshikoStoryAr[i].slice();
		}
	} else if(name== 'chika'){
		for (var i = 0; i < chikaStoryAr.length; i++){
		    newArray[i] = chikaStoryAr[i].slice();
		}
	} else if(name== 'you'){
		for (var i = 0; i < youStoryAr.length; i++){
		    newArray[i] = youStoryAr[i].slice();
		}
	} else if(name== 'riko'){
		for (var i = 0; i < rikoStoryAr.length; i++){
		    newArray[i] = rikoStoryAr[i].slice();
		}
	} else if(name== 'dia'){
		for (var i = 0; i < diaStoryAr.length; i++){
		    newArray[i] = diaStoryAr[i].slice();
		}
	} else if(name== 'mari'){
		for (var i = 0; i < mariStoryAr.length; i++){
		    newArray[i] = mariStoryAr[i].slice();
		}
	} else if(name== 'kanan'){
		for (var i = 0; i < kananStoryAr.length; i++){
		    newArray[i] = kananStoryAr[i].slice();
		}

	} else if(name== 'hanayo'){
		for (var i = 0; i < hanayoStoryAr.length; i++){
		    newArray[i] = hanayoStoryAr[i].slice();
		}
	} else if(name== 'maki'){
		for (var i = 0; i < makiStoryAr.length; i++){
		    newArray[i] = makiStoryAr[i].slice();
		}
	} else if(name== 'rin'){
		for (var i = 0; i < rinStoryAr.length; i++){
		    newArray[i] = rinStoryAr[i].slice();
		}
	} else if(name== 'honoka'){
		for (var i = 0; i < honokaStoryAr.length; i++){
		    newArray[i] = honokaStoryAr[i].slice();
		}
	} else if(name== 'umi'){
		for (var i = 0; i < umiStoryAr.length; i++){
		    newArray[i] = umiStoryAr[i].slice();
		}
	} else if(name== 'kotori'){
		for (var i = 0; i < kotoriStoryAr.length; i++){
		    newArray[i] = kotoriStoryAr[i].slice();
		}
	} else if(name== 'eli'){
		for (var i = 0; i < eliStoryAr.length; i++){
		    newArray[i] = eliStoryAr[i].slice();
		}
	} else if(name== 'nico'){
		for (var i = 0; i < nicoStoryAr.length; i++){
		    newArray[i] = nicoStoryAr[i].slice();
		}
	} else if(name== 'nozomi'){
		for (var i = 0; i < nozomiStoryAr.length; i++){
		    newArray[i] = nozomiStoryAr[i].slice();
		}
	


	} else {
		alert('getWaifuAr() has failed');
		return null;
	} 



	return newArray;
}


function changeBackgroundStory()
{	
	if(background < maxNumBackground-1)
	{
		background = background + 1;
	}else {
		background = 0;
	}
	storeBackgroundCookie(background);

	var backpath = 'images/background/background' + background.toString() + '.png';
	
	document.getElementById("homeScreenStory").src=backpath;
	
}

function changeBackgroundStoryBack()
{

	if(background <= 0)
	{
		background = maxNumBackground-1;
		
	}else {
		background = background - 1;
	}
	storeBackgroundCookie(background);

	var backpath = 'images/background/background' + background.toString() + '.png';

	document.getElementById("homeScreenStory").src=backpath;
	
}


function show (toBlock){
  setDisplay(toBlock, 'block');
}
function hide (toNone) {
  setDisplay(toNone, 'none');
}
function setDisplay (target, str) {
  document.getElementById(target).style.display = str;
}

function addStoryAndSpeakerText()
{
	addStoryText();
	addSpeakerText();
}

function addStoryText()
{
	document.getElementById('edit_text_box').innerHTML = document.getElementById("story-textfield").value;
}

function addSpeakerText()
{
	document.getElementById('edit_speaker_box').innerHTML = document.getElementById("story-speaker-textfield").value;
}

// FOR INITALIZATION ONLY
function loadStoryOptions()
{
	for(var i=1; i <= 3; i++){

	    var path = "waifuStoryOption" + i;
	    	
		    
		for(var j=0; j < mainStoryWaifuSelectionAR.length; j++)
		{
		   	var x = document.getElementById(path);
		    var option = document.createElement("option");
		    option.text = capitalizeFirstLetter(mainStoryWaifuSelectionAR[j]);




		    x.add(option);
		}

	}

	document.getElementById('waifuStoryOption1').selectedIndex = 2;
	document.getElementById('waifuStoryOption2').selectedIndex = 0;
	document.getElementById('waifuStoryOption3').selectedIndex = 1;


	
	
}

// FOR INITALIZATION ONLY
function loadStoryCostumeMoodOptions(optionNum, name)
{
	var newArray = [];

	newArray = getStoryWaifuAr(name)


	var scrapePath = "./stories/images/";
	var costumePath = "waifuStoryCostumeOption" + optionNum;
	var moodPath = "waifuStoryMoodOption" + optionNum;

	var costumeSelectedInt = 1;
	var moodSelectedInt = 1;


	var costumeLastInt = " ";
	var moodLastInt = " ";
	for(var j=0; j < newArray.length; j++)
	{
		// Costume option
		if(newArray[j][1] != costumeLastInt){
		   	var x = document.getElementById(costumePath);
		    var option = document.createElement("option");
		    option.text = newArray[j][1];
		    x.add(option);

		    costumeLastInt = newArray[j][1];

		} 

		// For adding mood options
		if(newArray[j][1] == costumeSelectedInt)
		{
			var x = document.getElementById(moodPath);
			var option = document.createElement("option");
			option.text = newArray[j][2];
			x.add(option);

			moodLastInt = newArray[j][2];
		}
	}
}

function purgeOptions()
{
	$('#mySelect')
    .find('option')
    .remove()
    .end()
    .append('<option value="whatever">text</option>')
    .val('whatever');
}


function refreshStoryCostumeMoodOptions(optionNum, changeNum)
{
	var newArray = [];

	var waifuOptionPath = "waifuStoryOption" + optionNum;

	var waifuOption = document.getElementById(waifuOptionPath);
	
	var name = waifuOption.options[waifuOption.selectedIndex].text.toLowerCase();
	var costumeStr = 'select[id=waifuStoryCostumeOption' + optionNum + ']';
	var moodStr = 'select[id=waifuStoryMoodOption' + optionNum + ']';

	var costumeSelectedInt = $(costumeStr).val();
	var moodSelectedInt = $(moodStr).val();



	newArray = getStoryWaifuAr(name);


	var scrapePath = "./stories/images/";
	var costumePath = "waifuStoryCostumeOption" + optionNum;
	var moodPath = "waifuStoryMoodOption" + optionNum;

	


	var costumeLastInt = " ";
	var moodLastInt = " ";


	var hashCostume = "#" + costumePath;
	var hashMood = "#" + moodPath;

	if(changeNum == 0){
		$(hashCostume).find('option').remove();
		$(hashMood).find('option').remove();
	} else if(changeNum == 1){
		$(hashMood).find('option').remove();
	}
	


	for(var j=0; j < newArray.length; j++)
	{
		// Costume option
		if(changeNum == 0){
			if(newArray[j][1] != costumeLastInt){
			   	var x = document.getElementById(costumePath);
			    var option = document.createElement("option");
			    option.text = newArray[j][1];
			    x.add(option);

			    costumeLastInt = newArray[j][1];

			} 
		}

		// For adding mood options
		if(costumeSelectedInt == newArray[j][1])
		{
			var x = document.getElementById(moodPath);
			var option = document.createElement("option");
			option.text = newArray[j][2];
			x.add(option);

			moodLastInt = newArray[j][2];
		}

	}
}


function searchIdStoryMain(type)
{
	var scrapePath = "./stories/images/";

	var optionInt;
	if(type == 'center'){
		optionInt = 2;
	} else if(type == 'right'){
		optionInt = 3;
	} else if(type == 'left'){
		optionInt = 1;
	}


	var namePath = "waifuStoryOption" + optionInt;
	var costumePath = "waifuStoryCostumeOption" + optionInt;
	var moodPath = "waifuStoryMoodOption" + optionInt;

	var name = document.getElementById(namePath).value;
	var num1 = document.getElementById(costumePath).value;
	var num2 = document.getElementById(moodPath).value;


	path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png"

	

	if(type == 'center'){
	    document.getElementById("idol_img_center").src=path;
	} else if(type == 'right'){
	    document.getElementById("idol_img_right").src=path;
	} else if(type == 'left'){
	    document.getElementById("idol_img_left").src=path;
	} else {
	    alert('We encountered an error here');
	}
}



function searchIdStory(type)
{
	var id;
	var idolized;

	if(type == 'center'){
	    id = document.getElementById("card_id-center").value;
		idolized = $('input[id="radio-idol-switch-center"]:checked').val();

	} else if(type == 'right'){
	    id = document.getElementById("card_id-right").value;
		idolized = $('input[id="radio-idol-switch-right"]:checked').val();
	} else if(type == 'left'){
	    id = document.getElementById("card_id-left").value;
		idolized = $('input[id="radio-idol-switch-left"]:checked').val();
	} else {
	    alert('We encountered an error here');
	}


	
	//var idolized = 'no';

	if(!isInt(id) || parseInt(id) > maxNumOfCard){
		alert('Invalid id input');
		//alert('Invalid id input. Please enter a number between 28 and ' + maxNumOfCard.toString());
		return;
	} 
	
	var name = searchNameById(id);

	

	// Once we get the info, get the image
	var path;

	var scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/llsif-waifu-girl-images/scraped-images/";
	
	if(isOthers(name)){
		scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
	} 

	
	// If talking about Muse & Aqours
	if(idolized == 'yes')
	{
		path = scrapePath + name + "/" + id + "_id.png";
	}else{
		path = scrapePath + name +  "/" + id + ".png";
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

	        if(type == 'center'){
	        	document.getElementById("idol_img_center").src=path;
	        } else if(type == 'right'){
	        	document.getElementById("idol_img_right").src=path;
	        } else if(type == 'left'){
	        	document.getElementById("idol_img_left").src=path;
	        } else {
	        	alert('We encountered an error here');
	        }
	        

			nameAssign(name);

			globalIndex = searchIndexById(id, idolized);

			if (globalAudio!=null){
				globalAudio.pause();
			}

			var index = parseInt(searchIndexById(id, idolized));
			storeCookie(index);

			setTimeout(function() {
				commandSelect(0);
			}, 500, true)
			  }



		});

		

}

function reconstruct(arr, last)
{
	var sentence = "";
	var i = 0;

	if(!last)
	{
		arr.pop();	
	}
	
	for(var value = ""; value = arr.pop();)
	{
		sentence = (" ".concat(value)).concat(sentence);	
	}

	return sentence;
}

// This script is to mainly construct text on a computer
function addText(ctx, txt, mainTxt)
{
	ctx.fillStyle = 'white';

	if(ctx.measureText(txt).width >= maxWidth)
	{
		// That means the text width is zero   

		var rowPosition = 530;
		var incrementRowVal = 35; // Increment 

		while(true)
		{
			if(txt.length <= 0)
			{
				break;
			}

			var last = true;
			if(ctx.measureText(txt).width >= maxWidth)
		    {
		    	last = false;
		    } 

			var remainderTxt = txt.substring(0, maxWidthChar*2);

		    var splitArray = remainderTxt.split(" ");

		    
		    var temp = reconstruct(splitArray, last);

		    ctx.fillText(temp, 68, rowPosition);	
		    rowPosition = rowPosition + incrementRowVal;

		    txt = txt.substring(temp.length, txt.length);

		}


	} else {
		ctx.fillText(txt, 105, 540);	
	}

}


function printStoryCanvas(){

	var mainTxt = document.getElementById("story-textfield").value;
	var speakerTxt = document.getElementById("story-speaker-textfield").value;

	mainTxt = mainTxt.concat(" ");

	var c = document.getElementById("story-canvas");
    
	var ctx = c.getContext("2d");

	var img = document.getElementById("homeScreenStory");
	var imgwaifuLeft = document.getElementById("idol_img_left");
	var imgwaifuCenter = document.getElementById("idol_img_center");
	var imgwaifuRight = document.getElementById("idol_img_right");
	var speechbox = document.getElementById("temp_text_box_img");
	var speakerbox = document.getElementById("story_speaker_img");

    c.width  = img.width; // in pixels
	c.height = img.height;


    ctx.drawImage(img, 0, 0, img.width,img.height);    
    ctx.drawImage(imgwaifuLeft, -150, -70, imgwaifuLeft.width, imgwaifuLeft.height);
    ctx.drawImage(imgwaifuCenter, 220, -70, imgwaifuCenter.width, imgwaifuCenter.height);
    ctx.drawImage(imgwaifuRight, 580, -70, imgwaifuRight.width, imgwaifuRight.height);

    ctx.globalAlpha = 0.7;
   
   ctx.drawImage(speakerbox, 65, 430, speakerbox.width, speakerbox.height);
    ctx.drawImage(speechbox, 65, 490, speechbox.width, speechbox.height);

    ctx.globalAlpha = 1;

    // Preparing to write text
    ctx.font = "30px Arial";


	//var mainTxt = "I hope that a study of very long sentences will arm you with strategies that are almost as diverse as the sentences themselves, such as: starting each clause with the same word, tilting with dependent clauses toward a revelation at the end, padding with parentheticals, showing great latitude toward standard punctuation, rabbit-trailing away from the initial subject, encapsulating an entire life, and lastly, as this sentence is, celebrating the list."
	//var mainTxt = "Derp";
	var txt = mainTxt;


	addText(ctx, txt, mainTxt);

	// Speaker text
	ctx.fillText(speakerTxt, 78, 465);	

}
// Loading functions

loadStoryOptions();

loadStoryCostumeMoodOptions(1, 'umi');
loadStoryCostumeMoodOptions(2, 'honoka');
loadStoryCostumeMoodOptions(3, 'kotori');