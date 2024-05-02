const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const boards = require("./routes/boards");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const port = process.env.PORT || 3000;
const url = process.env.url;
console.log(url, "url");
app.use(express.json());

app.use("/api/v1/boards", boards);
app.use("/api/v1/tasks", tasks);

const start = () => {
  try {
    connectDB(process.env.url);
    console.log("Connected To Database");
    app.listen(port, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
