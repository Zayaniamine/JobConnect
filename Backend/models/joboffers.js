const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  skills: [{ type: String }],
  jobType: { type: String, enum: ['in-office', 'remote', 'hybrid'], required: true },
  clotureOffre: { type: Date, },

  dateDeCreation: { type: Date, default: Date.now, auto: true },
});

const JobOfferSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
 
  clotureOffre: { type: Date, required: true },
  disponibilite: { type: Boolean },  // This tracks overall offer availability
  dateDeCreation: { type: Date, default: Date.now, auto: true },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null },
  jobType: { type: String, enum: ['in-office', 'remote', 'hybrid'], default: 'in-office' },
  posts: [PostSchema],  // Contains individual job positions with their own `jobType` and `disponibilite`
});

const JobOffer = mongoose.model('JobOffer', JobOfferSchema);
const JobPosition = mongoose.model('JobPosition', PostSchema);

module.exports = { JobOffer, JobPosition };
