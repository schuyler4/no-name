var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

/* the user needs a username a emial and a password */
var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  questions: {type: Number, required: true},
  words: {type: Number, required: true}
});

/* encrypt the password before it is stored in the database */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
  
/* make sure the encrypted pass is valid before storing it in the database */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema)
