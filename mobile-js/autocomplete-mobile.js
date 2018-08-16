function searchSongMobile(songTitle){
  switchToSongByName(songTitle);
  assignLyrics(songTitle);
  updatePlaylistBut();
}


$(document).ready(function () {
      var songNameAR = random_ar.map(function(tuple) {
          return tuple[0];
      });
      var items = [];
      $.each(songNameAR, function(i, item) {
          var songTitle = '"'+item+'"'
              items.push("<li><a href='#liveShowPanel' onclick='searchSongMobile("+songTitle+")'>" + item +'</a></li>');

       });  // close each()

       $('#songSearchBar').append( items.join('') );

       $('#songSearchBar').listview( "refresh" );
           $('#songSearchBar').trigger( "updatelayout");
       
});