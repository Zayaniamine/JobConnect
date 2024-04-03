const mongoose = require('mongoose');

const JobPositionSchema = new mongoose.Schema({
  idJobOffer: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer', required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  exigences: [{ type: String }],
  clotureOffre: { type: Date, required: true },
  disponibilite: { type: Boolean, required: true },
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null }
});

module.exports = mongoose.model('JobPosition', JobPositionSchema);
