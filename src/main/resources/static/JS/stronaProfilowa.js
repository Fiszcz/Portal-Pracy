var app = angular.module('stronaProfilowa', []);
app.controller('myCtrl', function ($scope, $http, $rootScope) {

    $scope.dodajOferte = function () {
    	window.location.replace("http://localhost:8080/addOffert");
    };
    $scope.edytujProfil = function () {
    	window.location.replace("http://localhost:8080/editProfile");
    };
    $scope.przegladOfert = function () {
    	window.location.replace("http://localhost:8080/seeOfferts");
    };
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
    
    $scope.oferty;
    $scope.usunOferte = function (idOferty) {
        var index = -1;
        var comArr = eval($scope.oferty);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === idOferty) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.oferty.splice(index, 1);

        var id = idOferty;
        $http.post('offer/delete',id);
    };
    $scope.zobacz = function (username) {
    	var adres = "http://localhost:8080/lookProfile?username="+username;
    	window.location.replace(adres);
    };
    $scope.usunZgloszenie = function (idZgloszenia,idoferty) {
        var index = -1;
        var comArr = eval($scope.oferty[idoferty].entryList);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === idZgloszenia) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.oferty[idoferty].entryList.splice(index, 1);

        //wyslanie na serwer informacji o usunieciu
        var id = idZgloszenia;
        $http.post('entry/delete',id);
    }

    var refresh = function() {
    	$http.get('offer/user/all')
    	.then(function sukces(response){
    		console.log(response);
    		$scope.oferty = response.data;
    	},
    	function error(response){
    		console.log(response);
    	}
    	)
    }
    refresh();
});