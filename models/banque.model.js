var mongoose = require('mongoose');
const architecture = require('./architecture.model');

const banqueSchema = mongoose.Schema({
    nom: {
        type: String,
        required: 'full name can\'t be empty',
    },
    bic: {
        type: String,
        required: 'full bic can\'t be empty',
        maxLength: 11,
        minLength: 8,
    },
    architectureNOM: {
        type: String,
        ref: architecture,
    },
    pays: {
        type: String,
        required: 'full pays can\'t be empty',
        maxLength: 20,
        minLength: 2
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('banques', banqueSchema);