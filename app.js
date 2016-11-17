"use strict"
var express = require('express');
var app = express();

var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var logger = require('express-logger');

morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
})

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://mareknewton:1234@ds059516.mlab.com:59516/aidata');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json())
app.use(require('express-session')({
  secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/home')(app);
require('./routes/user')(app, passport);
require('./routes/word')(app);
require('./routes/qAndA')(app);

app.listen(3000);
console.log("listening on port 3000")
