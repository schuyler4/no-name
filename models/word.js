var mongoose = require('mongoose');
var Schema = mongoose.Schema

var wordSchma = new Schema({
  word: {type: String, required: true},
  usages: {type: Number, required: true},
  wordType: {type: String, required: true}
})

module.exports = mongoose.model('Word', wordSchma);
