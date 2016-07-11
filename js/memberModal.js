function loadWaifuList()
    {
        var index=getCookie("saved-waifu-index-1");
        var index2=getCookie("saved-waifu-index-2");
        var index3=getCookie("saved-waifu-index-3");

        if (index != null && index != "") {

            var id = "ID: " + parseInt(id_log[index][0]);
            var name = "Name: " + getFullName(id_log[index][1]);
            var idolized = "Idolized: " + capitalizeFirstLetter(id_log[index][2]);


            document.getElementById("id-saved-1").innerHTML = id;
		    document.getElementById("name-saved-1").innerHTML = name;
		    document.getElementById("idolized-saved-1").innerHTML = idolized;
  
		} else {
            document.getElementById("waifu_load_but_1").disabled = true;
            $('waifu_load_but_1').prop('disabled', true);   
        }

		if (index2 != null && index2 != "") {
            var id = "ID: " + parseInt(id_log[index2][0]);
            var name = "Name: " + getFullName(id_log[index2][1]);
            var idolized = "Idolized: " + capitalizeFirstLetter(id_log[index2][2]);

            document.getElementById("id-saved-2").innerHTML = id;
		    document.getElementById("name-saved-2").innerHTML = name;
		    document.getElementById("idolized-saved-2").innerHTML = idolized;
  
		} else {
            document.getElementById("waifu_load_but_2").disabled = true;
            $('waifu_load_but_2').prop('disabled', true);   
        }

		if (index3 != null && index3 != "") {
            var id = "ID: " + parseInt(id_log[index3][0]);
            var name = "Name: " + getFullName(id_log[index3][1]);
            var idolized = "Idolized: " + capitalizeFirstLetter(id_log[index3][2]);

            document.getElementById("id-saved-3").innerHTML = id;
		    document.getElementById("name-saved-3").innerHTML = name;
		    document.getElementById("idolized-saved-3").innerHTML = idolized;
  
		}  else {
            document.getElementById("waifu_load_but_3").disabled = true;
            $('waifu_load_but_3').prop('disabled', true);   
        }
    }

loadWaifuList();





		

		    

		

		    
		    