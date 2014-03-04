"use strict";
//$localStorage
ApplicationControllers.controller("HomeController", ["$scope", "localStorageService", function ($scope, localStorageService) {
    //$scope.x = $localStorage;
    /*$scope.$storage = $localStorage({
     x: 42
     });*/
    //localStorageService.clearAll();
    //localStorageService.add("Favorite Sport", "Ultimate Frisbee");

    $scope.posts = [
        {id: 1, title: "Post from February", date: "february", author: "Filip Machinia", category: "technology", content: "This is the first blog post"},
        {id: 2, title: "Post from March", date: "march", author: "Cristian Ivascu", category: "technology", content: "This is the second blog post"},
        {id: 3, title: "Post from March", date: "march", author: "Chris Allison", category: "technology", content: "This is the third blog post"}
    ];
    //return posts;

    //$scope.loginDetails = [];
    $scope.register = function (username, password) {
        $scope.output = "";

        if (!username || !password) {
            $scope.output = "Required fields are empty";

        }
        else {
            //if ($scope.loginDetails.length !== 0) {


            if (localStorageService.get(username)) {
                $scope.output = "Username already taken";
                return;
            }

            //}
            //$scope.loginDetails.push({username: username, password: password});
            //localStorageService.add("test1","test2");
            localStorageService.add(username, password);
            //var testData = localStorageService.get(username); // create a var to print password

            //alert("password " + testData);
            $scope.output = "Registration was successful";
        }

    };

    $scope.login = function (user, pass) {
        $scope.result = "";

        if (!user || !pass) {
            $scope.result = "Required fields are empty";

        } else {


            //for (var i = 0; i < $scope.loginDetails.length; i++) {

            // if ((user === $scope.loginDetails[i].username) && (pass === $scope.loginDetails[i].password)) {
            if (localStorageService.get(user) === pass) {
                $scope.result = "Login was successful";
                // break;
            } else {
                $scope.result = "Invalid username or password";
            }
            //}

        }
    };

    /*
     $scope.printout = function () {
     //$scope.key = localStorageService.get("test1");

     };*/

}]);

/*
 ApplicationControllers.controller("LoginController", ["$scope", function($scope) {

 $scope.login = function(username, password){
 // $scope.username = username;
 // $scope.password = password;
 };
 //return posts;


 }]);*/