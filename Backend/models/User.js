const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  motDePasse: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  dateDeCreation: { type: Date, default: Date.now },
  dateDeMiseAJour: { type: Date, default: Date.now },
  dateDeSuppression: { type: Date, default: null }
});

module.exports = mongoose.model('user', userSchema);
