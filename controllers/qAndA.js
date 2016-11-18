var Question = require('../models/question.js');
var Answer = require('../models/answer.js');
var Word = require('../models/word.js');
var User = require('../models/user.js');

/* get the question page */
exports.getQuestion = function(req, res) {
  return res.render('question');
}

/* post the question page */
exports.askQuestion = function(req, res) {
  var inputQuestion = req.body.question;

  Question.findOne({question: inputQuestion}, function(err, question) {
    if(err) {
      throw err;
    }

    if(question) {
      var query = {question: inputQuestion};
      var increment = {$inc :{numberAsked: 1}}

      Question.findOneAndUpdate(query, increment).exec(function(err, question) {
        if(err) {
          throw err;
        }

        var query = {_id: req.user.id};
        var increment = {$inc: {questions: 1}};

        /* update the user's questions */
        User.findOneAndUpdate(query, increment).exec(function(err, user) {
          if(err) {
            throw err;
          }

          return res.redirect('/answer/' + question.question);
        });

      });

    } else {

      var newQuestion = new Question();
      newQuestion.question = inputQuestion;
      newQuestion.numberAsked = 1;
      newQuestion.oneAnswers = [];
      newQuestion.twoAnswers = [];
      newQuestion.threeAnswers = [];
      newQuestion.fourAnswers = [];
      newQuestion.fiveAnswers = [];
      newQuestion.sixAnswers = [];
      newQuestion.sevenAnswers = [];
      newQuestion.eightAnswers = [];
      newQuestion.nineAnswers = [];

      newQuestion.save(function(err, question) {
        if(err) {
          throw err;
        }

        return res.redirect('/answer/' + question.question);
      });

    }

  });


}

/* get the answer page */
exports.getAnswer = function(req, res) {
  var question = req.params.question;

  Word.find({}, function(err, words) {
    if(err) {
      throw err;
    }

    /* proboly a better way of doing this I dont care */
    if(words !== []) {
      var maxWords = 30;
      var minWords = 10;
      var wordsInAnwser = Math.floor(Math.random() * (maxWords - minWords + 1))
        + minWords;

      var answerArray = [];

      for(i = 0; i < wordsInAnwser; i++) {
        var randomWord = words[Math.floor(Math.random() * words.length)].word;

        answerArray.push(randomWord)
      }
      var answer = answerArray.join(' ');

      return res.render('answer', {question: question, answer: answer});

    } else {
      var answer = "there are no words in my vocabulary";

      return res.render('answer', {question: question, answer: answer});
    }

  });


}

/* for the users to post a rating after there qustion has been asked */
exports.postAnswer = function(req, res) {
  var question = req.params.question;
  var answer = req.body.answer;
  var rating = req.body.rating;

  console.log("the question is " + question);
  console.log("the rating is " + rating);
  console.log("the answer is" + answer)

  /* this is to push the rating to the question */
  function addRating(array) {
    var query = {question: question};
    var push = {$push: {array: answer}};

    Question.findOneAndUpdate(query, push, function(err, rating) {
      if(err) {
        throw err;
      }

      return res.redirect('/answer/' + question);
    });
  }

  /* switch thought all the ratings and call the function */
  switch (rating) {
    case '1':
      addRating('oneAnswers');
      break;

    case '2':
      addRating(twoAnswers);
      break;

    case '3':
      addRating(threeAnswers);
      break;

    case '4':
      addRating(fourAnswers);
      break;

    case '5':
      addRating(fiveAnswers);
      break;

    case '6':
      addRating(sixAnswers);
      break;

    case '7':
      addRating(sevenAnswers);
      break;

    case '8':
      addRating(eightAnswers);
      break;

    case '9':
      addRating(nineAnswers);
      break;

    case '10':
      addRating(tenAnswers);
      break;

  }

}
