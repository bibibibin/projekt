const Task = require('../models/Task');

const addTask = async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    title,
    description,
    createdBy: req.user._id
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find().populate('createdBy', 'username').populate('assignedTo', 'username');
  res.json(tasks);
};

const assignTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.assignedTo = req.body.assignedTo;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.status = req.body.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

module.exports = {
  addTask,
  getTasks,
  assignTask,
  updateTaskStatus
};
