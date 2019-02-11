

const bathroomLocations = []
const bathroomLocationsInLatAndLong = []
let mapLocation ={lat: 39.9525839, lng: -75.1652215}
let userCity

//delclaring empty array to add locations for markers in


//create app name
const app = angular.module('BathroomApp', []);

//==========Bathroom Controller==========//
app.controller('BathroomController', ['$http', function($http){
// api key for google maps
const controller = this;

//index number for edit from
this.indexOfEditFormToShow = null;

//declare controller as this

this.includePath = '/partials/home.html';
this.changeInclude = (path) => {
this.includePath = 'partials/'+ path +'.html';
};

//function to initizlize map








//==========Create Bathroom Function==========//
  this.createBathroom = function(){


    $http({
      method: 'POST',
      url: '/bathrooms',
      data: {
        name: this.name,
        location: this.location,
        haveToPurchase: this.haveToPurchase,
        isAwkward: this.isAwkward,
        isClean: this.isClean
      }
    }).then(function(res){
      controller.getBathrooms()
    }, function(err){
      console.log(err);
    });
  };

//==========Get Bathrooms Function==========//


  this.getBathrooms = function(){
    $http({
      method: 'GET',
      url: '/bathrooms'
    }).then(function(res){
      controller.bathrooms = res.data

      for (var i = 0; i < controller.bathrooms.length; i++) {

        bathroomLocations.push(res.data[i].location)

      }






    }, function(err){
      console.log(err);
    });
  };



//Call getBathrooms on page load
  this.getBathrooms();





//==========Delete Bathroom Function==========//
  this.deleteBathroom = function(bathroom){
    $http({
      method: 'DELETE',
      url: '/bathrooms/' + bathroom._id
    }).then(function(res){
      controller.getBathrooms()
    }, function(err){
      console.log(err);
    });
  };

  //==========Edit Bathroom Function==========//

  this.editBathroom = function(bathroom){
    $http({
      method: 'PUT',
      url: '/bathrooms/' + bathroom._id,
      data: {
        name: this.updatedName,
        location: this.updatedLocation,
        haveToPurchase: this.updatedHaveToPurchase,
        isAwkward: this.updatedIsAwkward,
        isClean: this.updatedIsClean
      }
    }).then(function(res){
      controller.getBathrooms()
    }, function(err){
      console.log(err);
    });
  };



}]);

// authController
app.controller('AuthController',['$http',function($http){
  const controller = this
  this.loggedIn = false

  this.createUser = function(){
    $http({
      method: "POST",
      url: '/users',
      data:{
        username: this.username,
        password: this.password,
        city: this.city,
      }
    }).then(function(res){
      console.log(res);
      controller.username = ''
      controller.password = ''
    },function(er){
      console.log(er);
    })
  }
// checks if a user is logged in need route for for this in server.js

  this.checkIfLoggedIn = () => {
    $http({
      method: "GET",
      url: '/checkIfLoggedIn'

    }).then(function(res){
      if(res.data.user){
          userCity = res.data.user.city
          console.log(userCity);
          console.log('your still logged in bro');
          controller.loggedIn = true

       }
    })
  }

  this.checkIfLoggedIn()



  this.logIn = function(){
    $http({
      method: 'POST',
      url: '/sessions',
      data:{
        username:this.username,
        password: this.password
      }
    }).then(function(res){

      userCity = res.data.city.user.city

      controller.loggedIn = true;
      controller.checkIfLoggedIn()

    },function(err){
      console.log(err);
    })
  }

  this.logout = () => {
    $http({
      method:"DELETE",
      url: '/sessions'
    }).then(function(res){
       controller.loggedIn = false
    })
  }

  // checks if a user is logged in need route for for this in server.js

    this.checkIfLoggedIn = () => {
      $http({
        method: "GET",
        url: '/checkIfLoggedIn'

      }).then(function(res){
         if(res.data.user){
            console.log('your still logged in bro');
            controller.loggedIn = true;
            controller.username = res.data.user.username
            controller.city = res.data.user.city

         }
      })
    }

    this.checkIfLoggedIn()

}])


app.controller('mapsController', ['$http', function($http){
// setting api request url variables

const controller = this
this.baseURL = "https://maps.googleapis.com/maps/api/geocode/json?";
this.address = ""
this.apiKey =
this.location =

//getting apiKey

this.getApiKey = () => {
  $http({
    method: "GET",
    url: '/getApiKey'
  }).then(function(res){

    controller.apiKey = res.data


  })
}
//get api on page load
this.getApiKey()


//setting the location of the map based on click
this.setMapAsUserCity = () => {
   this.address = userCity
   this.getLocationForPresetCitiesInLatAndLong()
}

this.setMapAsPhiladelphia = () => {
  this.address = 'Philadelphia'
  this.getLocationForPresetCitiesInLatAndLong()
}
this.setMapAsNewYork = () => {
  this.address = 'new york city manhattan'
  this.getLocationForPresetCitiesInLatAndLong()
}
this.setMapAsBoston = () => {
  this.address = '02101'
  this.getLocationForPresetCitiesInLatAndLong()
}
this.setMapAsLosAngles = () => {
  this.address = 'los angeles,Ca'
  this.getLocationForPresetCitiesInLatAndLong()
}
this.setMapAsDenver = () => {
  this.address = 'denver, co'
  this.getLocationForPresetCitiesInLatAndLong()
}
this.setMapAsPittsburgh = () => {
  this.address = 'pittsburgh, pa'
  this.getLocationForPresetCitiesInLatAndLong()
}



// this fuction is use to convert user input addres into lat and log for markers
this.getLocationForPresetCitiesInLatAndLong = function(){

  $http({
    method: "GET",
    url: controller.baseURL + 'address=' + controller.address + '&key=' + controller.apiKey
}).then(function(res){

  controller.location = res.data.results[0].geometry.location;

  controller.changeLocation()
})

}

setTimeout(function(){
this.getLatAndLongForBathroomLocations = function(){

  for (var i = 0; i < bathroomLocations.length; i++) {
    console.log(bathroomLocations[i])


  $http({
      method: "GET",
      url: controller.baseURL + 'address=' + bathroomLocations[i] + '&key=' +controller.apiKey
    }).then(function(res){

       bathroomLocationsInLatAndLong.push(res.data.results[0].geometry.location);

    })
  }
}
this.getLatAndLongForBathroomLocations()
}, 2000)



// check if bathroom lat and long made it to array
// setTimeout(function(){
//   console.log(bathroomLocationsInLatAndLong);
// },10000)


this.changeLocation = () => {

mapLocation = this.location
initMap()
}

}])
//image of icons


//so map loads on page load
setTimeout(function(){
  initMap()
},3000)


function initMap() {


  var icon = {
       url: "/images/toilet.png", // url
       scaledSize: new google.maps.Size(30, 30), // size
       origin: new google.maps.Point(0,0), // origin

   };

    var myLatLng = mapLocation

      var map = new google.maps.Map(document.getElementById('maping'), {
        zoom: 13,
        center: myLatLng
      });
      // for loop here for locations in log
      for (var i = 0; i < bathroomLocationsInLatAndLong.length; i++) {

        var marker = new google.maps.Marker({
          position: bathroomLocationsInLatAndLong[i],
          map: map,
          title: 'free bathroom!!!!',
          icon: icon,
        });
      }
    }


//search box //this is a free api key

setTimeout(function(){ var placesAutocomplete = places({
   appId: 'plRDWJAWD3QD',
   apiKey: 'bbda1e3cb58b537bb9d186e3ffc95e0c',
   container: document.querySelector('#address-input')
 }); }, 100);
