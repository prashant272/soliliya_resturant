const Enquiry = require("../models/Enquiry");

// @desc    Create a new enquiry / contact message
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "Please fill in all required fields (name, email, message)." 
            });
        }

        const enquiry = await Enquiry.create({
            name,
            email,
            phone: phone || "",
            subject: subject || "General Enquiry",
            message
        });

        res.status(201).json({
            success: true,
            message: "Thank you! Your message has been sent successfully. The Wilma Restaurant team will contact you shortly.",
            enquiry
        });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while sending your message. Please try again.", 
            error: error.message 
        });
    }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch enquiries.", 
            error: error.message 
        });
    }
};

// @desc    Update enquiry status or admin note
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
const updateEnquiry = async (req, res) => {
    try {
        const { status, adminNote } = req.body;
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found." });
        }

        if (status) enquiry.status = status;
        if (adminNote !== undefined) enquiry.adminNote = adminNote;

        await enquiry.save();
        res.status(200).json({ success: true, enquiry });
    } catch (error) {
        console.error("Error updating enquiry:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update enquiry.", 
            error: error.message 
        });
    }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found." });
        }

        await enquiry.deleteOne();
        res.status(200).json({ success: true, message: "Enquiry successfully deleted." });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete enquiry.", 
            error: error.message 
        });
    }
};

module.exports = {
    createEnquiry,
    getEnquiries,
    updateEnquiry,
    deleteEnquiry
};
