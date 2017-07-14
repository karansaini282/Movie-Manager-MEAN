var express = require('express');

var router = express.Router();

var moment = require('moment');

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://127.0.0.1:27017/db1';

var model1 = require('../model/movieManagerModel');

var crypto = require('crypto');

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

router.use(requestTime);

router.use(express.static('jquery.min.js'));

var algorithmia = require("algorithmia");

var client = algorithmia.client("simmGxxYvPWLVHflZ5kXNebMxNx1");

router.post('/removeMovie',function(req, res, next){ 
sendObject={
_id: req.body._id 
};
model1.removeMovie(sendObject,function(err, data){
  console.log('Movie was removed');
  res.send({_id:req.body._id});
});
});

router.post('/getSentiment',function(req, res, next){ 
  client.algo("algo://nlp/SentimentAnalysis/1.0.2")
       .pipe(req.body.reviews)
       .then(function(response) {
         console.log(response.get());
		 res.send({appendedReviews:response.get()});
       });
});

router.post('/removeTheatre',function(req, res, next){ 
sendObject={
_id:req.body._id
};
model1.removeTheatre(sendObject,function(err, data){
  console.log('Theatre was removed');
  res.send({_id:req.body._id});
});
});

router.post('/getUsername',function(req, res, next){ 
sendObject={
_id:req.session.user
};
model1.getUsername(sendObject,function(err, data){
  console.log('Username: '+JSON.stringify(data));
  res.send({username:data[0]['username']});
});
});

router.post('/checkLogin',function(req, res, next){ 
sendObject={
username : req.body.username,
pass : crypto.createHash('md5').update(req.body.pass).digest('hex')
};
model1.checkLogin(sendObject,function(err, data){  
  console.log('Login check: '+JSON.stringify(data));
  if(data)
  {
	model1.setLogin(sendObject,function(err, data){
	  req.session.user=data[0]['_id'];
	  console.log('Session: '+JSON.stringify(req.session));
	  console.log('_id: '+data[0]['_id']);
	  res.send({valid:true});
	});  	  
  }
  else
  {
	  res.send({valid:false});
  }
});
});

router.post('/userSignup',function(req, res, next){ 
sendObject={
username : req.body.username,
pass : crypto.createHash('md5').update(req.body.pass).digest('hex')
};
	model1.addUser(sendObject,function(err, data){  
	res.send();
});  
});

router.post('/checkUsername',function(req, res, next){ 
sendObject={
username : req.body.username
};
model1.checkUsername(sendObject,function(err, data){  
      console.log('Check output: '+req.body.username+'**'+data);
      if(!data)
	  {
		res.send({valid : true});  
	  }
	  else
	  {
		 res.send({valid : false}); 
	  } 
});
});

router.post('/removeActor',function(req, res, next){ 
sendObject={
_id:req.body._id
};
model1.removeActor(sendObject,function(err, data){
  console.log('Actor was removed');
  res.send({_id:req.body._id});
});
});

router.get('/admin', function (req, res) {
  data={title:'Movie Manager Admin Portal',curr_date:Date.now()};
  res.render('movieManagerAdmin',data);
});

router.get('/user', function (req, res) {
  data={title:'Movie Manager User Portal',curr_date:Date.now()};
  if(!req.session.user)
  {
	  console.log('No active session.');
	  console.log('Session: '+JSON.stringify(req.session));
	  res.render('movieManagerLogin',data); 
  }
  else
  { 
	console.log('Active session exists.');
	res.render('movieManagerUser',data); 
  }  
});

router.get('/logout', function (req, res) {
  req.session.destroy();      
  res.redirect('http://localhost:3000/movieManager/login');  
});

router.get('/login', function (req, res) {
  data={title:'Movie Manager Login',curr_date:Date.now()};
	 res.render('movieManagerLogin',data); 
});

router.get('/signup', function (req, res) {
  data={title:'Movie Manager Signup',curr_date:Date.now()};
	 res.render('movieManagerSignup',data); 
});

router.post('/removeShow',function(req, res, next){ 
sendObject={
_id:req.body._id
};
model1.removeShow(sendObject,function(err, data){
  console.log('Show was removed');
  res.send({_id:req.body._id});
});
});

