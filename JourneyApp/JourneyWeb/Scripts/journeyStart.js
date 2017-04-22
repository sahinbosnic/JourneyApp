angular.module("journeyApp").controller('startController', function ($scope, $http, $location) {

    //Get vehicle list for logged in user
    $scope.tripVehicle = null;
    $scope.myVehicles = [];
    $http.get("/api/Vehicle").then(function (response) {
        $scope.myVehicles = response.data
    }, function (error) {
        //error
    });

    //Get today's date and apply it to startdate
    var today = new Date();
    $scope.currentDate = today.toISOString().substring(0, 10);

    //Get current location 
    var location = "";
    getLocation(function (addr) {
        console.log(addr, "(journeyStart.js)");
        location = addr;
    });

    //Set current location
    $scope.setStartPos = function () {
        $scope.tripStartPos = location;
    }

    //Submit form and start a new trip
    $scope.startTrip = function () {
        var tripVehicle = $scope.tripVehicle;
        var tripStartDate = $scope.tripStartDate.toISOString().substring(0, 10);
        var tripOdometer = $scope.tripOdometer;
        var tripStartPos = $scope.tripStartPos;
        var tripStopPos = $scope.tripStopPos;
        var tripErrand = $scope.tripErrand;
        var tripNote = $scope.tripNote;

        var data = {
            "Id": 0,
            "TripDate": tripStartDate,
            "OdometerStart": tripOdometer,
            "OdometerStop": 123457,
            "AddressStart": tripStartPos,
            "AddressStop": tripStopPos,
            "Errand": tripErrand,
            "Note": tripNote,
            "Active": true
        };

        $.ajax({
            type: 'post',
            datatype: "json",
            data: data,
            url: "/api/Trip",
            success: function (data) {
                $scope.$apply(function () {
                    $location.path("/home");
                });
            }
        });
    };

})