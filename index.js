const superagent = require('superagent');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./router/productRouter.js");
const cronJob = require("./controller/cronJob");
dotenv.config();
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// const msg = {
//   to: 'mjahmedwd@gmail.com', // Change to your recipient
//   from: 'mjahmed555@gmail.com', // Change to your verified sender
//   subject: 'Price is dropped at your desired product',
//   text: 'Check the product that you wanted to buy from daraz.com.bd',
//   html: '<strong>Price is now below 100</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

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

// cronJob();

// const url = "https://www.daraz.com.bd/products/bogesi-i215889192-s1164326843.html"
// console.log(url.match("products/(.*).html")[1])

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/bd/:productId", productRouter)
app.get("/add", productRouter)

app.listen(process.env.PORT || 8000);