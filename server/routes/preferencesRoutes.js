const express = require('express');
const { setPreferences, getPreferences, getRandomTask } = require('../controllers/preferencesController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, setPreferences)
  .get(protect, getPreferences);

router.route('/random')
  .get(protect, getRandomTask);

module.exports = router;
