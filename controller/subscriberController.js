// external imports
const createError = require("http-errors");
const superagent = require("superagent");
// internal imports
const Subscriber = require("../models/subscriber.js");

// search user
async function searchSubscriber() {
    try {
        if (searchQuery !== "") {
            const subscriberList = await Subscriber.find({ productURL: product['url'], alertPrice: { $gte: +product.price } }).select('userEmail -_id').lean();

            res.json(subscriberList);
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
async function addSubscriber(req, res) {
    const subscriber  = req.body;
    try {
        // const newSubscriber = new Subscriber(subscriber)
        // const savedSubscriber = await newSubscriber.save();
        const savedSubscriber = await Subscriber.findOneAndUpdate({ userEmail: subscriber.userEmail }, subscriber, { upsert: true, new: true, setDefaultsOnInsert: true });
        res.json(savedSubscriber);
    } catch (err) {
        res.status(500).json({
            errors: {
                msg: err,
            },
        });
    }
};

module.exports = {
    searchSubscriber, addSubscriber
};
