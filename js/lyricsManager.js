var lyricsTypeList = ["english","kanji","furigana","romaji"];   


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

