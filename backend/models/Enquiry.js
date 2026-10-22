const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    refNum: {
        type: String,
        default: () => '#ENQ-' + Math.floor(1000 + Math.random() * 9000)
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
        default: ""
    },
    subject: {
        type: String,
        trim: true,
        default: "Splošno povpraševanje"
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["New", "In Progress", "Replied", "Closed"],
        default: "New"
    },
    adminNote: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Enquiry", enquirySchema);
