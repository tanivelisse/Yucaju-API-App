const mongoose = require('mongoose');


const resourceSchema = new mongoose.Schema({
    type:String,
    description: String
});



module.exports = mongoose.model('Resource', resourceSchema);
