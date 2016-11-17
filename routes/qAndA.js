var controller = require('../controllers/qAndA');

module.exports = function(app) {

  /*get the question*/

  app.get('/question', controller.getQuestion)

  /*post the question*/

  app.post('/question', controller.askQuestion)

  /*get the answer*/

  app.get('/answer/:question', controller.getAnswer)

  /*post the answers rating */

  app.post('/answer/:question', controller.postAnswer)

}
