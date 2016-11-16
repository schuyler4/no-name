var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log("serializeUser")
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },

  function(req, email, password, done) {
        console.log("hello");

        process.nextTick(function() {
        console.log("alpha")

        User.findOne({ 'local.email' :  email }, function(err, user) {
            console.log("beta");
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage',
                'That email is already taken.'));
            } else {

                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    console.log("charly")
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

        });

    }));

}
