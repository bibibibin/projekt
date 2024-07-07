const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comments: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
