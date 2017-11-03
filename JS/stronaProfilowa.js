var app = angular.module('stronaProfilowa', []);
app.controller('myCtrl', function ($scope, $http) {

    $scope.dodajOferte = function () {

    };
    $scope.edytujProfil = function () {

    };
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

        //wyslanie na serwer informacji o usunieciu
    };
    $scope.zobacz = function (login) {

    };
    $scope.usunZgloszenie = function (idZgloszenia) {
        var index = -1;
        var comArr = eval($scope.oferty.zgloszenia);
        for (var i = 0; i < comArr.length; i++) {
            if (comArr[i].id === idZgloszenia) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            alert("Something gone wrong");
        }
        $scope.oferty.zgloszenia.splice(index, 1);

        //wyslanie na serwer informacji o usunieciu
    }
});