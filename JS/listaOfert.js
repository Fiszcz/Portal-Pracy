var app = angular.module('oferty', []);
app.controller('myCtrl', function ($scope, $http) {

    $scope.oferty; 
    
    $scope.szukaj = function () {
        var filtr = {
            kluczowe: $scope.kluczowe,
            miasto: $scope.miastoSzukaj,
            placaOd: $scope.placaOd,
            placaDo: $scope.placaDo,
            dataOd: $scope.dataOd,
            dataDo: $scope.dataDo,
            rodzaj: {
                stala: $scope.stala,
                praktyki: $scope.praktyki,
                zlecenie: $scope.zlecenie
            },
            technologie: [],
            miasta: []
        }
        var technologie = document.getElementsByName("technologie");
        for(i=0; i < technologie.length; i++){
            if(technologie[i].checked)
                filtr.technologie.push(technologie[i].value);
        }
        var miasta = document.getElementsByName("miasta");
        for(i=0; i < miasta.length; i++){
            if(miasta[i].checked)
                filtr.miasta.push(miasta[i].value);
        }
        
        //wyslanie filtru i odebranie ofert
        
    }
    
    $scope.zglos = function (idOferty) {
        
    }
});