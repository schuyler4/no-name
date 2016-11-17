var Question = require('../models/question.js');
var Answer = require('../models/answer.js');
var Word = require('../models/word.js');

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

        return res.redirect('/answer/' + question.question);
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
      console.log(answer);

      return res.render('answer', {question: question, answer: answer});

    } else {
      var answer = "there are no words in my vocabulary";

      return res.render('answer', {question: question, answer: answer});
    }

  });


}

/* for the users to post a rating after there qustion has been asked */
exports.postAnswer = function(req, res) {
  return console.log("posting rating")
}
