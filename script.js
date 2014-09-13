var lng;
var lat;

function GetClock(){
  var d = new Date();
  var nhour  = d.getHours();
  var nmin   = d.getMinutes();
       if(nhour ==  0) {ap = " AM";nhour = 12;} 
  else if(nhour <= 11) {ap = " AM";} 
  else if(nhour == 12) {ap = " PM";} 
  else if(nhour >= 13) {ap = " PM";nhour -= 12;}

  if(nmin <= 9) {nmin = "0" +nmin;}

  document.getElementById('clockbox').innerHTML="It's "+nhour+":"+nmin+ap+".";
  setTimeout("GetClock()", 1000);
  }

function storeLocation(position)
{
  lat = position.coords.latitude;
  lng = position.coords.longitude;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storeLocation);
    } else { 
        alert("Can't find you!"); //implement other methods of getting loc
    }
}


$(document).ready(function() {

      $("#in").click(function(){
         $(".target").fadeIn( 'slow', function(){

          });
      });

      $("#out").click(function(){
         getLocation();
         $(".target").fadeOut( 'slow', function(){ 

          $(this).attr('src', 'pizza_button_100px.png')
          .fadeIn();
          });
      });
   });
//asd
window.onload=GetClock();