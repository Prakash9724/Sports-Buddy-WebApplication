const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById } = require('../controllers/event.controller');

// Public routes for events
router.get('/', getAllEvents); // Get all events for public view
router.get('/:id', getEventById); // Get single event details

module.exports = router;
