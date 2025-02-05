const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateProfile, 
    changePassword 
} = require('../controllers/user.Controller');
const Event = require('../models/event.model');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateProfile);
router.put('/change-password', authenticateUser, changePassword);

// Get user's registered events
router.get('/registered-events', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if registeredEvents exists
        if (!user.registeredEvents) {
            return res.status(200).json({
                success: true,
                events: []
            });
        }

        // Populate events data
        const populatedUser = await User.findById(user._id)
            .populate({
                path: 'registeredEvents',
                select: 'title sport date time location image currentParticipants maxParticipants'
            });

        res.status(200).json({
            success: true,
            events: populatedUser.registeredEvents || []
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Events fetch karne mein error aaya'
        });
    }
});

// Update sports preferences
router.put('/sports-preferences', authenticateUser, async (req, res) => {
  try {
    const { sportsPreferences } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { sportsPreferences } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Sports preferences update ho gaye",
      user: updatedUser
    });
  } catch (error) {
    console.error("Sports preferences update mein error:", error);
    res.status(500).json({
      success: false,
      message: "Update karne mein problem hui"
    });
  }
});

// Add this route for event registration
router.put('/register-event', authenticateUser, async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user._id;

        // Find user and event
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event nahi mila"
            });
        }

        // Check if already registered
        if (user.registeredEvents.includes(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Aap is event mein pehle se registered hain"
            });
        }

        // Check if event is full
        if (event.currentParticipants >= event.maxParticipants) {
            return res.status(400).json({
                success: false,
                message: "Event full ho gaya hai"
            });
        }

        // Register user for event
        user.registeredEvents.push(eventId);
        await user.save();

        // Update event participants
        event.currentParticipants += 1;
        await event.save();

        res.status(200).json({
            success: true,
            message: "Event mein registration ho gaya",
            event
        });

    } catch (error) {
        console.error("Event registration error:", error);
        res.status(500).json({
            success: false,
            message: "Registration mein kuch gadbad ho gayi"
        });
    }
});

module.exports = router;
