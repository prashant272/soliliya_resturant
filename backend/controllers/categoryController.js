const Category = require("../models/Category");

// Get all categories or filter by ?today=true
exports.getCategories = async (req, res) => {
    try {
        const filter = {};
        if (req.query.today === 'true') {
            filter.today = true;
        }
        const categories = await Category.find(filter).sort({ order: 1, createdAt: -1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, order } = req.body;
        const today = req.body.today === 'true' || req.body.today === true;
        let image = req.body.image;

        if (req.file) {
            const publicUrl = process.env.R2_PUBLIC_URL ? process.env.R2_PUBLIC_URL.replace(/\/$/, '') : '';
            image = (publicUrl && req.file.key) ? `${publicUrl}/${req.file.key}` : req.file.location;
        }

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        if (!image) {
            return res.status(400).json({ message: "Category image is required" });
        }

        const category = await Category.create({
            name: name.trim(),
            image,
            today,
            order: Number(order) || 0
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (req.body.name) category.name = req.body.name.trim();
        if (req.body.today !== undefined) {
            category.today = req.body.today === 'true' || req.body.today === true;
        }
        if (req.body.order !== undefined) {
            category.order = Number(req.body.order);
        }

        if (req.file) {
            const publicUrl = process.env.R2_PUBLIC_URL ? process.env.R2_PUBLIC_URL.replace(/\/$/, '') : '';
            category.image = (publicUrl && req.file.key) ? `${publicUrl}/${req.file.key}` : req.file.location;
        } else if (req.body.image) {
            category.image = req.body.image;
        }

        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Toggle today flag
exports.toggleToday = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.today = !category.today;
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await Category.findByIdAndDelete(id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
