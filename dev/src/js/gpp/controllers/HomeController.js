"use strict";

ApplicationControllers.controller("HomeController", ["$scope", "localStorageService", function ($scope, localStorageService) {

    $scope.clearFunc = function () {
        localStorageService.clearAll();
    };

    if (localStorageService.get("posts")) {
        $scope.posts = localStorageService.get("posts");
    } else {
        $scope.posts = [
            {id: 1, title: "Post from February", date: "February 2014", datecode: "feb2014", author: "Filip Machinia", category: "Technology", content: "This is the first blog post"},
            {id: 2, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Cristian Ivascu", category: "Technology", content: "This is the second blog post"},
            {id: 3, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Chris Allison", category: "Media", content: "This is the third blog post"}
        ];
    }


    /*[
     {id: 1, title: "Post from February", date: "February 2014", datecode: "feb2014", author: "Filip Machinia", category: "technology", content: "This is the first blog post"},
     {id: 2, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Cristian Ivascu", category: "technology", content: "This is the second blog post"},
     {id: 3, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Chris Allison", category: "technology", content: "This is the third blog post"}
     ];*/


    $scope.register = function (username, password) {
        $scope.loginResultString = "";
        $scope.registerResultString = "";
        $scope.registerResult = false;

        if (!username || !password) {
            $scope.registerResultString = "Required fields are empty";
            $scope.registerResult = false;
        }
        else {


            if (localStorageService.get(username)) {
                $scope.registerResultString = "Username already taken";
                $scope.registerResult = false;
                return;
            }


            localStorageService.add(username, password);

            $scope.registerResultString = "Registration was successful";
            $scope.registerResult = true;
            $scope.loginResult = true;
            $scope.usr = username;
        }

    };

    $scope.login = function (user, pass) {

        $scope.registerResultString = "";
        $scope.loginResultString = "";
        $scope.loginResult = false;

        if (!user || !pass) {
            $scope.loginResultString = "Required fields are empty";
            $scope.loginResult = false;

        } else {


            if (localStorageService.get(user) === pass) {
                $scope.loginResultString = "Login was successful";
                $scope.loginResult = true;
                $scope.usr = user;

            } else {
                $scope.loginResultString = "Invalid username or password";
                $scope.loginResult = false;
            }


        }
    };

    $scope.clearResults = function () {
        $scope.registerResult = false;
        $scope.loginResult = false;
        $scope.registerResultString = "";
        $scope.loginResultString = "";
    };

    $scope.writePost = function (postTitle, postCategory, postContent) {
        $scope.posts.push({id: 4, title: postTitle, date: "April 2013", datecode: "apr2013", author: $scope.usr, category: postCategory, content: postContent});
        localStorageService.add("posts", $scope.posts);
    };

    $scope.writeAttempt = function () {
        //$scope.writeAttempResultString = "";
        if (!$scope.loginResult) {
            $scope.writeAttemptResultString = "You must be logged in to write posts";
        } else {
            $scope.writepost = !$scope.writepost;
            $scope.writeAttemptResultString = "";
        }
    };


}]);

