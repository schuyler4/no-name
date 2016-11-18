  /* render the singnup page */
  exports.getSignUp = function(req, res) {
    return res.render('signup', {message: req.flash('signupMessage')});
  }

  /* render the login page */
  exports.getLogin = function(req, res) {
    return res.render('login', {message: req.flash('loginMessage')});
  }

  /* get the logout path logout and redirect */
  exports.logout = function(req, res) {
    req.logout();
    return res.redirect('/');
  }

  /* middleware to check if the user is logged in */
  exports.isLoggedIn = function(req, res, next) {

    if(req.isAuthenticated()) {
        return next();
    } else {

      return res.redirect('/login');
    }

  }

  /* get the profile for the user */
  exports.getUser = function(req, res) {
    console.log(req.user);
    res.render("profile", {
      username: req.user.email,
      questions: req.user.questions,
      words: req.user.words
    });
  }
