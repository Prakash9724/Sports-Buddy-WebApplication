const Event = require('../models/event.model');
const { uploadToCloudinary } = require('../utils/cloudinary'); // Assuming you have cloudinary setup

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'firstName lastName')
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
      const result = await uploadToCloudinary(req.file.path);
      eventData.image = result.secure_url;
    }

    // Add organizer (admin) to event data
    eventData.organizer = req.user.id;

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

    // Handle image update if present
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      updateData.image = result.secure_url;
    }

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