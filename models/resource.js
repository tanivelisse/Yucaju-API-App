const mongoose = require('mongoose');
const User = require('./user')


const resourceSchema = new mongoose.Schema({
    type:String,
    description: String,
    ownerId: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref:'User'
    }
});



module.exports = mongoose.model('Resource', resourceSchema);
