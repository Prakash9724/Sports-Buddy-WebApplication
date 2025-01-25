const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// User authentication middleware
exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if it's an admin token
        if (decoded.role === 'admin') {
            req.user = { role: 'admin' };
            return next();
        }

        // For regular users, verify in database
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Authentication mein error:", error);
        res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};

// Admin authentication middleware 
exports.authenticateAdmin = async (req, res, next) => {
    try {
        // Token ko header se nikalo
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin token nahi mila, login karo pehle"
            });
        }

        // Token ko verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Admin ko dhundo
        const admin = await Admin.findById(decoded.adminId);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Admin nahi mila"
            });
        }

        // Admin ko request mein add karo
        req.admin = admin;
        next();

    } catch (error) {
        console.error("Admin authentication mein error:", error);
        res.status(401).json({
            success: false,
            message: "Admin authentication fail ho gaya" 
        });
    }
};
