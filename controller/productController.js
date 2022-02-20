// external imports
const createError = require("http-errors");
const superagent = require("superagent");
// internal imports
const Product = require("../models/product.js");
const CronItem = require("../models/cronItem.js");
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
    const { productId } = req.params;
    let product = {};
    try {
        const response = await superagent.get(`https://www.daraz.com.bd/products/${productId}`);

        const matchingData = response?.text?.match("var pdpTrackingData = (\"{.*}\")")
        const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"]).replace(/\\/g, '');
        const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));
        const productURL = `${(productId.match("(.*).html")[1])}.html`

        product['name'] = data['pdt_name']
        product['seller'] = data['seller_name']
        product['price'] = data['pdt_price'].split(' ')[1]
        product['currencyCode'] = data['core']['currencyCode']
        product['image'] = data['pdt_photo']
        product['category'] = data['pdt_category']
        product['discount'] = data['pdt_discount']
        product['sku'] = data['pdt_simplesku']
        product['countryCode'] = data['core']['country']
        product['priceList'] = { date: new Date(), price: product['price'] }
        product['url'] = productURL
        // res.json(product);


        const newProduct = new Product(product);
        const newCronItem = new CronItem({ name: product['name'], price: product['price'] });
        // const result = await newProduct.save();
        // const savedCronItem = await newCronItem.save();
        const result = await Product.findOneAndUpdate({ sku: product.sku }, newProduct, { upsert: true, new: true, setDefaultsOnInsert: true });
        const savedCronItem = await CronItem.findOneAndUpdate({url: productURL},{ name: product['name'], url: productURL },{ upsert: true, new: true, setDefaultsOnInsert: true });
        res.status(200).json(newProduct);
    } catch (err) {
        res.json({ ...product, message: "Price history is available in our API" });
    }
}

module.exports = {
    searchProduct,
    addProduct
};
