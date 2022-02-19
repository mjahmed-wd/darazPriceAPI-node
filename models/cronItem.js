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
        },
    },
);

const CronItem = mongoose.model("CronItem", cronItemSchema);

module.exports = CronItem;
