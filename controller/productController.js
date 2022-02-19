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

async function addProduct(req, res, next) {

    const data = {
        name: "TM Shop For Precision Knife With 6 Blades (Aluminium Body)",
        seller: "TM Shop",
        price: "220",
        currencyCode: "BDT",
        image: "https://static-01.daraz.com.bd/p/mdc/e9e3fe0c3e2054919ed4b5c870474389.jpg",
        category: [
            "Stationery u0026 Craft",
            "School u0026 Office Equipment",
            "Scissors u0026 Cutters"
        ],
        discount: "-41%",
        sku: 1097972599,
        countryCode: "BD"
    }

    try {
        const newProduct = new Product(data);
        const result = await newProduct.save();
        res.status(200).json({
            message: result?.name + " added successfully!",
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

module.exports = {
    searchProduct,
    addProduct
};
