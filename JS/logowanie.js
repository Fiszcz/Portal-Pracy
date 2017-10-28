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
        $scope.bladHasla = false;
        $scope.bladLoginu = false;
        if($scope.login+''.length < 5) {
            $scope.bladLoginu = true;
            $scope.trescBladLoginu = "Podałeś zbyt krótki login";
        }
        if($scope.haslo1+''.length < 7 ){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Zbyt krótkie hasło!";
            return;
        }
        if($scope.haslo1 != $scope.haslo2){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Podane hasła nie są takie same!";
            return;
        }
        if($scope.bladLoginu == true)
            return;
        $http({
            method : "POST",
            url : "gooddfsfs.com"
        }).then(function sukces(response) {
            if(response == 2){
                $scope.bladLoginu = 1;
                $scope.trescBladLoginu = "Taki login już istnieje. Wybierz inny!";
            }
            else if(response == 3){
                $scope.bladEmail = 1;
                $scope.trescBladEmail = "Taki adres e-mail już widnieje w naszej bazie danych";
            }
            else {}
            //przekierowanie
        });
    }
});