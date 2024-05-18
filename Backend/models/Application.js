const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    jobSeekerId: {
        type: Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    jobOfferId: {
        type: Schema.Types.ObjectId,
        ref: 'JobOffer',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,  // Reference to the Post within a JobOffer
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salaryExpectations: {
        type: String,
        required: false
    },
    coverLetter: {
        type: String,
        required: false
    },
    motivationLetterFile: {
        type: String, // Assuming a file path or URL will be stored here
        required: false
    },
    resumeFile: {
        type: String, // Assuming a file path or URL will be stored here
        required: false
    },
    status: {
        type: String,
        enum: ['in progress', 'accepted', 'rejected','archived'],
        default: 'in progress'
    },
    appliedOn: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
