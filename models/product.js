const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        seller: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        currencyCode: {
            type: String,
        },
        sku: {
            type: String,
        },
        image: {
            type: String,
        },
        countryCode: {
            type: String,
        },
        category: {
            type: Array,
        },
    },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
