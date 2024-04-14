const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nomEntreprise: { type: String, required: true },
  logo: { type: String }, 
  secteurActivite: { type: String, required: true },
  tailleEntreprise: { type: String, required: true }, // Added field
  urlSiteWeb: { type: String }, // Added field, not marked as required in the class
  description: { type: String }, // Added field, not marked as required in the class
  adresse: { type: String, required: true }, // Added field
  TIN: { type: String, required: true }
});

module.exports = mongoose.model('Employer', employerSchema);
