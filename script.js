var lng;
var lat;
var biz_array=[null,null,null];
var biz1_number;
var biz2_number;
var biz3_number;
var final_number;


function funnyMessages(hr)
{
  var message1;
  if (4 <= hr && hr < 7) message1 = "Are pizza places even open this late(or early)?";
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

function fetchOptions() {
  if (lng == null||lat == null)
  {
    lng = -79.94464;
    lat = 40.44330;
  }
  $.getJSON("fetch.php",{"lng":lng,"lat":lat},function(data)
  {
    var array = data["businesses"];
    for (index = 0; index < array.length; index++)
    {
      biz_array[index] = array[index];
    }
    updateBagelInfo();
  });
}

function updateBagelInfo()
{
  var biz1 = biz_array[0];
  var biz2 = biz_array[1];
  var biz3 = biz_array[2];

  document.getElementById('bb11').innerHTML = biz1["name"];
  document.getElementById('bb12').innerHTML = ((biz1["location"])["display_address"])[0] + ", " +
  ((biz1["location"])["display_address"])[1];
  document.getElementById('bb13').innerHTML = biz1["rating"] + " Stars";
  document.getElementById('bb21').innerHTML = biz2["name"];
  document.getElementById('bb22').innerHTML = ((biz2["location"])["display_address"])[0] + ", " +
  ((biz2["location"])["display_address"])[1];
  document.getElementById('bb23').innerHTML = biz2["rating"] + " Stars";
  document.getElementById('bb31').innerHTML = biz3["name"];
  document.getElementById('bb32').innerHTML = ((biz3["location"])["display_address"])[0] + ", " +
  ((biz3["location"])["display_address"])[1];
  document.getElementById('bb33').innerHTML = biz3["rating"] + " Stars";

  //get phone numbers for all 3 
  biz1_number= biz1["phone"];
  biz2_number= biz2["phone"];
  biz3_number= biz3["phone"];
}


$(document).ready(function() {

      $("#in").click(function(){
         $(".target").fadeIn( 'slow', function(){
          });
      });

      $("#out").click(function(){
         getLocation();
         fetchOptions();
         
         $(".target").fadeOut( 'slow', function(){ 
          $("#bagelbite1").fadeIn();
          $("#bagelbite2").fadeIn();
          $("#bagelbite3").fadeIn();
          $("#bagelcontainer").fadeIn();
          });
      });
   });
//asd
window.onload=GetClock;