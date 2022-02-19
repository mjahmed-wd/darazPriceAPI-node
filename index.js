const superagent = require('superagent');
const express = require('express');
const cors = require('cors');
const productRouter = require("./router/productRouter.js");
const cron = require('node-cron');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();

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
//     ["pu-i190005767-s1137519941.html", "i199677125-s1146833359.html", "pu-i211024792-s1160899536.html", "bogesi-i215889192-s1164326843.html"].forEach(productId =>
//         (async () => {
//             try {
//                 const response = await superagent.get(`https://www.daraz.com.bd/products/${productId}`);

//                 const matchingData = response?.text?.match("var pdpTrackingData = (\"{.*}\")")
//                 const productStringData = (matchingData["0"].match("(\"{.*}\")")["0"]).replace(/\\/g, '');
//                 const data = JSON.parse(productStringData.substring(1, productStringData.length - 1));

//                 let product = {}
//                 product['name'] = data['pdt_name']
//                 product['seller'] = data['seller_name']
//                 product['price'] = data['pdt_price'].split(' ')[1]
//                 product['currencyCode'] = data['core']['currencyCode']
//                 product['image'] = data['pdt_photo']
//                 product['category'] = data['pdt_category']
//                 product['discount'] = data['pdt_discount']
//                 product['sku'] = data['pdt_simplesku']
//                 product['countryCode'] = data['core']['country']
//                return console.log(product?.name, new Date());
//             } catch (err) {
//                 console.log(err.message); //can be console.error
//             }
//         })())
// });

app.get("/", (req, res) => { 
    res.send("Hello World!");
});

app.get("/bd/:productId", productRouter)

app.listen(process.env.PORT || 8000);