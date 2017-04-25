angular.module("journeyApp").controller('vehicleController', function ($scope, $location, $http, $routeParams) {

    $scope.myVehicles = [];
    $http.get("/api/Vehicle").then(function (response) {
        $scope.myVehicles = response.data;
    }, function (error) {
        //error
    });

    /*
    When user clicks on edit, load the vehicle with a ng-click function that passes
    the vehicle ID to formVehicle 
    */
    $scope.formVehicle = {};


    $scope.postVehicle = function () {

        var data = {
            "NumberPlate": form
        }

        $http.post("/api/Vehicle", data, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $location.path("/vehicle");
        });
    };
});