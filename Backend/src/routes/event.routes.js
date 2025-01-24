const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/event.controller');
const Event = require('../models/event.model');

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

module.exports = router;
