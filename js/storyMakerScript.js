function show (toBlock){
  setDisplay(toBlock, 'block');
}
function hide (toNone) {
  setDisplay(toNone, 'none');
}
function setDisplay (target, str) {
  document.getElementById(target).style.display = str;
}


function loadOptions()
{
	for(var i=1; i <= 3; i++){

	    var path = "waifuStoryOption" + i;
	    	
		    
		for(var j=0; j < mainStoryWaifuSelectionAR.length; j++)
		{
		   	var x = document.getElementById(path);
		    var option = document.createElement("option");
		    option.text = capitalizeFirstLetter(mainStoryWaifuSelectionAR[j]);
		    x.add(option);
		}
	}
}


function searchIdStoryMain(type, name, num1, num2)
{
	var scrapePath = "./stories/images/";

	path = scrapePath + name + "_" + num1 + "_" + num2 + ".png"

	if(type == 'center'){
	    document.getElementById("idol_img_center").src=path;
	} else if(type == 'right'){
	    document.getElementById("idol_img_right").src=path;
	} else if(type == 'left'){
	    document.getElementById("idol_img_left").src=path;
	} else {
	    alert('We encountered an error here');
	}
}



function searchIdStory(type)
{
	var id;
	var idolized;

	if(type == 'center'){
	    id = document.getElementById("card_id-center").value;
		idolized = $('input[id="radio-idol-switch-center"]:checked').val();

	} else if(type == 'right'){
	    id = document.getElementById("card_id-right").value;
		idolized = $('input[id="radio-idol-switch-right"]:checked').val();
	} else if(type == 'left'){
	    id = document.getElementById("card_id-left").value;
		idolized = $('input[id="radio-idol-switch-left"]:checked').val();
	} else {
	    alert('We encountered an error here');
	}


	
	//var idolized = 'no';

	if(!isInt(id) || parseInt(id) > maxNumOfCard){
		alert('Invalid id input');
		//alert('Invalid id input. Please enter a number between 28 and ' + maxNumOfCard.toString());
		return;
	} 
	
	var name = searchNameById(id);

	

	// Once we get the info, get the image
	var path;

	var scrapePath = "./scraped-images/";
	
	if(isOthers(name)){
		scrapePath = "./scraped-images/z-others/"
	} 

	
	// If talking about Muse & Aqours
	if(idolized == 'yes')
	{
		path = scrapePath + name + "/" + id + "_id.png";
	}else{
		path = scrapePath + name +  "/" + id + ".png";
	}

	

	$.ajax({
	    url:path,
	    type:'HEAD',
	    error: function()
	    {
	        //file not exists
	        alert('Idolized / Non-idolized version of card not found. Trying filling out the alternate option bubble.');
			commandSelect(0);
			return;
	    },
	    success: function()
	    {
	        //file exists

	        if(type == 'center'){
	        	document.getElementById("idol_img_center").src=path;
	        } else if(type == 'right'){
	        	document.getElementById("idol_img_right").src=path;
	        } else if(type == 'left'){
	        	document.getElementById("idol_img_left").src=path;
	        } else {
	        	alert('We encountered an error here');
	        }
	        

			nameAssign(name);

			globalIndex = searchIndexById(id, idolized);

			if (globalAudio!=null){
				globalAudio.pause();
			}

			var index = parseInt(searchIndexById(id, idolized));
			storeCookie(index);

			setTimeout(function() {
				commandSelect(0);
			}, 500, true)
			  }



		});

		

}




// Loading functions

loadOptions();