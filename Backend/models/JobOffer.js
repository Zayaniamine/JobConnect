const mongoose = require('mongoose');

const JobOfferSchema = new mongoose.Schema({
  idEmployer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  idJobPosition: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobPosition' }] ,
  titre: { type: String, required: true },
  description: { type: String, required: true },
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null }
});





module.exports = mongoose.model('JobOffer', JobOfferSchema);
