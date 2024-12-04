const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  Business: {
    type: String,
    required: true,
  },
  Category: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);