// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Express app
const app = express();

// JSON parser
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use("/", require("./routes/notes"));
app.use("/", require("./routes/list"));

// Mongoose connection
mongoose.connect(
  "mongodb+srv://root:root@cluster.1oczm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Successfully connected to the database");
  }
);

// PORT
const PORT = process.env.PORT || 3001;

// Server startup
app.listen(PORT, () => {
  console.log("Server is listening");
});
