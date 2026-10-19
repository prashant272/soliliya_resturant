const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a category name"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please add an image URL or upload an image"],
    },
    today: {
        type: Boolean,
        default: false, // Flag: if true, displays on Homepage "Danes na voljo"
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
