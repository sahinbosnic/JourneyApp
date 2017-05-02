angular.module("journeyApp").controller('mainController', ["$scope", function ($scope) {
    $scope.menu = [
        '<div class="home-button-wrapper">',
        '<a class="btn btn-default" href="#!/home">Hem</a>',
        '<a class="btn btn-default" href="#!/vehicle">Mina fordon</a>',
        '<a class="btn btn-default" href="#!/account">Mitt konto</a>',
        '<a class="btn btn-default" href="#!/statistics">Statistik</a>',
        '</div>'].join("");

    console.log($scope.menu);

    $scope.renderMenu = function () {
        return ['<div class="home-button-wrapper">',
        '<a class="btn btn-default" href="#!/home">Hem</a>',
        '<a class="btn btn-default" href="#!/vehicle">Mina fordon</a>',
        '<a class="btn btn-default" href="#!/account">Mitt konto</a>',
        '<a class="btn btn-default" href="#!/statistics">Statistik</a>',
        '</div>'].join("");
    };
    /*$scope.menu = [
        {url: "#!/home", text: "Hem"},
        {url: "#!/vehicle", text: "Mina Fordon"},
        {url: "/Manage", text: "Mitt konto"},
        {url: "#!/home", text: "Statistik"},
    ];*/
}]);