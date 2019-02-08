//create app name
const app = angular.module('BathroomApp', []);


//==========Bathroom Controller==========//
app.controller('BathroomController', ['$http', function($http){

//declare controller as this
  const controller = this;
this.boo = 'far'
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
      controller.bathrooms = response.data
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
    })
  }


}]);
