const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    // Hardcoded check for admin@2026
    if (email === 'admin@biryaniyoyo.com' && password === 'admin@2026') {
        // Create a dummy ID for the token since we are bypassing DB for now
        // OR find the actual admin in DB if exists. 
        // For simplicity requested by user:
        const token = jwt.sign({ id: 'admin_master_id' }, process.env.JWT_SECRET, { expiresIn: '30d' });

        return res.json({
            _id: 'admin_master_id',
            name: 'Master Admin',
            email: email,
            token: token,
        });
    }

    res.status(401).json({ message: 'Invalid email or password' });
};
