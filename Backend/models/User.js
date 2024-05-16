const mongoose = require('mongoose');
const { Schema } = mongoose;
const Resume = require('../models/Resume');

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Employer']
    }
}, { discriminatorKey: 'role', collection: 'users' });

const User = mongoose.model('User', userSchema);

const employerSchema = new Schema({
    companyName: String,
    IndustryField: String,
    companySize: Number,
    address: String,
    urlSiteWeb: String,
    PhoneNumber: String,
    description: String,
    socialMediaURL: String,
    logoCompany: String
});

const Employer = User.discriminator('Employer', employerSchema);

const jobSeekerSchema = new Schema({
    nom: String,
    prenom: String,
    jobTitle: String,  // Added jobTitle
    address: String,   // Added address
    photo: String,
    PhoneNumber: String,
    preferencesRecherche: [String],
    resume: {
        type: Schema.Types.ObjectId,
        ref: 'Resume'
    },
    linkedin: String,
    github:String

});

const JobSeeker = User.discriminator('JobSeeker', jobSeekerSchema);

module.exports = {
    User,
    JobSeeker,
    Employer
};
