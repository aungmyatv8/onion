const Product = require("../models/product");

exports.addProducts = async (req, res) => {
  try {
    const { name, type, price, photo } = req.body;
    console.log(req.body);
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
            {
              title: "Find Product",
              block_names: ["find Products"],
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

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);

    const elements = products.map((product) => {
      const newproduct = {
        title: `Name: ${product.name}`,
        image_url: product.photo,
        subtitle: `Price: ${product.price}`,
        buttons: [
          {
            type: "show_block",
            block_names: ["Edit"],
            title: "Edit",
            set_attributes: {
              id: product._id,
            },
          },
          {
            type: "show_block",
            block_names: ["Delete"],
            title: "Delete",
            set_attributes: {
              id: product._id,
            },
          },
        ],
      };
      return newproduct;
    });

    res.json({
      messages: [
        {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              image_aspect_ratio: "square",
              elements: elements,
            },
          },
        },
      ],
    });
  } catch (e) {
    res.json({
      messages: [{ text: "Error Occurs in find products" }],
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    console.log("id", req.body.id);
    const product = await Product.findByIdAndDelete(req.body.id);
    if (!product) {
      res.json({
        messages: [
          {
            text: "Error occured.Cannot delete. What do you want to do next?",
            quick_replies: [
              {
                title: "Add Product",
                block_names: ["add_product"],
              },
              {
                title: "Find Product",
                block_names: ["find Products"],
              },
            ],
          },
        ],
      });
    }
    res.json({
      messages: [
        {
          text: "Delete Successful. What do you want to do next?",
          quick_replies: [
            {
              title: "Add Product",
              block_names: ["add_product"],
            },
            {
              title: "Find Product",
              block_names: ["find Products"],
            },
          ],
        },
      ],
    });
  } catch (e) {
    res.json({
      messages: [{ text: "Error Occurs in deleting products" }],
    });
  }
};
