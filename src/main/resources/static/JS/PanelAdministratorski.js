var app = angular.module('administracyjny', []);
app.controller('myCtrl', function ($scope, $http) {
    var filtr;
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
    };
    
    $scope.szukaj = function () {
		var rodzajPracy = null;
		if($scope.stala)
			rodzajPracy = "FULLTIME";
		else if($scope.praktyki)
			rodzajPracy = "PRACTICE";
		else if($scope.zlecenie)
			rodzajPracy = "PARTTIME";
		var offer = {
				id: $scope.idOferty,
				name: $scope.nazwaOferty,
				user: {id: $scope.idPracodawcy, username: "fdsfd", enabled: 1, role: "ROLE_USER"},
				city: $scope.miastoSzukaj,
				minSalary: $scope.placaDo,
				maxSalary: $scope.placaOd,
				published: $scope.dataOgloszenia,
				contract: rodzajPracy
		}
//		var technologie = document.getElementsByName("technologie");
//		for(i=0; i < technologie.length; i++){
//			if(technologie[i].checked)
//				filtr.technologie.push(technologie[i].value);
//		}
//		var miasta = document.getElementsByName("miasta");
//		for(i=0; i < miasta.length; i++){
//			if(miasta[i].checked)
//				filtr.miasta.push(miasta[i].value);
//		}

		//wyslanie filtru i odebranie ofert
		$http.post('/offer/searchOffer',offer).then(
				function sukces(response){
					$scope.oferty = response.data;
				},
				function error(response){
					console.log(response);
				});
	};
    
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
                $http.get("/profile/allUser")
        		.then(function sukces(response){
        			console.log(response);
        			$scope.uzytkownicy = response.data;
        		}
        		)
                break;
                ///////////////////////////////////////////////
            case 2:
            	if($scope.idOferty != null || $scope.nazwaOferty != null || $scope.idPracodawcy != null || $scope.miastoSzukaj != null || $scope.dataOd!=null || $scope.dataDo!=null)
            		$scope.szukaj();
                // przeslanie i odbior
            	else
                $http.get("/offer/all")
        		.then(function sukces(response){
        			console.log(response);
        			$scope.oferty = response.data;
        		}
        		)
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
                $http.get('message/all').then(
                		function sekces(response){
                			$scope.wiadomosci = response.data;
                		},
                		function error(response){
                			console.log(response);
                		});
                
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
        var id = idOferty;
        $http.post('offer/delete',id);
    };
    
    $scope.dodajUzytkownika = function () {
        var user = {
            username: $scope.nowyLogin,
            password: $scope.noweHaslo,
            role: $scope.prawaDlaNowego,
            enabled: 1
        };
        //przeslanie na serwer i zwrot do uzytkownika pod warunkiem dobrego filtru
        //czyli przesylamy 'nowy' jak i 'filtr'
        $http.post('profile/addUser',user);
        user.id = "Dopiero dodany";
        $scope.uzytkownicy.push(user);
    };
    
    $scope.usunUzytkownika = function (username) {
        var index = -1;
        var comArr = eval( $scope.uzytkownicy );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].username === username ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.uzytkownicy.splice( index, 1 );

        //przeslanie na serwer id użytkownika
        $http.post('/profile/delete',username);
    };
    
    $scope.zmianaPraw = function (id) {
        var nowePrawa = document.getElementById(id).valueOf();

        //przeslanie zmian na serwer
    };
    
    $scope.zobaczUzytkownika = function (username) {
    	var adres = "http://localhost:8080/lookProfile?username="+username;
    	window.location.replace(adres);
    };
});