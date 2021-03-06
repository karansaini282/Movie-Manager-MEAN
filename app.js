var express = require('express');

var path = require('path');

var favicon = require('serve-favicon');

var logger = require('morgan');

var cookieParser = require('cookie-parser');

var redirect = require("express-redirect");

var bodyParser = require('body-parser');

var session = require('express-session');

var routes = require('./routes/index');

var users = require('./routes/users');

var birds = require('./routes/birds');

var movieManagerRouter = require('./routes/movieManagerRouter');

var app = express();

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDq1_HPW8hwBuFcrp4iRL_GGWXP_DTj9is'
});

redirect(app);

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'nodesession',
	resave: true,
    saveUninitialized: true
}));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', routes);

app.use('/users', users);


app.use('/birds', birds);

app.use('/movieManager', movieManagerRouter);


app.use(function(req, res, next) 
{
  
var err = new Error('Not Found');
  
err.status = 404;
  next(err);

}
);


if (app.get('env') === 'development') 
{
  
app.use(function(err, req, res, next) 
{
    
res.status(err.status || 500);
    
res.render('error',{
message: err.message,
error:err
});
  
}
);

}


app.use(function(err, req, res, next) 
{
  
res.status(err.status || 500);
  
res.render('error',{message: err.message,error:{}
 });

}
);
module.exports = app;