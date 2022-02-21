// external imports
const createError = require("http-errors");
const superagent = require("superagent");
// internal imports
const Product = require("../models/product.js");
const CronItem = require("../models/cronItem.js");

const { fetchProductFromDaz } = require("./fetchProduct")
const escape = require("../utilities/escape");

// search user
async function searchProduct(req, res, next) {
    const searchQuery = req.params.productId;
    const name_search_regex = new RegExp(escape(searchQuery), "i");

    try {
        if (searchQuery !== "") {
            const products = await Product.findOne(
                {
                    $or: [{ name: name_search_regex, }, { sku: name_search_regex }, { url: name_search_regex, },],
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
    const { productId } = req.params;
    fetchProductFromDaz(productId, async (product) => {
        const searchProduct = await Product.findOne({ sku: product.sku }).select(' -_id').lean();
        if (searchProduct) {
            res.json({ searchProduct, msg: "WOW! price history is available on our database" });
        } else {
            const newProduct = new Product(product);
            const resultProductSave = await newProduct.save();

            const searchCronItem = await CronItem.findOne({ sku: product['sku'] }).select(' -_id').lean();
            const newCronItem = new CronItem({ name: product['name'], url: product['url'] });
            const resultCronItemSave = await newCronItem.save();
            res.json({ resultProductSave, msg: "" });
        }
    })
}

module.exports = {
    searchProduct,
    addProduct
};
