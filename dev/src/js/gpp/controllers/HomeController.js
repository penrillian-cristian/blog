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
    $scope.categories = ["Media", "Technology", "Food"];
    //$scope.emails = [];
    $scope.currentUser = [];
    $scope.users = [
        {username: "user", password: "abc", email: "test@tt.com"}
    ];
    $scope.oldest = false;

    //$scope.months = ["February 2014","January 2014","December 2013","November 2013","October 2013","September 2013","August 2013","July 2013","June 2013","May 2013","April 2013","March 2013"];

    //$scope.createUploadButton();

    if (localStorageService.get("months")) {
        $scope.months = localStorageService.get("months");
    } else {
        $scope.months = ["February 2014", "January 2014", "December 2013", "November 2013", "October 2013", "September 2013", "August 2013", "July 2013", "June 2013", "May 2013", "April 2013", "March 2013"];
        localStorageService.add("months", $scope.months);
    }

    $scope.clearFunc = function () {
        localStorageService.clearAll();
    };

    if (localStorageService.get("posts")) {
        $scope.posts = localStorageService.get("posts");
        $scope.users = localStorageService.get("users");
    } else {
        $scope.posts = [
            {id: 1, title: "Post from February", date: "February 2014", datecode: "February 2014", author: "Filip Machinia", category: $scope.categories[1], content: "This is the first blog post", commentText: ""},
            {id: 2, title: "Post from March", date: "March 2013", datecode: "March 2013", author: "Cristian Ivascu", category: $scope.categories[1], content: "This is the second blog post", commentText: ""},
            {id: 3, title: "Post from March", date: "March 2013", datecode: "March 2013", author: "Chris Allison", category: $scope.categories[0], content: "This is the third blog post", commentText: ""}
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


    $scope.register = function (username, password, userEmail) {
        $scope.loginResultString = "";
        $scope.registerResultString = "";
        $scope.registerResult = false;

        if (!username || !password || !userEmail) {
            $scope.registerResultString = "Required fields are empty";
            $scope.registerResult = false;
        }
        else {

            if (!$scope.emailCheck(userEmail)) {
                $scope.registerResultString = "Invalid email address";
                $scope.registerResult = false;
                return;
            }

            if (localStorageService.get(username)) {
                $scope.registerResultString = "Username already taken";
                $scope.registerResult = false;
                return;
            }


            //localStorageService.add(username, password);

            $scope.registerResultString = "Registration was successful";
            $scope.registerResult = true;
            $scope.loginResult = true;

            $scope.users.push(username, password, userEmail);
            $scope.currentUser = [username, password, userEmail];
            localStorageService.add("users", $scope.users);

            //$scope.usr = username;
            //$scope.emails.push(userEmail);

            $scope.username = "";
            $scope.password = "";
            $scope.userEmail = "";
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

            var userIndex = $scope.getUserIndex(user);
            //if (localStorageService.get($scope.users[user].username) === user) {
            if (userIndex) {
                if ($scope.users[userIndex].username === user) {
                    $scope.loginResultString = "Login was successful";
                    $scope.loginResult = true;
                    $scope.usr = user;
                    //$scope.emails = localStorageService.get("emails");

                    $scope.user = "";
                    $scope.pass = "";
                }
            } else {
                $scope.loginResultString = "Invalid username or password";
                $scope.loginResult = false;
            }


        }

    };

    $scope.getUserIndex = function (usrName) {

        for (var index = 0; index < $scope.users.length; index++) {
            if ($scope.users[index].username === usrName) {
                return index;
                //break;
            }
            else if (index + 1 === $scope.users.length) {
                return false;
            }

        }
        //return false;
    };

    $scope.updateEmail = function (newEmail) {
        if (!$scope.emailCheck(newEmail)) {
            $scope.emailResultString = "Invalid email address";
        }
        else if ($scope.email === newEmail) {
            $scope.emailResultString = "New email address is the same as the old one";
        }
        else {
            //TODO change to array
            $scope.emails = newEmail;
            localStorageService.add("emails", newEmail);
            $scope.emailResultString = "Change successful";

            var newEmailField = document.getElementById("emailChange");
            newEmailField.value = "";
        }

    };

    $scope.addCategory = function (category) {
        $scope.categories.push(category);
        localStorageService.add("category", $scope.categories);
        var newCategoryField = document.getElementById("newCategory");
        newCategoryField.value = "";

    };

    $scope.createUploadButton = function () {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "file");
        document.body.appendChild(x);
    };


    $scope.clearResults = function () {
        var logUsernameField = document.getElementById("loginUsernameField");
        var logPasswordField = document.getElementById("loginPasswordField");

        logUsernameField.value = "";
        logPasswordField.value = "";

        var regUsernameField = document.getElementById("registerUsernameField");
        var regPasswordField = document.getElementById("registerPasswordField");
        var regEmailField = document.getElementById("emailAddress");

        regUsernameField.value = "";
        regPasswordField.value = "";
        regEmailField.value = "";

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

        var date = new Date();
        var dateString = $scope.monthMapping(date.getMonth()) + " " + date.getFullYear();
        if (localStorageService.get("months")[0] !== dateString) {
            $scope.months.unshift(dateString);
            $scope.months.splice($scope.months.length - 1, 1);
            localStorageService.add("months", $scope.months);
        }

        if (postTitle && postCategory && postContent) {
            $scope.writePostError = "";
            var currentPost = {id: $scope.id, title: postTitle, date: date.getDate() + " " + dateString, datecode: dateString, author: $scope.usr, category: postCategory, content: postContent};
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
        var editedText = document.getElementById("edited" + userID).value;
        //if (editedText.length) {

        for (var j = 0; j < $scope.posts.length; j++) {
            if ($scope.posts[j].id === userID) {
                $scope.posts[j].content = editedText;
                localStorageService.add("posts", $scope.posts);
                break;
            }
        }
        $scope.userID = "";
        //}
        //editedText = "";
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
                $scope.posts[j].commentText += "\n\n"+$scope.usr + " says: " + "'" + text + "'";
                localStorageService.add("posts", $scope.posts);
                break;
            }
        }
    };

    $scope.emailCheck = function (userMail) {
        var validFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validFormat.test(userMail);
    };

    $scope.monthMapping = function (monthNumber) {
        var monthString;
        switch (monthNumber) {
            case 0:
                monthString = "January";
                break;
            case 1:
                monthString = "February";
                break;
            case 2:
                monthString = "March";
                break;
            case 3:
                monthString = "April";
                break;
            case 4:
                monthString = "May";
                break;
            case 5:
                monthString = "June";
                break;
            case 6:
                monthString = "July";
                break;
            case 7:
                monthString = "August";
                break;
            case 8:
                monthString = "September";
                break;
            case 9:
                monthString = "October";
                break;
            case 10:
                monthString = "November";
                break;
            case 11:
                monthString = "December";
                break;

        }

        return monthString;
    };

    $scope.sort = function(order){
         if(order === "seeRecent"){
             if ($scope.oldest){
                 $scope.oldest = false;
                 $scope.selectedMonthArray.reverse();
                 $scope.posts.reverse();
                 $scope.displayPosts();
             }
         } else{
             if (!$scope.oldest){
                 $scope.oldest = true;
                 $scope.selectedMonthArray.reverse();
                 $scope.posts.reverse();
                 $scope.displayPosts();
             }
         }
    };


}]);

//TODO
//angular filter for month mapping
//angular user service for storing data
//second Controller in controllers folder