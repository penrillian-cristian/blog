"use strict";

ApplicationControllers.controller("HomeController", ["$scope", function($scope) {
    $scope.posts =[
            {id:1,title:"Sample Post Title 1", date:"27-02-2014",author:"Filip Machinia",category:"technology",content:"This is the first blog post"},
            {id:2,title:"Sample Post Title 2", date:"27-02-2014",author:"Cristian Ivascu",category:"technology",content:"This is the second blog post"},
            {id:3,title:"Sample Post Title 3", date:"27-02-2014",author:"Chris Allison",category:"technology",content:"This is the third blog post"}
        ];
        //return posts;

}]);
