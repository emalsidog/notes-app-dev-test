// Dependencies
const express = require("express");
const router = express.Router();

// Notes controller
const notesController = require("../controllers/notes");

// POST => /add-note
router.post("/add-note", notesController.postAddNote);

// POST => /edit-note
router.post("/edit-note", notesController.postEditNote);

// POST => /delete-note
router.post("/lists/:id/delete-note", notesController.postDeleteNote);

// GET => /lists/:id
// @ Get all notes of a certain list id
router.get("/lists/:id", notesController.getNotes);

module.exports = router;
