"use strict";

ApplicationControllers.controller("HomeController", ["$scope", "localStorageService", function ($scope, localStorageService) {
    //localStorageService.clearAll();
    if(localStorageService.get("posts")){
        $scope.posts = localStorageService.get("posts");
    }else{
        $scope.posts = [{id: 1, title: "Post from February", date: "February 2014", datecode: "feb2014", author: "Filip Machinia", category: "technology", content: "This is the first blog post"},
            {id: 2, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Cristian Ivascu", category: "technology", content: "This is the second blog post"},
            {id: 3, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Chris Allison", category: "technology", content: "This is the third blog post"}];
    }


        /*[
        {id: 1, title: "Post from February", date: "February 2014", datecode: "feb2014", author: "Filip Machinia", category: "technology", content: "This is the first blog post"},
        {id: 2, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Cristian Ivascu", category: "technology", content: "This is the second blog post"},
        {id: 3, title: "Post from March", date: "March 2013", datecode: "mar2013", author: "Chris Allison", category: "technology", content: "This is the third blog post"}
    ];*/



    $scope.register = function (username, password) {
        $scope.output = "";

        if (!username || !password) {
            $scope.output = "Required fields are empty";

        }
        else {



            if (localStorageService.get(username)) {
                $scope.output = "Username already taken";
                return;
            }


            localStorageService.add(username, password);

            $scope.output = "Registration was successful";
        }

    };

    $scope.login = function (user, pass) {
        $scope.result = "";

        if (!user || !pass) {
            $scope.result = "Required fields are empty";

        } else {


            if (localStorageService.get(user) === pass) {
                $scope.result = "Login was successful";

            } else {
                $scope.result = "Invalid username or password";
            }


        }
    };

    $scope.writePost = function (postTitle, postCategory, postContent) {
        $scope.posts.push({id: 4, title: postTitle, date: "April 2013", datecode: "apr2013", author: "Cristian Ivascu", category: postCategory, content: postContent});
        localStorageService.add("posts", $scope.posts);
    };




}]);

