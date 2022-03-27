var mongoose = require('mongoose');

var architectureSchema = mongoose.Schema({
    nom: {
        type: String,
        unique: true,
        enum: ["A1", "A2", "A3", "A4", "B"],
        required: 'name can\'t be empty'
    },
    mo: { type: Array, minimum: 2, maximum: 31, required: true },
    mc: { type: Array, minimum: 2, maximum: 31, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('architectures', architectureSchema);