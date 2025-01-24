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

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile
router.get('/profile', authenticateUser, getUserProfile);

// Update user profile
router.put('/profile', authenticateUser, updateProfile);

// Get user's registered events
router.get('/my-events', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'registeredEvents',
                populate: [
                    { path: 'category', select: 'name' },
                    { path: 'createdBy', select: 'name email' }
                ]
            });

        res.status(200).json({
            success: true,
            events: user.registeredEvents
        });
    } catch (error) {
        console.error("Events fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Events fetch nahi ho paye"
        });
    }
});

router.post('/change-password', authenticateUser, changePassword);

// Get user's registered events
router.get('/registered-events', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('registeredEvents');
    
    res.status(200).json({
      success: true,
      events: user.registeredEvents
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Events fetch karne mein error aaya'
    });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile update ho gaya',
      user
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Profile update karne mein error aaya'
    });
  }
});

module.exports = router;
