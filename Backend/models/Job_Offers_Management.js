const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobOfferSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    published_by: {
        type: Schema.Types.ObjectId,
        ref: 'user', // Assuming your user model is named 'User'
        required: true,
    },
    date_debut: {
       type : Date,
       default: Date.now, 

    },
    date_fin: {
        type : Date,
        required : true ,
     },

    posts: [{
       
        post_name: {
            type: String,
            required: true,
        },
        skills: {
            type: String,
            required: true,
        }
    }],
});

const JobOfferModel = mongoose.model('Job_Offers_Management', jobOfferSchema);
module.exports = JobOfferModel;
