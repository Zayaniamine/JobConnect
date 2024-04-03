const mongoose = require('mongoose');

const CandidatSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idCV: { type: mongoose.Schema.Types.ObjectId, ref: 'CV' },
  informationsPersonnelles: {
    type: new mongoose.Schema({
      nom: String,
      prenom: String,
      photo: { type: String },
      // Add other personal information fields as needed.
    },),
    required: true
  },
  preferencesRecherche: { type: String, required: true }
});

module.exports = mongoose.model('Candidat', candidatSchema);
