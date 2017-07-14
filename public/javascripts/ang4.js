var app = angular.module('myApp', []);
app.directive('passcheck', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length > 3) {
                    mCtrl.$setValidity('minlen', true);
                } else {
                    mCtrl.$setValidity('minlen', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
app.directive('usernamecheck',['$http', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation2(value) {
                if (value.length < 3) {
                    mCtrl.$setValidity('minlen', false);
					mCtrl.$setValidity('maxlen', true);
					mCtrl.$setValidity('alreadyexists', true);
					//return value;
                } else if(value.length > 8){
                    mCtrl.$setValidity('minlen', true);
					mCtrl.$setValidity('maxlen', false);
					mCtrl.$setValidity('alreadyexists', true);
					//return value;
                }
				else{
					mCtrl.$setValidity('minlen', true);
					mCtrl.$setValidity('maxlen', true);
					    $http({
        url: 'http://localhost:3000/movieManager/checkUsername',
        method: "POST",
	    data: {username:value}
    })
    .then(function(response) {
	if(response.data.valid)
	{
		mCtrl.$setValidity('alreadyexists', true);
	}
	else
	{
		mCtrl.$setValidity('alreadyexists', false);
	}
	//return value;
    }, 
    function(response) { 

    });
				}
                return value;
            }
            mCtrl.$parsers.push(myValidation2);
        }
    };
}]);

app.controller('myCtrl', function($scope,$http,$q) {

    $scope.checkSignup = function (user) {
	sendData={
	username : user.username,
	pass : user.pass
	};
    $http({
        url: 'http://localhost:3000/movieManager/userSignup',
        method: "POST",
	    data: sendData
    })
    .then(function(response) {
		window.location='http://localhost:3000/movieManager/login';
    }, 
    function(response) { 

    });

    }


 

});