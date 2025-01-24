const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventParticipants,
  updateEventStatus
} = require('../controllers/event.controller');

// Saare active events ko get karne ke liye
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find({ isActive: true })
            .populate('category', 'name')
            .populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        console.error("Events fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Events fetch nahi ho paye"
        });
    }
});

// Event ki details get karne ke liye
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('category', 'name')
            .populate('createdBy', 'name email')
            .populate('registeredUsers', 'name email');

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
        console.error("Event details fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Event details fetch nahi ho payi"
        });
    }
});

// Event ke liye register karne ke liye
router.post('/:id/register', authenticateUser, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event nahi mila"
            });
        }

        // Check karo ki event mein jagah hai ya nahi
        if (event.registeredUsers.length >= event.capacity) {
            return res.status(400).json({
                success: false,
                message: "Event full ho gaya hai"
            });
        }

        // Check karo ki user already registered hai ya nahi
        if (event.registeredUsers.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: "Aap already registered ho"
            });
        }

        // User ko event mein add karo
        event.registeredUsers.push(req.user._id);
        await event.save();

        res.status(200).json({
            success: true,
            message: "Event ke liye registration successful ho gaya"
        });
    } catch (error) {
        console.error("Event registration mein error:", error);
        res.status(500).json({
            success: false,
            message: "Event registration fail ho gaya"
        });
    }
});

// Admin routes
router.get('/admin/events', isAuthenticated, isAdmin, getAllEvents);
router.post('/admin/events', isAuthenticated, isAdmin, upload.single('image'), createEvent);
router.put('/admin/events/:id', isAuthenticated, isAdmin, upload.single('image'), updateEvent);
router.delete('/admin/events/:id', isAuthenticated, isAdmin, deleteEvent);
router.get('/admin/events/:id/participants', isAuthenticated, isAdmin, getEventParticipants);
router.put('/admin/events/:id/status', isAuthenticated, isAdmin, updateEventStatus);

module.exports = router;
