const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
        },
        password: {
            type: String,
            required: true,
        },
        userMobile: {
            type: String,
        },
        productsId: {
            type: Array,
            required: true,
            default: []
        },
    },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
