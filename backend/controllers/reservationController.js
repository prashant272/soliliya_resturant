const Reservation = require("../models/Reservation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create a new table reservation
exports.createReservation = async (req, res) => {
  try {
    const { name, phone, date, time, guests, purpose, notes } = req.body;
    const email = (req.body.email && req.body.email.trim()) || 'guest@wilma.si';

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ message: "Please fill in all required fields (name, phone, date, time)." });
    }


    let userId = req.body.user || null;

    // If Authorization header is passed, extract user id
    const authHeader = req.header("Authorization");
    if (!userId && authHeader) {
      try {
        const tokenString = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        if (decoded && decoded.id) {
          userId = decoded.id;
        }
      } catch (err) {
        // Continue as guest if token is invalid
      }
    }

    const reservation = await Reservation.create({
      user: userId,
      name,
      email,
      phone,
      date,
      time,
      guests: Number(guests) || 2,
      purpose: purpose || "Casual Dining",
      notes: notes || "",
      status: "Pending"
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get current user's reservations
exports.getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObj = await User.findById(userId);

    const orConditions = [{ user: userId }];
    if (userObj) {
      if (userObj.email) orConditions.push({ email: userObj.email });
      if (userObj.phone) orConditions.push({ phone: userObj.phone });
    }

    const reservations = await Reservation.find({ $or: orConditions }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Cancel reservation by user
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = "Cancelled";
    await reservation.save();
    res.json({ message: "Reservation cancelled successfully", reservation });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Admin: Get all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Admin: Update status, table number, and admin note
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status, tableNumber, adminNote } = req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (tableNumber !== undefined) updateData.tableNumber = tableNumber.trim();
    if (adminNote !== undefined) updateData.adminNote = adminNote.trim();

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Admin: Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
