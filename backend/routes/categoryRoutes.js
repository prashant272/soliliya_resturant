const express = require("express");
const router = express.Router();
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleToday
} = require("../controllers/categoryController");
const protect = require("../middleware/authMiddleware");
const upload = require("../services/uploadService");

const uploadWithLogging = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error("Category Upload Warning:", err.message);
        }
        if (req.file && process.env.R2_PUBLIC_URL && req.file.key) {
            const publicUrl = process.env.R2_PUBLIC_URL.replace(/\/$/, '');
            req.file.location = `${publicUrl}/${req.file.key}`;
        }
        next();
    });
};

// Public route to get categories (used by MenuSection on homepage)
router.get("/", getCategories);

// Admin protected routes
router.post("/", protect, uploadWithLogging, createCategory);
router.put("/:id", protect, uploadWithLogging, updateCategory);
router.patch("/:id/toggle-today", protect, toggleToday);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
