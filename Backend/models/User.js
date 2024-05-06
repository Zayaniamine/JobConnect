const mongoose = require('mongoose');
const { Schema } = mongoose;

// Base User Schema
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

// Employer Discriminator Schema
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

// Job Seeker Discriminator Schema
const jobSeekerSchema = new Schema({
    nom: String,
    prenom: String,
    photo: String,
    PhoneNumber: String,
    preferencesRecherche:[String]
});

const JobSeeker = User.discriminator('JobSeeker', jobSeekerSchema);

module.exports = {
    User,
    JobSeeker,
    Employer
};
