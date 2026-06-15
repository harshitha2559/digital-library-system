const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/digital_library_mongo")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const reviewSchema = new mongoose.Schema({
  bookTitle: String,
  userName: String,
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

app.get("/", (req, res) => {
  res.send("Node.js Backend Running");
});

app.get("/reviews", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

app.post("/reviews", async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
});

app.delete("/reviews/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
});

app.listen(5000, () => {
  console.log("Node.js server running on port 5000");
});