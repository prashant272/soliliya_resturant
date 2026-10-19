const express = require("express");
const router = express.Router();
const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation
} = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");

// Public or user reservation creation
router.post("/", createReservation);

// Authenticated user reservations
router.get("/my-reservations", protect, getMyReservations);
router.patch("/:id/cancel", protect, cancelReservation);

// Admin routes
router.get("/", protect, getReservations);
router.patch("/:id/status", protect, updateReservationStatus);
router.put("/:id", protect, updateReservationStatus);
router.delete("/:id", protect, deleteReservation);

module.exports = router;
