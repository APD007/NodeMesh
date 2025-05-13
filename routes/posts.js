//Library Imports
const express = require("express");
//Local Imports
const postsController = require("../controllers/posts_controller");
const { verify_token } = require("../utils/verify_token");
const {
  build_graph,
  shortest_paths,
  load_friends,
} = require("../middleware/graph_middlewares");
const uploadFile = require("../middleware/upload_middleware");

const router = express.Router();
//Define Routes
router.post(
  "/createPost",
  [verify_token, uploadFile],
  postsController.createPost
);
router.get(
  "/getAllPublicPosts",
  verify_token,
  postsController.getAllPublicPosts
);
router.get(
  "/getAllFriendsPosts",
  [verify_token, build_graph, shortest_paths, load_friends],
  postsController.getAllFriendsPosts
);
router.get(
  "/getAllExtendedFriendsPosts",
  [verify_token, build_graph, shortest_paths, load_friends],
  postsController.getAllExtendedFriendsPosts
);

//Get Single Posts
router.get(
  "/getSinglePublicPost",
  verify_token,
  postsController.getSinglePublicPost
);

router.get(
  "/getSingleFriendsPost",
  [verify_token, build_graph, shortest_paths, load_friends],
  postsController.getSingleFriendsPost
);

router.get(
  "/getSingleExtendedFriendsPost",
  [verify_token, build_graph, shortest_paths, load_friends],
  postsController.getSingleExtendedFriendsPost
);

module.exports = router;
