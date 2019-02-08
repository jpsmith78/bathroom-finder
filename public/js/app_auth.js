const app = angular.module('BathroomApp',[])
app.controller = ('authController',['$http',function($http){
  const controller = this


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
          console.log(res);
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
