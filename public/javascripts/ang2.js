var app = angular.module('myApp', []);

app.directive('minimumlength', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length > 9) {
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
app.controller('myCtrl', function($scope,$http,$q) {

    $scope.removeMovie = function (movie) {
	sendData={
	_id:movie._id
	};
    $http({
        url: 'http://localhost:3000/movieManager/removeMovie',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Movie was removed: '+movie.name);
        $scope.fetchMovies();
    }, 
    function(response) { 

    });

    }


    $scope.removeTheatre = function (theatre) {
	sendData={
	_id:theatre._id
	};
    $http({
        url: 'http://localhost:3000/movieManager/removeTheatre',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Theatre was removed: '+theatre.name);
        $scope.fetchTheatres();
    }, 
    function(response) { 

    });

    }


    $scope.removeActor = function (actor) {
	sendData={
	_id:actor._id
	};
    $http({
        url: 'http://localhost:3000/movieManager/removeActor',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Actor was removed: '+actor.name);
        $scope.fetchActors({_id:actor.movie_id});
    }, 
    function(response) { 

    });

    }


    $scope.removeShow = function (show) {
	sendData={
	_id:show._id
	};
    $http({
        url: 'http://localhost:3000/movieManager/removeShow',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Show was removed: '+show._id);
        $scope.fetchShows({_id:show.movie_id},{_id:show.theatre_id});
    }, 
    function(response) { 

    });

    }

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

    $scope.addMovies = function (movie) {
	sendData={
	name:movie.name,
	genre:movie.genre,
	language:movie.language,
	plot:movie.plot
	};
    $http({
        url: 'http://localhost:3000/movieManager/addMovies',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Movies were added');
	movie._id=response.data._id;
        $scope.movies.push(movie);
    }, 
    function(response) { 

    });
  
    }

    $scope.addShows = function (show) {
	sendData={
	movie_id:show.movie_id['_id'],
	theatre_id:show.theatre_id['_id'],
	time:show.time,
	price:show.price,
	showType:show.showType
	};
    $http({
        url: 'http://localhost:3000/movieManager/addShows',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Shows were added '+JSON.stringify(sendData));
    }, 
    function(response) { 

    });

    }

    $scope.addActors = function (actor) {
	sendData={
	name:actor.name,
	movie_id:actor.movie_id['_id']
	};
    $http({
        url: 'http://localhost:3000/movieManager/addActors',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Actors were added '+JSON.stringify(actor.movie_id));
    }, 
    function(response) { 

    });
    }

    $scope.addTheatres = function (theatre) {
	sendData={
	name:theatre.name,
	city:theatre.city,
	address:theatre.address
	};
    $http({
        url: 'http://localhost:3000/movieManager/addTheatres',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Theatres were added');
	theatre._id=response.data._id;
        $scope.theatres.push(theatre);
    }, 
    function(response) { 

    });
    }	

   $scope.saveMovie = function(movie)
   {
    console.log('Save movie was called'); 
	sendData={
        _id: movie._id,
		name: movie.name2,
		genre: movie.genre2,
		language: movie.language2,
		plot: movie.plot2		
	};
    $http({
        url: 'http://localhost:3000/movieManager/saveMovie',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Save movie was fetched');
	$scope.fetchMovies();
    }, 
    function(response) { 

    });
   }

      $scope.saveTheatre = function(theatre)
   {
    console.log('Save theatre was called'); 
	sendData={
        _id: theatre._id,
		name: theatre.name2,
		city: theatre.city2,
        address: theatre.address2		
	};
    $http({
        url: 'http://localhost:3000/movieManager/saveTheatre',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Save theatre was fetched');
	$scope.fetchTheatres();
    }, 
    function(response) { 

    });
   }
   
      $scope.saveActor = function(actor)
   {
    console.log('Save actor was called'); 
	sendData={
        _id: actor._id,
		name: actor.name2		
	};
    $http({
        url: 'http://localhost:3000/movieManager/saveActor',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Save actor was fetched');
	$scope.fetchActors({_id:actor.movie_id});
    }, 
    function(response) { 

    });
   }
   
      $scope.saveShow = function(show)
   {
    console.log('Save show was called'); 
	sendData={
        _id: show._id,
		time: show.time2,
		showType: show.showType2,
		price: show.price2
	};
    $http({
        url: 'http://localhost:3000/movieManager/saveShow',
        method: "POST",
	data: sendData
    })
    .then(function(response) {
	console.log('Save show was fetched');
	$scope.fetchShows({_id:show.movie_id},{_id:show.theatre_id});
    }, 
    function(response) { 

    });
   }   
   
$scope.fetchMovies().then(function(msg){$scope.fetchTheatres();});

$scope.orderMoviesView=function(filterBy) {
$scope.moviesViewOrder=filterBy;
}

$scope.orderTheatresView=function(filterBy) {
$scope.theatresViewOrder=filterBy;
}

$scope.orderShowsView=function(filterBy) {
$scope.showsViewOrder=filterBy;
}

$scope.orderActorsView=function(filterBy) {
$scope.actorsViewOrder=filterBy;
}

});