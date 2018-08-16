var config = {
	apiKey: "AIzaSyC2nK7zWhWAuHAWXSYlADUKPl4VwvFL54Y",
	authDomain: "llsif-waifu-gifgen-database.firebaseapp.com",
	databaseURL: "https://llsif-waifu-gifgen-database.firebaseio.com",
	storageBucket: "llsif-waifu-gifgen-database.appspot.com"
};
				
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();