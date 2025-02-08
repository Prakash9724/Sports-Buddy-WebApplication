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

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is already registered
    const isAlreadyRegistered = event.participants && event.participants.some(
      participantId => participantId.toString() === user._id.toString()
    );

    if (isAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'Aap is event ke liye already registered ho!',
        isRegistered: true
      });
    }

    // Check if event is active
    if (event.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Event active nahi hai'
      });
    }

    // Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event full ho gaya hai'
      });
    }

    // Initialize participants array if it doesn't exist
    if (!event.participants) {
      event.participants = [];
    }

    // Add user to event participants
    event.participants.push(user._id);
    event.currentParticipants = event.participants.length;
    await event.save();

    // Initialize registeredEvents array if it doesn't exist
    if (!user.registeredEvents) {
      user.registeredEvents = [];
    }

    // Add event to user's registered events
    if (!user.registeredEvents.includes(event._id)) {
      user.registeredEvents.push(event._id);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Registration successful ho gaya',
      event: event
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration mein error aaya'
    });
  }
});

module.exports = router;
