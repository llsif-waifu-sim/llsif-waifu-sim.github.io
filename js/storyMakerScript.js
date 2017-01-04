var c = document.getElementById("story-canvas");
    
var ctx = c.getContext("2d");

//var speechbubble = document.getElementById("speech-text");

var urlAr = [];

var maxWidth = 340;
var remainder = maxWidth;
var letterWidth = ctx.measureText('W').width;  // gets the length of a single letter
var maxWidthChar = Math.floor(maxWidth/letterWidth);

var mainTxt = "";
var storyBackground = 0;
var sceneNum = 1;
var maxNumOfScene = 1;
var maxLimitNumScene = 15;

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


// [[1,[img1,img2]],[2,[img1,img2,img3]],[3,[]], etc ]
var subImageAr = [];
var tempSubAr = [];


var intervalDivisor = 0.33333;
var intervalForGIF = 0;

var gifWidth = 600;
var gifHeight = 360;

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
	


	} else if(name== 'tsubasa'){
		for (var i = 0; i < tsubasaStoryAr.length; i++){
		    newArray[i] = tsubasaStoryAr[i].slice();
		}
	} else if(name== 'anju'){
		for (var i = 0; i < anjuStoryAr.length; i++){
		    newArray[i] = anjuStoryAr[i].slice();
		}
	} else if(name== 'erena'){
		for (var i = 0; i < erenaStoryAr.length; i++){
		    newArray[i] = erenaStoryAr[i].slice();
		}
	
	} else if(name== 'arisa'){
		for (var i = 0; i < arisaStoryAr.length; i++){
		    newArray[i] = arisaStoryAr[i].slice();
		}
	} else if(name== 'yukiho'){
		for (var i = 0; i < yukihoStoryAr.length; i++){
		    newArray[i] = yukihoStoryAr[i].slice();
		}
	


	} else if(name== 'cocoa'){
		for (var i = 0; i < cocoaStoryAr.length; i++){
		    newArray[i] = cocoaStoryAr[i].slice();
		}
	} else if(name== 'cocoro'){
		for (var i = 0; i < cocoroStoryAr.length; i++){
		    newArray[i] = cocoroStoryAr[i].slice();
		}
	} else if(name== 'cotaro'){
		for (var i = 0; i < cotaroStoryAr.length; i++){
		    newArray[i] = cotaroStoryAr[i].slice();
		}



	} else if(name== 'fumiko'){
		for (var i = 0; i < fumikoStoryAr.length; i++){
		    newArray[i] = fumikoStoryAr[i].slice();
		}
	} else if(name== 'mika'){
		for (var i = 0; i < mikaStoryAr.length; i++){
		    newArray[i] = mikaStoryAr[i].slice();
		}
	} else if(name== 'hideko'){
		for (var i = 0; i < hidekoStoryAr.length; i++){
		    newArray[i] = hidekoStoryAr[i].slice();
		}


	} else if(name== "honoka's mom"){
		for (var i = 0; i < honokaMomStoryAr.length; i++){
		    newArray[i] = honokaMomStoryAr[i].slice();
		}


	} else if(name== 'white alpaca'){
		for (var i = 0; i < alpacamStoryAr.length; i++){
		    newArray[i] = alpacamStoryAr[i].slice();
		}
	} else if(name== 'brown alpaca'){
		for (var i = 0; i < alpacafStoryAr.length; i++){
		    newArray[i] = alpacafStoryAr[i].slice();
		}
	} else if(name == '-------Nobody-------'){
		return;



	} else {
		alert('getWaifuAr() has failed');
		return null;
	} 

	return newArray;
}

function checkRollingTextRequirements()
{
	if(document.getElementById('radio-rollingText-switch-yes').checked){
		// chose rolling text
		if(subImageAr.length == 0)
		{
			// User is continuing a project

			alert("We noticed you are continuing a project, but haven't saved any frames. \n\n In order to enable rolling text, please resave every single frame and try again");
			document.getElementById('radio-rollingText-switch-no').checked = true;
			return;
		} else {
			// Requirements were properly met
			$("#smoothnessTextSelect").selectpicker('show');
			document.getElementById('smoothnessLabelHide').style.display = "block";

		}
	} else {
		// chose no rolling text
		$("#smoothnessTextSelect").selectpicker('hide');
		document.getElementById('smoothnessLabelHide').style.display = "none";
	}

	return;
}

function changeStoryGIFResolution(){
	var selectedValue = document.getElementById('storyResolutionSelect').value;
	if(selectedValue == 1){
		gifWidth = 480; 
		gifHeight = 320;
	} else if(selectedValue == 2){
		gifWidth = 600; 
		gifHeight = 400;
	} else if(selectedValue == 3){
		gifWidth = 870; 
		gifHeight = 520;
	} else if(selectedValue == 4){
		gifWidth = 960; 
		gifHeight = 640;
	} else {
		alert('Error while trying to determine resolution');
	}
}


function multiSortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function addToSubImageArray(tempSubAr)
{
	// search if tempArray already exists
	for(var i = 1; i - 1< subImageAr.length; i++)
	{
		if(tempSubAr[0] == subImageAr[i-1][0])
		{
			// This means the subarray existed before and need to replace it
			subImageAr[i-1] = tempSubAr;
			return;
		}
	}

	// This means subarray does not exist and we can just push

	subImageAr.push(tempSubAr);
}

function deleteRow(arr, row) {
   arr = arr.slice(0); // make copy
   arr.splice(row - 1, 1);
   return arr;
}


function removeToSubImageArray(chosenIndex)
{
	// search if tempArray already exists
	for(var i = 1; i - 1< subImageAr.length; i++)
	{
		if(chosenIndex == subImageAr[i-1][0])
		{
			// This means the subarray existed and we need to delete it
			subImageAr = deleteRow(subImageAr, i);

			return;
		}
	}

}


	

function pushSubImageToURLAR(chosenSceneNumber)
{
	//alert(chosenSceneNumber);
	for(var i=0; i < subImageAr.length; i++)
	{
		//alert(i);
		if(chosenSceneNumber == parseInt(subImageAr[i][0]))
		{
			// if we found the array, we will then push its subimages
			for(var j=1; j < subImageAr[i].length;j++)
			{
				urlAr.push(subImageAr[i][j]);
				
			}
			//alert('Pushing: '.concat(chosenSceneNumber));
			//alert('returning equal '.concat('chosenScene ',chosenSceneNumber, '  subAR: ', subImageAr[i][0]));
			return 0;

		} 
	}
	return -1;
	//alert('return');
}

function changeSmoothnessLevel()
{

	var num = parseInt(document.getElementById('smoothnessTextSelect').value);

	if(num == 2)
	{
		intervalDivisor = 0.5;
	} else if(num == 3){
		intervalDivisor = 0.333333;
	} else if(num == 4){
		intervalDivisor = 0.25;
	} else if(num == 5){
		intervalDivisor = 0.2;
	} else {
		alert('There was an error when changing smoothness level. This should not happen.');
	}
}



