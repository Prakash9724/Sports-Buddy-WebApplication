const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login controller
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Admin nahi mila"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Password galat hai"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: "Admin login successful ho gaya",
            token
        });

    } catch (error) {
        console.error("Admin login mein error:", error);
        res.status(500).json({
            success: false,
            message: "Kuch gadbad ho gayi"
        });
    }
};

// Get admin profile
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        console.error("Profile fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Server mein kuch problem hai"
        });
    }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.admin.id,
            { name, email },
            { new: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: "Profile update ho gaya",
            admin: updatedAdmin
        });
    } catch (error) {
        console.error("Profile update mein error:", error);
        res.status(500).json({
            success: false,
            message: "Update karne mein problem hui"
        });
    }
};

// Change admin password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await Admin.findById(req.admin.id);

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Purana password galat hai"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({
            success: true,
            message: "Password change ho gaya"
        });

    } catch (error) {
        console.error("Password change karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Password change karne mein problem hui"
        });
    }
};
