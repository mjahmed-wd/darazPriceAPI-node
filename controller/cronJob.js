const cron = require('node-cron');
const Product = require("./../models/product.js");
const CronItem = require("./../models/cronItem.js");
const Subscriber = require("./../models/subscriber.js");

const { sendMessage } = require('./sendEmail')
const { fetchProductFromDaz } = require('./fetchProduct')


const cronJob = () => cron.schedule('*/10 * * * * * ', () => {
    let cronItems;
    (async () => {
        cronItems = await CronItem.find({}).select('url -_id').lean();
        cronItems.forEach(cronItem => {
            fetchProductFromDaz(cronItem?.url, async (product) => {
                const subscriberList = await Subscriber.find({ productURL: product['url'], alertPrice: { $gte: +product['price'] } }).select('userEmail -_id').lean();

                if (subscriberList?.length > 0) {
                    // search those who has subscribed to this product & alert amount is lower than current price
                    console.log("total subscribed", subscriberList?.length)
                    // const emailList = subscriberList.map(subscriber => subscriber.userEmail);
                    // sendMessage({ to: emailList, productInfo: product });
                } else {
                    console.log('No subscribers found');
                }
                const result = await Product.findOneAndUpdate({ sku: product.sku }, { $push: { priceList: { date: new Date(), price: product.price } } }, { upsert: true, new: true });
            })
        })
    })()
});

module.exports = cronJob;