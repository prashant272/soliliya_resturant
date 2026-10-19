const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  refNum: {
    type: String,
    default: () => '#WLM-' + Math.floor(1000 + Math.random() * 9000)
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    default: "guest@wilma.si",
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    default: 2
  },
  purpose: {
    type: String,
    default: "Casual Dining"
  },
  notes: {
    type: String,
    default: ""
  },
  tableNumber: {
    type: String,
    default: ""
  },
  adminNote: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Rejected", "Cancelled", "Completed"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
