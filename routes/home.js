var controllers = require('../controllers/home');

module.exports = function(app) {
  app.get('/', controllers.getHome);
}
