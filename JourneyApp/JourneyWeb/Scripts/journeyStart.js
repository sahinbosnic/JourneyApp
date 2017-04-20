angular.module("journeyApp").controller('startController', function ($scope) {
    //Get vehicle list for logged in user
    getMyVehicles(function (myVehicles) {
        $scope.myVehicleList = myVehicles;
        console.log($scope.myVehicleList);
    });

    //console.log(new Date());
    var today = new Date();
    $scope.currentDate = new Date();
    //console.log(today.getFullYear + '/' + (today.getMonth + 1) + '/' + today.getDate); 

    $scope.getStartPos = getLocation(function (addr) {
            console.log(addr, "(journeyStart.js)");
            $scope.startPos = addr;
        });



})