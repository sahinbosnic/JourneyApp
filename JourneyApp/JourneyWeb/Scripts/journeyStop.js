angular.module("journeyApp").controller('stopController', function ($scope, $location, $http, $routeParams) {
    var tripId = $routeParams.tripId;
 
    $scope.myTrip = [];
    var url = "/api/Trip/" + tripId;
    console.log(url);
    $http.get(url).then(function (response) {
        $scope.myTrip = response.data;
        console.log($scope.myTrip);
    }, function (error) {
        //error
    });


    var location = "";
    getLocation(function (addr) {
        location = addr;
    });

    //Set current location
    $scope.setStartPos = function () {
        $scope.tripStopPos = location;
    }


    //Submit form and start a new trip
    $scope.stopTrip = function () {
        $scope.myTrip.OdometerStop = $scope.tripStopOdometer;
        $scope.myTrip.Active = false;

        //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
        $http.post("/api/Trip", $scope.myTrip, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $location.path("/home");
        });
    };

});