var lyricsTypeList = ["english","kanji","furigana","romaji"];   // English has to be the first element

var enText = "";
var enTextSplit = [];


function disableSideBySideENBut(songName){
  if(isElementInArray(forbiddenSideBySide,songName)){
    //alert('disabled');
    $('#normalLyricDisplayDiv').show();
    $('#sideEnglishLyricDisplayDiv').hide();
    document.getElementById("showEnglishSideBySideBut").disabled = true;
  } else {
    document.getElementById("showEnglishSideBySideBut").disabled = false;
  }
}

function combineEnglishLyrics(jpText, enText){

  var enTextSplit = enText.split('\n');
  var jpTextSplit = jpText.split("\n");
  //var jpTextSplit = jpText != '' && jpText != ' ' ? jpText.split('\n') : [];
  var resText = "";
  var en_iter = 0;
  var jp_iter = 0;

  var maxLen = Math.max(jpTextSplit.length,enTextSplit.length);

  for(var i = 0; i < maxLen; i++){
    var sentJP = jpTextSplit[jp_iter+i];
    var sentEN = enTextSplit[en_iter+i];
  
 
    var cmpJpPunc = sentJP;
    if(cmpJpPunc){
      cmpJpPunc = cmpJpPunc.toLowerCase().replace(/[.,\/#!?'"・☆♡$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, '');
    }
    var cmpEnPunc = sentEN;
    if(cmpEnPunc){
      cmpEnPunc = cmpEnPunc.toLowerCase().replace(/[.,\/#!?'"・☆♡$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, ''); 
    }


    if(cmpJpPunc == cmpEnPunc){
      //resText = resText + sentJP + "\n >>";
      enText = resText + sentJP + "\n";
    } else if (sentEN){
      //resText = resText + sentJP + "\n--" + sentEN + "\n>>";
      resText = resText + sentJP + "\n" + sentEN + "\n";
    } else {
      resText = resText + sentJP + "\n"
    }
    
  }
  return resText;
}

function isElementInArray(array,element){
  for(var i=0; i < array.length; i++){
    if(element == array[i]){
      return true;
    }
  }
  return false;
}

function assignLyrics(songName){
  songName = songName.toLowerCase().replace(/[.,\/#!?'"・☆♡$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, '');
  for(var i = 0; i < lyricsTypeList.length;i++){
      var lyricsType = lyricsTypeList[i];
      enText = "";
      enTextSplit = [];
      setLyrics(songName,lyricsType);

  }


}

function setLyrics(songName,lyricsType) {
  var rawFile = new XMLHttpRequest();
  var rootPath = "https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-lyrics/master/"

    var filePath = rootPath + lyricsType + "/" + songName + "-" + lyricsType + ".txt";

    rawFile.open("GET", filePath, true);
    rawFile.onreadystatechange = function() 
    {
      if (rawFile.readyState === 4) 
      {
        var allText = rawFile.responseText;
        var elementStr = "lyric"+lyricsType+"Area"



        if(lyricsType == "english"){
          enText = allText;
          enTextSplit = enText.split('\n');

          document.getElementById("lyricenglishAreaEnglish").innerHTML = enText.replace(/\n/g, "<br />");

          //enTextSplit = enText != '' ? enText.split('\n') : [];
        } else {
          var englishSideText = combineEnglishLyrics(allText, enText);

          if(isElementInArray(forbiddenSideBySide,songName)){
            disableSideBySideENBut(songName);
          } else {
            document.getElementById("showEnglishSideBySideBut").disabled = false;
          }

          var elementStrEnSide = "lyric"+lyricsType+"AreaEnglish"

          document.getElementById(elementStrEnSide).innerHTML = englishSideText.replace(/\n/g, "<br />");
        }
        


        document.getElementById(elementStr).innerHTML = allText.replace(/\n/g, "<br />");

      }
     }
    rawFile.send();
   
}


function assignLyricsMobile(songName){
  songName = songName.toLowerCase().replace(/[.,\/#!?'"・☆♡$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, '');
  
  for(var i = 0; i < lyricsTypeList.length;i++){
      var lyricsType = lyricsTypeList[i];
      setLyricsMobile(songName,lyricsType);

  }
}

function setLyricsMobile(songName,lyricsType){
    var client;


    var rootPath = "https://raw.githubusercontent.com/llsif-waifu-sim/llsif-waifu-lyrics/master/"
    var filePath = rootPath + lyricsType + "/" + songName + "-" + lyricsType + ".txt";

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
                var elementStr = "lyric"+lyricsType+"Area"

                document.getElementById(elementStr).innerHTML = client.responseText.replace(/\n/g, "<br />");
            }
        }
        client.open("GET", filePath, true);
        client.send();
}

function changeVisibility(elementName, reverseElement,command){
  if(command == "show"){
    document.getElementById(elementName).style.visibility= "visible";
    document.getElementById(elementName).style.display= "block";

    document.getElementById(reverseElement).style.visibility= "hidden";
    document.getElementById(reverseElement).style.display= "none";
  } else if (command == "hide"){
    document.getElementById(elementName).style.visibility= "hidden";
    document.getElementById(elementName).style.display= "none";

    document.getElementById(reverseElement).style.visibility= "visible";
    document.getElementById(reverseElement).style.display= "block";
  }
}

assignLyrics("bokuranolivekimitonolife");
assignLyricsMobile("bokuranolivekimitonolife");

