var voiceVolume = 0.3;
var musicVolume = 0.3;
var background = 0;
var globalIndex = 0;


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





// Check cookies

function checkCookie() {
    var index=getCookie("waifu-index");
    globalIndex = index;
    if (index != null && index != "") {
        mainWaifuSet(index);
    } else{
    	document.getElementById("idol_img").src= 'images/waifu/honoka0.png';
    }
}


function checkBackgroundCookie() {
    var index=getCookie("background-index");
    if (index != null && index != "") {
        mainBackgroundSet(index);
    } else{
    	document.getElementById("homeScreen").src= 'images/background/background0.png';
    }
}


function checkVolumeCookie() {
    var voice=getCookie("volumeVoice-value");
    var background=getCookie("volumeBack-value");

    if (voice != null && voice != "") {
        volumeVoiceSet(voice);
    } 

    if (background != null && background != "") {
        volumeBackSet(background);
    }
}

function checkWaifuLoadCookie() {
    var index=getCookie("saved-waifu-index");

    if (index != null && index != "") {
        globalIndex = index;
        savedWaifuLoad(index);
    } else {
        document.getElementById("waifu_load_but").disabled = true;
        $('waifu_load_but').prop('disabled', true);   
    }
}





// Store cookies

function storeCookie(index)
{
    setCookie("waifu-index", index, 6);
}

function storeSaveWaifuCookie(index)
{
    setCookie("saved-waifu-index", index, 6);
}


function storeBackgroundCookie(index)
{
	setCookie("background-index", index, 5);
}

function storeVolumeMusicCookie(volume)
{
	setCookie("volumeBack-value", volume, 4);
}

function storeVolumeVoiceCookie(volume)
{
    setCookie("volumeVoice-value", volume, 4);
}





// Functions that uses the cookies to load the values

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


function mainBackgroundSet(index){
    background = parseInt(index);
    var backpath = 'images/background/background' + index.toString() + '.png';
    document.getElementById("homeScreen").src=backpath;
}

function volumeVoiceSet(volume_value)
{
    volume_ex_value = volume_value*100;
    voiceVolume = volume_value;

    var input = document.getElementById("volumeSliderVoice");
    input.value = volume_ex_value;
}

function volumeBackSet(volume_value)
{
    volume_ex_value = volume_value*100;
    musicVolume = volume_value;

    var input = document.getElementById("volumeSliderMusic");
    input.value = volume_ex_value;
    
}

function saveWaifuLoad(index)
{

    var id = parseInt(id_log[index][0]);
    var name = id_log[index][1];
    var idolized = id_log[index][2];
    
    var html_id = "ID: " + parseInt(id_log[index][0]);
    var html_name = "Name: " + id_log[index][1];
    var html_idol = "Idolized: " + id_log[i][2];

    
    document.getElementById("id-saved").innerHTML = html_id;
    document.getElementById("name-saved").innerHTML = html_name;
    document.getElementById("idolized-saved").innerHTML = html_idol;

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

function savedWaifuLoad(index)
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



