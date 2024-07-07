const express = require('express');
const { submitProof, getSubmissions, getSubmission, addEvaluation } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, submitProof)
  .get(protect, getSubmissions);

router.route('/:id')
  .get(protect, getSubmission)
  .post(protect, addEvaluation);

module.exports = router;
