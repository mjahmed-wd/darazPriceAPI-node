const cron = require('node-cron');
const superagent = require('superagent');
const Product = require("./../models/product.js");
const CronItem = require("./../models/cronItem.js");

const { sendEmail } = require('./sendEmail')


const cronJob = () => cron.schedule('*/10 * * * * * ', () => {
    let cronItems;
    (async () => {
        cronItems = await CronItem.find({}).select('url -_id').lean();
        if (cronItems) {
            // console.log({ cronItems });
            cronItems?.forEach(cronItem =>
                (async () => {
                    try {
                        const response = await superagent.get(`https://www.daraz.com.bd/products/${cronItem.url}`);

                        const productURL = `${(cronItem.url.match("(.*).html")[1])}.html`
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
                        product['url'] = productURL
                        // const newProduct = new Product(product);
                        // const result = await newProduct.save();
                        if (+product.price < 200) {
                            // search those who has subscribed to this product & alert amount is lower than current price

                            console.log(product.price + "price below 100");
                            sendEmail({ name: product.name })
                        } else {
                            console.log(product.price + "price above 100");
                        }
                        const result = await Product.findOneAndUpdate({ sku: product.sku }, { $push: { priceList: { date: new Date(), price: product.price } } }, (error, success) => {
                            // console.log(error ? error : success);
                        });


                    } catch (err) {
                        console.log(err.message); //can be console.error
                    }
                })())
        } else {
            console.log("no result")
        }
    })()
});

module.exports = cronJob;