const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nomEntreprise: { type: String, required: true },
  photo: { type: String },
  secteurActivite: { type: String, required: true },
  infoContact: { type: String, required: true }
});

module.exports = mongoose.model('Employer', employerSchema);
