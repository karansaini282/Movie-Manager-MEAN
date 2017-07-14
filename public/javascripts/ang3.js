var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http,$q) {

    $scope.checkLogin = function (user) {
	sendData={
	username : user.username,
	pass : user.pass
	};
    $http({
        url: 'http://localhost:3000/movieManager/checkLogin',
        method: "POST",
	    data: sendData
    })
    .then(function(response) {
		if(response.data.valid)
		{
			window.location='http://localhost:3000/movieManager/user';
		}
		else
		{
			$scope.errMsg='User not found!';
		}
	
    }, 
    function(response) { 

    });

    }


 

});