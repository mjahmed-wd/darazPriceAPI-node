// external imports
const createError = require("http-errors");
// internal imports
const Product = require("../models/product.js");
const escape = require("../utilities/escape");

// search user
async function searchProduct(req, res, next) {
    const searchQuery = req.params.productId;

    const name_search_regex = new RegExp(escape(searchQuery), "i");

    try {
        if (searchQuery !== "") {
            const products = await Product.find(
                {
                    $or: [
                        {
                            name: name_search_regex,
                        },
                        {
                            sku: name_search_regex,
                        },
                        {
                            url: name_search_regex,
                        },
                    ],
                },
                // "name sku"
            );

            res.json(products);
        } else {
            throw createError("You must provide some text to search!");
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                    msg: "Opps! Something went wrong!",
            },
        });
    }
}

module.exports = {
    searchProduct,
};
