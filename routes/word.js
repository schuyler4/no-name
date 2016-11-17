var controller = require('../controllers/word');

module.exports = function(app) {

  /* get the words page */
  app.get('/word', controller.getWord);

  /* post the word page */

  app.post('/word', controller.postWord);

  /* get the thank you page */

  app.get('/thankyou/:word', controller.getThankYou);
}
