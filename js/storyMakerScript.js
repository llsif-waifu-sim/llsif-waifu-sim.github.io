var c = document.getElementById("story-canvas");
    
var ctx = c.getContext("2d");

//var speechbubble = document.getElementById("speech-text");

var urlAr = [];

var maxWidth = 420;
var remainder = maxWidth;
var letterWidth = ctx.measureText('W').width;  // gets the length of a single letter
var maxWidthChar = Math.floor(maxWidth/letterWidth);

var mainTxt = "";
var storyBackground = 0;
var sceneNum = 1;

var currentSpeaker = 'none';

var storyMainSelect1 = 0;
var storyMainSelectId1 = -1;
var storyMainSelectName1 = "";
var storyMainSelectIdolized1 = 0;

var storyMainSelect2 = 0;
var storyMainSelectId2 = -1;
var storyMainSelectName2 = "";
var storyMainSelectIdolized2 = 0;

var storyMainSelect3 = 0;
var storyMainSelectId3 = -1;
var storyMainSelectName3 = "";
var storyMainSelectIdolized3 = 0;

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


function storeSceneCookie()
{
	setCookie("sceneMaker_wallpaper-".concat(sceneNum), storyBackground, cookieExpireDate);
	setCookie("sceneMaker_speechText-".concat(sceneNum), document.getElementById('edit_text_box').innerHTML, cookieExpireDate);



    setCookie("sceneMaker_idol_left-".concat(sceneNum), document.getElementById('waifuStoryOption1').value, cookieExpireDate);
    setCookie("sceneMaker_costume_left-".concat(sceneNum), document.getElementById('waifuStoryCostumeOption1').value, cookieExpireDate);
    setCookie("sceneMaker_emotion_left-".concat(sceneNum), document.getElementById('waifuStoryMoodOption1').value, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_left-".concat(sceneNum), storyMainSelect1, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_id_left-".concat(sceneNum), storyMainSelectId1, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_name_left-".concat(sceneNum), storyMainSelectName1, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_idolized_left-".concat(sceneNum),storyMainSelectIdolized1 , cookieExpireDate);

    setCookie("sceneMaker_idol_center-".concat(sceneNum), document.getElementById('waifuStoryOption2').value, cookieExpireDate);
    setCookie("sceneMaker_costume_center-".concat(sceneNum), document.getElementById('waifuStoryCostumeOption2').value, cookieExpireDate);
    setCookie("sceneMaker_emotion_center-".concat(sceneNum), document.getElementById('waifuStoryMoodOption2').value, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_center-".concat(sceneNum), storyMainSelect2, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_id_center-".concat(sceneNum), storyMainSelectId2, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_name_center-".concat(sceneNum), storyMainSelectName2, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_idolized_center-".concat(sceneNum),storyMainSelectIdolized2 , cookieExpireDate);

    setCookie("sceneMaker_idol_right-".concat(sceneNum), document.getElementById('waifuStoryOption3').value, cookieExpireDate);
    setCookie("sceneMaker_costume_right-".concat(sceneNum), document.getElementById('waifuStoryCostumeOption3').value, cookieExpireDate);
    setCookie("sceneMaker_emotion_right-".concat(sceneNum), document.getElementById('waifuStoryMoodOption3').value, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_right-".concat(sceneNum), storyMainSelect3, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_id_right-".concat(sceneNum), storyMainSelectId3, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_name_right-".concat(sceneNum), storyMainSelectName3, cookieExpireDate);
    setCookie("sceneMaker_storyMainIdolSelect_idolized_right-".concat(sceneNum),storyMainSelectIdolized3 , cookieExpireDate);


    setCookie("sceneMaker_speaker-".concat(sceneNum), document.getElementById('story-speaker-select').value, cookieExpireDate);

    alert('Scene was saved successfully!');
}

function loadSceneCookie()
{
	var scrapePath = "./stories/images/";

	
	var wallCookie = getCookie("sceneMaker_wallpaper-1");
	if(wallCookie != null && wallCookie != "" && !isNaN(wallCookie))
	{
		storyBackground = getCookie("sceneMaker_wallpaper-1");
		document.getElementById("homeScreenStory").src = 'images/background/background' + storyBackground.toString() + '.png';
	}

	var speaker = getCookie('sceneMaker_speaker-1');
	document.getElementById('story-speaker-select').value = speaker;
	document.getElementById('edit_text_box').innerHTML = getCookie("sceneMaker_speechText-1");
	document.getElementById("story-textfield").value = document.getElementById('edit_text_box').innerHTML;


	// Left idol
	var name = getCookie("sceneMaker_idol_left-1");

	if(name!= null && name != "")
	{
		var num1 = getCookie("sceneMaker_costume_left-1");
		var num2 = getCookie("sceneMaker_emotion_left-1");

		var selectMode = getCookie("sceneMaker_storyMainIdolSelect_left-1");

		document.getElementById('waifuStoryOption1').value = name;
		refreshStoryCostumeMoodOptions(1, 0);
		document.getElementById('waifuStoryCostumeOption1').value = num1;
		refreshStoryCostumeMoodOptions(1, 1);
		document.getElementById('waifuStoryMoodOption1').value = num2;

		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";

		


		// To load different modes based on cookies
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_left").src = path;
			// To assign name as speaker
			if(speaker == 'left'){
				document.getElementById('edit_speaker_box').innerHTML = name;
			}


		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-left").value = getCookie("sceneMaker_storyMainIdolSelect_id_left-1");

			if(speaker == 'left'){
				document.getElementById('edit_speaker_box').innerHTML = getCookie('sceneMaker_storyMainIdolSelect_name_left-1');
			}
			 

			var idolized = getCookie('sceneMaker_storyMainIdolSelect_idolized_left-1');
			if(idolized == 'no'){
				document.getElementById('radio-idol-switch-no-left').checked = true;
			} else{
				document.getElementById('radio-idol-switch-yes-left').checked = true;
			}
			searchIdStory('left');
		}
				
	} else {
		loadStoryCostumeMoodOptions(1, 'umi');

	}


	// Middle idol
	var name = getCookie("sceneMaker_idol_center-1");

	if(name!= null && name != "")
	{
		var num1 = getCookie("sceneMaker_costume_center-1");
		var num2 = getCookie("sceneMaker_emotion_center-1");

		var selectMode = getCookie("sceneMaker_storyMainIdolSelect_center-1");

		document.getElementById('waifuStoryOption2').value = name;
		refreshStoryCostumeMoodOptions(2, 0);
		document.getElementById('waifuStoryCostumeOption2').value = num1;
		refreshStoryCostumeMoodOptions(2, 1);
		document.getElementById('waifuStoryMoodOption2').value = num2;

		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";


		
		
		// Select mode based on cookie
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_center").src = path;
			// To assign name as speaker
			if(speaker == 'center'){
				document.getElementById('edit_speaker_box').innerHTML = name;
			}

		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-center").value = getCookie("sceneMaker_storyMainIdolSelect_id_center-1");
			var idolized = getCookie('sceneMaker_storyMainIdolSelect_idolized_center-1');

			if(speaker == 'center'){
				document.getElementById('edit_speaker_box').innerHTML = getCookie('sceneMaker_storyMainIdolSelect_name_center-1');
			}

			if(idolized == 'no'){
				document.getElementById('radio-idol-switch-no-center').checked = true;

			} else{
				document.getElementById('radio-idol-switch-yes-center').checked = true;

			}
			searchIdStory('center');

		}
		
	} else {
		loadStoryCostumeMoodOptions(2, 'honoka');
	}


	// Right idol

	var name = getCookie("sceneMaker_idol_right-1");
	if(name!= null && name != "")
	{	
		var num1 = getCookie("sceneMaker_costume_right-1");
		var num2 = getCookie("sceneMaker_emotion_right-1");

		var selectMode = getCookie("sceneMaker_storyMainIdolSelect_right-1");

		document.getElementById('waifuStoryOption3').value = name;
		refreshStoryCostumeMoodOptions(3, 0);
		document.getElementById('waifuStoryCostumeOption3').value = num1;
		refreshStoryCostumeMoodOptions(3, 1);
		document.getElementById('waifuStoryMoodOption3').value = num2;


		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";


		// To assign name as speaker
		

		// Assign name based on cookie		
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_right").src = path;

			if(speaker == 'right'){
				document.getElementById('edit_speaker_box').innerHTML = name;
			}

		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-right").value = getCookie("sceneMaker_storyMainIdolSelect_id_right-1");
			var idolized = getCookie('sceneMaker_storyMainIdolSelect_idolized_right-1');

			if(speaker == 'right'){
				document.getElementById('edit_speaker_box').innerHTML = getCookie('sceneMaker_storyMainIdolSelect_name_right-1');
			}


			if(idolized == 'no'){
				document.getElementById('radio-idol-switch-no-right').checked = true;
			} else{
				document.getElementById('radio-idol-switch-yes-right').checked = true;
			}
			searchIdStory('right');
		}
		
	} else {
		loadStoryCostumeMoodOptions(3, 'kotori');
	}


	//alert('Finished loading cookies')
}


