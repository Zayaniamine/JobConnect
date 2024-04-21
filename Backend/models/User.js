const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
    },
    industryField: {
        type: String,
    },
    logoCompany: {
        type: String,
    },
    address: {
        type: String,
    },
    websiteUrl: {
        type: String,
    },
    linkedin: {
        type: String,
    },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
