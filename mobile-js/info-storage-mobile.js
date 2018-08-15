var voiceVolume = 0.3;
var musicVolume = 0.3;
var background = 0;
var globalIndex = 0;

var liveshowBackground = true;
var waifuVoiceEnable = true;
var cookieExpireDate = 100*365;

var othersArray = ['shiitake','alpaca']

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





// Check cookies

function checkCookie() {
    var index=getCookie("waifu-index");

    globalIndex = index;
    if (index != null && index != "" && !isNaN(index)) {
        mainWaifuSet(index);
    } else{
        globalIndex = 0;
    	document.getElementById("idol_img").src= 'images/waifu/honoka0.png';
        document.getElementById("card_id").value = 28;
    }
}

function checkBGMCookie() {
    var index=getCookie("background-music");
    if (index != null && index != "") {
        if(index == 'MU')
        {
            $('#select-bgmusic').val('0').selectmenu('refresh');
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music.mp3';

        }else {
            document.getElementById("select-bgmusic").value = "1";
            var audio = document.getElementById("origin-music-player");
            audio.src = 'audio/background-music1.mp3';
           
        }
    } 
}


function checkRandomSongBoxCookie(){
    var museTogetherIndex=getCookie("randSel-MU-Together");
    var museSubIdolIndex = getCookie("randSel-MU-SubIdol");
    var museOtherIndex = getCookie("randSel-MU-Other");

    var aqoursTogetherIndex = getCookie("randSel-AQ-Together");
    var aqoursSubIdolIndex = getCookie("randSel-AQ-SubIdol");
    var aqoursOtherIndex = getCookie("randSel-AQ-Other");

    var otherIdolIndex = getCookie("randSel-Other");


    if(museTogetherIndex != null && museTogetherIndex != ""){
        
        document.getElementById("MuseTogetherCheckBox").checked = (museTogetherIndex == 'true');

    }
    if(museSubIdolIndex != null && museSubIdolIndex != ""){
        
        document.getElementById("MuseSubIdolCheckBox").checked = (museSubIdolIndex == 'true');
    }
    if(museOtherIndex != null && museOtherIndex != ""){
        
        document.getElementById("MuseOtherCheckBox").checked = (museOtherIndex == 'true');
    }


    if(aqoursTogetherIndex != null && aqoursTogetherIndex != ""){
        
        document.getElementById("AqoursTogetherCheckBox").checked = (aqoursTogetherIndex == 'true');
    }
    if(aqoursSubIdolIndex != null && aqoursSubIdolIndex != ""){
        
        document.getElementById("AqoursSubIdolCheckBox").checked = (aqoursSubIdolIndex == 'true');
    }
    if(aqoursOtherIndex!= null && aqoursOtherIndex != ""){
        document.getElementById("AqoursOtherCheckBox").checked = (aqoursOtherIndex== 'true');
    }

    if(otherIdolIndex != null && otherIdolIndex != ""){
        document.getElementById("OtherIdolCheckBox").checked = (otherIdolIndex== 'true');
    }


    getSongSecInRandom('MuseTogetherCheckBox',0);
    getSongSecInRandom('MuseSubIdolCheckBox',1);
    getSongSecInRandom('MuseOtherCheckBox',2);

    getSongSecInRandom('AqoursTogetherCheckBox',3);
    getSongSecInRandom('AqoursSubIdolCheckBox',4);
    getSongSecInRandom('AqoursOtherCheckBox',5);

    getSongSecInRandom('OtherIdolCheckBox',6);


}



