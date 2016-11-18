var controller = require('../controllers/word');
var userContoller = require('../controllers/user')

module.exports = function(app) {

  /* get the words page */
  app.get('/word', userContoller.isLoggedIn, controller.getWord);

  /* post the word page */

  app.post('/word', userContoller.isLoggedIn, controller.postWord);

  /* get the thank you page */

  app.get('/thankyou/:word', userContoller.isLoggedIn ,controller.getThankYou);
}
