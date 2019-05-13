const mongoose = require('mongoose');


const resourceSchema = new mongoose.Schema({
    type:['water','gas/power','food', 'transportation', 'tools'],
    description: String
});



module.exports = mongoose.model('Resource', UserSchema);
