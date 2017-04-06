angular.module("journeyApp").controller('startController', function ($scope) {
    console.log(new Date());
    $scope.currentDate = new Date("mm/dd/yyyy");

    var promise = getLocation();

    $scope.getStartPos = function () {
        getLocation(function (addr) {
            console.log(addr, "(app.js)");
            $scope.startPos = addr;
        });
    }

    /*$scope.getDestPos = function () {
        getLocation(function (addr) {
            console.log(addr, "(app.js)");
            $scope.destPos = addr;
        });
    }*/

})