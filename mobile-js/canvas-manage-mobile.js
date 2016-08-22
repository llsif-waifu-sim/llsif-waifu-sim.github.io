

function printPhotoCanvas(backgroundpath){
	
	window.location.href = window.location.href.substr(0, window.location.href.indexOf('#'));
	
    var c = document.getElementById("snapshot-canvas");
    


    var ctx = c.getContext("2d");
    var img = document.getElementById("homeScreen");
    var imgwaifu = document.getElementById("idol_img");
    var speechbubble = document.getElementById("speech-text");


    c.width  = img.width*3; // in pixels
	c.height = img.height*3;


    ctx.drawImage(img, 0, 0, img.width*3,img.height*3);    
    ctx.drawImage(imgwaifu, -20, 20, imgwaifu.width*3, imgwaifu.height*3);
    //ctx.drawImage(speechbubble, 0, 0, speechbubble.width, speechbubble.height);


    // save canvas image as data url (png format by default)
    var dataURL = c.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    document.getElementById('canvasImg').src = dataURL;


    
    /* Working on trying to solve the speech bubble problem
	var canvas = document.getElementById("snapshot-canvas");


	var html_text = "<div id='speech-text' style='opacity: 2.0; color:white; style='width:200px; height:200px;'></div>";



	var data = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
		"<foreignObject width='100%' height='100%'>" +
			"<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:20px'>" +
				html_text +
			 "</div>" +
		"</foreignObject>" +
		"</svg>";
	var DOMURL = self.URL || self.webkitURL || self;
	var img2 = new Image();
	var svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img2.onload = function() {
		ctx.drawImage(img2, 0, 0);
		DOMURL.revokeObjectURL(url);
	};
	img2.src = url;
	*/
	
}
