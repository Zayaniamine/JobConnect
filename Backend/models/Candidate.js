const mongoose = require('mongoose');
const CV = require('./cvSchema');

const candidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true }
});

module.exports = mongoose.model('Candidate', candidateSchema);