var app = angular.module('kreator', []);
app.controller('myCtrl', function($scope,$http) {

	$scope.oNas = function() {
		window.location.replace("http://localhost:8080/aboutUs");
	};
    $scope.wyloguj = function() {
		$http.post('/logout')
		.then(function sukces(response){
			$rootScope.authenticated = false;
			window.location.replace("http://localhost:8080/");
		},
		function error(response){
			console.log(response);
		});
    };
    $scope.profil = function(){
    	window.location.replace("http://localhost:8080/profile");
    }
	
    $scope.dodajOferte = function () {
        $scope.bladNazwy = false;
        if($scope.nazwa === undefined){
            $scope.bladNazwy = true;
            return;
        }

        var kolory = document.getElementsByName("kolor");
        kolory = angular.element(kolory[1]).hasClass("active")*1 + angular.element(kolory[2]).hasClass("active")*2 +
            angular.element(kolory[3]).hasClass("active")*3 + angular.element(kolory[4]).hasClass("active")*4 +1;

        var rodzaj;
        if($scope.stala==true)
        	rodzaj = "FULLTIME";
        else if($scope.praktyki==true)
        	rodzaj = "PRACTICE";
        else if($scope.zlecenie==true)
        	rodzaj = "PARTTIME";
        var doWysylki = {
            name: $scope.nazwa,
            company: $scope.nazwaFirmy,
            city: $scope.miasto,
            minSalary: $scope.placaOd,
            maxSalary: $scope.placaDo,
            color: kolory,
            description: $scope.opis,
            technology: $scope.technologie,
            contract: rodzaj
        };
        var inOffer = doWysylki;
        $http.post("/offer/add",inOffer).then(
        		function sukces(){window.location.replace("http://localhost:8080/profile");},
        		function error(){}
        );
    };

    //////Obsluga tabelki z technologiami
    $scope.technologie = [];
    $scope.usunTechnologie = function (idTechnologii) {
        var index = -1;
        var comArr = eval( $scope.technologie );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].category === idTechnologii ) {
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
                $scope.technologie[i].level = poziom;
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
        if(poziom == 1) poziom = "INTERMEDIATE";
        else if(poziom == 2) poziom = "ADVANCED";
        else poziom = "FUNDAMENTAL";
        $scope.technologie.push({ 'category': $scope.nazwaTechnologii, 'level': poziom});
        $scope.nazwaTechnologii='';
    };
    /////////////////////////////////////
});