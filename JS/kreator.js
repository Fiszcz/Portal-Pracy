var app = angular.module('kreator', []);
app.controller('myCtrl', function($scope,$http) {

    $scope.dodajOferte = function () {
        $scope.bladNazwy = false;
        if($scope.nazwa === undefined){
            $scope.bladNazwy = true;
            return;
        }

        var kolory = document.getElementsByName("kolor");
        kolory = angular.element(kolory[1]).hasClass("active")*1 + angular.element(kolory[2]).hasClass("active")*2 +
            angular.element(kolory[3]).hasClass("active")*3 + angular.element(kolory[4]).hasClass("active")*4 +1;

        var doWysylki = {
            nazwa: $scope.nazwa,
            firma: $scope.firma,
            miasto: $scope.miasto,
            placaOd: $scope.placaOd,
            placaDo: $scope.placaDo,
            kolor: kolory,
            technologie: $scope.technologie,
            rodzaj: {
                stala: $scope.stala,
                praktyki: $scope.praktyki,
                zlecenie: $scope.zlecenie
            }
        };
    };

    //////Obsluga tabelki z technologiami
    $scope.technologie = [];
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