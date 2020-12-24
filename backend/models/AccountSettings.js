const mongoose = require('mongoose');

const accountSettingsSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'The google id is required for a quiz.']
  },
  theme: {
    type: String,
    required: true
  }
});

const AccountSettings = mongoose.model('AccountSettings', accountSettingsSchema);

module.exports = { accountSettingsSchema, AccountSettings };