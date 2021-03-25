// Dependencies
const mongoose = require("mongoose");
const moment = require("moment");

// Models
const Note = require("../models/note");
const List = require("../models/list");

// POST => /add-note
exports.postAddNote = async (req, res) => {
  const { title, description, date, listId } = req.body;

  if (title.length < 5) {
    return res.status(400).json({
      error: {
        isError: true,
        message: "Title should be at least 5 characters long",
      },
    });
  }

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).json({
      error: {
        isError: true,
        message: "Incorrect date format",
      },
    });
  }

  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    date: new Date(date),
    list: listId,
  });

  try {
    const list = await List.findOne({ _id: listId });

    if (!list) {
      return res.status(400).json({
        error: {
          isError: true,
          message: "List does not exist",
        },
      });
    }

    await note.save();
    list.notes.push(note);
    list.save();

    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        isError: true,
        message: "Something went wrong...",
      },
    });
  }
};

// GET => /lists/:id
// @ Get all notes of a certain list id
exports.getNotes = async (req, res) => {
  const listId = req.params.id;
  try {
    const list = await List.findOne({ _id: listId }).populate("notes").exec();

    if (!list) {
      return res.status(400).json({
        error: {
          isError: true,
          message: "List does not exist",
        },
      });
    }

    list.notes.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
      body: {
        notes: list.notes,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        isError: true,
        message: "Something went wrong...",
      },
    });
  }
};

// POST => /edit-note
exports.postEditNote = async (req, res) => {
  const {
    noteId,
    titleValue: title,
    descriptionValue: description,
    dateValue: date,
  } = req.body;

  if (title.length < 5) {
    return res.status(400).json({
      error: {
        isError: true,
        message: "Title should be at least 5 characters long",
      },
    });
  }

  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).json({
      error: {
        isError: true,
        message: "Incorrect date format",
      },
    });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      { title, description, date },
      { new: true }
    );

    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
      body: {
        note,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: { isError: true, message: "Something went wrong..." } });
  }
};

// POST => /delete-note
exports.postDeleteNote = async (req, res) => {
  const { id: listId } = req.params;
  const { noteId } = req.body;
  try {
    const list = await List.findById(listId).exec();

    if (!list) {
      return res.status(400).json({
        error: {
          isError: true,
          message: "List does not exist",
        },
      });
    }

    list.notes = list.notes.filter(
      (note) => note.toString() !== noteId.toString()
    );

    await list.save();
    await Note.findOneAndDelete({ _id: noteId });

    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        isError: true,
        message: "Something went wrong...",
      },
    });
  }
};
