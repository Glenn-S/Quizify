const mongoose = require('mongoose');

// user google auth information to populate this table
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The user name is required.']
  },
  email: {
    type: String,
    required: [true, 'The user email is required.']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };