"use strict";

ApplicationControllers.controller("HomeController", ["$scope", function($scope) {
    $scope.posts =[
            {id:1,title:"Sample Post Title 1", date:"27-02-2014",author:"Filip Machinia",category:"technology",content:"This is the first blog post"},
            {id:2,title:"Sample Post Title 2", date:"27-02-2014",author:"Cristian Ivascu",category:"technology",content:"This is the second blog post"},
            {id:3,title:"Sample Post Title 3", date:"27-02-2014",author:"Chris Allison",category:"technology",content:"This is the third blog post"}
        ];
        //return posts;

    $scope.loginDetails = [];
    $scope.register = function(username, password){
        $scope.loginDetails.push({username: username, password:password});
    };

    $scope.login = function(user, pass){
        $scope.result = "";
        for(var i=0; i<$scope.loginDetails.length;i++){
            if((user ===  $scope.loginDetails[i].username)&& (pass === $scope.loginDetails[i].password) ){
                $scope.result = "Login was successful";
                break;
            }else{
                $scope.result = "Invalid username or password";
            }
        }
    };

}]);

/*
ApplicationControllers.controller("LoginController", ["$scope", function($scope) {

    $scope.login = function(username, password){
      // $scope.username = username;
      // $scope.password = password;
    };
    //return posts;


}]);*/