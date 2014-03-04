"use strict";
//,"ngStorage"
var ApplicationControllers;

ApplicationControllers = angular.module("Application.Controllers", []);

angular.module("Application", ["Application.Controllers", "Application.Templates", "ngRoute"])
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/home", {controller: "HomeController", templateUrl: "html/gpp/home.html"})
            .otherwise({redirectTo: "/home"});
    }]);

