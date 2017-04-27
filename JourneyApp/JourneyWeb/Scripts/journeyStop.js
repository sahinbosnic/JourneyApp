angular.module("journeyApp").controller('stopController', function ($scope, $location, $http, $routeParams) {
    //$scope.menu = getMenu();

    var tripId = $routeParams.tripId;
  
    $scope.myTrip = null;
    var url = "/api/Trip/" + tripId;
    console.log(url);
    $http.get(url).then(function (response) {
        $scope.myTrip = response.data;
        $scope.myTrip.OdometerStop = $scope.myTrip.OdometerStart;
        console.log($scope.myTrip);
    }, function (error) {
        //error
    });


    var location = "";
    getLocation(function (addr) {
        location = addr;
    });

    //Set current location
    $scope.setStopPos = function () {
        $scope.myTrip.AddressStop = location;
    }


    $scope.stopTrip = function () {
        console.log($scope.myTrip,"test");
        $scope.myTrip.Active = false;

        //$http.post('/someUrl', data, config).then(successCallback, errorCallback);
        $http.post("/api/Trip", $scope.myTrip, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            $location.path("/home");
        });
    };

});