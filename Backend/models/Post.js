const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  jobOfferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOffer'
  },
  title: String,
  description: String,
  responsibilities: [String]
});

module.exports = mongoose.model('Post', PostSchema);
