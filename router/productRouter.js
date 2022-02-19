const express = require("express");
const superagent = require("superagent");

const router = express.Router();

router.get("/bd/:productId", (req, res) => {
    const { productId } = req.params;

    (async () => {
        try {
            const response = await superagent.get(`https://www.daraz.com.bd/products/${productId}`);

            const matchingData = response?.text?.match("var pdpTrackingData = (\"{.*}\")")
            const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"]).replace(/\\/g, '');
            const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));

            let product = {}
            product['name'] = data['pdt_name']
            product['seller'] = data['seller_name']
            product['price'] = data['pdt_price'].split(' ')[1]
            product['currencyCode'] = data['core']['currencyCode']
            product['image'] = data['pdt_photo']
            product['category'] = data['pdt_category']
            product['discount'] = data['pdt_discount']
            product['sku'] = data['pdt_simplesku']
            product['countryCode'] = data['core']['country']
            res.json(product);
        } catch (err) {
            console.log(err.message); //can be console.error
        }
    })();
})
module.exports = router;
