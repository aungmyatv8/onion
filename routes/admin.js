const express = require("express");

const {
  addProducts,
  getProduct,
  deleteProduct,
} = require("../controller/admin");

const router = express.Router();

router.route("/").post(addProducts).get(getProduct);

router.route("/products").post(deleteProduct);

module.exports = router;
