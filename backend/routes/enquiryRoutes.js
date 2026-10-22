const express = require("express");
const router = express.Router();
const {
    createEnquiry,
    getEnquiries,
    updateEnquiry,
    deleteEnquiry
} = require("../controllers/enquiryController");
const protect = require("../middleware/authMiddleware");

// Public: Submit enquiry / contact message
router.post("/", createEnquiry);

// Admin: Get all, update status, delete
router.get("/", protect, getEnquiries);
router.put("/:id", protect, updateEnquiry);
router.patch("/:id", protect, updateEnquiry);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;
