const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/event.controller');
const Event = require('../models/event.model');
const User = require('../models/user.model');
const { isAuthenticated } = require('../middleware/auth.middleware');

// Public routes for events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ status: 'active' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Events fetch karne mein error aaya'
    });
  }
});

router.get('/:id', getEventById); // Get single event details

// Event registration route
router.post('/:id/register', isAuthenticated, async (req, res) => {
  try {
    // First check if user is admin
    if (req.user.role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Admin cannot register for events'
      });
    }

    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event nahi mila'
      });
    }

    // Get user ID from token
    const user = await User.findById(req.user._id); // Use _id from token
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event full ho gaya hai'
      });
    }

    // Check if user is already registered
    if (event.participants.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Aap pehle se registered ho'
      });
    }

    // Add user to event participants
    event.participants.push(user._id);
    event.currentParticipants += 1;
    await event.save();

    // Add event to user's registered events
    user.registeredEvents.push(event._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Registration successful ho gaya'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration mein error aaya'
    });
  }
});

module.exports = router;
