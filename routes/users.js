//Library Imports
const express = require("express");
//Local Imports
const usersController = require("../controllers/users_controller");
const { verify_token } = require("../utils/verify_token");

//Create Router
const router = express.Router();

//Define Routes
router.post("/signUp", usersController.signUp);
router.post("/login", usersController.login);
router.get("/getAllUsers", usersController.getAllUsers);
router.get("/getUser/:username", verify_token, usersController.getUser);

//Exports
module.exports = router;
