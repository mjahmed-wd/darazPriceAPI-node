const superagent = require('superagent');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./router/productRouter.js");
const cronJob = require("./controller/cronJob");
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

// cronJob();


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/bd/:productId", productRouter)
app.get("/add", productRouter)

app.listen(process.env.PORT || 8000);