const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferenceData: { type: Map, of: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Preferences', preferencesSchema);
