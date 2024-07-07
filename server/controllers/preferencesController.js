const Preferences = require('../models/Preferences');
const Task = require('../models/Task');

const setPreferences = async (req, res) => {
  const preferences = await Preferences.findOne({ user: req.user._id });

  if (preferences) {
    preferences.preferenceData = req.body.preferenceData;
    await preferences.save();
  } else {
    const newPreferences = new Preferences({
      user: req.user._id,
      preferenceData: req.body.preferenceData
    });
    await newPreferences.save();
  }

  res.status(200).json({ message: 'Preferences updated' });
};

const getPreferences = async (req, res) => {
  const preferences = await Preferences.findOne({ user: req.user._id });
  res.json(preferences);
};

const getRandomTask = async (req, res) => {
  const preferences = await Preferences.findOne({ user: req.user._id });
  if (preferences) {
    const tasks = await Task.find({ status: 'pending' });
    const filteredTasks = tasks.filter(task => {
      // Implement your filtering logic based on preferences here
      return true;
    });

    if (filteredTasks.length > 0) {
      const randomTask = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
      res.json(randomTask);
    } else {
      res.status(404).json({ message: 'No tasks available' });
    }
  } else {
    res.status(404).json({ message: 'Preferences not found' });
  }
};

module.exports = {
  setPreferences,
  getPreferences,
  getRandomTask
};
