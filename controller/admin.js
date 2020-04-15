const Product = require("../models/product");

exports.addProducts = async (req, res) => {
  try {
    const { name, type, price, photo } = req.body;
    const product = await Product.create({
      name,
      type,
      price,
      photo,
    });
    if (!product) {
      res.json({
        messages: [{ text: "Not added yet. Try again" }],
      });
    }
    res.json({
      messages: [{ text: "Added one product succesfully" }],
    });
  } catch (err) {
    res.json({
      messages: [{ text: "Error Occurs in adding products" }],
    });
  }
};
