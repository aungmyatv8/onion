const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
