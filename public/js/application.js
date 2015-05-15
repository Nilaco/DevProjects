$(document).ready(function() {
//Set a var for CENTER location

  var currentGps = [37.784670, -122.397586]

  // function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: new google.maps.LatLng(currentGps[0], currentGps[1]),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)

////Make marker function
    var makeMarker = function(lat, lon, name){
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        title: name,
        map: map
      })

      var infowindow = new google.maps.InfoWindow({
        content: "Average house-hold income: $"+ randIncome()+".Most recent crime: " +randCrimes()+ "."
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }


//Set current location marker (for button)
    // var marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(currentGps[0], currentGps[1]),
    //   // map: map <--- Load marker
    // });


  // google.maps.event.addDomListener(window, 'load');

  $('#my-location').on('click', function(event){
    event.preventDefault();
    marker.setMap(map); //set marker
  });
  // marker.setMap(null); //remove marker

  $('#login-partial').on('submit', function(event){
    event.preventDefault();
    var loginInfo = $(this)
    var data = loginInfo.serialize();
    // debugger;

    var req = $.ajax({
      type: 'POST',
      url: '/login',
      data: data
      // debugger;
    });

    req.done(function(){
      clearForms();
      showLogout();
    });
  });

  // $('#login-partial').on('submit', function(event){
  //   event.preventDefault();
  //   var loginInfo = $(this)
  //   var data = loginInfo.serialize();
  //   // debugger;

  //   var req = $.ajax({
  //     type: 'POST',
  //     url: '/login',
  //     data: data
  //     // debugger;
  //   });

  //   req.done(function(){
  //     clearForms();
  //     showLogout();
  //   });
  // });

  function clearForms() {
  $('input, textarea, select')
  .not(':input[type=button], :input[type=submit], :input[type=reset]')
  .val('');
}

// function showLogin() {
//   $('#login-partial').show();
//   $('#register-partial').hide();
//   $('#logout-partial').hide();
// }

// function showReg() {
//   $('#login-partial').hide();
//   $('#register-partial').show();
//   $('#logout-partial').hide();
// }

function showLogout() {
  $('#login-partial').hide();
  $('#register-form').hide();
  $('#logout-button').show();
  $('#home-button').show();
  $('#profile-button').show();
}


$('#search-button').on('submit', 'form', function(event){
  event.preventDefault();
  var data = $(event.target).serialize();
  var lat
  var lon
  var name
  // debugger;

  var reqGps = $.ajax({
    type: 'POST',
    url: '/find/gps',
    data: data
  })

  reqGps.done(function(response){
    response = JSON.parse(response)['Results'][0]
    lat = response.lat
    lon = response.lon
    var latLon = response.ll
    var name = response.name
    var LatLng = {lat: parseFloat(lat), lng: parseFloat(lon)}

    makeMarker(lat, lon, name);
    map.panTo(LatLng);

    var reqSearch = $.ajax({
    type: 'POST',
    url: '/search',
    data: { name: name }
  })

    reqSearch.done(function(){
    lastSearch(name);
  })
  });

  // Request crime data...SERVE NO LONGER EXISTS =(
  // var reqCrime = $.ajax({
  //   type: 'POST',
  //   url: '/find/crime',
  //   data: {address: "https://jgentes-Crime-Data-v1.p.mashape.com/crime?enddate=6%2F25%2F2014&lat="+lat+"&long="+lon+"&startdate=6%2F19%2F2010"}
  // })

  // reqCrime.done(function(response){
  //   console.log(response)
  //   debugger;
  // })
})



var randIncome = function(){
  var incomes = ["82000", "65000", "45000", "55000", "67000", "51000", "22000", "39000", "63000", "48000", "87000", "78000", "62000", "80000"];
  return incomes[Math.floor(Math.random()*incomes.length)]
}

var randCrimes = function(){
  var crimes = [
  {
    "description": "HARASSING COMMUNICATIONS",
    "datetime": "5/15/2015 11:15 AM",
    "location": [
      42.343050293817735,
      -83.02054787555552
    ]
  },
  {
    "description": "LARCENY - PERSONAL PROPERTY FROM VEHICLE",
    "datetime": "5/15/2015 08:15 AM",
    "location": [
      42.33507505581727,
      -83.05793091955157
    ]
  },
  {
    "description": "MARIJUANA -POSSESS",
    "datetime": "5/15/2015 07:10 AM",
    "location": [
      42.34087510581758,
      -83.01517522555585
    ]
  },
  {
    "description": "DANGEROUS DRUGS (OTHER)",
    "datetime": "5/15/2015 07:10 AM",
    "location": [
      42.34087510581758,
      -83.01517522555585
    ]
  },
  {
    "description": "LARCENY (OTHER)",
    "datetime": "5/15/2015 07:00 AM",
    "location": [
      42.34032718981752,
      -83.01515325155701
    ]
  },
  {
    "description": "FRAUD (OTHER)",
    "datetime": "5/15/2015 05:34 AM",
    "location": [
      42.33902095581744,
      -83.03552980355878
    ]
  },
  {
    "description": "VEHICLE THEFT",
    "datetime": "5/24/2015 12:30 PM",
    "location": [
      42.332992005817085,
      -83.03520137455854
    ]
  }
  ]
  crime = crimes[Math.floor(Math.random()*crimes.length)]
  return " "+crime.description+"/"+ crime.datetime+"."
};

  var lastSearch = function(name){
    $('#last-searches ul li:nth-child(3)').remove();
    $('#last-searches ul').prepend('<li>'+name+'</li>')
  }

});


