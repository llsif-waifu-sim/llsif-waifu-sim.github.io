
$("#waifuVoiceSwitch").change(waifuToggle);       //event, calls myToggle()  

	function waifuToggle(){ 
	var a = $("#waifuVoiceSwitch").prop("checked") ? "on" : "off";
	if(a == "off"){
		waifuVoiceEnable = false;
		enableVoiceCookie(false);
	}else{
		waifuVoiceEnable = true;
		enableVoiceCookie(true);
	}
}

$("#LiveshowSwitch").change(liveshowToggle);       //event, calls myToggle()  

	function liveshowToggle(){ 
	var a = $("#LiveshowSwitch").prop("checked") ? "on" : "off";
	if(a == "off"){
		liveshowBackground = false;
		 liveshowBackplayerCookie(false);
	}else{
		liveshowBackground = true;
		liveshowBackplayerCookie(true);
	}
}
