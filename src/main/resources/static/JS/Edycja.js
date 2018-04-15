var app = angular.module('edycja', []);

//pass in an HTML5 ArrayBuffer, returns a base64 encoded string
function arrayBufferToBase64( arrayBuffer ) {
   var bytes = new Uint8Array( arrayBuffer );
   var len = bytes.byteLength;
   var binary = '';
   for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
   }
   return window.btoa( binary );
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

app.controller('myCtrl', function($scope, $http, $rootScope, $location) {
    /*$scope.technologie = [   //testowe
        {"id":1,"nazwa":"java","poziom":3},
        {"id":8,"nazwa":"java","poziom":3},
        {"id":3,"nazwa":"java","poziom":2},
        {"id":4,"nazwa":"java","poziom":3},
    ];*/
	
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
	
    $scope.zapisz = function () {
        $scope.bladHasla = false;
        $scope.bladLoginu = false;
        $scope.bladEmail = false;
        if((''+$scope.haslo1).length < 7 && $scope.haslo1 !== undefined){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Zbyt krótkie hasło!";
        }
        else if($scope.haslo1 != $scope.haslo2){
            $scope.bladHasla = true;
            $scope.trescBladHasla = "Podane hasła nie są takie same!";
        }
        if ($scope.email === undefined){
            $scope.bladEmail = true;
            $scope.trescBladEmail = "Potrzebny jest twój adres E-mail!";
        }
        $scope.bladPliku = false;
        if ($('#zdjecie')[0].files[0] !== undefined && $('#zdjecie')[0].files[0].size > 3000000){
            $scope.bladPliku = true;
            $scope.trescBladPliku = "Plik jest zbyt duży!";
        }
        $scope.bladPliku2 = false;
//        if ($('#CV')[0].files[0] !== undefined && $('#CV')[0].files[0].size > 3000000){
//            $scope.bladPliku2 = true;
//            $scope.trescBladPliku2 = "Plik jest zbyt duży!";
//        }

        if($scope.bladPliku || $scope.bladPliku2 || $scope.bladHasla || $scope.bladEmail)
            return;

        var daneOsobowe = {};
        if($scope.haslo1!=null)
        	daneOsobowe.password = $scope.haslo1;
        daneOsobowe.email= $scope.email; 
        daneOsobowe.name= $scope.imie;
        daneOsobowe.surname = $scope.nazwisko;
        daneOsobowe.phone = $scope.telefon;
        daneOsobowe.address = $scope.adres;
        daneOsobowe.minSalary = $scope.placaOd;
        daneOsobowe.education = $scope.wyksztalcenie;
        daneOsobowe.experiences = $scope.doswiadczenie;
        daneOsobowe.accomplishments = $scope.osiagniecia;
        if($scope.data != null){
        	var month = $scope.data.getUTCMonth() + 1; //months from 1-12
        	var day = $scope.data.getUTCDate();
        	var year = $scope.data.getUTCFullYear();
        	var newdate = year + "/" + month + "/" + day;
        	daneOsobowe.born = newdate;
        }

     // get a file object, we only need one
        var file = $('#zdjecie').get(0).files[0];
        if(file) {
            var reader = new FileReader();
            // after the file has loaded on the client,
            // convert to base64 and assign to the item before POSTing
            reader.onload = function loaded(evt) {
                var attachment = {};
                attachment.contentType = file.type;
                attachment.photo = arrayBufferToBase64(evt.target.result);

                var details = daneOsobowe;
                console.log(details);

                $http.post('/update/user',details)
                    .then(function sukces(response) {
                        $http.post('/attachment/add',attachment);
                        window.location.replace("http://localhost:8080/profile");
                    },function error(response) {
                        if(response.data.description == "3"){
                            $scope.bladEmail = 1;
                            $scope.trescBladEmail = "Taki adres e-mail jest już przypisany do innego użytkownika";
                        }
                    });
                return;
            };
            reader.readAsArrayBuffer(file);
            for(var i = 0; i<100; i++)
                sleep(10000);
        }

        var details = daneOsobowe;
        console.log(details);

        $http.post('/update/user',details)
        .then(function sukces(response) {
        	window.location.replace("http://localhost:8080/profile");
        },function error(response) {
            if(response.data.description == "3"){
                $scope.bladEmail = 1;
                $scope.trescBladEmail = "Taki adres e-mail jest już przypisany do innego użytkownika";
            }
        });
    };

    //////Obsluga tabelki z technologiami
    $scope.usunTechnologie = function (idTechnologii) {
        var index = -1;
        var comArr = eval( $scope.technologie );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].id === idTechnologii ) {
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
                $scope.technologie[i].poziom = poziom;
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
        $scope.technologie.push({ 'id': --indeks, 'nazwa': $scope.nazwaTechnologii, 'poziom': poziom+1 });
        $scope.nazwaTechnologii='';
    };
    /////////////////////////////////////
    var refresh = function(){
    	$http.get("/profile/user").then(function sukces(response){
    		console.log(response);
    		$scope.email = response.data.email; 
    		$scope.imie = response.data.name;
    		$scope.nazwisko = response.data.surname;
    		$scope.telefon = response.data.phone;
    		$scope.adres = response.data.address;
    		$scope.placaOd = response.data.minSalary;
    		$scope.wyksztalcenie = response.data.education;
    		$scope.doswiadczenie = response.data.experiences;
    		$scope.osiagniecia = response.data.accomplishments;
    		$scope.data = response.data.born;
    	})};
    
    refresh();
});