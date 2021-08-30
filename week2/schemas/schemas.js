const mongoose = require('mongoose');

// define schema
const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// compile model
const User = mongoose.model('User', usersSchema);

// export
module.exports = {
  User,
};
