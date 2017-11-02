var app = angular.module('ONas', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.wyslij = function () {
        if($scope.wiadomosc === undefined){
            $scope.blad = true;
            return;
        }
        //wyslanie
    }
});