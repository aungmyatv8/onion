const express = require("express");

const { addProducts } = require("../controller/admin");

const router = express.Router();

router.route("/").post(addProducts);

module.exports = router;
