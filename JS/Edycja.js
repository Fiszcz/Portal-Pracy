var app = angular.module('edycja', []);
app.controller('myCtrl', function($scope,$http) {
    /*$scope.technologie = [   //testowe
        {"id":1,"nazwa":"java","poziom":3},
        {"id":8,"nazwa":"java","poziom":3},
        {"id":3,"nazwa":"java","poziom":2},
        {"id":4,"nazwa":"java","poziom":3},
    ];*/
    $scope.zapisz = function () {
        $scope.bladHasla = false;
        $scope.bladLoginu = false;
        $scope.bladEmail = false;
        if((''+$scope.haslo1).length < 7 || $scope.haslo1 !== undefined){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Zbyt krótkie hasło!";
        }
        else if($scope.haslo1 != $scope.haslo2){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Podane hasła nie są takie same!";
        }
        if ($scope.email === undefined){
            $scope.bladEmail = true;
            $scope.trescBladEmail = "Potrzebny jest twój adres E-mail!";
        }
        $scope.bladPliku = false;
        if ($('#zdjecie')[0].files[0] !== undefined && $('#zdjecie')[0].files[0].size > 3000000){
            $scope.bladPliku = true;
            $scope.trescBladPliku = "Plik jest zbyt duży!";
        }
        $scope.bladPliku2 = false;
        if ($('#CV')[0].files[0] !== undefined && $('#CV')[0].files[0].size > 3000000){
            $scope.bladPliku2 = true;
            $scope.trescBladPliku2 = "Plik jest zbyt duży!";
        }

        if($scope.bladPliku || $scope.bladPliku2 || $scope.bladHasla || $scope.bladEmail)
            return;

        alert($scope.stala);

        daneOsobowe.haslo = $scope.haslo1;
        daneOsobowe.email= $scope.email; 
        daneOsobowe.imie= $scope.imie;
        daneOsobowe.nazwisko = $scope.nazwisko;
        daneOsobowe.telefon = $scope.telefon;
        daneOsobowe.adres = $scope.adres;
        daneOsobowe.minimalne = $scope.placaOd;
        daneOsobowe.wyksztalcenie = $scope.wyksztalcenie;
        daneOsobowe.doswiadczenie = $scope.doswiadczenie;
        daneOsobowe.osiagniecia = $scope.osiagniecia;
        daneOsobowe.rodzaj.stala = $scope.stala;
        daneOsobowe.rodzaj.praktyki = $scope.praktyki;
        daneOsobowe.rodzaj.zlecenie = $scope.zlecenie;
        daneOsobowe.data = $scope.data.toString();

        daneOsobowe = JSON.stringify(daneOsobowe);

        $http({
            method : "POST",
            url : "gooddfsfs.com"
        }).then(function sukces(response) {
            if(response == 3){
                $scope.bladEmail = 1;
                $scope.trescBladEmail = "Taki adres e-mail jest już przypisany do innego użytkownika";
            }
            else {}
            //przekierowanie
        });
    };

    //////Obsluga tabelki z technologiami
    $scope.usunTechnologie = function (idTechnologii) {
        var index = -1;
        var comArr = eval( $scope.technologie );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === idTechnologii ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.technologie.splice( index, 1 );
    };
    $scope.zmienPoziom = function (idTechnologii, poziom) {
        for(var i = 0; i < $scope.technologie.length; i++) {
            if ($scope.technologie[i].id == idTechnologii){
                $scope.technologie[i].poziom = poziom;
                break;
            }
        }
    };
    var indeks = 0;
    $scope.dodaj = function () {
        var sredni = document.getElementById("sre");
        var zaawansowany = document.getElementById("zaa");
        var sredni = angular.element(sredni);
        var zaawansowany = angular.element(zaawansowany);
        var poziom = sredni.hasClass("active")*1 + zaawansowany.hasClass("active")*2;
        $scope.technologie.push({ 'id': --indeks, 'nazwa': $scope.nazwaTechnologii, 'poziom': poziom+1 });
        $scope.nazwaTechnologii='';
    };
    /////////////////////////////////////
});