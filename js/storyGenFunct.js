var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";

var maxWidth = 700;
var remainder = maxWidth;

var letterWidth = ctx.measureText('W').width;  // gets the length of a single letter
var maxWidthChar = Math.floor(maxWidth/letterWidth);

var mainTxt = "I hope that a study of very long sentences will arm you with strategies that are almost as diverse as the sentences themselves, such as: starting each clause with the same word, tilting with dependent clauses toward a revelation at the end, padding with parentheticals, showing great latitude toward standard punctuation, rabbit-trailing away from the initial subject, encapsulating an entire life, and lastly, as this sentence is, celebrating the list."
var txt = mainTxt;


function reconstruct(arr, last)
{
	var sentence = "";
	var i = 0;

	if(!last)
	{
		arr.pop();	
	}
	
	for(var value = ""; value = arr.pop();)
	{
		sentence = (" ".concat(value)).concat(sentence);	
	}

	return sentence;
}

// This script is to mainly construct text on a computer
function addText(mainTxt)
{
	if(ctx.measureText(txt).width >= maxWidth)
	{
		// That means the text width is zero   

		var rowPosition = 50;
		var incrementRowVal = 30; // Increment 

		while(true)
		{
			if(txt.length <= 0)
			{
				break;
			}

			var last = true;
			if(ctx.measureText(txt).width >= maxWidth)
		    {
		    	last = false;
		    } 

			var remainderTxt = txt.substring(0, maxWidthChar*2);

		    var splitArray = remainderTxt.split(" ");

		    
		    var temp = reconstruct(splitArray, last);

		    ctx.fillText(temp, 10, rowPosition);	
		    rowPosition = rowPosition + incrementRowVal;

		    txt = txt.substring(temp.length, txt.length);

		}


	} else {
		ctx.fillText(txt, 10, 50);	
	}

}


addText(mainTxt);

/*
var img = new Image();
img.src = 'images/test.jpg';
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    addText(mainTxt);
}
*/