function changeBackgroundStory()
{	
	if(storyBackground < maxNumBackground-1)
	{
		storyBackground = storyBackground + 1;
	}else {
		storyBackground = 0;
	}

	var backpath = 'images/background/background' + storyBackground.toString() + '.png';
	
	document.getElementById("homeScreenStory").src=backpath;
	
}

function changeBackgroundStoryBack()
{

	if(storyBackground <= 0)
	{
		storyBackground = maxNumBackground-1;
		
	}else {
		storyBackground = storyBackground - 1;
	}

	var backpath = 'images/background/background' + storyBackground.toString() + '.png';

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
	//addSpeakerText();
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

function speakerResize()
{
	var idolSelect = document.getElementById('story-speaker-select').value;
	currentSpeaker = idolSelect;

	if(idolSelect=='left'){
		document.getElementById('idol_img_left').style.maxHeight = "810px";
		document.getElementById('idol_img_left').style.left = "-15.5%";



		document.getElementById('idol_img_center').style.maxHeight = "770px";
		document.getElementById('idol_img_center').style.left = "20%";
		document.getElementById('idol_img_right').style.maxHeight = "770px";
		document.getElementById('idol_img_right').style.left = "50%";

		if(storyMainSelect1 == 0){
			document.getElementById('edit_speaker_box').innerHTML = document.getElementById('waifuStoryOption1').value;
		} else {
			document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(storyMainSelectName1);
		}
		

	} else if(idolSelect == 'center'){
		document.getElementById('idol_img_center').style.maxHeight = "810px";
		document.getElementById('idol_img_center').style.left = "18%";


		document.getElementById('idol_img_left').style.maxHeight = "770px";
		document.getElementById('idol_img_left').style.left = "-13.5%";
		document.getElementById('idol_img_right').style.maxHeight = "770px";
		document.getElementById('idol_img_right').style.left = "50%";

		
		if(storyMainSelect2 == 0){
			document.getElementById('edit_speaker_box').innerHTML = document.getElementById('waifuStoryOption2').value;
		} else {
			document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(storyMainSelectName2);
		}

	} else if(idolSelect == 'right'){
		document.getElementById('idol_img_right').style.maxHeight = "810px";
		document.getElementById('idol_img_right').style.left = "48%";



		document.getElementById('idol_img_left').style.maxHeight = "770px";
		document.getElementById('idol_img_left').style.left = "-13.5%";
		document.getElementById('idol_img_center').style.maxHeight = "770px";
		document.getElementById('idol_img_center').style.left = "20%";

		
		if(storyMainSelect3 == 0){
			document.getElementById('edit_speaker_box').innerHTML = document.getElementById('waifuStoryOption3').value;
		} else {
			document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(storyMainSelectName3);
		}
	} else {

		document.getElementById('idol_img_left').style.maxHeight = "770px";
		document.getElementById('idol_img_left').style.left = "-13.5%";
		document.getElementById('idol_img_center').style.maxHeight = "770px";
		document.getElementById('idol_img_center').style.left = "20%";
		document.getElementById('idol_img_right').style.maxHeight = "770px";
		document.getElementById('idol_img_right').style.left = "50%";

		if(idolSelect == '???'){
			document.getElementById('edit_speaker_box').innerHTML = "???";
		} else {
			document.getElementById('edit_speaker_box').innerHTML = "";
		}
		
	}
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
	
	// If statement for cookie variables
	if(optionNum == 1){
		storyMainSelect1 = 0;
	} else if(optionNum == 2){
		storyMainSelect2 = 0;
	} else if(optionNum == 3){
		storyMainSelect3 = 0;
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

			    costumeSelectedInt = $(costumeStr).val();
			} 
		}

		// For adding mood options
		if(costumeSelectedInt == newArray[j][1])
		{
			
			//alert(newArray[j]);
			var x = document.getElementById(moodPath);
			var option = document.createElement("option");
			option.text = newArray[j][2];
			x.add(option);

			moodLastInt = newArray[j][2];
		}

	}
	speakerResize();
}


