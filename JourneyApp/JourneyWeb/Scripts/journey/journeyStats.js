angular.module("journeyApp").controller('statsController', ["$scope", "$http", "$location", "$window", function ($scope, $http, $location, $window) {

    $scope.myVehicles = null;
    $scope.selectedVehicle = null;
    $scope.selectedTrips = null;
    $scope.showPdfButton = false;

    $http.get("/api/Vehicle").then(function (response) {
        $scope.myVehicles = response.data;
    }, function (error) {
        //error
    });

    $scope.setVehicle = function (vehicle) {
        $scope.showPdfButton = false;
        $scope.selectedVehicle = null;
        $scope.selectedTrips = null;
        $scope.selectedVehicle = vehicle;
    }

    $scope.getAllTrips = function () {
        if ($scope.selectedVehicle.NumberPlate == null) {

        }

        //api / Trip / getAll / { id }
        $http.get("/api/Trip/getAll/" + $scope.selectedVehicle.Id).then(function (response) {
            $scope.selectedVehicle.Trips = response.data;
            $scope.fillDiagram()
        }, function (error) {
            //error
        });
    };

    $scope.fillDiagram = function () {
        $scope.selectedTrips = [];

        //Filter out trips after date
        for (var i in $scope.selectedVehicle.Trips) {
            if ($scope.selectedVehicle.Trips[i].TripDate.substring(0, 10) > $scope.selectedVehicle.DateStart.toISOString().substring(0, 10) &&
                $scope.selectedVehicle.Trips[i].TripDate.substring(0, 10) < $scope.selectedVehicle.DateStop.toISOString().substring(0, 10)) {
                //$scope.selectedTrips.push($scope.selectedVehicle.Trips[i]);
                //console.log($scope.selectedVehicle.Trips[i]);
                $scope.selectedTrips.push($scope.selectedVehicle.Trips[i]);
            }
        }

        var tripData = { Set0: 0, Set21: 0, Set51: 0, Set201: 0 };
        //Filter out trips by distance traveled
        for (var i in $scope.selectedTrips) {
            if (($scope.selectedTrips[i].OdometerStop - $scope.selectedTrips[i].OdometerStart) >= 201) {
                tripData.Set201 += 1;
            }
            else if (($scope.selectedTrips[i].OdometerStop - $scope.selectedTrips[i].OdometerStart) >= 51) {
                tripData.Set51 += 1;
            }
            else if (($scope.selectedTrips[i].OdometerStop - $scope.selectedTrips[i].OdometerStart) >= 21) {
                tripData.Set21 += 1;
            }
            else if (($scope.selectedTrips[i].OdometerStop - $scope.selectedTrips[i].OdometerStart) >= 0) {
                tripData.Set0 += 1;
            }
        }

        //render chart
        $scope.drawChart(tripData);

        //Enable PDF generation
        $scope.showPdfButton = true;

        console.log($scope.selectedTrips);
    };

    //Render chart
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback($scope.drawChart);

    $scope.drawChart = function (tripData) {
        var data = google.visualization.arrayToDataTable([
          ['Längd på resor', 'Antal resor'],
          ['0-20km', tripData.Set0],
          ['21-50km', tripData.Set21],
          ['51-200km', tripData.Set51],
          ['201+km', tripData.Set201],
        ]);

        //var data = google.visualization.arrayToDataTable(tripData);

        var options = {
            title: 'Statistik över resor och längd',
            pieHole: 0.2,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    $scope.generatePDF = function () {
        $http.post("/api/pdf/generate", $scope.selectedTrips, { headers: { 'Content-Type': 'application/json' } })
        .then(function (data) {
            console.log(data);
            $window.open(data.data, '_blank');
            //$location.path("/home");
        });

    }
}]);