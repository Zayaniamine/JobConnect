const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobTemp2Schema = new Schema({
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
    date_debut: {
       type : Date,
       default: Date.now, 

    },
    date_fin: {
        type : Date,
        required : true ,
     },
     disponibilite : {
        type : Boolean,
     },
     nmbr_condidat: {
        type : Number , 
     },
    skills : [
        {
           skill:{ 
            type : String ,
            required : true ,
           }
        }
    ]
});

const JobTemp2Model = mongoose.model('JobTemp2', jobTemp2Schema);
module.exports = JobTemp2Model;
