const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: String,
  photo: String,
});

module.exports = mongoose.model("products", productSchema);
