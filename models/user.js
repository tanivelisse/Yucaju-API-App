const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  municipality: String,
  barrio: String,
  safety: Boolean
});



module.exports = mongoose.model('User', UserSchema);