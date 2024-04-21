const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    post_name: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
 
});

const PostModel = mongoose.model('Posts', postSchema);

module.exports = PostModel;
