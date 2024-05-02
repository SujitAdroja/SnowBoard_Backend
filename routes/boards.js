const express = require("express");
const router = express.Router();
const {
  getAllBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/boards");
const app = express();

// routers
router.route("/").get(getAllBoards).post(createBoard);
router.route("/:id").get(getBoard).patch(updateBoard).delete(deleteBoard);

// exporting modules
module.exports = router;
