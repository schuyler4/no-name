var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function(passport) {

  /* serilize the user - save there session */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  /* desilize the user - remove the session */
  passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {
      if(err) {
        throw err;
      }

      done(err, user);
    });
  });

  /* the signup strategy - gener */
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {

      process.nextTick(function() {

        User.findOne({ 'email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage',
                'That email is already taken.'));

            } else {

                var newUser = new User();

                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.questions = 0;
                newUser.words = 0;

                newUser.save(function(err, user) {
                    if (err)
                        throw err;

                    return done(null, user);
                });
            }

        });

      });

  }));

  /* the strategy for logging in the user */
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, email, password, done) {

    User.findOne({'email': email}, function(err, user) {
      if(err) {
        throw err;
      }

      if(!user) {
        return done(null, false, req.flash('loginMessage',
          'we could not find that'));
      }

      if(!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage',
          'your password is wrong'))
      }

      return done(null, user);

    });
  }));

}
