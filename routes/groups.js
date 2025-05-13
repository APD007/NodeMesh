//Library Imports
const express = require("express");
//Local Imports
const groupsController = require("../controllers/groups_controller");
const {
  verify_token,
  verify_group_access,
  is_group_admin,
} = require("../utils/verify_token");

//Create Router
const router = express.Router();
//Define Routes
//@audit Anyone can create a group
router.post("/createGroup", verify_token, groupsController.createGroup);
//@audit Anyone can send a request to join a group
router.post(
  "/sendRequestToJoinGroup",
  verify_token,
  groupsController.sendRequestToJoinGroup
);
//@audit the person who sent the request can delete this request or the admin can deny admission
router.post(
  "/deleteGroupJoinRequest",
  verify_token,
  groupsController.deleteGroupJoinRequest
);
//@audit Only Admin of the group can allow someone in
router.post(
  "/addMember",
  [verify_token, is_group_admin],
  groupsController.addMember
);

//@audit Either Admin can remove a member or he himself can quit
router.post("/removeMember", verify_token, groupsController.removeMember);
router.post(
  "/createGroupPost",
  [verify_token, verify_group_access],
  groupsController.createGroupPost
);
module.exports = router;
