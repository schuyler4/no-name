var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  words: [{type: Schema.Types.ObjectId, ref: 'Word'}]
})

module.exports = mongoose.model('Answer', answerSchema)
