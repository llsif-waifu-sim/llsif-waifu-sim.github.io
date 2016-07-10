var canvas = document.getElementById("snapshot-canvas");
var ctx = canvas.getContext("2d");
var data = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
	"<foreignObject width='100%' height='100%'>" +
		"<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:20px'>" +
			"<table border='1'><tr><td>row 1, cell 1</td><td>row 1, cell 2</td></tr><tr><td>row 2, cell 1</td><td>row 2, cell 2</td></tr></table>" +
		 "</div>" +
	"</foreignObject>" +
	"</svg>";
var DOMURL = self.URL || self.webkitURL || self;
var img = new Image();
var svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
var url = DOMURL.createObjectURL(svg);
img.onload = function() {
	ctx.drawImage(img, 0, 0);
	DOMURL.revokeObjectURL(url);
};
img.src = url;