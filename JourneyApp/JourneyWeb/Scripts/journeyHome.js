angular.module("journeyApp").controller('homeController', function ($scope, $http) {

    $scope.myTrips = [];
    $http.get("/api/Trip").then(function (response) {
        $scope.myTrips = response.data;
        console.log($scope.myTrips);
    }, function (error) {
        //error
    });

});