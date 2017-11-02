var app = angular.module('profilowka', []);
app.controller('myCtrl', function($scope,$http) {




    if($scope.rodzaj.stala == 1){
        $scope.rodzajPracy = "Stałej pracy";
    }
    if($scope.rodzaj.praktyki == 1){
        if($scope.rodzajPracy !== undefined)
            $scope.rodzajPracy += "/";
        $scope.rodzajPracy += "Praktyk";
    }
    if($scope.rodzaj.zlecenie == 1){
        if($scope.rodzajPracy !== undefined)
            $scope.rodzajPracy += "/";
        $scope.rodzajPracy += "Zlecenia";
    }
});