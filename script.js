var lng;
var lat;

function funnyMessages(hr)
{
  var message1;
  if (4 <= hr && hr < 7) message1 = "Are pizza places even open this late?";
  else if (7 <= hr && hr < 10) message1 = "Reconsider pizza for breakfast.";
  else if (10 <= hr && hr < 14) message1 = "Shouldn't you be working?";
  else if (14 <= hr && hr < 18) message1 = "Afternoon snack time!";
  else if (18 <= hr && hr < 21) message1 = "No time to cook? Pizza time!";
  else if (21 <= hr && hr < 24) message1 = "Eating after 9 leads to weight gain";
  else if (hr == 24) message1 = "Midnight snack!";
  else if (0 <= hr && hr < 2) message1 = "Up all night, baby.";
  else if (2 <= hr && hr < 4 ) message1 = "My body is ready.";
  else message1 = "Its always time for pizza!";
  document.getElementById('messagebox').innerHTML=message1;
}

function GetClock(){
  var d = new Date();
  var nhour  = d.getHours();
  var nmin   = d.getMinutes();
  funnyMessages(nhour);
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
          $("#bagelbite1").fadeIn();
          $("#bagelbite2").fadeIn();
          $("#bagelbite3").fadeIn();
          $("#bagelbite4").fadeIn();
          $("#bagelbite5").fadeIn();
          });
      });
   });
//asd
window.onload=GetClock;