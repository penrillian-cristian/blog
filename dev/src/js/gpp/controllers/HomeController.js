"use strict";
/*jslint browser:true */

ApplicationControllers.controller("HomeController", ["$scope", "localStorageService", function ($scope, localStorageService) {

    $scope.allDisplayed = true;
    $scope.topPostsArray = [];
    $scope.selectedMonthArray = [];
    $scope.offset = 0;
    $scope.monthFilterSet = false;
    $scope.id = 4;
    $scope.write = false;
    $scope.commentPressed = false;
    $scope.isCommentText = false;
    $scope.mainPage = true;

    $scope.clearFunc = function () {
        localStorageService.clearAll();
    };

    if (localStorageService.get("posts")) {
        $scope.posts = localStorageService.get("posts");
    } else {
        $scope.posts = [
            {id: 1, title: "Post from February", date: "February 2014", datecode: "feb2014", author: "Filip Machinia", category: "Technology", content: "This is the first blog post", commentText: ""},
            {id: 2, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Cristian Ivascu", category: "Technology", content: "This is the second blog post", commentText: ""},
            {id: 3, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Chris Allison", category: "Media", content: "This is the third blog post", commentText: ""}
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


    $scope.register = function (username, password, email) {
        $scope.loginResultString = "";
        $scope.registerResultString = "";
        $scope.registerResult = false;

        if (!username || !password || !email) {
            $scope.registerResultString = "Required fields are empty";
            $scope.registerResult = false;
        }
        else {

            if (!$scope.emailCheck(email)) {
                $scope.registerResultString = "Invalid email address";
                $scope.registerResult = false;
                return;
            }

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

            $scope.username = "";
            $scope.password = "";
            $scope.email = "";
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
                $scope.user = "";
                $scope.pass = "";

            } else {
                $scope.loginResultString = "Invalid username or password";
                $scope.loginResult = false;
            }


        }

    };

    $scope.updateEmail = function (email) {
        email = 5;
    };

    $scope.clearResults = function () {
        var logUsernameField = document.getElementById("loginUsernameField");
        var logPasswordField = document.getElementById("loginPasswordField");

        logUsernameField.value = "";
        logPasswordField.value = "";

        var regUsernameField = document.getElementById("registerUsernameField");
        var regPasswordField = document.getElementById("registerPasswordField");

        regUsernameField.value = "";
        regPasswordField.value = "";

        $scope.registerResult = false;
        $scope.loginResult = false;
        $scope.registerResultString = "";
        $scope.loginResultString = "";
    };

    $scope.clearWriteFields = function () {
        var titleField = document.getElementById("pTitle");
        var categoryField = document.getElementById("pCategory");
        var textField = document.getElementById("pText");

        titleField.value = "";
        categoryField.value = "";
        textField.value = "";

    };
    $scope.writePost = function (postTitle, postCategory, postContent) {


        if (postTitle && postCategory && postContent) {
            $scope.writePostError = "";
            var currentPost = {id: $scope.id, title: postTitle, date: "April 2013", datecode: "apr2013", author: $scope.usr, category: postCategory, content: postContent};
            $scope.id++;
            $scope.posts.unshift(currentPost);
            localStorageService.add("posts", $scope.posts);

            $scope.topPostsArray = $scope.posts.slice(0, 5);

            $scope.write = false;//!$scope.write;
            $scope.clearWriteFields();
            $scope.postTitle = "";
            $scope.postCategory = "";
            $scope.postContent = "";
        }
        else {
            $scope.writePostError = "Required fields are empty";
            $scope.write = true;//!$scope.write;
        }


    };

    $scope.editPost = function (userID) {
        var editedText = document.getElementById("editedPost").value;
        if (editedText) {

            for (var j = 0; j < $scope.posts.length; j++) {
                if ($scope.posts[j].id === userID) {
                    $scope.posts[j].content = editedText;
                    localStorageService.add("posts", $scope.posts);
                    break;
                }
            }
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

    $scope.deletePost = function (postId) {

        if ($scope.monthFilterSet) {
            $scope.sizeLimit = $scope.selectedMonthArray.length;
            $scope.arrayToDelete = $scope.selectedMonthArray;


            for (var i = 0; i < $scope.sizeLimit; i++) {
                if ($scope.arrayToDelete[i].id === postId) {
                    $scope.arrayToDelete.splice(i, 1);
                    break;
                }
            }

        } else {
            $scope.sizeLimit = $scope.posts.length;
            $scope.arrayToDelete = $scope.posts;
        }

        for (var j = 0; j < $scope.posts.length; j++) {
            if ($scope.posts[j].id === postId) {
                $scope.posts.splice(j, 1);
                localStorageService.add("posts", $scope.posts);
                break;
            }
        }
        $scope.displayPosts();
    };

    $scope.writeComment = function (text, id) {
        for (var j = 0; j < $scope.posts.length; j++) {
            if ($scope.posts[j].id === id) {
                $scope.posts[j].commentText = $scope.usr + " says: " + "'" + text + "'";
                localStorageService.add("posts", $scope.posts);
                break;
            }
        }
    };

    $scope.emailCheck = function (userMail) {
        var validFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validFormat.test(userMail);
    };


}]);

