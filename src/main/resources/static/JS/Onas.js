var app = angular.module('ONas', []);
app.controller('myCtrl', function($scope,$http) {
	
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
    
    $scope.wyslij = function () {
        if($scope.wiadomosc === undefined){
            $scope.blad = true;
            return;
        }
        //wyslanie
        var message = $scope.wiadomosc;
        $http.post('message/add',message).then(
        		function sekces(){window.location.replace("http://localhost:8080/profile");},
        		function error(response){console.log(response);});
    }
});