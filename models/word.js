var mongoose = require('mongoose');
var Schema = mongoose.Schema


var wordSchma = new Schema({
  word: {String, require: true}
  usages: {Number, require: true}
})
