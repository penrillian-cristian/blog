"use strict";

ApplicationControllers.controller("HomeController", ["$scope", function($scope) {
    $scope.posts =[
            {id:1,title:"Post 1", date:"27-02-2014",author:"fm",category:"technology",content:"This is the first blog post"},
            {id:2,title:"Post 2", date:"27-02-2014",author:"ci",category:"technology",content:"This is the second blog post"},
            {id:3,title:"Post 3", date:"27-02-2014",author:"ca",category:"technology",content:"This is the third blog post"}
        ];
        //return posts;

}]);
