var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http,$q) {

$scope.masterMovie='';

$scope.fetchMovies=function(){
    var q = $q.defer();
    $http({
        url: 'http://localhost:3000/movieManager/getMovies',
        method: "POST"
    })
    .then(function(response) {
           $scope.movies=response.data.movies;           
           q.resolve('Movies complete');	   
    }, 
    function(response) { 
            q.reject('Movies not complete'); 
    });
    return q.promise;
}

$scope.fetchActors = function(activeMovieActors) {
   sendData={
   movie_id:activeMovieActors['_id']
   };
   var q = $q.defer();
   $http({
        url: 'http://localhost:3000/movieManager/getActors',
        method: "POST",
        data:sendData
    })
    .then(function(response) {
           $scope.actors=response.data.actors;          
           q.resolve('Actors complete');	   
    }, 
    function(response) { 
         q.reject('Actors not complete');  
    });
return q.promise;
}

$scope.fetchReviews = function(activeMovieReview) {
   sendData={
   movie_id:activeMovieReview['_id']
   };
   $scope.masterMovie=activeMovieReview['_id'];
   $http({
        url: 'http://localhost:3000/movieManager/getReviews',
        method: "POST",
        data:sendData
    })
    .then(function(response) {
        $http({
        url: 'http://localhost:3000/movieManager/getSentiment',
        method: "POST",
		data: {reviews:response.data.reviews}
    }).then(
	function(response) {
		$scope.reviews=response.data.appendedReviews;    
	},
	function(response) { 
         
    }
	);
           		   
    }, 
    function(response) { 
         
    });
}

$scope.fetchShows=function(activeMovieShows,activeTheatreShows){
   var q = $q.defer();
   $http({
        url: 'http://localhost:3000/movieManager/getShows',
        method: "POST",
        data:{movie_id:activeMovieShows['_id'],theatre_id:activeTheatreShows['_id']}
    })
    .then(function(response) {
           $scope.shows=response.data.shows;           
           q.resolve('Shows complete');	   
    }, 
    function(response) { 
            q.reject('Shows not complete');
    });
return q.promise;
}

$scope.fetchUsername=function(){
   var q = $q.defer();
   $http({
        url: 'http://localhost:3000/movieManager/getUsername',
        method: "POST"
    })
    .then(function(response) {
           $scope.username=response.data.username;           
           q.resolve('Username complete');	   
    }, 
    function(response) { 
            q.reject('Username not complete');
    });
return q.promise;
}

$scope.fetchTheatres=function(){
    var q = $q.defer();
    $http({
        url: 'http://localhost:3000/movieManager/getTheatres',
        method: "POST"
    })
    .then(function(response) {
           $scope.theatres=response.data.theatres;           
           q.resolve('Theatres complete');	   
    }, 
    function(response) { 
        q.reject('Theatres not complete');    
    });
return q.promise;
}

$scope.addReview=function(review){
		sendData={
	movie_id : review.movie_id['_id'],
	content : review.content
	};
	
    $http({
        url: 'http://localhost:3000/movieManager/addReview',
        method: "POST",
		data: sendData
    })
    .then(function(response) {
		if(review.movie_id['_id']==$scope.masterMovie)
		{
			$scope.fetchReviews({_id:$scope.masterMovie});
		}
    }, 
    function(response) { 
   
    });
}
   
$scope.fetchMovies().then(function(msg){$scope.fetchTheatres().then(function(msg){$scope.fetchUsername();});});

$scope.orderReview=function(filterBy) {
$scope.reviewOrder=filterBy;
}

});