const mongoose = require('mongoose');

// define schema
const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  isActive: { type: Boolean, default: true },
});

// compile model
const User = mongoose.model('User', usersSchema);

// export
module.exports = {
  User,
};
