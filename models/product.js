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
            type: String,
            required: true,
        },
        discount: {
            type: String,
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
        url: {
            type: String,
            required: true,
            index: true
        },
        category: {
            type: Array,
        },
        priceList: [
            { date: String, price: String }
        ],
    },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
