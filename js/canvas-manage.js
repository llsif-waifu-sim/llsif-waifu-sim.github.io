function printPhotoCanvas(backgroundpath){

	
    var c = document.getElementById("snapshot-canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("homeScreen");
    ctx.drawImage(img, 0, 0, 280,140);



	
	//var canvas = document.getElementById("snapshot-canvas");
	//var ctx = canvas.getContext("2d");

	var html_text = "<table border='1'><tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr><tr><td>row 2, cell 1</td><td>row 2, cell 2</td></tr></table> Hello World";
	//var html_text = "<img src='" + backgroundpath +"'>";



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
	
}
