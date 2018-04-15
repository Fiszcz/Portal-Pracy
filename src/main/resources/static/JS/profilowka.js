var app = angular.module('profilowka', []);
app.controller('myCtrl', function($scope,$http,$location) {
    $scope.profil = function(){
    	window.location.replace("http://localhost:8080/profile");
    };



//    if($scope.rodzaj.stala == 1){
//        $scope.rodzajPracy = "Stałej pracy";
//    }
//    if($scope.rodzaj.praktyki == 1){
//        if($scope.rodzajPracy !== undefined)
//            $scope.rodzajPracy += "/";
//        $scope.rodzajPracy += "Praktyk";
//    }
//    if($scope.rodzaj.zlecenie == 1){
//        if($scope.rodzajPracy !== undefined)
//            $scope.rodzajPracy += "/";
//        $scope.rodzajPracy += "Zlecenia";
//    }
    
    
    
    
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
    
    $scope.dane;
    var refresh = function() {
    	var username = $location.absUrl().split('=')[1];
    	$http.post('profile/userOther',username).
    	then(function sukces(response) {
    		console.log(response);
    		$scope.dane = response.data;
    	},
    	function error(response) {
    		console.log(response);
    	})
    };
    refresh();
});