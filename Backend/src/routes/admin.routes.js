const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventParticipants,
  updateEventStatus
} = require('../controllers/event.controller');
const Category = require('../models/categoryModel');
const Location = require('../models/locationModel');

// Admin login route
router.post('/login', async (req, res) => {
    try {
        const { email, password, secretKey } = req.body;

        // Check admin credentials
        if (email !== process.env.ADMIN_EMAIL || 
            password !== process.env.ADMIN_PASSWORD || 
            secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: 'admin', role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: "Admin login successful",
            token
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
});

// Admin Event Routes
router.get('/events', isAuthenticated, isAdmin, getAllEvents);
router.post('/events', isAuthenticated, isAdmin, upload.single('image'), createEvent);
router.put('/events/:id', isAuthenticated, isAdmin, upload.single('image'), updateEvent);
router.delete('/events/:id', isAuthenticated, isAdmin, deleteEvent);
router.get('/events/:id/participants', isAuthenticated, isAdmin, getEventParticipants);
router.put('/events/:id/status', isAuthenticated, isAdmin, updateEventStatus);

// Get all categories
router.get('/categories', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error("Categories fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Categories fetch nahi ho payi"
        });
    }
});

// Get all locations
router.get('/locations', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json({
            success: true,
            locations
        });
    } catch (error) {
        console.error("Locations fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Locations fetch nahi ho payi"
        });
    }
});

module.exports = router;
