// const { findOneAndUpdate } = require('../models/tasks');
const Tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/asyncwrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.create(req.body);
  const newTasks = tasks[req.body.tabName].unshift(req.body);
  res.status(201).json({});
});

const getTask = asyncWrapper(async (req, res) => {
  // const { id: tasksID } = req.params
  const tasks = await Tasks.findOne({ boardID: req.params.id });
  if (!tasks) {
    return res.status(500).send(`no tasks with id : ${tasksID}`);
  }
  res.status(200).json({ tasks });
});

const updateTask = asyncWrapper(async (req, res) => {
  // const tasks = await Tasks.findOneAndUpdate(
  //   { boardID: req.params.id },
  //   req.body,
  //   {
  //     runValidators: true,
  //     new: true,
  //   }
  // );
  console.log(req.body.createdAt);
  const tasks = await Tasks.findOneAndUpdate(
    { boardID: req.params.id },
    { tabs: req.body.tabs, createdAt: req.body.createdAt },
    {
      runValidators: true,
      new: true,
    }
  );
  console.log(req.body);
  if (!tasks) {
    return res.status(500).send(`no tasks with id : ${req.params.id}`);
  }
  res.status(200).json({ tasks });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { boardID: tasksID } = req.body;
  const tasks = await Tasks.findOneAndDelete({ _id: req.params.id });
  if (!tasks) {
    return res.status(500).send(`no tasks with id : ${tasksID}`);
  }
  res.status(200).json({ tasks });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
