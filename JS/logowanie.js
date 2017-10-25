var app = angular.module('glowna', []);
app.controller('logowanie', function($scope, $http) {
    $scope.submit = function ($scope, $http) {
        $http({
            method : "GET",
            url : ""
        }).then(function sukces(response) {

        }, function error(response) {
            $scope.myWelcome = response.statusText;
        });
    }
});