function cacluateLengthOfAllFrames(chosenInterval)
{
	// Calculate total amount of time for speech
	var overallTimeForSpeech = chosenInterval*intervalDivisor;

	// Caclulate interval rate of entire GIF 
	var overallInterval = overallTimeForSpeech*intervalDivisor;
; 


	// calculate number of frames needed
	return (chosenInterval/overallInterval);
}

function cacluateNumOfFramesForMain(chosenInterval)
{
	// Calculate total amount of time for speech
	var overallTimeForSpeech = chosenInterval*intervalDivisor
;

	// Caclulate interval rate of entire GIF 
	var overallInterval = overallTimeForSpeech*intervalDivisor
; 

	// Calculate total time for main idle frames
	var timeForMain = chosenInterval - overallTimeForSpeech;

	// calculate number of frames needed
	return (timeForMain/overallInterval);
}

function chosenFPStoRealFPS(chosenInterval)
{
	// Calculate total amount of time for speech
	var overallTimeForSpeech = chosenInterval*intervalDivisor
;

	// Caclulate interval rate of entire GIF 
	var overallInterval = overallTimeForSpeech*intervalDivisor
; 

	return overallInterval;
}

function saveSubTextImages()
{
	// Function to create sub text images
	var entireText = document.getElementById('edit_text_box').innerHTML;

	tempSubAr = [];

	// If we encounter no text, then we skip making subimages
	if(entireText == '' || entireText.length < 4)
	{
		return;	
	} 

	var numSubImages = 3 				// number of sub text images
	var numToDivide = numSubImages + 1; // amount of frames for text

	var subStrLength = entireText.length/numToDivide;

	var lengthCounter = subStrLength;

	
	// Push the scene number to the temp array
	tempSubAr.push(parseInt(sceneNum));

	for(var i=1; i - 1 < numSubImages; i++)
	{
		
		document.getElementById('edit_text_box').innerHTML = entireText.substring(0,lengthCounter);
		//alert(i.toString().concat(entireText.substring(0,lengthCounter)));
		lengthCounter = lengthCounter + subStrLength; // Increase length of substring

		printStoryCanvas(); // only changing text, so we don't have to wait for images to load
		uploadSubImageURL(i); // save subImage

	}

	// push temp array to main subImage array
	addToSubImageArray(tempSubAr);

	// revert back to original text
	document.getElementById('edit_text_box').innerHTML = entireText;
	tempSubAr = [];
}

function storyRefreshAllSelects(){

	$('#waifuStoryOption1').selectpicker('refresh');
	$('#waifuStoryCostumeOption1').selectpicker('refresh');
	$('#waifuStoryMoodOption1').selectpicker('refresh');
	$('#waifuStoryEbubbleOption1').selectpicker('refresh');


	$('#waifuStoryOption2').selectpicker('refresh');
	$('#waifuStoryCostumeOption2').selectpicker('refresh');
	$('#waifuStoryMoodOption2').selectpicker('refresh');
	$('#waifuStoryEbubbleOption2').selectpicker('refresh');

	$('#waifuStoryOption3').selectpicker('refresh');
	$('#waifuStoryCostumeOption3').selectpicker('refresh');
	$('#waifuStoryMoodOption3').selectpicker('refresh');
	$('#waifuStoryEbubbleOption3').selectpicker('refresh');

	$('#story-line-select-option').selectpicker('refresh');
	$('#story-speaker-select').selectpicker('refresh');
}



function emotionAnimationManage()
{
	var emot1 = document.getElementById('waifuStoryEbubbleOption1').value;
	var emot2 = document.getElementById('waifuStoryEbubbleOption2').value;
	var emot3 = document.getElementById('waifuStoryEbubbleOption3').value;

	// For the worried emotion
	if(emot1 == 3){
		document.getElementById('idol_img_left').style.bottom = '-2%';
	
		// Since whether someone is speaker affects size, the clip varies
		if(searchCertainCookie('speaker') == 'left'){

			document.getElementById('idol_img_left').style.clip = 'rect(72px,2000px,795px,72px)';
		} else {
			document.getElementById('idol_img_left').style.clip = 'rect(72px,2000px,756px,72px)';
		}


	} else {
		// Else if the person is not worried
		document.getElementById('idol_img_left').style.clip = 'rect(72px,2000px,2000px,72px)';
		document.getElementById('idol_img_left').style.bottom = '0%';
	}

	if(emot2 == 3){
		document.getElementById('idol_img_center').style.bottom = '-2%';

		// Since whether someone is speaker affects size, the clip varies
		if(searchCertainCookie('speaker') == 'center'){

			document.getElementById('idol_img_center').style.clip = 'rect(72px,2000px,795px,72px)';
		} else {
			document.getElementById('idol_img_center').style.clip = 'rect(72px,2000px,756px,72px)';
		}
		
	}else {
		document.getElementById('idol_img_center').style.clip = 'rect(72px,2000px,2000px,72px)';
		document.getElementById('idol_img_center').style.bottom = '0%';
	}

	if(emot3 == 3){
		document.getElementById('idol_img_right').style.bottom = '-2%';
		
		// Since whether someone is speaker affects size, the clip varies
		if(searchCertainCookie('speaker') == 'right'){

			document.getElementById('idol_img_right').style.clip = 'rect(72px,2000px,795px,72px)';
		} else {
			document.getElementById('idol_img_right').style.clip = 'rect(72px,2000px,756px,72px)';
		}


	}else {
		// Else if the person is not worried
		document.getElementById('idol_img_right').style.clip = 'rect(72px,2000px,2000px,72px)';
		document.getElementById('idol_img_right').style.bottom = '0%';
	}

}