function searchIdStoryMain(type)
{
	var scrapePath = "./stories/images/";

	var optionInt;
	if(type == 'center'){
		optionInt = 2;
		storyMainSelect2 = 0;
	} else if(type == 'right'){
		optionInt = 3;
		storyMainSelect3 = 0;
	} else if(type == 'left'){
		optionInt = 1;
		storyMainSelect1 = 0;
	}


	var namePath = "waifuStoryOption" + optionInt;
	var costumePath = "waifuStoryCostumeOption" + optionInt;
	var moodPath = "waifuStoryMoodOption" + optionInt;

	var name = document.getElementById(namePath).value;
	var num1 = document.getElementById(costumePath).value;
	var num2 = document.getElementById(moodPath).value;

	// To determine speaker
	if(currentSpeaker == 'left' && type == 'left'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'center' && type == 'center'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'right' && type == 'right'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	}	
	

	path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";	

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
	var name = "";

	if(type == 'center'){
	    id = document.getElementById("card_id-center").value;
		idolized = $('input[name="optionsRadios-center"]:checked').val();
		storyMainSelectIdolized2 = idolized;
		// For storing cookie
		storyMainSelect2 = 1;
		storyMainSelectId2 = id;

		name = searchNameById(id);
		storyMainSelectName2 = name;

	} else if(type == 'right'){
	    id = document.getElementById("card_id-right").value;
		idolized = $('input[name="optionsRadios-right"]:checked').val();
		storyMainSelectIdolized3 = idolized;

		// For storing cookie
		storyMainSelect3 = 1;
		storyMainSelectId3 = id;

		name = searchNameById(id);
		storyMainSelectName3 = name;



	} else if(type == 'left'){
	    id = document.getElementById("card_id-left").value;
		idolized = $('input[name="optionsRadios-left"]:checked').val();
		storyMainSelectIdolized1 = idolized;
		
		// For storing cookie
		storyMainSelect1 = 1;
		storyMainSelectId1 = id;

		name = searchNameById(id);
		storyMainSelectName1 = name;

	} else {
	    alert('We encountered an error here');
	}

	// To update speaker text
	if(currentSpeaker == 'left' && type == 'left'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'center' && type == 'center'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'right' && type == 'right'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	}
	
	//var idolized = 'no';

	if(!isInt(id) || parseInt(id) > maxNumOfCard){
		alert('Invalid id input');
		//alert('Invalid id input. Please enter a number between 28 and ' + maxNumOfCard.toString());
		return;
	} 
	
	

	

	// Once we get the info, get the image
	var path;

	var scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/";
	
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

function saveCurrentScene()
{
	storeSceneCookie();
}

function constructGIF()
{
	gifshot.createGIF({
		images: urlAr,
		'interval': 1,
	}, function (obj) {
			
		if (!obj.error) {
		    var image = obj.image, animatedImage = document.createElement('img');
		    animatedImage.src = image;
		    document.body.appendChild(animatedImage);
		}
	});
}


function uploadImageImgur()
{
	try {
	    var img = document.getElementById('story-canvas').toDataURL('image/jpeg', 0.9).split(',')[1];
	} catch(e) {
	    var img = document.getElementById('story-canvas').toDataURL().split(',')[1];
	}

	$.ajax({
	    url: 'https://api.imgur.com/3/image',
	    type: 'post',
	    headers: {
	        Authorization: 'Client-ID c2be6e0eb80a4fe'
	    },
	    data: {
	        image: img
	    },
	    dataType: 'json',
	    success: function(response) {
	        if(response.success) {

	        	urlAr.push(response.data.link);

	        	alert(urlAr);
	        	constructGIF();
	        	alert('Done');
	            //window.location = response.data.link;
	        }
	    }
	});
}



function printStoryCanvas(){

	var mainTxt = document.getElementById('edit_text_box').innerHTML;
	var speakerTxt = document.getElementById('edit_speaker_box').innerHTML;

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


	var imageWaifuLeftX = -150;
	var imageWaifuLeftY = -70;

	var imageWaifuCenterX = 220;
	var imageWaifuCenterY = -70;
	
	var imageWaifuRightX = 580;
	var imageWaifuRightY = -70;


	var speaker = document.getElementById('story-speaker-select').value;
	if(speaker == 'left')
	{
		imageWaifuLeftX = imageWaifuLeftX - 22;
		imageWaifuLeftY = imageWaifuLeftY - 20;
	} else if(speaker == 'center'){
		imageWaifuCenterX = imageWaifuCenterX - 22;
		imageWaifuCenterY = imageWaifuCenterY - 20;
	} else if(speaker == 'right'){
		imageWaifuRightX = imageWaifuRightX - 22;
		imageWaifuRightY = imageWaifuRightY - 20;
	}

    ctx.drawImage(img, 0, 0, img.width,img.height);    
    ctx.drawImage(imgwaifuLeft, imageWaifuLeftX, imageWaifuLeftY, imgwaifuLeft.width, imgwaifuLeft.height);
    ctx.drawImage(imgwaifuCenter, imageWaifuCenterX, imageWaifuCenterY , imgwaifuCenter.width, imgwaifuCenter.height);
    ctx.drawImage(imgwaifuRight, imageWaifuRightX, imageWaifuRightY, imgwaifuRight.width, imgwaifuRight.height);

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


	uploadImageImgur();

}


function sceneMakerInitalization()
{
	loadStoryOptions();
	loadSceneCookie();
	speakerResize();
}

// Loading functions
sceneMakerInitalization();
