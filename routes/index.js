var express = require('express');

var router = express.Router();



var mongo = require('mongodb').MongoClient
;
var url = 'mongodb://127.0.0.1:27017/db1'
;
var model1 = require('../model/model1')

router.use(express.static('jquery.min.js'));

router.get('/viewdata2',function(req, res, next){ 
model1.all(function(err, data){
  res.render('showdata',{data:data});
});
});

router.post('/viewNames',function(req, res, next){ 
model1.all(function(err, data){
  res.send({names:data});
});
});

router.post('/viewdata3',function(req, res, next){ 
model1.findname(req.body.firstname,function(err, data){
if(data.length)
res.send('Found it! '+data[0].firstname+' '+data[0].lastname);
else
res.send('Not found!');
}
);
});

router.get('/viewdata',function(req, res, next) 
{

  mongo.connect(url, function(err, db) {

  if (err) 
  throw err;
  
  var table = db.collection('userdata');
  
  table.find().toArray(function(err, data) 
  {
    
  if(err) 
  throw err;
    
  console.log(data);
    
  db.close()
;  
  res.render('showdata',{data:data});
  }
);

}
);

}
);

router.get('/',function(req, res, next) 
{
  
  res.render('index',{ title: 'Express' });
}
);

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

router.use(requestTime);

router.get('/time', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

router.get('/form1', function (req, res) {
  res.render('form1');
});

router.get('/formpost', function (req, res) {
  data={title:'Form Main',curr_date:Date.now()};
  res.render('formPost',data);
});

router.get('/ang1', function (req, res) {
  data={title:'Angular',curr_date:Date.now()};
  res.render('showNames',data);
});

router.post('/formName', function(req, res, next){
  res.render('formData',{firstname:req.body.firstname,lastname:req.body.lastname});
});

router.post('/send_post', function(req, res, next) {
  console.log('Received: '+req.body.firstname);
  console.log('Received: '+req.body.lastname);
  res.send('Got it! '+req.body.firstname+' '+req.body.lastname);
});



module.exports = router;