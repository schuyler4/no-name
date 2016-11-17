var Word = require('../models/word');

exports.getWord = function(req, res) {
  return res.render('word');
}

exports.postWord = function(req, res) {
  var wordInput = req.body.word;
  var wordTypeInput = req.body.wordType;

  var newWord = new Word();
  newWord.word = wordInput;
  newWord.usages = 0;
  newWord.type = wordTypeInput;

  newWord.save(function(err, word) {
    if(err) {
      throw err;
    }

    return res.redirect('/thankyou/' + word.word);
  });
}

exports.getThankYou = function(req, res) {
  var word = req.params.word;

  return res.render('thankyou', {word: word})
}
