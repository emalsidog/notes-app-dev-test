// Models
const List = require("../models/list");

// POST => /add-list
exports.postAddList = async (req, res) => {
  const { title } = req.body;

  if (title.length < 5) {
    return res.status(400).json({
      error: {
        isError: true,
        message: "Title should be at least 5 characters long",
      },
    });
  }

  const list = new List({
    title,
  });

  try {
    await list.save();
    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
      body: {
        newList: list,
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

// GET => /lists
exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({});
    res.status(200).json({
      error: {
        isError: false,
        message: "Done.",
      },
      body: {
        lists,
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
