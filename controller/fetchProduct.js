const superagent = require('superagent');

const { numberWithoutCommasDecimal } = require('../utilities/formatNumbers')

const fetchProductFromDaz = async (url, callback) => {
    try {
        const response = await superagent.get(`https://www.daraz.com.bd/products/${url}`);

        const productURL = `${(url.match("(.*).html")[1])}.html`
        const matchingData = response?.text?.match("var pdpTrackingData = (\"{.*}\")")
        const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"]).replace(/\\/g, '');
        const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));

        let product = {}
        product['name'] = data['pdt_name']
        product['seller'] = data['seller_name']
        product['price'] = numberWithoutCommasDecimal(data['pdt_price'].split(' ')[1])
        product['currencyCode'] = data['core']['currencyCode']
        product['image'] = data['pdt_photo']
        product['category'] = data['pdt_category']
        product['discount'] = data['pdt_discount']
        product['sku'] = data['pdt_simplesku']
        product['countryCode'] = data['core']['country']
        product['url'] = productURL

        callback?.(product)

    } catch (err) {
        console.log(err.message); //can be console.error
    }
}

module.exports = { fetchProductFromDaz };