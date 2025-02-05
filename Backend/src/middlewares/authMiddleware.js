const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// User authentication middleware
exports.authenticateUser = async (req, res, next) => {
    try {
        // Get token from header with better error handling
        const authHeader = req.headers.authorization;
        
        console.log('Auth Header:', authHeader); // Debug log

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Token missing hai ya invalid format hai"
            });
        }

        // Extract token and verify
        const token = authHeader.split(' ')[1];
        
        console.log('Extracted token:', token); // Debug log

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing hai"
            });
        }

        // Verify token with proper JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log('Decoded token:', decoded); // Debug log

        // Get user from database
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Add user to request
        req.user = user;
        next();

    } catch (error) {
        console.error("Authentication error details:", error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Please login again.",
            error: error.message
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