function checkMyPlaylist(){
    var index=getCookie("my-playlist-songs");
    if(index != null && index != ""){
        savedPlayList = JSON.parse(index);
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

function checkWaifuVoiceEnableCookie() {
    var index=getCookie("waifuVoice-enable");
    
    if (index != null && index != "") {
        if(index=='false'){
            waifuVoiceEnable = false;
            $("#waifuVoiceSwitch").prop( "checked", false ).flipswitch( "refresh" ) ;


        } else {
            waifuVoiceEnable = true;
        }
        

    } 
}



function checkLiveshowPlayerEnableCookie() {
    var index=getCookie("liveshowPlayer-enable");
    if (index != null && index != "") {
        if(index=='false'){
            liveshowBackground = false;
            $("#LiveshowSwitch").prop( "checked", false ).flipswitch( "refresh" ) ;
            
        } else {
            liveshowBackground = true;
        }
    } 
}








// Store cookies

function storeCookie(index)
{
    setCookie("waifu-index", index, cookieExpireDate);
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

function storeBGMusicCookie(index)
{
    setCookie("background-music", index, cookieExpireDate);
}

function storeMyPlaylistCookie(index)
{
    var index = JSON.stringify(index);
    setCookie("my-playlist-songs", index, cookieExpireDate);
}

function storeRandomSongBoxCookie()
{
    var museTogetherIndex = document.getElementById("MuseTogetherCheckBox").checked;
    var museSubIdolIndex = document.getElementById("MuseSubIdolCheckBox").checked;
    var museOtherIndex = document.getElementById("MuseOtherCheckBox").checked;

    var aqoursTogetherIndex = document.getElementById("AqoursTogetherCheckBox").checked;
    var aqoursSubIdolIndex = document.getElementById("AqoursSubIdolCheckBox").checked;
    var aqoursOtherIndex = document.getElementById("AqoursOtherCheckBox").checked;

    var otherIdolIndex = document.getElementById("OtherIdolCheckBox").checked;
    

    setCookie("randSel-MU-Together", museTogetherIndex, cookieExpireDate);
    setCookie("randSel-MU-SubIdol", museSubIdolIndex , cookieExpireDate);
    setCookie("randSel-MU-Other", museOtherIndex, cookieExpireDate);

    setCookie("randSel-AQ-Together", aqoursTogetherIndex, cookieExpireDate);
    setCookie("randSel-AQ-SubIdol", aqoursSubIdolIndex, cookieExpireDate);
    setCookie("randSel-AQ-Other", aqoursOtherIndex, cookieExpireDate);

    setCookie("randSel-Other", otherIdolIndex, cookieExpireDate);
}


function storeVolumeMusicCookie(volume)
{
	setCookie("volumeBack-value", volume, cookieExpireDate);
}

function storeVolumeVoiceCookie(volume)
{
    setCookie("volumeVoice-value", volume, cookieExpireDate);
}

function enableVoiceCookie(bool)
{
    if(bool){
        setCookie("waifuVoice-enable", 'true', cookieExpireDate);
    } else {
        setCookie("waifuVoice-enable", 'false', cookieExpireDate);
    }
    
}

function liveshowBackplayerCookie(bool)
{
    if(bool){
        setCookie("liveshowPlayer-enable", 'true', cookieExpireDate);
    } else {
        setCookie("liveshowPlayer-enable", 'false', cookieExpireDate);
    }
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

    if(isOthers(name)){
        scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
    } 

    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + id + "_id.png";
        $('#select-idol').val('yes').selectmenu('refresh');
    }else{
        path = scrapePath + name +  "/" + id + ".png";
        $('#select-idol').val('no').selectmenu('refresh');
    }





    //file exists
    document.getElementById("idol_img").src=path;

    nameAssign(name);
    $('#select-waifu').val(name).selectmenu('refresh');


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

    if(isOthers(name)){
        scrapePath = "https://llsif-waifu-sim.github.io/llsif-waifu-girl-images/scraped-images/z-others/"
    } 

    if(idolized == 'yes')
    {
        path = scrapePath + name + "/" + id + "_id.png";
        $('#select-idol').val('yes').selectmenu('refresh');
    }else{
        path = scrapePath + name +  "/" + id + ".png";
        $('#select-idol').val('no').selectmenu('refresh');
    }

    //file exists
    document.getElementById("idol_img").src=path;

    nameAssign(name);
    $('#select-waifu').val(name).selectmenu('refresh');

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

