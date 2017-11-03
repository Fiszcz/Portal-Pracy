var app = angular.module('administracyjny', []);
app.controller('myCtrl', function ($scope, $http) {
    var filtr;
    $scope.zobacz = function (ktoryPanel) {
        $scope.ktoraTabela = ktoryPanel;
        switch (ktoryPanel) {
            case 1:
                filtr = {
                    id: $scope.idUzytkownik,
                    login: $scope.login,
                    prawa: $scope.prawa
                };
                //przeslanie i odbior
                break;
            case 2:
                var jakSortowac = document.getElementById("rosnaco");
                jakSortowac = angular.element(rosnaco).hasClass("active")*1 + 1; //1 - malejąco, 2 - rosnąco
                filtr = {
                    id: $scope.Oferty,
                    nazwa: $scope.nazwa,
                    idPracodawcy: $scope.idPracodawcy,
                    placaOd: $scope.placaOd,
                    placaDo: $scope.placaDo,
                    data: $scope.dataOgloszenia,
                    rodzaj: {
                        stala: $scope.stala,
                        praktyki: $scope.praktyki,
                        zlecenie: $scope.zlecenie
                    },
                    sortujPo: $scope.sortujPo,
                    jakSortowac: jakSortowac
                };
                // przeslanie i odbior
                break;
            case 3:
                filtr = {
                    idUzytkownik: $scope.idUzytkownikLogowanie,
                    data: $scope.dataLogowanie
                };
                //przeslanie i odbior
                break;
            case 4:
                filtr = {
                    idUzytkownik: $scope.idUzytkownikWiadomosc,
                    data: $scope.dataWiadomosc
                };
                //przeslanie i odbior
                break;
        }
    };
    
    $scope.usunWszystko = function () {
        $scope.ktoraTabela = 0;
        
        //przeslanie wartości 'filtr' na serwer
    };
    
    $scope.usunOferte = function (idOferty) {
        var index = -1;
        var comArr = eval( $scope.oferty );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === idOferty ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.oferty.splice( index, 1 );
        
        //przeslanie na serwer id Oferty
    };
    
    $scope.dodajUzytkownika = function () {
        var nowy = {
            login: $scope.nowyLogin,
            haslo: $scope.noweHaslo,
            prawa: $scope.prawa
        };
        //przeslanie na serwer i zwrot do uzytkownika pod warunkiem dobrego filtru
        //czyli przesylamy 'nowy' jak i 'filtr'
    };
    
    $scope.usunUzytkownika = function (id) {
        var index = -1;
        var comArr = eval( $scope.uzytkownicy );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === id ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.uzytkownicy.splice( index, 1 );

        //przeslanie na serwer id użytkownika
    };
    
    $scope.zmianaPraw = function (id) {
        var nowePrawa = document.getElementById(id).valueOf();

        //przeslanie zmian na serwer
    };
});