var mongoose = require('mongoose');

var solutionSchema = mongoose.Schema({
    nom: {
        type: String,
        required: 'full name can\'t be empty',
        unique: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('solutions', solutionSchema);