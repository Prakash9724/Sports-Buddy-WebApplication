const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

// Add isAdmin middleware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Admin access required"
      });
    }
    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(403).json({
      success: false,
      message: "Admin authentication failed"
    });
  }
}; 