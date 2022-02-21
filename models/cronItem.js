const mongoose = require("mongoose");

const cronItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
);

const CronItem = mongoose.model("CronItem", cronItemSchema);

module.exports = CronItem;
