var url = 'mongodb://127.0.0.1:27017/movieManager'
;
var mongo = require('mongodb').MongoClient
;
var ObjectID = require('mongodb').ObjectID;

	exports.checkLogin = function(sendData,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('users');

		collection.find(sendData).count(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("User login checked: "+data);
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.setLogin = function(sendData,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('users');

		collection.find(sendData).toArray(function(err, data){
    
			if(err) 
			throw err;
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.checkUsername = function(sendData,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('users');

		collection.find(sendData).count(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("User existence checked: ");
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.getUsername = function(sendData,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('users');

		collection.find({_id: new ObjectID(sendData._id)}).toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Username fetched.");
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.getLocation = function(sendData,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('cities');

		collection.find({_id: new ObjectID(sendData._id)}).toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Location fetched.");
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.removeMovie = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('movies');

		collection.remove({_id: new ObjectID(sendData._id)},function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Movie removed: "+JSON.stringify(sendData));
 
			db.close();   
			cb(err,data);
});
});
}

	exports.saveMovie = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('movies');

		collection.update({_id: new ObjectID(sendData._id)},{$set:{name:sendData.name,genre:sendData.genre,language:sendData.language,plot:sendData.plot}},function(err,data){
    
			if(err) 
			throw err;
 
			db.close();   
			cb(err,data);
});
});
}

	exports.saveTheatre = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('theatres');

		collection.update({_id: new ObjectID(sendData._id)},{$set:{name:sendData.name,city:sendData.city,address:sendData.address}},function(err,data){
    
			if(err) 
			throw err;
 
			db.close();   
			cb(err,data);
});
});
}

	exports.saveActor = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('actors');

		collection.update({_id: new ObjectID(sendData._id)},{$set:{name:sendData.name}},function(err,data){
    
			if(err) 
			throw err;
 
			db.close();   
			cb(err,data);
});
});
}

	exports.saveShow = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('shows');

		collection.update({_id: new ObjectID(sendData._id)},{$set:{time:sendData.time,price:sendData.price,showType:sendData.showType}},function(err,data){
    
			if(err) 
			throw err;
 
			db.close();   
			cb(err,data);
});
});
}

	exports.removeTheatre = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('theatres');

		collection.remove({_id: new ObjectID(sendData._id)},function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Theatre removed: "+JSON.stringify(sendData));
 
			db.close();   
			cb(err,data);
});
});
}

	exports.removeActor = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('actors');

		collection.remove({_id: new ObjectID(sendData._id)},function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Actor removed: "+JSON.stringify(sendData));
 
			db.close();   
			cb(err,data);
});
});
}

	exports.removeShow = function(sendData,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('shows');

		collection.remove({_id: new ObjectID(sendData._id)},function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Show removed: "+JSON.stringify(sendData));
 
			db.close();   
			cb(err,data);
});
});
}

	exports.addMovies = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('movies');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Movie added: "+JSON.stringify(data));
 
			db.close();   
			cb(err,data);
});
});
}

	exports.addActors = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('actors');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Actor added: "+JSON.stringify(data));
 
			db.close();    
			cb(err,data);
});
});
}

	exports.addReview = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('reviews');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Review added: "+JSON.stringify(data));
 
			db.close();    
			cb(err,data);
});
});
}

	exports.addUser = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('users');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("User added: "+JSON.stringify(data));
 
			db.close();    
			cb(err,data);
});
});
}

	exports.addShows = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('shows');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Show added: "+JSON.stringify(data));

			db.close();    
			cb(err,data);
});
});
}

	exports.addTheatres = function(userdata,cb) {
        mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('theatres');

		collection.insert(userdata,function(err,data){
    
			if(err) 
			throw err;
    
			console.log("Theatre added: "+JSON.stringify(data));
      
			db.close();			
			cb(err,data);
});
});
}

	exports.getMovies = function(cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('movies');

		collection.find().toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Movies fetched");
     
			db.close(); 
			cb(err,data);
});
});
}

	exports.getTheatres = function(cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('theatres');

		collection.find().toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Theatres fetched");
   
			db.close(); 
			cb(err,data);
});
});
}

	exports.getActors = function(userdata,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('actors');

		collection.find(userdata).toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Actors fetched");
    
			db.close();
			cb(err,data);
});
});
}

	exports.getReviews = function(userdata,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;

		var collection = db.collection('reviews');

		collection.find(userdata,{_id:0,user_id:0,movie_id:0}).toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Reviews fetched");
    
			db.close();
			cb(err,data);
});
});
}

	exports.getShows = function(userdata,cb) {
	mongo.connect(url, function(err, db) {

	if (err) 
  	throw err;
	
	var collection = db.collection('shows');

		collection.find(userdata).toArray(function(err, data){
    
			if(err) 
			throw err;
    
			console.log("Shows fetched");
    
			db.close();
			cb(err,data);
});
});
}