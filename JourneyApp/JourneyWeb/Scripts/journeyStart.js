angular.module("journeyApp").controller('startController', function ($scope, $http) {

    //Get vehicle list for logged in user
    $scope.tripVehicle = null;
    $scope.myVehicles = [];
    $.ajax({
        type: 'get',
        datatype: "json",
        url: "/api/Vehicle",
        success: function (data) {
            $scope.$apply(function () {
                $scope.myVehicles = data;
            })
        }
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
        $scope.startPos = location;
    }

    //Submit form and start a new trip
    $scope.startTrip = function () {
        var tripVehicle = $scope.tripVehicle;
        //var tripStartDate = $scope.currentDate.toISOString().substring(0, 10);
        var tripOdometer = $scope.tripOdometer;
        var tripStartPos = $scope.tripStartPos;
        var tripStopPos = $scope.tripStopPos;
        var tripErrand = $scope.tripErrand;
        var tripNote = $scope.tripNote;

        console.log(tripVehicle, "tripVehicle");
        //console.log(tripStartDate, "tripStartDate");
        console.log(tripOdometer, "tripOdometer");
        console.log(tripStartPos, "tripStartPos");
        console.log(tripStopPos, "tripStopPos");
        console.log(tripErrand, "tripErrand");
        console.log(tripNote, "tripNote");
    };

})

/*
{
    "Id": 3,
    "TripDate": "2017-04-21T00:00:00",
    "OdometerStart": 123457,
    "OdometerStop": 123457,
    "AddressStart": "Gnosjö",
    "AddressStop": "Jönköping",
    "Errand": "Jobbaaaar",
    "Note": null,
    "Active": true,
    //"User": "af942837-4e15-4582-9acf-ec155420604f",
    //"Vehicle": 1
  }
*/