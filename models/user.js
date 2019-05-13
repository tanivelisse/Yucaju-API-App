const mongoose = require('mongoose');
const Resource = require('../models/resource');


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  municipality: String,
  barrio: String,
  safety: Boolean,
  resources: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Resource'
	}]
});



module.exports = mongoose.model('User', UserSchema);