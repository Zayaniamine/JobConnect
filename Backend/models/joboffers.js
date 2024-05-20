const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  skills: [{ type: String }],
  jobType: { type: String, enum: ['In-office', 'Remote', 'Hybrid'], required: true },
  clotureOffre: { type: Date, required: true },
  dateDeCreation: { type: Date, default: Date.now }, 
}, { _id: true });

const JobOfferSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  clotureOffre: { type: Date, required: true },
  disponibilite: { type: Boolean },
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null },
  jobType: { type: String, enum: ['in-office', 'remote', 'hybrid'], default: 'in-office' },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  posts: [PostSchema],
});

const JobOffer = mongoose.model('JobOffer', JobOfferSchema);
const JobPosition = mongoose.model('JobPosition', PostSchema);

module.exports = { JobOffer, JobPosition };
