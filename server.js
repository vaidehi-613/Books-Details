const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.get("/", (req, res) => {
  res.send("Hello BOOK API");
});

app.get("/blog", (req, res) => {
  res.send("Hello blog this is vaidehi ");
});

app.get("/book", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    // Check if the book exists in the database
    if (!book) {
      return res
        .status(404)
        .json({ message: `Cannot find any Book with ID ${id}` });
    }
    const updatedBook = await Book.findById(id);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//delete a book
app.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "cannot find any book with ID ${id} " });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://pawarvaidehi613:BTSvaidehi613@vaidehiapi.qkjyfbx.mongodb.net/Book-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect to MongoDB");
    app.listen(3000, () => {
      console.log("BOOK API app is running on port 3000");
    });
  })
  .catch(() => {
    console.log(error);
  });
