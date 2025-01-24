const Event = require('../models/event.model');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'organizer',
        select: 'firstName lastName',
        // Only populate if organizer is ObjectId
        match: { _id: { $exists: true } }
      })
      .sort({ createdAt: -1 });

    // Map events to handle both admin and user organizers
    const mappedEvents = events.map(event => {
      const eventObj = event.toObject();
      if (eventObj.organizer === 'admin') {
        eventObj.organizerName = 'Admin';
      }
      return eventObj;
    });

    res.status(200).json({
      success: true,
      events: mappedEvents
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Events fetch karne mein error aaya'
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    
    // Handle image upload if present
    if (req.file) {
      eventData.image = `/uploads/${req.file.filename}`;
    }

    // Add organizer
    eventData.organizer = 'admin'; // Just use 'admin' string for admin-created events

    // Parse arrays if they're sent as strings
    if (typeof eventData.rules === 'string') {
      eventData.rules = JSON.parse(eventData.rules);
    }
    if (typeof eventData.facilities === 'string') {
      eventData.facilities = JSON.parse(eventData.facilities);
    }

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: 'Event create ho gaya',
      event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Event create karne mein error aaya'
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle image upload if present
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Remove participants field if it's empty or invalid
    if (!updateData.participants || updateData.participants.length === 0) {
      delete updateData.participants;
    }

    // Parse arrays if they're sent as strings
    if (typeof updateData.rules === 'string') {
      updateData.rules = JSON.parse(updateData.rules);
    }
    if (typeof updateData.facilities === 'string') {
      updateData.facilities = JSON.parse(updateData.facilities);
    }

    // Remove empty arrays
    if (Array.isArray(updateData.rules) && updateData.rules.length === 1 && updateData.rules[0] === '') {
      delete updateData.rules;
    }
    if (Array.isArray(updateData.facilities) && updateData.facilities.length === 1 && updateData.facilities[0] === '') {
      delete updateData.facilities;
    }

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: false } // Disable validation for update
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event nahi mila'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event update ho gaya',
      event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      message: 'Event update karne mein error aaya'
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event nahi mila'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event delete ho gaya'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      message: 'Event delete karne mein error aaya'
    });
  }
};

exports.getEventParticipants = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id)
      .populate('participants', 'firstName lastName email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event nahi mila'
      });
    }

    res.status(200).json({
      success: true,
      participants: event.participants
    });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({
      success: false,
      message: 'Participants fetch karne mein error aaya'
    });
  }
};

exports.updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event nahi mila'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event status update ho gaya',
      event
    });
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(500).json({
      success: false,
      message: 'Status update karne mein error aaya'
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event nahi mila"
      });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Event details fetch karne mein error aaya'
    });
  }
}; 