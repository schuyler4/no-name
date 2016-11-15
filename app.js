"use strict"
var express = require('express');
var app = express();

var expressHandlebars = require('express-handlebars');

require('./routes/home')(app);

app.listen(3000);
console.log("listening on port 3000")
