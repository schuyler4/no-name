/* render the singnup page */
exports.getSignUp = function(req, res) {
  res.render('signup', {message: req.flash('signupMessage')});
}

/* render the login page */
exports.loginUser = function(req, res) {
  res.render('login', {message: req.flash('loginMessage ')});
}

/* get the logout path logout and redirect */
exports.logout = function(req, res) {
  console.log("logout");
}

/* get the profile for the user */
exports.getUser = function(req, res) {
  res.render("profile")
}

/* middleware to check if the user is logged in */
exports.isLoggedIn = function(req, res) {

  if(req.isAuthenticated()) {
      return next();
  }

  res.redirect('/login');
}
