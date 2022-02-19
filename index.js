const superagent = require('superagent');
const express = require('express');
const cors = require('cors');
const productRouter = require("./router/productRouter.js");
const cron = require('node-cron');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("./models/product.js");

const app = express();
dotenv.config();

// request parser
app.use(cors());
app.use(express.json());


mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connection successful!"))
    .catch((err) => console.log(err));


// cron.schedule('*/10 * * * * * ', () => {
// ["bogesi-i215889192-s1164326843.html"].forEach(productId =>
//     (async () => {
//         try {
//             const response = await superagent.get(`https://www.daraz.com.bd/products/${productId}`);

//             const productURL = `${(productId.match("(.*).html")[1])}.html`
//             const matchingData = response?.text?.match("var pdpTrackingData = (\"{.*}\")")
//             const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"]).replace(/\\/g, '');
//             const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));

//             let product = {}
//             product['name'] = data['pdt_name']
//             product['seller'] = data['seller_name']
//             product['price'] = data['pdt_price'].split(' ')[1]
//             product['currencyCode'] = data['core']['currencyCode']
//             product['image'] = data['pdt_photo']
//             product['category'] = data['pdt_category']
//             product['discount'] = data['pdt_discount']
//             product['sku'] = data['pdt_simplesku']
//             product['countryCode'] = data['core']['country']
//             product['url'] = productURL
//             //    return console.log(product);
//             try {
//                 // const newProduct = new Product(product);
//                 // const result = await newProduct.save();
//                 const result = await Product.findOneAndUpdate({ sku: product.sku }, { $push: { priceList: { date: new Date(), price: "250" } } }, (error, success) => {
//                     console.log(error ? error : success);
//                 });
//                 // res.status(200).json({
//                 //     message: result?.name + " added successfully!",
//                 // });
//                 // console.log(result);
//             } catch (err) {
//                 console.log("eror happend", err);
//             }

//         } catch (err) {
//             console.log(err.message); //can be console.error
//         }
//     })())
// });

// const url = "https://www.daraz.com.bd/products/bogesi-i215889192-s1164326843.html"
// console.log(url.match("products/(.*).html")[1])

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/bd/:productId", productRouter)
app.get("/add", productRouter)

app.listen(process.env.PORT || 8000);