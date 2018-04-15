angular.module('glowna', [])
.constant('LOGIN_ENDPOINT', '/login')
.constant('LOGOUT_ENDPOINT', '/logout')
.service('AuthenticationService', function($http, LOGIN_ENDPOINT, LOGOUT_ENDPOINT) {
	this.authenticate = function(credentials, successCallback) {
		var authHeader = {Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)};
		var config = {headers: authHeader};
		$http
		.post(LOGIN_ENDPOINT, {}, config)
		.then(function success(value) {
			successCallback();
		}, function error(reason) {
			console.log('Login error');
			console.log(reason);
		});
	};
	this.logout = function(successCallback) {
		$http.post(LOGOUT_ENDPOINT)
		.then(successCallback());
	}
})
.controller('myCtrl', function($scope, $http, $rootScope, $location, AuthenticationService) {
    $scope.czerwony = false;
    
    var vm = this;
	vm.credentials = {};
	var loginSuccess = function() {
		$rootScope.authenticated = true;
		window.location.replace("http://localhost:8080/profile");
	}
	vm.login = function() {
		AuthenticationService.authenticate(vm.credentials, loginSuccess);
	}
	var logoutSuccess = function() {
		$rootScope.authenticated = false;
		$location.path('/');
	}
	vm.logout = function() {
		AuthenticationService.logout(logoutSuccess);
	}

    //Do Logowania
    $scope.wyslij = function () {
        if($scope.login === undefined || $scope.haslo === undefined){
            $scope.czerwony = 4;
            $scope.tekstBledu = "Wprowadz dane do logowania!";
            return;
        }
        vm.credentials.username = $scope.login;
        vm.credentials.password = $scope.haslo;
        vm.login();
//        $http({
//            method : "POST",
//            url : "gooddfsfs.com"
//        }).then(function sukces(response) {
//            if(response==2){
//                $scope.czerwony = 4;
//                $scope.tekstBledu = "Błędne dane do logowania!";
//            }
//            //przekierowanie
//        }, function error(response) {
//            $scope.czerwony = 4;
//            $scope.tekstBledu = "Błąd podczas połączenia z serwerem";
//        });
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
//        $scope.bladPliku = false;
//        if ($('#zdjecie')[0].files[0].size > 3000000){
//            $scope.bladPliku = true;
//            $scope.trescBladPliku = "Plik jest zbyt duży!";
//        }
//        $scope.bladPliku2 = false;
//        if ($('#CV')[0].files[0].size > 3000000){
//            $scope.bladPliku2 = true;
//            $scope.trescBladPliku2 = "Plik jest zbyt duży!";
//        }

        if($scope.bladLoginu || $scope.bladPliku || $scope.bladPliku2 || $scope.bladHasla || $scope.bladEmail)
            return;

        if($scope.data != null){
        	var month = $scope.data.getUTCMonth() + 1; //months from 1-12
        	var day = $scope.data.getUTCDate();
        	var year = $scope.data.getUTCFullYear();
        	var newdate = year + "/" + month + "/" + day;
        }
        else
        	var newdate = null;
        
        var rejestracjaW = {
            username: $scope.loginRejestracja,
            password: $scope.haslo1,
            email: $scope.email,
            name: $scope.imie,
            surname: $scope.nazwisko,
            phone: $scope.telefon,
            address: $scope.adres,
            minSalary: $scope.minimalne,
            education: $scope.wyksztalcenie,
            experiences: $scope.doswiadczenie,
            accomplishments: $scope.osiagniecia,
            contract: $scope.zlecenie + $scope.stala + $scope.praktyki,
            born: newdate
        };
        details = JSON.stringify(rejestracjaW);
        $http.post('api/registration',details)
        .then(function sukces(response) {
        	vm.credentials.username = $scope.loginRejestracja;
        	vm.credentials.password = $scope.haslo1;
        	vm.login();
        }, function error(response) {
        	if(response.data.description == "2"){
                $scope.bladLoginu = 1;
                $scope.trescBladLoginu = "Taki login już istnieje. Wybierz inny!";
            }
            else if(response.data.description == "3"){
                $scope.bladEmail = 1;
                $scope.trescBladEmail = "Taki adres e-mail już widnieje w naszej bazie danych";
            }
            else
            	console.log(response);
		});
    }
});