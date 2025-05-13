//Library Imports
const express = require("express");

//Local Imports
const friendsController = require("../controllers/friends_controller");
const { verify_token } = require("../utils/verify_token");

//Create Token
const router = express.Router();

//Define Routes
router.post("/sendRequest", verify_token, friendsController.sendRequest);
router.post("/acceptRequest", verify_token, friendsController.acceptRequest);
router.post("/rejectRequest", verify_token, friendsController.rejectRequest);
router.post("/getAllFriends", verify_token, friendsController.getAllFriends);
router.post(
  "/getMutualFriends",
  verify_token,
  friendsController.getMutualFriends
);

module.exports = router;
