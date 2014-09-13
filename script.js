var lng;
var lat;
var biz_array=[null,null,null];
var biz1_number;
var biz2_number;
var biz3_number;
var start = 0;


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
	  console.log(biz_array[index]);
    }
    updateBagelInfo();
	createGoogleHangout();

  });
}

function createGoogleHangout()
{
  gapi.hangout.render('g_hangout1', { 'render': 'createhangout',
    'invites':[{'id': biz1_number.toString(),'invite_type':'PHONE'}],
    'widget_size':'72'});
  gapi.hangout.render('g_hangout2', { 'render': 'createhangout',
    'invites':[{'id': biz2_number.toString(),'invite_type':'PHONE'}],
    'widget_size':'72'});
  gapi.hangout.render('g_hangout3', { 'render': 'createhangout',
    'invites':[{'id': biz3_number.toString(),'invite_type':'PHONE'}],
    'widget_size':'72'});
}

function chooseStarPicture(stars){
  if (stars<0.5) return ("yelp_0_stars.png");
  else if (stars<1.5) return ("yelp_1_stars.png");
  else if (stars<2.5) return ("yelp_2_stars.png");
  else if (stars<3.5) return ("yelp_3_stars.png");
  else if (stars<4.5) return ("yelp_4_stars.png");
  else return ("yelp_5_stars.png");
}



function updateBagelInfo()

{
  var biz1;
  var biz2;
  var biz3;
  if (0 <= start && start < biz_array.length)
  {
    biz1 = biz_array[start];
    document.getElementById('bb11').innerHTML = biz1["name"];
    document.getElementById('bb12').innerHTML = ((biz1["location"])["display_address"])[0] + ", " +
    ((biz1["location"])["display_address"])[1];
    document.getElementById('bb13').src=chooseStarPicture(eval(biz1["rating"]));
    //document.getElementById('bb13').innerHTML = biz1["rating"]; 
  }
  if (0 <= start+1 && start+1 < biz_array.length)
  {
    biz2 = biz_array[start+1];
    document.getElementById('bb21').innerHTML = biz2["name"];
    document.getElementById('bb22').innerHTML = ((biz2["location"])["display_address"])[0] + ", " +
    ((biz2["location"])["display_address"])[1];
    document.getElementById('bb23').src=chooseStarPicture(eval(biz2["rating"]));
    //document.getElementById('bb23').innerHTML = biz2["rating"];
  } else
  {
    document.getElementById('bb21').innerHTML = "";
    document.getElementById('bb22').innerHTML = "";
    document.getElementById('bb23').src = "";
  }
  if (0 <= start+2 && start+2 < biz_array.length)
  {
    biz3 = biz_array[start+2];
    document.getElementById('bb31').innerHTML = biz3["name"];
    document.getElementById('bb32').innerHTML = ((biz3["location"])["display_address"])[0] + ", " +
    ((biz3["location"])["display_address"])[1];
    document.getElementById('bb33').src=chooseStarPicture(eval(biz3["rating"]));
    //document.getElementById('bb33').innerHTML = biz3["rating"];
  }else
  {
    document.getElementById('bb31').innerHTML = "";
    document.getElementById('bb32').innerHTML = "";
    document.getElementById('bb33').src = ""
  }

  
  
  



  //get phone numbers for all 3 
  biz1_number= biz1["phone"];
  biz2_number= biz2["phone"];
  biz3_number= biz3["phone"];
}

function flipPages(x)
{
  console.log("uhoh");
  if (biz_array == null) return 0;
  if (x == -1 && (start-3) >=0)
  {
    start -= 3;
    updateBagelInfo();
    createGoogleHangout();
  }
  if (x == 1 && (start+3) < biz_array.length)
  {
    start += 3;
    updateBagelInfo();
    createGoogleHangout();
  }
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