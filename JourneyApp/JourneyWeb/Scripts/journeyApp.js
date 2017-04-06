angular.module("journeyApp", ['ngRoute']);

angular.module("journeyApp").config(

    function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "/Templates/Routing/home.html",
            controller: 'homeController'
        })
        .when("/home", {
            templateUrl: "/Templates/Routing/home.html",
            controller: 'homeController'
        })
        .when("/start", {
            templateUrl: "/Templates/Routing/start.html",
            controller: 'startController'
        })
        .when("/stop", {
            templateUrl: "/Templates/Routing/stop.html",
            controller: 'stopController'
        })
        .when("/404", {
            templateUrl: "/Templates/Routing/404.html",
            controller: '404'
        })
        .otherwise({
            redirectTo: "/404"
        });
    }).controller('homeController', function ($scope) {

    }).controller('stopController', function ($scope) {

    });
