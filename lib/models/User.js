const mongoose = require('mongoose');
const { passHash, comparePasswords } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
    }
  }, 
  versionKey: false
});

userSchema.virtual('password').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next){
  passHash(this._tempPassword)
    .then(hashPassword => {
      this.passwordHash = hashPassword;    
      next();
    });
});

userSchema.methods.compare = function(password) {
  return comparePasswords(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return User.findOne({ user: this._id })
    .select({
      user: false
    })
    .lean()
    .then(() => {
      return tokenize({ ...this.toJSON() });
    });
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

userSchema.statics.signIn = async function(email, password) {
  const user = await this.findOne({ email });
  if(!user) return null;

  const result = await comparePasswords(password, user.passwordHash);
  if(!result) return null;

  const token = await user.authToken();

  return { user, token };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
