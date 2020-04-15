const express = require("express");

const { addProducts, getProduct } = require("../controller/admin");

const router = express.Router();

router.route("/").post(addProducts).get(getProduct);

module.exports = router;
