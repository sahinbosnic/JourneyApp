angular.module("journeyApp", ['ngRoute']);

angular.module("journeyApp").config([
    "$routeProvider",
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
        .when("/stop/:tripId", {
            templateUrl: "/Templates/Routing/stop.html",
            controller: 'stopController'
        })
        .when("/vehicle", {
            templateUrl: "/Templates/Routing/vehicle.html",
            controller: 'vehicleController'
        })
        .when("/stats", {
            templateUrl: "/Templates/Routing/stats.html",
            controller: 'statsController'
        })
        .when("/404", {
            templateUrl: "/Templates/Routing/404.html",
            controller: '404'
        })
        .otherwise({
            redirectTo: "/404"
        });
    }]);
