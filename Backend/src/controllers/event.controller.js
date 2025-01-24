const Event = require('../models/event.model');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'organizer',
        select: 'firstName lastName',
        // Only populate if organizer is ObjectId (for user-created events)
        match: { _id: { $exists: true } }
      })
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
    const updateData = req.body;

    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
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
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'firstName lastName')
      .populate('participants', 'firstName lastName');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
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
      message: 'Failed to fetch event details'
    });
  }
}; 