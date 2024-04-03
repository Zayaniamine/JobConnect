const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  idCandidat: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidat', required: true },
  informationsPersonnelles: {
    type: new mongoose.Schema({
      // Structure as defined in your model
    },),
    required: true
  },
  competences: [{ type: String }],
  experiences: [{type: String
    // Define experience structure
  }],
  projets: [{type: String
    // Define project structure
  }],
  formation: [{type: String
    // Define education structure
  }],
  extras: [{ type: String }],
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null }
});

module.exports = mongoose.model('CV', cvSchema);
