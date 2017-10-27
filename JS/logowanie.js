var app = angular.module('glowna', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.czerwony = false;
    $scope.wyslij = function () {
        $http({
            method : "POST",
            url : "gooddfsfs.com"
        }).then(function sukces(response) {
            //przekierowanie
        }, function error(response) {
            $scope.czerwony = 4;
            if(response==2){
                $scope.tekstBledu = "Błędne dane do logowania!";
            }
            else {
                $scope.tekstBledu = "Błąd podczas połączenia z serwerem";
            }
        });
    };
    $scope.zarejestruj = function () {
        if($scope.haslo1 != $scope.haslo2){

        }
    }
});