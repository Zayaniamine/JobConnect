const mongoose = require('mongoose');

const JobOfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    salary: Number,
    requirements: [String],
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true }
});

module.exports = mongoose.model('Job', JobOfferSchema);
orts = mongoose.model('Job', jobOfferSchema);
