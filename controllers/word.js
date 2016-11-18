var Word = require('../models/word');
var User = require('../models/user');

/* get the page for telling the word */
exports.getWord = function(req, res) {
  return res.render('word');
}

/* post the word to the database and redirect to the thankyou page */
exports.postWord = function(req, res) {
  var wordInput = req.body.word;
  var wordTypeInput = req.body.wordType;

  var newWord = new Word();
  newWord.word = wordInput;
  newWord.usages = 0;
  newWord.wordType = wordTypeInput;

  newWord.save(function(err, word) {
    if(err) {
      throw err;
    }

    var query = {_id: req.user.id};
    var increment = {$inc : {words: 1}}

    /* update the user's words */
    User.findOneAndUpdate(query, increment).exec(function(err, user) {
      if(err) {
        throw err;
      }

      return res.redirect('/thankyou/' + word.word);
    })

  });
}

/* get the thankyou page that it is redirected to */
exports.getThankYou = function(req, res) {
  var word = req.params.word;

  return res.render('thankyou', {word: word})
}
