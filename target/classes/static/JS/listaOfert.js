var app = angular.module('oferty', []);
app.controller('myCtrl', function ($scope, $http) {

	$scope.oferty; 
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
				name: $scope.kluczowe,
				city: {name:$scope.miastoSzukaj},
				minSalary: $scope.placaDo,
				maxSalary: $scope.placaOd,
				published: $scope.dataOd,
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
	}

	$scope.zglos = function (idOferty) {
		var id = idOferty;
		$http.post('entry/add',id);
	};
	
	var refresh = function() {
		$http.get("/offer/all")
		.then(function sukces(response){
			console.log(response);
			$scope.oferty = response.data;
		}
		)
	};
	
	refresh();
});