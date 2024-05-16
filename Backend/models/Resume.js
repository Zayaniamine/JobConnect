const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    jobTitle: { type: String },
    employer: { type: String },
    city: { type: String },
    country: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String }
}, { _id: false });

const educationSchema = new Schema({
    institution: { type: String },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String }
}, { _id: false });

const skillSchema = new Schema({
    skillName: { type: String },
    proficiency: { type: String }
}, { _id: false });

const languageSchema = new Schema({
    language: { type: String },
    proficiency: { type: String }
}, { _id: false });

const interestSchema = new Schema({
    interest: { type: String }
}, { _id: false });

const resumeSchema = new Schema({
    // Add a reference to User (JobSeeker)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'JobSeeker'
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
    profileTitle: { type: String },
    profileDescription: { type: String },
    experiences: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
    languages: [languageSchema],
    interests: [interestSchema]
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
