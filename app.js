"use strict"
var express = require('express');
var app = express();

var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var mongoStore = require('connect-mongo')(require('express-session'));

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mareknewton:1234@ds059516.mlab.com:59516/aidata');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json())

app.use(require('express-session')({
  secret: 'dasf*SJDifO(((FSDF()DSFIS)Dfsd0f()FDS)FDSF)',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
    url: 'mongodb://mareknewton:1234@ds059516.mlab.com:59516/aidata'
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/home')(app);
require('./routes/user')(app, passport);
require('./routes/word')(app);
require('./routes/qAndA')(app);

app.listen(3000);
console.log("listening on port 3000")
