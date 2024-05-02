// const { findOneAndUpdate } = require('../models/board');
const Board = require("../models/boards");
const Tasks = require("../models/tasks");
const asyncWrapper = require("../middleware/asyncwrapper");

const getAllBoards = asyncWrapper(async (req, res) => {
  const boards = await Board.find({});
  res.json({ boards });
});
const createBoard = asyncWrapper(async (req, res) => {
  const board = await Board.create(req.body);
  const tasks = await Tasks.create({
    boardID: board._id,
    createdAt: board.createdAt,
  });
  res.status(201).json({ board, tasks });

  // res.json(req.body);
});

const getBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params;
  const board = await Board.findOne({ _id: req.params.id });
  if (!board) {
    return res.status(500).send(`no board with id : ${boardID}`);
  }
  res.status(200).json({ board });
});

const updateBoard = asyncWrapper(async (req, res) => {
  console.log(req.body, "updateBoard");
  const board = await Board.findOneAndUpdate(
    { _id: req.params.id },
    { createdAt: req.body.createdAt },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!board) {
    return res.status(500).send(`no board with id : ${req.params.id}`);
  }
  res.status(200).json({ board });
});

const deleteBoard = asyncWrapper(async (req, res) => {
  const { id: boardID } = req.params.id;
  const board = await Board.findOneAndDelete({ _id: req.params.id });

  const tasks = await Tasks.findOneAndDelete({ boardID: req.params.id });
  if (!board) {
    return res.status(500).send(`no board with id : ${boardID}`);
  }
  res.status(200).json({ board });
});

module.exports = {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
};
