// Dependencies
const express = require("express");
const router = express.Router();

// List controller
const listController = require("../controllers/list");

// POST => /add-list
router.post("/lists/add-list", listController.postAddList);

// GET => /lists
router.get("/lists", listController.getLists);

module.exports = router;
