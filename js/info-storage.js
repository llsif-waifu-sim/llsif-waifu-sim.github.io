var voiceVolume = 0.3;
var musicVolume = 0.3;
var background = 0;
var globalIndex = 0;
var backgroundMusic = 1;
var cookieExpireDate = 100*365;

var othersArray = ['shiitake','alpaca'];

function isOthers(waifu)
{
    for (var i=0; i < othersArray.length; i++) {
        if(waifu == othersArray[i])
        {
            return true;
        }
    }
    return false;

}


// Setting and getting the cookies

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

function deleteCookie(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

// Check cookies

function checkCookie() {
    var index=getCookie("waifu-index");
    globalIndex = index;
    if (index != null && index != "" && !isNaN(index)) {
        mainWaifuSet(index);
    } else{
    	document.getElementById("idol_img").src= 'images/waifu/honoka0.png';
        document.getElementById("card_id").value = 28;
        globalIndex = 0;
    }
}

function checkBGMCookie() {
    var index=getCookie("background-music");
    if (index != null && index != "") {
        if(index == 'MU')
        {
            document.getElementById("bgmusicselect").value = "0";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music.mp3';
            backgroundMusic = 0;
        } else {
            document.getElementById("bgmusicselect").value = "1";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music1.mp3';
            backgroundMusic = 1;
        }
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

function checkWaifuLoadCookie(but_id) {
    var index=getCookie("saved-waifu-index-1");
    var index2=getCookie("saved-waifu-index-2");
    var index3=getCookie("saved-waifu-index-3");

    if (index != null && index != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_1'){
            globalIndex = index;
            savedWaifuLoad(index);
        }
        
        
    } 

    if (index2 != null && index2 != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_2'){
            globalIndex = index2;
            savedWaifuLoad(index2);
        }
        
        
    } 

    if (index3 != null && index3 != "" && !isNaN(index)) {

        if(but_id == 'waifu_load_but_3'){
            globalIndex = index3;
            savedWaifuLoad(index3);
        }
            
    } 
    globalIndex = 0;
}








// Store cookies

function storeCookie(index)
{
    setCookie("waifu-index", index, cookieExpireDate);
}

function storeBGMusicCookie(index)
{
    setCookie("background-music", index, cookieExpireDate);
}

function storeSaveWaifuCookie(index, but_id)
{
    if(but_id == 'waifu_save_but_1'){
       setCookie("saved-waifu-index-1", index, cookieExpireDate); 
   } else if(but_id == 'waifu_save_but_2'){
       setCookie("saved-waifu-index-2", index, cookieExpireDate); 
   } if(but_id == 'waifu_save_but_3'){
       setCookie("saved-waifu-index-3", index, cookieExpireDate); 
   } 
    
}


function storeBackgroundCookie(index)
{
	setCookie("background-index", index, cookieExpireDate);
}

function storeVolumeMusicCookie(volume)
{
	setCookie("volumeBack-value", volume, cookieExpireDate);
}

function storeVolumeVoiceCookie(volume)
{
    setCookie("volumeVoice-value", volume, cookieExpireDate);
}





// Functions that uses the cookies to load the values

function mainWaifuSet(index)
{

    var id = parseInt(id_log[index][0]);
    var name = id_log[index][1];
    var idolized = id_log[index][2];

    // Once we get the info, get the image
    var path;

    var scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/";
    var cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/"

    if(isOthers(name)){
        scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
        cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/z-others/"
    } 

    
    // If talking about Muse & Aqours
    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + id + "_id.png";
        cardPicPath = cardPicPath + name + "/" + id + "_id.png";
        document.querySelector("input[value='yes']").checked = true;
    }else{
        path = scrapePath + name +  "/" + id + ".png";
        cardPicPath = cardPicPath + name +  "/" + id + ".png";
        document.querySelector("input[value='no']").checked = true;
    }


        


    //file exists
    document.getElementById("idol_img").src=path;
    document.getElementById("cardPicImg").src = cardPicPath;

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



function savedWaifuLoad(index)
{

    var id = parseInt(id_log[index][0]);
    var name = id_log[index][1];
    var idolized = id_log[index][2];


    // Once we get the info, get the image
    var path;

    var scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/";
    var cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/"

    if(isOthers(name)){
        scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
        cardPicPath = "https://llsif-waifu-sim.github.io/llsif-waifu-card-pics/scraped-images/z-others/"
    } 

    
    // If talking about Muse & Aqours
    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + id + "_id.png";
        cardPicPath = cardPicPath + name + "/" + id + "_id.png";
        document.querySelector("input[value='yes']").checked = true;
    }else{
        path = scrapePath + name +  "/" + id + ".png";
        cardPicPath = cardPicPath + name +  "/" + id + ".png";
        document.querySelector("input[value='no']").checked = true;
    }

    //file exists
    document.getElementById("idol_img").src=path;
    document.getElementById("cardPicImg").src = cardPicPath;

    nameAssign(name);
    document.getElementById("card_id").value = id;

    if (globalAudio!=null){
        globalAudio.pause();
    }

    setTimeout(function() {
        commandSelect(0);
    }, 500, true)


}










// Functions that the cookie functions may need
function getFullName(name)
{
    if(name == 'honoka')
    {
        return 'Kousaka Honoka';
    } else if(name == 'kotori'){
        return 'Minami Kotori';
    }else if(name == 'umi'){
        return 'Sonoda Umi';
    } else if(name == 'hanayo'){
        return 'Koizumi Hanayo';
    } else if(name == 'rin'){
        return 'Hoshizora Rin';
    } else if(name == 'maki'){
        return 'Nishikino Maki';
    } else if(name == 'nozomi'){
        return 'Tojo Nozomi';
    } else if(name == 'eli'){
        return 'Ayase Eli';
    } else if(name == 'nico'){
        return 'Yazawa Nico';


    } else if (name == 'chika'){
        return 'Takami Chika';
    } else if(name == 'you'){
        return 'Watanabe You';
    }else if(name == 'riko'){
        return 'Sakurauchi Riko';
    } else if(name == 'ruby'){
        return 'Kurosawa Ruby';
    } else if(name == 'hanamaru'){
        return 'Kunikida Hanamaru';
    } else if(name == 'yoshiko'){
        return 'Tsushima Yoshiko';
    } else if(name == 'dia'){
        return 'Kurosawa Dia';
    } else if(name == 'mari'){
        return 'Ohara Mari';
    } else if(name == 'kanan'){
        return 'Matssura Kanan';


    } else if(name == 'tsubasa'){
        return 'Kira Tsubasa';
    } else if(name == 'anju'){
        return 'Yuki Anju';
    } else if(name == 'erena'){
        return 'Todo Erena';


    // For the other characters
    } else if(name == 'shiitake'){
        return 'Shiitake';
    } else if(name == 'alpaca'){
        return 'Alpaca';

    } else {
        return 'none';
    } 
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

