const Order = require("../models/order");
const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const elements = products.map((product) => {
      const newproduct = {
        title: `Name: ${product.name}`,
        image_url: product.photo,
        subtitle: `Price: ${product.price}`,
        buttons: [
          {
            type: "show_block",
            block_names: ["buy"],
            title: "Buy",
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

exports.buyProducts = async (req, res) => {
  try {
    // const { name, type, price, photo } = req.body;

    const findProducts = await Product.findById(req.body.id);

    // console.log(findProducts.name);

    const product = await Order.create({
      userId: req.body["messenger user id"],
      product: {
        name: findProducts.name,
        type: findProducts.type,
        price: findProducts.price,
        photo: findProducts.photo,
      },
    });

    if (!product) {
      res.json({
        messages: [{ text: "Not order yet. Try again" }],
      });
    }
    res.json({
      messages: [
        {
          text: "Order Successful. What do you want to do next?",
          quick_replies: [
            {
              title: "buy",
              block_names: ["all products"],
            },
            {
              title: "မှာထားတဲ့order",
              block_names: ["order"],
            },
          ],
        },
      ],
    });
  } catch (err) {
    // console.log(err);
    res.json({
      messages: [{ text: "Error Occurs in ordering products" }],
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const userId = req.body["messenger user id"];
    console.log(userId);
    const products = await Order.find({
      userId: userId,
    });

    const elements = products.map((product) => {
      const newproduct = {
        title: `Name: ${product.product.name}`,
        image_url: product.product.photo,
        subtitle: `Price: ${product.product.price}`,
        buttons: [
          {
            type: "show_block",
            block_names: ["cancel"],
            title: "Finish/Cancel",
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
      messages: [{ text: "Error Occurs in find orders" }],
    });
  }
};

exports.finishOrder = async (req, res) => {
  try {
    const product = await Order.findByIdAndDelete(req.body.id);
    if (!product) {
      res.json({
        messages: [
          {
            text:
              "Error occured.Cannot finsih or cancel. What do you want to do next?",
            quick_replies: [
              {
                title: "buy",
                block_names: ["all products"],
              },
              {
                title: "မှာထားတဲ့order",
                block_names: ["order"],
              },
            ],
          },
        ],
      });
    }
    res.json({
      messages: [
        {
          text: "Finish or cancel Successful. What do you want to do next?",
          quick_replies: [
            {
              title: "buy",
              block_names: ["all products"],
            },
            {
              title: "မှာထားတဲ့order",
              block_names: ["order"],
            },
          ],
        },
      ],
    });
  } catch (e) {
    res.json({
      messages: [{ text: "Error Occurs in finishing or cancel products" }],
    });
  }
};
