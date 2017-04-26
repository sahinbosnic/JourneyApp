angular.module("journeyApp").controller('homeController', function ($scope, $http) {

    $scope.startUrl = "#!/start";
    $scope.startMessage = "Starta en ny resa";

    //Get all trips
    $scope.myTrips = null;
    $http.get("/api/Trip").then(function (response) {
        $scope.myTrips = response.data;

        //Check if there's any active trips
        var tripIsActive = $scope.myTrips.find(activeTrip);
        if (tripIsActive !== undefined) {
            console.log("disable please");
            disableNewTrip();
        }

    }, function (error) {
        console.log(error, "Contact an administrator");
    });

    //returns first active trip
    function activeTrip(trip){ if (trip.Active == true){ return true; }}

    //Disable creation of a new trip until all existing trips are finnished
    function disableNewTrip()
    {
        $scope.startUrl = "#!/home";
        $scope.startMessage = "Slutför din nuvarande resa först";
    }

});