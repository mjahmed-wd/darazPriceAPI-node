import superagent from 'superagent';

(async () => {
    try {
        const res = await superagent.get('https://www.daraz.com.bd/products/6-tm-i164978002-s1097972599.html?spm=a2a0e.home.flashSale.3.735212f7Vhhb8E&search=1&mp=1&c=fs');

        const matchingData = res?.text?.match("var pdpTrackingData = (\"{.*}\")")
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
        console.log(product);
    } catch (err) {
        console.log(err.message); //can be console.error
    }
})();
// import { text } from "./htmlpage.js"


// const matchingData = text.match("var pdpTrackingData = (\"{.*}\")")
// const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"])
// const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));

// let product = {}
// product['name'] = data['pdt_name']
// product['seller'] = data['seller_name']
// product['price'] = data['pdt_price'].split(' ')[1]
// product['currencyCode'] = data['core']['currencyCode']
// product['image'] = data['pdt_photo']
// product['category'] = data['pdt_category']
// product['discount'] = data['pdt_discount']
// product['sku'] = data['pdt_simplesku']
// product['countryCode'] = data['core']['country']
// console.log(product);

// console.log(productData)