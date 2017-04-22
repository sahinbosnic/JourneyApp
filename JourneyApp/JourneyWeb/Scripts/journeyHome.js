angular.module("journeyApp").controller('homeController', function ($scope, $http) {

    $scope.myTrips = [];
    $http.get("/api/Vehicle").then(function (response) {
        $scope.myTrips = response.data
    }, function (error) {
        //error
    });

});