router.post('/addMovies',function(req, res, next){ 
sendObject={
name:req.body.name,
genre:req.body.genre,
language:req.body.language,
plot:req.body.plot
};
model1.addMovies(sendObject,function(err, data){
  console.log('Inserted movie id: '+data['ops'][0]['_id']);
  res.send({_id:data['ops'][0]['_id']});
});
});

router.post('/saveMovie',function(req, res, next){ 
sendObject={
_id : req.body._id,
name:req.body.name,
genre:req.body.genre,
language:req.body.language,
plot:req.body.plot
};
model1.saveMovie(sendObject,function(err, data){
  res.send();
});
});

router.post('/saveTheatre',function(req, res, next){ 
sendObject={
_id : req.body._id,
name:req.body.name,
city:req.body.city,
address:req.body.address
};
model1.saveTheatre(sendObject,function(err, data){
  res.send();
});
});

router.post('/saveActor',function(req, res, next){ 
sendObject={
_id : req.body._id,
name:req.body.name
};
model1.saveActor(sendObject,function(err, data){
  res.send();
});
});

router.post('/saveShow',function(req, res, next){ 
var localTime = moment(req.body.time).format("hh:mm a");
sendObject={
_id : req.body._id,
price:req.body.price,
time:localTime,
showType:req.body.showType
};
model1.saveShow(sendObject,function(err, data){
  res.send();
});
});

router.post('/addActors',function(req, res, next){ 
sendObject={
movie_id:req.body.movie_id,
name:req.body.name
};
model1.addActors(sendObject,function(err, data){
  res.send({dataAdded:data});
});
});

router.post('/addReview',function(req, res, next){ 
sendObject={
movie_id:req.body.movie_id,
document:req.body.content,
user_id:req.session.user
};
model1.addReview(sendObject,function(err, data){
  res.send();
});
});

router.post('/addShows',function(req, res, next){ 
var localTime = moment(req.body.time).format("hh:mm a");
sendObject={
movie_id:req.body.movie_id,
theatre_id:req.body.theatre_id,
time:localTime,
price:req.body.price,
showType:req.body.showType
};
model1.addShows(sendObject,function(err, data){
  res.send({dataAdded:data});
});
});

router.post('/addTheatres',function(req, res, next){ 
sendObject={
name:req.body.name,
city:req.body.city,
address:req.body.address
};
model1.addTheatres(sendObject,function(err, data){
  console.log('Inserted theatre id: '+data['ops'][0]['_id']);
  res.send({_id:data['ops'][0]['_id']});
});
});


router.post('/getMovies',function(req, res, next){ 
model1.getMovies(function(err, data){
  res.send({movies:data});
});
});

router.post('/getActors',function(req, res, next){ 
sendObject={
movie_id:req.body.movie_id
};
model1.getActors(sendObject,function(err, data){
  res.send({actors:data});
});
});

router.post('/getLocation',function(req, res, next){ 
sendObject={
_id:req.body.city
};
model1.getLocation(sendObject,function(err, data){
  res.send({lat:data[0]['lat'],lng:data[0]['lng']});
});
});

router.post('/getShows',function(req, res, next){ 
sendObject={
movie_id:req.body.movie_id,
theatre_id:req.body.theatre_id
};
model1.getShows(sendObject,function(err, data){
  res.send({shows:data});
});
});

router.post('/getReviews',function(req, res, next){ 
sendObject={
movie_id:req.body.movie_id
};
model1.getReviews(sendObject,function(err, data){
  res.send({reviews:data});
});
});

router.post('/getTheatres',function(req, res, next){ 
model1.getTheatres(function(err, data){
  res.send({theatres:data});
});
});

router.post('/editMovie', function (req, res,next) {
  data={movie:req.body.movie};
  res.render('editMovie',data);
});

router.post('/cancelMovie', function (req, res,next) {
  sendData={movieId:req.body.movieId};
model1.cancelMovieFetch(sendData,function(err, data1){
    data={movie:data1};
    res.render('cancelMovie',data);
});
});


module.exports = router;