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
        /*var tripVehicle = $scope.myTrip.Vehicle.Id;
        var tripStartDate = $scope.myTrip.TripDate;
        var tripStartOdometer = $scope.myTrip.OdometerStart;
        var tripStopOdometer = $scope.tripStopOdometer; //New value from html file
        var tripStartPos = $scope.myTrip.AddressStart;
        var tripStopPos = $scope.myTrip.AddressStop;
        var tripErrand = $scope.myTrip.Errand;
        var tripNote = $scope.myTrip.Note;

        var data = {
            "Id": 0,
            "TripDate": tripStartDate,
            "OdometerStart": tripStartOdometer,
            "OdometerStop": tripStopOdometer,
            "AddressStart": tripStartPos,
            "AddressStop": tripStopPos,
            "Errand": tripErrand,
            "Note": tripNote,
            "Active": false
        };*/
        $scope.myTrip.OdometerStop = $scope.tripStopOdometer;
        $scope.myTrip.Active = false;

        //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
        $http.post("/api/Trip", $scope.myTrip, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $location.path("/home");
        });
    };

});