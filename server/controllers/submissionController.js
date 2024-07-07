const Submission = require('../models/Submission');
const Evaluation = require('../models/Evaluation');

const submitProof = async (req, res) => {
  const { task, proofUrl } = req.body;

  const submission = new Submission({
    task,
    user: req.user._id,
    proofUrl
  });

  const createdSubmission = await submission.save();
  res.status(201).json(createdSubmission);
};

const getSubmissions = async (req, res) => {
  const submissions = await Submission.find().populate('task').populate('user', 'username');
  res.json(submissions);
};

const getSubmission = async (req, res) => {
  const submission = await Submission.findById(req.params.id).populate('task').populate('user', 'username');
  res.json(submission);
};

const addEvaluation = async (req, res) => {
  const { rating, comments } = req.body;

  const evaluation = new Evaluation({
    submission: req.params.id,
    evaluator: req.user._id,
    rating,
    comments
  });

  const createdEvaluation = await evaluation.save();
  res.status(201).json(createdEvaluation);
};

module.exports = {
  submitProof,
  getSubmissions,
  getSubmission,
  addEvaluation
};
