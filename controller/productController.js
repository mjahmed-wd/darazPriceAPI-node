// external imports
const createError = require("http-errors");
// internal imports
const Product = require("../models/product.js");
const escape = require("../utilities/escape");

// search user
async function searchProduct(req, res, next) {
    const searchQuery = req.params.productId;

    const name_search_regex = new RegExp(escape(searchQuery), "i");

    // res.json({
    //     reqData: searchQuery
    // })

    try {
        if (searchQuery !== "") {
            const products = await Product.findOne(
                {
                    $or: [
                        {
                            name: searchQuery,
                        },
                        {
                            sku: searchQuery,
                        },
                        {
                            url: searchQuery,
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
