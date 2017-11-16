var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({

    ingredients: {
        type: String,
        required: false
    }


});

var list = mongoose.model('list', listSchema);

module.exports = list;
