angular.module("journeyApp", ['ngRoute']);

angular.module("journeyApp").config(

    function ($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "/templates/routing/home.html",
            controller: 'homeController'
        })
        .when("/journey", {
            templateUrl: "/templates/routing/journey.html",
            controller: 'journeyController'
        })
        .when("/start", {
            templateUrl: "/templates/routing/start.html",
            controller: 'startController'
        })
        .when("/stop", {
                templateUrl: "/templates/routing/stop.html",
                controller: 'stopController'
            })
        .when("/404", {
            templateUrl: "/templates/routing/404.html",
            controller: '404'
        })
        .otherwise({
            redirectTo: "/404"
        });
    }).controller('homeController', function ($scope) {

    }).controller('startController', function ($scope) {
        console.log(new Date());
        //$scope.currentDate = new Date();

    }).controller('stopController', function ($scope) {

    }).controller('journeyController', function ($scope) {

    });