function getCertainCookieIndex(certainCookie)
{
	// To search for "|"th index of a certain cookie value

	if(certainCookie == "alreadySaved"){
		return 0;
	} else if(certainCookie == "wallpaper"){
		return 1;
	} else if(certainCookie == "idol_left"){
		return 2;
	} else if(certainCookie == "costume_left"){
		return 3;
	} else if(certainCookie == "emotion_left"){
		return 4;
	} else if(certainCookie == "ebubble_left"){
		return 5;
	} else if(certainCookie == "storyMain_left"){
		return 6;
	} else if(certainCookie == "storyMain_id_left"){
		return 7;
	}else if(certainCookie == "storyMain_name_left"){
		return 8;
	}else if(certainCookie == "storyMain_idolized_left"){
		return 9;
	}else if(certainCookie == "idol_center"){
		return 10;
	}else if(certainCookie == "costume_center"){
		return 11;
	}else if(certainCookie == "emotion_center"){
		return 12;
	} else if(certainCookie == "ebubble_center"){
		return 13;
	}else if(certainCookie == "storyMain_center"){
		return 14;
	}else if(certainCookie == "storyMain_id_center"){
		return 15;
	}else if(certainCookie == "storyMain_name_center"){
		return 16;
	}else if(certainCookie == "storyMain_idolized_center"){
		return 17;
	}else if(certainCookie == "idol_right"){
		return 18;
	}else if(certainCookie == "costume_right"){
		return 19;
	}else if(certainCookie == "emotion_right"){
		return 20;
	} else if(certainCookie == "ebubble_right"){
		return 21;
	}else if(certainCookie == "storyMain_right"){
		return 22;
	}else if(certainCookie == "storyMain_id_right"){
		return 23;
	}else if(certainCookie == "storyMain_name_right"){
		return 24;
	}else if(certainCookie == "storyMain_idolized_right"){
		return 25;
	}else if(certainCookie == "speaker"){
		return 26;


	// Future values to use

	}else if(certainCookie == 'futureSpaceToUse'){
		return 27;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 28;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 29;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 30;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 31;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 32;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 33;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 34;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 35;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 36;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 37;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 38;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 39;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 40;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 41;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 42;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 43;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 44;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 45;
	}else if(certainCookie == 'futureSpaceToUse'){
		return 46;




	}else if(certainCookie == "speech"){
		return 47;
	}

	alert('Certain cookie index not found, this should not happen: '.concat(certainCookie));
	return -1;
}

function searchCertainCookie(certainCookie)
{
	// Searches for a certain value of a cookie (automatically determines what frame you are at)
	var cookieStr = getCookie("sceneMaker_frame-".concat(sceneNum));


	if(certainCookie == "alreadySaved" && (cookieStr == "" || cookieStr == null))
	{
		// If this is a frame we are transfering and not yet saved
		return "0";
	}

	if(cookieStr == "" || cookieStr == null)
	{
		// Cookie was not saved yet
		return null;
	}


	var cookieIndex = getCertainCookieIndex(certainCookie);

	var dashCounter = 0;
	for(var i = 0; i < cookieStr.length; i++)
	{
		// Iterate until we encounter a dash
		if(dashCounter == cookieIndex){
			// Extract the string if we arrived at nth dash

			var tempStr = "";
		
			while(true)
			{
				// Iterate through the entire string that we are going to extract
				if(cookieStr.charAt(i) == '|' || i >= cookieStr.length){
					// Return if we arrived at end of extracted string or is extracting dialouge text
					return tempStr;
				} 

				// Append character to string to extract
				tempStr = tempStr.concat(cookieStr.charAt(i));
				i = i+1;
			}
			return tempStr;

		} else if(cookieStr.charAt(i) == "|"){
			dashCounter = dashCounter + 1;
		}
		
	}

	alert('Cookie not found, this should not happen (searchCertainCookie): '.concat(certainCookie));

	return null;
}

function storeMaxNumOfSceneCookie()
{
	setCookie("sceneMaker_maxNumOfScene", maxNumOfScene, cookieExpireDate);
}



function storeSceneCookie(messageOff)
{
	var cookieStr = "";
	storeMaxNumOfSceneCookie();

	// Global cookie for all frames
	cookieStr = cookieStr.concat("1","|"); //alreadySaved
	cookieStr = cookieStr.concat(storyBackground,"|"); // wallpaper

	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption1').value, "|"); //idol_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption1').value,"|"); //costume_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption1').value,"|");//emotion_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption1').value,"|");//bubble_left
	cookieStr = cookieStr.concat(storyMainSelect1,"|"); //storyMainIdolSelect_left
	cookieStr = cookieStr.concat(storyMainSelectId1,"|"); //storyMainIdolSelect_id_left
	cookieStr = cookieStr.concat(storyMainSelectName1,"|"); //storyMainIdolSelect_name_left
	cookieStr = cookieStr.concat(storyMainSelectIdolized1,"|"); //storyMainIdolSelect_idolized_left
	
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption2').value, "|"); //idol_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption2').value,"|"); //costume_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption2').value,"|");//emotion_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption2').value,"|");//bubble_center
	cookieStr = cookieStr.concat(storyMainSelect2,"|"); //storyMainIdolSelect_center
	cookieStr = cookieStr.concat(storyMainSelectId2,"|"); //storyMainIdolSelect_id_center
	cookieStr = cookieStr.concat(storyMainSelectName2,"|"); //storyMainIdolSelect_name_center
	cookieStr = cookieStr.concat(storyMainSelectIdolized2,"|"); //storyMainIdolSelect_idolized_center

	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption3').value, "|"); //idol_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption3').value,"|"); //costume_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption3').value,"|");//emotion_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption3').value,"|");//bubble_right
	cookieStr = cookieStr.concat(storyMainSelect3,"|"); //storyMainIdolSelect_right
	cookieStr = cookieStr.concat(storyMainSelectId3,"|"); //storyMainIdolSelect_id_right
	cookieStr = cookieStr.concat(storyMainSelectName3,"|"); //storyMainIdolSelect_name_right
	cookieStr = cookieStr.concat(storyMainSelectIdolized3,"|"); //storyMainIdolSelect_idolized_right

	cookieStr = cookieStr.concat(document.getElementById('story-speaker-select').value ,"|"); //speaker


	// intervals to for future variables
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");





	cookieStr = cookieStr.concat(document.getElementById('edit_text_box').innerHTML, "|"); //speechText


	setCookie("sceneMaker_frame-".concat(sceneNum), cookieStr, cookieExpireDate);

	// save main image
	printStoryCanvas();
	uploadImageURL();

	// save sub text images
	saveSubTextImages();



    if(messageOff != 'messageOff'){
    	alert('Scene was saved successfully!');
    }
    
}


