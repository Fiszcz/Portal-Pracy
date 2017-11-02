var app = angular.module('glowna', []);
app.controller('myCtrl', function($scope,$http) {
    $scope.czerwony = false;

    //Do Logowania
    $scope.wyslij = function () {
        if($scope.login === undefined || $scope.haslo === undefined){
            $scope.czerwony = 4;
            $scope.tekstBledu = "Wprowadz dane do logowania!";
            return;
        }
        var logowanieW = {login: $scope.login, haslo: $scope.haslo};
        logowanieW = JSON.stringify(logowanieW);
        $http({
            method : "POST",
            url : "gooddfsfs.com"
        }).then(function sukces(response) {
            if(response==2){
                $scope.czerwony = 4;
                $scope.tekstBledu = "Błędne dane do logowania!";
            }
            //przekierowanie
        }, function error(response) {
            $scope.czerwony = 4;
            $scope.tekstBledu = "Błąd podczas połączenia z serwerem";
        });
    };

    //Do Rejestracji
    $scope.zarejestruj = function () {
        $scope.bladHasla = false;
        $scope.bladLoginu = false;
        $scope.bladEmail = false;
        if((''+$scope.loginRejestracja).length < 5 || $scope.loginRejestracja === undefined) {
            $scope.bladLoginu = true;
            $scope.trescBladLoginu = "Podałeś zbyt krótki login";
        }
        if((''+$scope.haslo1).length < 7 || $scope.haslo1 === undefined){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Zbyt krótkie hasło!";
        }
        else if($scope.haslo1 != $scope.haslo2){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Podane hasła nie są takie same!";
        }
        if ($scope.email === undefined){
            $scope.bladEmail = true;
            $scope.trescBladEmail = "Do rejestracji potrzebny jest twój adres E-mail!";
        }
        $scope.bladPliku = false;
        if ($('#zdjecie')[0].files[0].size > 3000000){
            $scope.bladPliku = true;
            $scope.trescBladPliku = "Plik jest zbyt duży!";
        }
        $scope.bladPliku2 = false;
        if ($('#CV')[0].files[0].size > 3000000){
            $scope.bladPliku2 = true;
            $scope.trescBladPliku2 = "Plik jest zbyt duży!";
        }

        if($scope.bladLoginu || $scope.bladPliku || $scope.bladPliku2 || $scope.bladHasla || $scope.bladEmail)
            return;

        var rejestracjaW = {
            login: $socpe.loginRejestracja,
            haslo: $scope.haslo1,
            email: $scope.email,
            imie: $scope.imie,
            nazwisko: $scope.nazwisko,
            telefon: $scope.telefon,
            adres: $scope.adres,
            minimalne: $scope.minimalne,
            wyksztalcenie: $scope.wyksztalcenie,
            doswiadczenie: $scope.doswiadczenie,
            osiagniecia: $scope.osiagniecia,
            rodzaj: $scope.zlecenie + $scope.stala + $scope.praktyki,
            data: $scope.data.toString()
        };
        rejestracjaW = JSON.stringify(rejestracjaW);
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