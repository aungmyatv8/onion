const express = require("express");

const {
  addProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controller/admin");

const router = express.Router();

router.route("/").post(addProducts).get(getProduct);

router.route("/products").post(deleteProduct);
router.route("/editProduct").post(editProduct);

module.exports = router;