function transferSceneCookie()
{

	var cookieStr = "";

	// Global cookie for all frames
	cookieStr = cookieStr.concat("0","|"); //alreadySaved
	cookieStr = cookieStr.concat(storyBackground,"|"); // wallpaper
	
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption1').value, "|"); //idol_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption1').value,"|"); //costume_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption1').value,"|");//emotion_left
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption1').value,"|");//bubble_left
	cookieStr = cookieStr.concat(storyMainSelect1,"|"); //storyMainIdolSelect_left
	cookieStr = cookieStr.concat(storyMainSelectId1,"|"); //storyMainIdolSelect_id_left
	cookieStr = cookieStr.concat(storyMainSelectName1,"|"); //storyMainIdolSelect_name_left
	cookieStr = cookieStr.concat(storyMainSelectIdolized1,"|"); //storyMainIdolSelect_idolized_left
	
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption2').value, "|"); //idol_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption2').value,"|"); //costume_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption2').value,"|");//emotion_center
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption2').value,"|");//bubble_center
	cookieStr = cookieStr.concat(storyMainSelect2,"|"); //storyMainIdolSelect_center
	cookieStr = cookieStr.concat(storyMainSelectId2,"|"); //storyMainIdolSelect_id_center
	cookieStr = cookieStr.concat(storyMainSelectName2,"|"); //storyMainIdolSelect_name_center
	cookieStr = cookieStr.concat(storyMainSelectIdolized2,"|"); //storyMainIdolSelect_idolized_center

	cookieStr = cookieStr.concat(document.getElementById('waifuStoryOption3').value, "|"); //idol_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryCostumeOption3').value,"|"); //costume_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryMoodOption3').value,"|");//emotion_right
	cookieStr = cookieStr.concat(document.getElementById('waifuStoryEbubbleOption3').value,"|");//bubble_right
	cookieStr = cookieStr.concat(storyMainSelect3,"|"); //storyMainIdolSelect_right
	cookieStr = cookieStr.concat(storyMainSelectId3,"|"); //storyMainIdolSelect_id_right
	cookieStr = cookieStr.concat(storyMainSelectName3,"|"); //storyMainIdolSelect_name_right
	cookieStr = cookieStr.concat(storyMainSelectIdolized3,"|"); //storyMainIdolSelect_idolized_right

	cookieStr = cookieStr.concat(document.getElementById('story-speaker-select').value ,"|"); //speaker


	// intervals to for future variables
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");
	cookieStr = cookieStr.concat(" ","|");





	cookieStr = cookieStr.concat(document.getElementById('edit_text_box').innerHTML, "|"); //speechText


	setCookie("sceneMaker_frame-".concat(sceneNum), cookieStr, cookieExpireDate);

   
}

