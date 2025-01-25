const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { isAuthenticated, isAdmin } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/multer');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventParticipants,
  updateEventStatus,
  getEventById
} = require('../controllers/event.controller');
const Category = require('../models/categoryModel');
const Location = require('../models/locationModel');
const User = require('../models/user.model');
const Event = require('../models/event.model');

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

        // Generate token with admin role
        const token = jwt.sign(
            { role: 'admin' },
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
router.get('/events/:id', isAuthenticated, isAdmin, getEventById);
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

// Get all users
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
});

// Get dashboard stats
router.get('/dashboard', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Get basic stats
    const [
      totalUsers,
      totalEvents,
      activeEvents,
      completedEvents
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Event.countDocuments({ status: 'active' }),
      Event.countDocuments({ status: 'completed' })
    ]);

    // Get total participants
    const participantsResult = await Event.aggregate([
      { $group: { _id: null, total: { $sum: "$currentParticipants" } } }
    ]);
    const totalParticipants = participantsResult[0]?.total || 0;

    // Get popular sports
    const popularSports = await Event.aggregate([
      { $group: { _id: "$sport", participants: { $sum: "$currentParticipants" } } },
      { $project: { name: "$_id", participants: 1, _id: 0 } },
      { $sort: { participants: -1 } },
      { $limit: 5 }
    ]);

    // Get recent activities
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentActivities = recentEvents.map(event => ({
      description: `New event "${event.title}" was created`,
      timestamp: event.createdAt
    }));

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalEvents,
        activeEvents,
        completedEvents,
        totalParticipants,
        popularSports
      },
      recentActivities
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Dashboard data fetch karne mein error aaya'
    });
  }
});

module.exports = router;
