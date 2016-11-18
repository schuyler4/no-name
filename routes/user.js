var passport = require('passport');

var controller = require('../controllers/user');

module.exports = function(app, passport) {
  var middleware = require('../middleware/passport')(passport);

  /* get the signup page */
  app.get('/signup', controller.getSignUp);

  /* post the user page use passport to create a user */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  /* post the login page */
  app.get('/login', controller.getLogin);

  /* post for the login use the login strategy */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  /* logout the user */
  app.get('/logout', controller.logout)

  /* get the users specific profile if they are logged in */
  app.get('/profile', controller.isLoggedIn, controller.getUser);

}