function loadSceneCookie(message)
{


	var scrapePath = "./stories/images/";

	
	var wallCookie = searchCertainCookie("wallpaper"); 

	if(wallCookie != null && wallCookie != "" && !isNaN(wallCookie))
	{
		storyBackground = wallCookie;

		document.getElementById("homeScreenStory").src = 'images/background/background' + storyBackground.toString() + '.png';
	} else {
		document.getElementById("homeScreenStory").src = 'images/background/background0.png';
	}

	var speaker = searchCertainCookie("speaker");

	if(speaker != null && speaker != ""){
		document.getElementById('story-speaker-select').value = speaker;
	} else {
		speaker = 'center';
		document.getElementById('story-speaker-select').value = speaker;
	}




	document.getElementById('edit_text_box').innerHTML = searchCertainCookie("speech");

	document.getElementById("story-textfield").value = document.getElementById('edit_text_box').innerHTML;

	if(searchCertainCookie("speech") == '-------nobody-------'){
		document.getElementById('edit_text_box').innerHTML = '';
		document.getElementById("story-textfield").value = 'Nobody';
	}

	// Left idol
	var name = searchCertainCookie("idol_left");

	if(name!= null && name != "")
	{

		var num1 = searchCertainCookie("costume_left");
		var num2 = searchCertainCookie("emotion_left");
		var emotion = searchCertainCookie("ebubble_left");

		var selectMode = searchCertainCookie("storyMain_left");


		document.getElementById('waifuStoryOption1').value = name;

		refreshStoryCostumeMoodOptions(1, 0);
		document.getElementById('waifuStoryCostumeOption1').value = num1;
		refreshStoryCostumeMoodOptions(1, 1);
		document.getElementById('waifuStoryMoodOption1').value = num2;

		document.getElementById('waifuStoryEbubbleOption1').value = emotion;

		document.getElementById('emotion_img_left').src = 'images/emotion/'.concat(emotion,'.png');

		if(name.toLowerCase() == "honoka's mom"){
			name = 'honokasmom';
		} else if(name.toLowerCase() == 'white alpaca'){
			name = 'alpacam';
		} else if(name.toLowerCase() == 'brown alpaca'){
			name = 'alpacaf';
	}

		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";


		if(name.toLowerCase() == '-------nobody-------'){
			path = 'images/blank.png';

		}


		// To load different modes based on cookies
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_left").src = path;
			// To assign name as speaker
			if(speaker == 'left'){
				if(name.toLowerCase() == '-------nobody-------'){
					name = '';
				}
				document.getElementById('edit_speaker_box').innerHTML = name;
				
			}


		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-left").value = searchCertainCookie("storyMain_id_left");


			if(speaker == 'left'){
				document.getElementById('edit_speaker_box').innerHTML = searchCertainCookie("storyMain_name_left");

			}
			 

			var idolized = searchCertainCookie("storyMain_idolized_left");

			if(idolized == 'no'){
				document.getElementById('radio-idol-switch-no-left').checked = true;
			} else{
				document.getElementById('radio-idol-switch-yes-left').checked = true;
			}
			searchIdStory('left');
			
		}




				
	} else {

		loadStoryCostumeMoodOptions(1, 'umi');
		document.getElementById("idol_img_left").src = 'stories/images/umi_01_01.png';

	}



	// Middle idol
	var name = searchCertainCookie("idol_center");


	if(name!= null && name != "")
	{
		var num1 = searchCertainCookie("costume_center");
		var num2 = searchCertainCookie("emotion_center");
		var emotion = searchCertainCookie("ebubble_center");


		var selectMode = searchCertainCookie("storyMain_center");


		document.getElementById('waifuStoryOption2').value = name;
		refreshStoryCostumeMoodOptions(2, 0);
		document.getElementById('waifuStoryCostumeOption2').value = num1;
		refreshStoryCostumeMoodOptions(2, 1);
		document.getElementById('waifuStoryMoodOption2').value = num2;

		document.getElementById('waifuStoryEbubbleOption2').value = emotion;
		document.getElementById('emotion_img_center').src = 'images/emotion/'.concat(emotion,'.png');

		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";
	
		if(name.toLowerCase() == '-------nobody-------'){
			path = 'images/blank.png';
		}
		
		
		// Select mode based on cookie
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_center").src = path;
			// To assign name as speaker
			if(speaker == 'center'){
				if(name.toLowerCase() == '-------nobody-------'){
					name = '';
				}
				document.getElementById('edit_speaker_box').innerHTML = name;
				
			}

		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-center").value = searchCertainCookie("storyMain_id_center");

			var idolized =  searchCertainCookie("storyMain_idolized_center");


			if(speaker == 'center'){
				document.getElementById('edit_speaker_box').innerHTML = searchCertainCookie("storyMain_name_center");
				if(name.toLowerCase() == '-------nobody-------'){
					name = '';
				}
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
		document.getElementById("idol_img_center").src = 'stories/images/honoka_01_01.png';
	}


	// Right idol

	var name = searchCertainCookie("idol_right");

	if(name!= null && name != "")
	{	
		var num1 = searchCertainCookie("costume_right");
		var num2 = searchCertainCookie("emotion_right");;
		var emotion = searchCertainCookie("ebubble_right");

		var selectMode = searchCertainCookie("storyMain_right");


		document.getElementById('waifuStoryOption3').value = name;
		refreshStoryCostumeMoodOptions(3, 0);
		document.getElementById('waifuStoryCostumeOption3').value = num1;
		refreshStoryCostumeMoodOptions(3, 1);
		document.getElementById('waifuStoryMoodOption3').value = num2;

		document.getElementById('waifuStoryEbubbleOption3').value = emotion;
		document.getElementById('emotion_img_right').src = 'images/emotion/'.concat(emotion,'.png');

		var path = scrapePath + name.toLowerCase() + "_" + num1 + "_" + num2 + ".png";


		if(name.toLowerCase() == '-------nobody-------'){
			path = 'images/blank.png';
		}
		// To assign name as speaker
		

		// Assign name based on cookie		
		if(selectMode == 0){
			//normal mode
			document.getElementById("idol_img_right").src = path;

			if(speaker == 'right'){
				if(name.toLowerCase() == '-------nobody-------'){
					name = '';
				}
				document.getElementById('edit_speaker_box').innerHTML = name;
			}

		} else if(selectMode == 1){
			//main card mode
			document.getElementById("card_id-right").value = searchCertainCookie("storyMain_id_right");

			var idolized = searchCertainCookie("storyMain_idolized_right");


			if(speaker == 'right'){
				document.getElementById('edit_speaker_box').innerHTML = searchCertainCookie("storyMain_name_right");

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
		document.getElementById("idol_img_right").src = 'stories/images/kotori_01_01.png';
	}


	storyRefreshAllSelects();
	emotionAnimationManage();

	

	if(message == 'printStoryCanvas'){
		printStoryCanvas();
	}
	//alert('Finished loading cookies')
}


function changeScene()
{
	document.getElementById('sceneLoading_box').innerHTML = "Loading Frame . . .";

	var sceneNumToLoad = document.getElementById('story-line-select-option').value;
	var sceneNumToLeave = sceneNum;

	// Check if the scene we are going to load already has a saved file
	sceneNum = sceneNumToLoad;
	var alreadySaved =  searchCertainCookie("alreadySaved");

	if(alreadySaved == "0")
	{
		// if we find out nothing has been saved in that scene, we want to transfer prev scene to this scene
		sceneNum = sceneNumToLeave;
		loadSceneCookie();
		sceneNum = sceneNumToLoad;
		transferSceneCookie();

		// Change some stuff so that it looks like the scene has changed
		document.getElementById('edit_text_box').innerHTML = "";
		document.getElementById("story-textfield").value = "";
		var speaker = 'center';
		document.getElementById('story-speaker-select').value = speaker;
		document.getElementById('waifuStoryEbubbleOption2').value = -1;
		document.getElementById('emotion_img_center').src = 'images/emotion/-1.png';

		speakerResize();

		
	} else if(alreadySaved == "1"){
		// load scene that was saved already

		loadSceneCookie();
	} else {
		alert('Something went wrong when changing scene. This should not happen');
	}
	document.getElementById('sceneNum_box').innerHTML = "Frame ".concat(sceneNum);
	document.getElementById('sceneLoading_box').innerHTML = "";
	

	storyRefreshAllSelects();
}

document
    .getElementById("startNewStoryGIFBut")
    .addEventListener("click", function( e ){ //e => event
        if( ! confirm("Starting a new GIF will delete all data that you have saved. Do you want to continue to make a new GIF?") ){
            e.preventDefault(); // ! => don't want to do this
        } else {
            //want to do this! => maybe do something about it?
            deleteAllStoryCookiesAndLocalStorage();
        }
  });


function deleteAllStoryCookiesAndLocalStorage()
{
	
	var cookieNames = document.cookie.split(/=[^;]*(?:;\s*|$)/);

	var tmpCountDown = maxNumOfScene;
	for(var i=0; i + 1< maxNumOfScene; i++){
		$("#story-line-select-option option[value='".concat(tmpCountDown ,"']")).remove();
		tmpCountDown = tmpCountDown - 1;
	}

	document.getElementById('sceneNum_box').innerHTML = "Frame 1";

	// reset global variables
	subImageAr = [];
	tempSubAr = [];

	sceneNum = 1;
	maxNumOfScene = 1;



	mainTxt = "";
	storyBackground = 0;
	sceneNum = 1;
	maxLimitNumScene = 15;

	currentSpeaker = 'none';

	storyMainSelect1 = 0;
	storyMainSelectId1 = -1;
	storyMainSelectName1 = "";
	storyMainSelectIdolized1 = 0;

	storyMainSelect2 = 0;
	storyMainSelectId2 = -1;
	storyMainSelectName2 = "";
	storyMainSelectIdolized2 = 0;

	storyMainSelect3 = 0;
	storyMainSelectId3 = -1;
	storyMainSelectName3 = "";
	storyMainSelectIdolized3 = 0;





	// Delete all cookies that start with "sceneMaker_"
	for (var i = 0; i < cookieNames.length; i++) {
	    if (/^sceneMaker_/.test(cookieNames[i])) {
	        document.cookie = cookieNames[i] + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
	    }
	}


	// Clear local storage that starts with 'storyMaker_imageURL-'
	Object.keys(localStorage)
      .forEach(function(key){
           if (/^storyMaker_imageURL-/.test(key)) {
               localStorage.removeItem(key);
           }
       });

    document.getElementById('emotion_img_left').src =  'images/emotion/-1.png';
    document.getElementById('emotion_img_center').src =  'images/emotion/-1.png';
    document.getElementById('emotion_img_right').src =  'images/emotion/-1.png';


    
	loadSceneCookie();
	$("#smoothnessTextSelect").selectpicker('hide');
	document.getElementById('smoothnessLabelHide').style.display = "none";
	

	$('#waifuStoryOption1 option')[2].selected = true;
	$('#waifuStoryOption2 option')[0].selected = true;
	$('#waifuStoryOption3 option')[1].selected = true;

	$('#waifuStoryCostumeOption1 option')[0].selected = true;
	$('#waifuStoryCostumeOption2 option')[0].selected = true;
	$('#waifuStoryCostumeOption3 option')[0].selected = true;

	$('#waifuStoryMoodOption1 option')[0].selected = true;
	$('#waifuStoryMoodOption2 option')[0].selected = true;
	$('#waifuStoryMoodOption3 option')[0].selected = true;

	$('#waifuStoryEbubbleOption1 option')[0].selected = true;
	$('#waifuStoryEbubbleOption2 option')[0].selected = true;
	$('#waifuStoryEbubbleOption3 option')[0].selected = true;





	$("#waifuStoryCostumeOption1").selectpicker('show');
	$("#waifuStoryMoodOption1").selectpicker('show');
	$("#waifuStoryCostumeOption2").selectpicker('show');
	$("#waifuStoryMoodOption2").selectpicker('show');
	$("#waifuStoryCostumeOption3").selectpicker('show');
	$("#waifuStoryMoodOption3").selectpicker('show');


	speakerResize();
	loadTotalFrameList();

     storyRefreshAllSelects();
}

function addNewScene()
{
	if (parseInt(maxNumOfScene) + 1 > maxLimitNumScene){
		alert('Sorry, only 15 frames per GIF is allowed :(');
		return;
	}


	maxNumOfScene = parseInt(maxNumOfScene) + 1;
	var x = document.getElementById('story-line-select-option');
	var option = document.createElement("option");
	option.text = "Frame ".concat(maxNumOfScene);
	option.value = maxNumOfScene;

	x.add(option);
	

	setCookie("sceneMaker_maxNumOfScene", maxNumOfScene, cookieExpireDate);
	$('#story-line-select-option').selectpicker('refresh');

	alert('New frame added');

}



function removeLastScene()
{
	if(maxNumOfScene == 1){
		alert("You can't delete the first scene");
		return;
	}

	$("#story-line-select-option option[value='".concat(maxNumOfScene ,"']")).remove();


	deleteCookie("sceneMaker_frame-".concat(maxNumOfScene));

	removeToSubImageArray(parseInt(maxNumOfScene));


	maxNumOfScene = parseInt(maxNumOfScene) - 1;
	setCookie("sceneMaker_maxNumOfScene", maxNumOfScene, cookieExpireDate);
	$('#story-line-select-option').selectpicker('refresh');
	



	alert('Frame '.concat(parseInt(maxNumOfScene) + 1, ' has been removed'));

	if(maxNumOfScene + 1 == sceneNum)
	{
		sceneNum = 1;
		loadSceneCookie();
		speakerResize();
	}

	

}

function loadTotalFrameList()
{
	var maxNumOfSceneCookie = getCookie("sceneMaker_maxNumOfScene");

	if(maxNumOfSceneCookie != null && maxNumOfSceneCookie!='')
	{
		maxNumOfScene = maxNumOfSceneCookie;
		for(var i=2; i - 1 < maxNumOfScene; i++)
		{
			var x = document.getElementById('story-line-select-option');
			var option = document.createElement("option");
			option.text = "Frame ".concat(i);
			option.value = parseInt(i);

			x.add(option);
		}
	}
	$('#story-line-select-option').selectpicker('refresh');
	
}

function changeBackgroundStory()
{	
	if(storyBackground < maxNumBackground-1)
	{
		storyBackground = parseInt(storyBackground) + 1;
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
		storyBackground = parseInt(maxNumBackground)-1;
		
	}else {
		storyBackground = parseInt(storyBackground) - 1;
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


function addStoryText()
{
	// Santize input, replace all "|" with empty character
	var tempStr = document.getElementById("story-textfield").value;
	tempStr = tempStr.replace(/\|/g,"");

	// Display text
	document.getElementById('edit_text_box').innerHTML = tempStr;
	document.getElementById("story-textfield").value = tempStr;
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
		    if(mainStoryWaifuSelectionAR[j].toLowerCase() == '-------nobody-------'){
		    	option.text == '-------Nobody-------';
		    }


		    x.add(option);
		}



	}




	document.getElementById('waifuStoryOption1').selectedIndex = 2;
	document.getElementById('waifuStoryOption2').selectedIndex = 0;
	document.getElementById('waifuStoryOption3').selectedIndex = 1;

	document.getElementById('waifuStoryCostumeOption1').selectedIndex = 0;
	document.getElementById('waifuStoryCostumeOption2').selectedIndex = 0;
	document.getElementById('waifuStoryCostumeOption3').selectedIndex = 0;

	document.getElementById('waifuStoryMoodOption1').selectedIndex = 0;
	document.getElementById('waifuStoryMoodOption2').selectedIndex = 0;
	document.getElementById('waifuStoryMoodOption3').selectedIndex = 0;

	document.getElementById('waifuStoryEbubbleOption1').selectedIndex = 0;
	document.getElementById('waifuStoryEbubbleOption2').selectedIndex = 0;
	document.getElementById('waifuStoryEbubbleOption3').selectedIndex = 0;


	
	
}

// FOR INITALIZATION ONLY
function loadStoryCostumeMoodOptions(optionNum, nameChosen)
{
	var newArray = [];

	newArray = getStoryWaifuAr(nameChosen)


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


		if(document.getElementById('edit_speaker_box').innerHTML.toLowerCase() == '-------nobody-------'){
			document.getElementById('edit_speaker_box').innerHTML = "";
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

		if(document.getElementById('edit_speaker_box').innerHTML.toLowerCase() == '-------nobody-------'){
			document.getElementById('edit_speaker_box').innerHTML = "";
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


		if(document.getElementById('edit_speaker_box').innerHTML.toLowerCase() == '-------nobody-------'){
			document.getElementById('edit_speaker_box').innerHTML = "";
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

function changeEmotionBubble(position)
{
	var num = -1;
	if(position == 'left'){
		num = document.getElementById('waifuStoryEbubbleOption1').value;


		document.getElementById('emotion_img_left').src = 'images/emotion/'.concat(num,'.png');
		

		
	} else if(position == 'center'){
		num = document.getElementById('waifuStoryEbubbleOption2').value;
		


		document.getElementById('emotion_img_center').src = 'images/emotion/'.concat(num,'.png');
	

	}else if(position == 'right'){
		num = document.getElementById('waifuStoryEbubbleOption3').value;
		document.getElementById('emotion_img_right').src = 'images/emotion/'.concat(num,'.png');

	
		document.getElementById('emotion_img_right').src = 'images/emotion/'.concat(num,'.png');
	

	} else {
		alert('Something went wrong while changing emotion bubbles');
	}

	emotionAnimationManage();
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


	if(name != '-------nobody-------'){

		newArray = getStoryWaifuAr(name);
	}
	


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


	if(name == '-------nobody-------'){
		// If we select nobody, then we hide the other select boxes
		$("#waifuStoryCostumeOption".concat(optionNum)).selectpicker('refresh');
		$("#waifuStoryMoodOption".concat(optionNum)).selectpicker('refresh');
		
		$("#waifuStoryCostumeOption".concat(optionNum)).selectpicker('hide');
		$("#waifuStoryMoodOption".concat(optionNum)).selectpicker('hide');

		return;
	} else {
		// In case nobody was chosen before, have the select boxes reappear and refresh
		$("#waifuStoryCostumeOption".concat(optionNum)).selectpicker('show');
		$("#waifuStoryMoodOption".concat(optionNum)).selectpicker('show');
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


	$("#waifuStoryCostumeOption".concat(optionNum)).selectpicker('refresh');
	$("#waifuStoryMoodOption".concat(optionNum)).selectpicker('refresh');

	speakerResize();
}


function searchIdStoryMain(type)
{
	// For non story characters
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


	if(name == '-------Nobody-------'){
		path = 'images/blank.png';

		var speaker = document.getElementById('story-speaker-select').value;
		if(type == 'center'){
			document.getElementById("idol_img_center").src=path;

			if(speaker == 'center'){
				document.getElementById('idol_img_center').src ='images/blank.png';
			}

		} else if(type == 'right'){
			document.getElementById("idol_img_right").src=path;

			if(speaker == 'right'){
				document.getElementById('idol_img_right').src ='images/blank.png';
			}

		}else if(type == 'left'){
			document.getElementById("idol_img_left").src=path;

			if(speaker == 'left'){
				document.getElementById('idol_img_left').src ='images/blank.png';
			}
		}
		
		speakerResize();

		return;
	}


	// To determine speaker
	if(currentSpeaker == 'left' && type == 'left'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'center' && type == 'center'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	} else if(currentSpeaker == 'right' && type == 'right'){
		document.getElementById('edit_speaker_box').innerHTML = capitalizeFirstLetter(name);
	}	
	
	if(name.toLowerCase() == "honoka's mom"){
		name = 'honokasmom';
	} else if(name.toLowerCase() == 'white alpaca'){
		name = 'alpacam';
	} else if(name.toLowerCase() == 'brown alpaca'){
		name = 'alpacaf';
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
	        

	        }

		});

		

}

function reconstruct(arr, last)
{
	var sentence = "";
	var i = 0;

	if(!last)
	{
		//alert('popping:');
		//alert(arr);
		arr.pop();	
		
		//alert(arr);
	}
	//alert(arr.length);
	//alert('peek: '.concat(arr[arr.length-1].toString()));

	// To get rid of empty charaacters
	while(true){
		if(arr.length == 0){
			break;
		}
		if(arr[arr.length-1].toString() == ''){
			arr.pop();
		} else {
			break;
		}
	}
	for(var value = ""; value = arr.pop();)
	{
		//alert('value: '.concat('[',value,']'));
		sentence = (" ".concat(value)).concat(sentence);
		//alert('forloop sentence: '.concat(sentence));	
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
		//alert('first'.concat(txt));
		var rowPosition = 540;
		var xPostion = 125;
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
			//alert('remainderTxt: '.concat(remainderTxt));
		    var splitArray = remainderTxt.split(" ");


		    var temp = reconstruct(splitArray, last);
		    //alert('temp: '.concat(temp));

		    ctx.fillText(temp, 117, rowPosition);	
		    rowPosition = rowPosition + incrementRowVal;

		    txt = txt.substring(temp.length, txt.length);

		    if(temp == '' || temp == null){
		    	break;
		    }

		}


	} else {
		//alert('second'.concat(txt));
		ctx.fillText(txt, 125, 540);	

	}

}

function saveCurrentScene()
{
	document.getElementById('insertStoryText_but').disabled = true;
	storeSceneCookie();
	document.getElementById('insertStoryText_but').disabled = false;

}

function constructGIF()
{	
	gifshot.createGIF({
		images: urlAr,
		'interval': intervalForGIF,
		'gifWidth': gifWidth,
		'gifHeight': gifHeight,
		'text': 'Create your own Love Live GIF at Love Live Waifu Simulator ( llsif-waifu-sim.github.io )',
		'fontSize': '10px',
		'textBaseline': 'top'
	}, function (obj) {
			
		if (!obj.error) {
		    var image = obj.image, animatedImage = document.createElement('img');
		    animatedImage.src = image;
		    document.getElementById('gifOutputDiv').appendChild(animatedImage);
		    document.getElementById('gifOutputDiv').style.display = "block";
		    document.getElementById("sceneLoadingBox").innerHTML = "Finishing up. . .";
		    urlAr = [];
		    document.getElementById('uploadInProcessDiv').style.display = "none";
		    document.getElementById('convertGIF_but').disabled = false;
		}
	});

}



function uploadImageURL()
{
	try {
	    var img = document.getElementById('story-canvas').toDataURL('image/jpeg', 0.9)
	} catch(e) {
	    var img = document.getElementById('story-canvas').toDataURL();
	}


	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("storyMaker_imageURL-".concat(sceneNum), img);
	} else {
		alert('Sorry, your browser does not support storage. Try upgrading your browser.');
		return;
	}


	//document.getElementById('imageGIF').src = img;
}


function uploadSubImageURL(subValue)
{
	try {
	    var img = document.getElementById('story-canvas').toDataURL('image/jpeg', 0.9)
	} catch(e) {
	    var img = document.getElementById('story-canvas').toDataURL();
	}

	
	tempSubAr.push(img);


	//document.getElementById('imageGIF').src = img;
	//alert('sample');
}



function convertAllSceneToGIF()
{
	document.getElementById('convertGIF_but').disabled = true;
	urlAr = [];
	document.getElementById('uploadInProcessDiv').style.display = "block";
	document.getElementById('gifOutputDiv').style.display = "none";
	$('#gifOutputDiv').empty();

	document.getElementById("sceneLoadingBox").innerHTML = "Preparing frames for conversion. . .";

	var prevSceneNum = sceneNum;
	// upload everything to urlAR
	for(var i=1; i - 1 < maxNumOfScene; i++)
	{
		sceneNum = i;
		var alreadySaved =  searchCertainCookie("alreadySaved");

		if(alreadySaved == "0")
		{
			// if frame is unsaved, ignore it
			continue;
		} else if(alreadySaved == "1"){
			// frame was saved, push it to array to convert to GIF
			urlAr.push(localStorage.getItem("storyMaker_imageURL-".concat(i)));
			//alert(i);
			//alert(localStorage.getItem("storyMaker_imageURL-".concat(i)));
		} else {
			// This should never happen
			alert('We encountered a problem when converting all frames to GIF: '.concat('[',alreadySaved,']'));
		}
	}
	sceneNum = prevSceneNum;


	document.getElementById("sceneLoadingBox").innerHTML = "Constructing GIF, please be patient. . .";
	//alert('going to construct GIF');
	constructGIF();
}



function convertAllSceneToGIFRollingText()
{
	document.getElementById('convertGIF_but').disabled = true;

	urlAr = [];
	document.getElementById('uploadInProcessDiv').style.display = "block";
	document.getElementById('gifOutputDiv').style.display = "none";
	$('#gifOutputDiv').empty();

	document.getElementById("sceneLoadingBox").innerHTML = "Preparing frames for conversion. . .";

	var prevSceneNum = sceneNum;

	var mainFrameRepeatNum = cacluateNumOfFramesForMain(document.getElementById('gifIntervalSelect').value);
	var allFrameRepeatNum = cacluateLengthOfAllFrames(document.getElementById('gifIntervalSelect').value);

	// Set intervalDivisor variable
	changeSmoothnessLevel();


	subImageAr.sort(multiSortFunction);

	// upload everything to urlAR
	for(var i=1; i - 1 < maxNumOfScene; i++)
	{
		sceneNum = i;
		var alreadySaved =  searchCertainCookie("alreadySaved");

		if(alreadySaved == "0")
		{
			// if frame is unsaved, ignore it
			continue;
		} else if(alreadySaved == "1"){
			// frame was saved, push it to array to convert to GIF

			// first, we must load subimages
			var tmpResult = pushSubImageToURLAR(i);

			var maxCount = mainFrameRepeatNum;
			if(tmpResult == -1){
				// Since we ignored subimages (speech), we are adding as many frames as the entire chosen interval
				maxCount = allFrameRepeatNum;
			}

			// then we push main image
			for(var j=0; j < maxCount; j++){
				urlAr.push(localStorage.getItem("storyMaker_imageURL-".concat(i)));
			}
			

		} else {
			// This should never happen
			alert('We encountered a problem when converting all frames to GIF: '.concat('[',alreadySaved,']'));
		}
	}
	sceneNum = prevSceneNum;


	document.getElementById("sceneLoadingBox").innerHTML = "Constructing GIF. This may take a while, please be patient. . .";
	//alert('going to construct GIF');
	constructGIF();
}

function startGIFCreation()
{
	changeStoryGIFResolution();

	if(document.getElementById('radio-rollingText-switch-yes').checked){
		// If rolling text is selected
		intervalForGIF = chosenFPStoRealFPS(document.getElementById('gifIntervalSelect').value);
		convertAllSceneToGIFRollingText();
	} else {
		intervalForGIF = document.getElementById('gifIntervalSelect').value;
		convertAllSceneToGIF();
	}
}



function printStoryCanvas(){
	//alert('Accessing canvas');

	var mainTxt = document.getElementById('edit_text_box').innerHTML;
	var speakerTxt = document.getElementById('edit_speaker_box').innerHTML;

	mainTxt = mainTxt.concat(" ");

	var c = document.getElementById("story-canvas");
    
	var ctx = c.getContext("2d");

	var img = document.getElementById("homeScreenStory");

	var imgwaifuLeft = document.getElementById("idol_img_left");
	var imgwaifuCenter = document.getElementById("idol_img_center");
	var imgwaifuRight = document.getElementById("idol_img_right");

	var emotionLeft = document.getElementById("emotion_img_left");
	var emotionCenter = document.getElementById("emotion_img_center");
	var emotionRight =  document.getElementById("emotion_img_right");

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




	var emotionLeftX = 115;
	var emotionLeftY = 77;

	var emotionCenterX = 470;
	var emotionCenterY = 77;
	
	var emotionRightX = 825;
	var emotionRightY = 77;


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


	// Check if speaker emotion should be animated
	var emotion = document.getElementById('waifuStoryEbubbleOption1').value;
	if(emotion == 0 || emotion == 1){
		 // surprised or happy
		imageWaifuLeftY = imageWaifuLeftY - 10;
	}else if(emotion == 3){
		// worried
		imageWaifuLeftY = imageWaifuLeftY + 30;
	} else if(emotion == 5){
		// angry
		imageWaifuLeftY = imageWaifuLeftY + 10;
	}

	// Check if speaker emotion should be animated
	emotion = document.getElementById('waifuStoryEbubbleOption2').value;
	if(emotion == 0 || emotion == 1){
		 // surprised or happy
		imageWaifuCenterY = imageWaifuCenterY - 10;
	}else if(emotion == 3){
		// worried
		imageWaifuCenterY = imageWaifuCenterY + 30;
	}else if(emotion == 5){
		// angry
		imageWaifuCenterY = imageWaifuCenterY + 10;
	}

	// Check if speaker emotion should be animated
	emotion = document.getElementById('waifuStoryEbubbleOption3').value
	if(emotion == 0 || emotion == 1){
		 // surprised or happy
		imageWaifuRightY = imageWaifuRightY - 10;
	}else if(emotion == 3){
		// worried
		imageWaifuRightY = imageWaifuRightY + 30;
	}else if(emotion == 0 || emotion == 1 || emotion == 5){
		// =angry
		imageWaifuRightY = imageWaifuRightY + 10;
	}



    ctx.drawImage(img, 0, 0, img.width,img.height);    
    ctx.drawImage(imgwaifuLeft, imageWaifuLeftX, imageWaifuLeftY, imgwaifuLeft.width, imgwaifuLeft.height);
    ctx.drawImage(imgwaifuCenter, imageWaifuCenterX, imageWaifuCenterY , imgwaifuCenter.width, imgwaifuCenter.height);
    ctx.drawImage(imgwaifuRight, imageWaifuRightX, imageWaifuRightY, imgwaifuRight.width, imgwaifuRight.height);

      
    ctx.drawImage(speakerbox, 65, 430, speakerbox.width, speakerbox.height);
    ctx.drawImage(speechbox, 65, 490, speechbox.width, speechbox.height);

    ctx.globalAlpha = 0.8;

    ctx.drawImage(emotionLeft, emotionLeftX, emotionLeftY, emotionLeft.width, emotionLeft.height);
    ctx.drawImage(emotionCenter, emotionCenterX, emotionCenterY, emotionCenter.width, emotionCenter.height);
    ctx.drawImage(emotionRight, emotionRightX, emotionRightY, emotionRight.width, emotionRight.height);

    ctx.globalAlpha = 1;

    // Preparing to write text
    ctx.font = "30px MotoyaLMaru";


	//var mainTxt = "I hope that a study of very long sentences will arm you with strategies that are almost as diverse as the sentences themselves, such as: starting each clause with the same word, tilting with dependent clauses toward a revelation at the end, padding with parentheticals, showing great latitude toward standard punctuation, rabbit-trailing away from the initial subject, encapsulating an entire life, and lastly, as this sentence is, celebrating the list."
	//var mainTxt = "Derp";
	var txt = mainTxt;
	addText(ctx, txt, mainTxt);


	var speakerTextPosition = 180
	if(speakerTxt.length <= 5){
		speakerTextPosition = 205;

	} else if(speakerTxt.length <= 8){
		speakerTextPosition = 180;

	} else if(speakerTxt.length <= 10){
		speakerTextPosition = 220;

	} else {
		speakerTextPosition = 130;
	}

	// Speaker text
	ctx.fillText(speakerTxt, speakerTextPosition, 465);
	//alert('here');

	//alert('Loaded main stuff to canvas');
}





$(document).ready(function(){
	 $("#story-textfield").on("change keyup paste", function(){
	    addStoryText();
	})
});

function sceneMakerInitalization()
{
	loadStoryOptions();
	loadSceneCookie();
	$("#smoothnessTextSelect").selectpicker('hide');
	document.getElementById('smoothnessLabelHide').style.display = "none";
	speakerResize();
	loadTotalFrameList();


}

// Loading functions
sceneMakerInitalization();
