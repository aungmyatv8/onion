const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  product: {},
});

module.exports = mongoose.model("order", orderSchema);
