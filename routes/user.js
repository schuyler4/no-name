var passport = require('passport');

var controller = require('../controllers/user');

module.exports = function(app, passport) {
  var middleware = require('../middleware/passport')(passport);

  /* get the signup page */
  app.get('/signup', controller.getSignUp);

  /* post the user page use passport to create a user */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  /* post the login page */
  app.post('/login', function() {
    console.log("logging in");
  });

  /* get the users specific profile if they are logged in */
  app.get('/profile', controller.getUser)

}
