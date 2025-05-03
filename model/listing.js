const{ builtinModules} = require("module");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

    reviews:{
        type:Schema.Types.ObjectId,
        ref: "review",
    },
});

const Listing = mongoose.model("Listing", listingSchema);

 module.exports = Listing;
