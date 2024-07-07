const express = require('express');
const { addTask, getTasks, assignTask, updateTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, addTask)
  .get(protect, getTasks);

router.route('/:id/assign')
  .put(protect, assignTask);

router.route('/:id/status')
  .put(protect, updateTaskStatus);

module.exports = router;
