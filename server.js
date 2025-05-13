//Library Imports
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

//Define Router Files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const graphsRouter = require("./routes/graphs");
const postsRouter = require("./routes/posts");
//@todo Only Likes on Posts
const likesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");
const groupsRouter = require("./routes/groups");

//Define Port
const port = process.env.PORT;
//Create Express App
const app = express();

//Parse Incoming Form Data
app.use(express.json());
//Static Routes
app.use("/static", express.static("./static"));

//Logging with morgan
app.use(morgan("tiny"));
//Define Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/graphs", graphsRouter);
app.use("/posts", postsRouter);
//@todo Only likes on Posts
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);
app.use("/groups", groupsRouter);

//Create the Server
app.listen(port, function (err) {
  if (err) {
    console.err(`Error in starting the server ${err}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
