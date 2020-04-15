const express = require("express");

const {
  getAllProducts,
  finishOrder,
  buyProducts,
  getOrder,
} = require("../controller/customer");

const router = express.Router();

router.route("/").post(buyProducts).get(getOrder);

router.route("/products").post(finishOrder).get(getAllProducts);

module.exports = router;
