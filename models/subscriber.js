const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        userEmail: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        userMobile: {
            type: String,
        },
        productURL: {
            type: String,
            required: true,
        }
    },
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;