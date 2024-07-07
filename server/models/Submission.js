const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proofUrl: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);
