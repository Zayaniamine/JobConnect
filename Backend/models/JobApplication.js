const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  idCandidat: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidat', required: true },
  idOffreEmploi: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
  JobPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosition' },
  statut: { type: String, required: true },
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null }
});

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
