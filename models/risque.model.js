var mongoose = require('mongoose');

var risqueSchema = mongoose.Schema({
    nom: {
        type: String,
        unique: true,
        required: 'full name can\'t be empty',

    }
}, {
    timestamps: true
});

module.exports = mongoose.model('risques', risqueSchema);