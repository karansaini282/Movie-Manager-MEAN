var url = 'mongodb://127.0.0.1:27017/db1'
;
var mongo = require('mongodb').MongoClient
;
  mongo.connect(url, function(err, db) {

  if (err) 
  throw err;


exports.all = function(cb) {
  var table = db.collection('userdata');

  table.find().toArray(function(err, data) {
    cb(err, data);
  });
}

exports.findname = function(name,cb) {
  var table = db.collection('userdata');

  table.find({firstname:name}).toArray(function(err, data) {
    cb(err, data);
  });
}

}
);

