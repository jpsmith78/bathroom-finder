

//create app name
const app = angular.module('BathroomApp', []);

//==========Bathroom Controller==========//
app.controller('BathroomController', ['$http', function($http){
// api key for google maps
const controller = this;



//declare controller as this

this.includePath = '/partials/sidebar.html';
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
      console.log(controller.bathrooms);
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
      controller.loggedIn = true
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

}])
