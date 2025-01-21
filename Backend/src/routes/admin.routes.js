const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middlewares/authMiddleware');
const Admin = require('../models/admin.model');
const Event = require('../models/eventModel');
const Category = require('../models/categoryModel');
const Location = require('../models/locationModel');

// Admin login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Admin ko dhundo
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Email ya password galat hai"
            });
        }

        // Password check karo
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false, 
                message: "Email ya password galat hai"
            });
        }

        // JWT token banao
        const token = admin.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "Admin login successful ho gaya",
            token
        });

    } catch (error) {
        console.error("Admin login mein error:", error);
        res.status(500).json({
            success: false,
            message: "Server mein kuch gadbad hai"
        });
    }
});

// Event management routes
router.post('/events', authenticateAdmin, async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.admin._id
        };
        
        const event = await Event.create(eventData);
        
        res.status(201).json({
            success: true,
            message: "Event create ho gaya",
            event
        });
    } catch (error) {
        console.error("Event create karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Event create nahi ho paya"
        });
    }
});

// Category management routes
router.post('/categories', authenticateAdmin, async (req, res) => {
    try {
        const categoryData = {
            ...req.body,
            createdBy: req.admin._id
        };
        
        const category = await Category.create(categoryData);
        
        res.status(201).json({
            success: true,
            message: "Category create ho gayi",
            category
        });
    } catch (error) {
        console.error("Category create karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Category create nahi ho payi"
        });
    }
});

// Location management routes
router.post('/locations', authenticateAdmin, async (req, res) => {
    try {
        const locationData = {
            ...req.body,
            createdBy: req.admin._id
        };
        
        const location = await Location.create(locationData);
        
        res.status(201).json({
            success: true,
            message: "Location create ho gayi",
            location
        });
    } catch (error) {
        console.error("Location create karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Location create nahi ho payi"
        });
    }
});

// Get all events
router.get('/events', authenticateAdmin, async (req, res) => {
    try {
        const events = await Event.find()
            .populate('category')
            .populate('registeredUsers', 'name email');
            
        res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        console.error("Events fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Events fetch nahi ho paye"
        });
    }
});

// Get all categories
router.get('/categories', authenticateAdmin, async (req, res) => {
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
router.get('/locations', authenticateAdmin, async (req, res) => {
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
