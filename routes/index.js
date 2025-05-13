//Library Imports
const express = require("express");
//Local Imports
const indexController = require("../controllers/index_controller");

//Create Router
const router = express.Router();

//Define Routes
router.get("/", indexController.index);

//Exports
module.exports = router;
