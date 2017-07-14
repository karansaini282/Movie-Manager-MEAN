var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
$scope.fetchData=function(){
    $http({
        url: '/viewNames',
        method: "POST"
    })
    .then(function(response) {
           $scope.names=response.data.names;
    }, 
    function(response) { 
            
    });
}

$scope.fetchData();
});
