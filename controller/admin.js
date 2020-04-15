const Product = require("../models/product");

exports.addProducts = async (req, res) => {
  try {
    const { name, type, price, photo } = req.body;
    console.log(name, type, price, photo);
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
      messages: [
        {
          text: "Added Successful. What do you want to do next?",
          quick_replies: [
            {
              title: "Add Product",
              block_names: ["add_product"],
            },
          ],
        },
      ],
    });
  } catch (err) {
    res.json({
      messages: [{ text: "Error Occurs in adding products" }],
    });
  }
};
