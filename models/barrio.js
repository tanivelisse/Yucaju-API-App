const mongoose = require('mongoose');

const barrioSchema = new mongoose.Schema({
    name: String,
    municipality: String
});


module.exports = mongoose.model('Barrio', barrioSchema);

