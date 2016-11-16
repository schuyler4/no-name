var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Answer = require('./answer')

var questionSchema = new Schema({
  question: {type: String, require: true},
  numberAsked: {type: Number, require: true},
  oneAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  twoAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  threeAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  fourAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  fiveAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  sixAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  sevenAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  eightAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  nineAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  tenAnswers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})

module.exports = mongoose.model('Question', questionSchema);
