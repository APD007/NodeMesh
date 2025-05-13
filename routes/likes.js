//Library Imports
const express = require("express");

//Local Imports
const likesController = require("../controllers/likes_controller");
const { verify_token, verify_access } = require("../utils/verify_token");
const {
  build_graph,
  shortest_paths,
  load_friends,
} = require("../middleware/graph_middlewares");

const router = express.Router();

//@audit Can someone who has no access to this post like or comment this post
//Define Routes
router.post(
  "/like",
  [verify_token, build_graph, shortest_paths, load_friends, verify_access],
  likesController.like
);

router.post(
  "/unlike",
  [verify_token, build_graph, shortest_paths, load_friends, verify_access],
  likesController.unlike
);
router.post("/getLikes", verify_token, likesController.getLikes);

module.exports = router;
