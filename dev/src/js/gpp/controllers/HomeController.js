"use strict";

ApplicationControllers.controller("HomeController", ["$scope", "localStorageService", function ($scope, localStorageService) {

    $scope.allDisplayed = true;
    $scope.topPostsArray = [];
    $scope.selectedMonthArray = [];
    $scope.offset = 0;
    $scope.monthFilterSet = false;

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

    $scope.displayPosts = function () {
        if ($scope.monthFilterSet) {
            $scope.topPostsArray = $scope.selectedMonthArray.slice(0 + $scope.offset, 5 + $scope.offset);
        } else {
            $scope.topPostsArray = $scope.posts.slice(0 + $scope.offset, 5 + $scope.offset);
        }
    };
    $scope.displayPosts();

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
        var currentPost = {id: 4, title: postTitle, date: "April 2013", datecode: "apr2013", author: $scope.usr, category: postCategory, content: postContent};
        $scope.posts.unshift(currentPost);
        localStorageService.add("posts", $scope.posts);

        $scope.topPostsArray = $scope.posts.slice(0, 5);

        //$scope.counter++;
        /* if($scope.topPostsArray.length == 5){
         $scope.topPostsArray.splice($scope.topPostsArray.length-1,1);
         }
         $scope.topPostsArray.unshift(currentPost);*/
        //localStorageService.add("topPosts", $scope.topPostsArray);
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

    $scope.setMonth = function (month) {
        $scope.offset = 0;
        $scope.desiredMonth = month;
        $scope.topPostsArray = [];
        $scope.selectedMonthArray = [];
        for (var i = 0; i < $scope.posts.length; i++) {
            if ($scope.posts[i].datecode === month) {
                $scope.selectedMonthArray.push($scope.posts[i]);
            }
        }
        $scope.monthFilterSet = true;
        $scope.displayPosts();
        //$scope.topPostsArray = $scope.selectedMonthArray.slice(0,5);
        //$scope.init($scope.selectedMonthArray);
    };

    $scope.allDisplayed = function () {
        $scope.offset = 0;
        //$scope.topPostsArray = $scope.posts.slice(0,5);
        //$scope.init($scope.posts);
        $scope.monthFilterSet = false;
        $scope.displayPosts();
    };

    $scope.movePage = function (direction) {
        if (direction === "right") {
            if ($scope.monthFilterSet) {
                $scope.sizeLimit = $scope.selectedMonthArray.length;
            } else {
                $scope.sizeLimit = $scope.posts.length;
            }

            if ($scope.offset + 5 < $scope.sizeLimit) {
                $scope.offset += 5;
            }
        } else {
            if ($scope.offset !== 0) {
                $scope.offset -= 5;
            }
        }
        $scope.displayPosts();

    };


}]);

