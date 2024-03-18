const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInformation: {
        name: { type: String, required: true },
        contact: {
            address: String,
            phone: String,
            email: String
        },
        dateOfBirth: String,
        nationality: String
    },
    professionalSummary: String,
    education: [{
        degree: String,
        institution: String,
        graduationYear: Number
    }],
    workExperience: [{
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        responsibilities: String
    }],
    skills: [String],
    certifications: [{
        name: String,
        date: String
    }],
    achievements: [String],
  
});

module.exports = mongoose.model('CV', cvSchema);
