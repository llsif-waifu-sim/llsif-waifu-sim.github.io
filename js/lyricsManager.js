var lyricsTypeList = ["english","kanji","furigana","romaji"];   // English has to be the first element

//var enText = "";
//var enTextSplit = null;

/*
function combineEnglishLyrics(jpText, enText){
  var jpTextSplit = jpText.split("\n");
  //var jpTextSplit = jpText != '' && jpText != ' ' ? jpText.split('\n') : [];

  var resText = "";

  var en_iter = 0;
  var jp_iter = 0;
  for(var i = 0; i < jpTextSplit.length; i++){
    var sentJP = jpTextSplit[jp_iter+i];
    var sentEN = enTextSplit[en_iter+i];

  
    if((sentJP != "" && sentJP != " ")&& (sentEN == "" || sentEN == " ")){
      en_iter = en_iter + 1;
      sentEN = enTextSplit[en_iter+i];
    }
    
    //if(sentJP == "" || sentJP == " "){
    //  jp_iter = jp_iter + 1;
    //}
    
    //var enTmp = en_iter + i;
    //var jpTmp = jp_iter + i;
    //resText = resText + String(enTmp) + ":" + String(jpTmp) + "\n";
    if(sentJP == sentEN){
      resText = resText + sentJP + "\n >>";
    } else {
      resText = resText + sentJP + "\n--" + sentEN + "\n>>";
    }
    
  }

  return resText;
}
*/

function assignLyrics(songName){
  songName = songName.toLowerCase().replace(/[.,\/#!?'"・☆♡$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s/g, '');
  for(var i = 0; i < lyricsTypeList.length;i++){
      var lyricsType = lyricsTypeList[i];
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

        /*
        if(lyricsType == "english"){
          enText = allText;
          enTextSplit = enText.split('\n');
          //enTextSplit = enText != '' ? enText.split('\n') : [];
        } else {
          allText = combineEnglishLyrics(allText, enText);
        }
        */


        document.getElementById(elementStr).innerHTML = allText.replace(/\n/g, "<br />");

      }
     }
    rawFile.send();
   
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

assignLyrics("bokurawaimanonakade");

