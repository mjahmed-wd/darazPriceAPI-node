const express = require("express");
const superagent = require("superagent");
const {searchProduct, addProduct} = require("./../controller/productController.js");

const router = express.Router();

router.get("/bd/:productId", addProduct);

module.exports = router;
