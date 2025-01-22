const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middlewares/authMiddleware');

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            phone, 
            address, 
            city, 
            state, 
            pincode,
            sportsPreferences 
        } = req.body;

        // Check karo ki email already exist toh nahi karta
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Is email se already ek user registered hai"
            });
        }

        // Validate sports preferences
        if (sportsPreferences) {
            // Indoor sports validation
            if (sportsPreferences.indoor && !Array.isArray(sportsPreferences.indoor)) {
                return res.status(400).json({
                    success: false,
                    message: "Indoor sports array format mein hona chahiye"
                });
            }

            // Outdoor sports validation
            if (sportsPreferences.outdoor && !Array.isArray(sportsPreferences.outdoor)) {
                return res.status(400).json({
                    success: false,
                    message: "Outdoor sports array format mein hona chahiye"
                });
            }
        }

        // Naya user banao
        const user = new User({
            name,
            email,
            password,
            phone,
            address,
            city,
            state,
            pincode,
            sportsPreferences: {
                indoor: sportsPreferences?.indoor || [],
                outdoor: sportsPreferences?.outdoor || []
            }
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "Registration successful ho gaya",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                pincode: user.pincode,
                sportsPreferences: user.sportsPreferences
            }
        });

    } catch (error) {
        console.error("User registration mein error:", error);
        res.status(500).json({
            success: false,
            message: "Registration fail ho gaya",
            error: error.message
        });
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // User ko dhundo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email ya password galat hai"
            });
        }

        // Password check karo
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email ya password galat hai"
            });
        }

        // JWT token banao
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful ho gaya",
            token
        });

    } catch (error) {
        console.error("User login mein error:", error);
        res.status(500).json({
            success: false,
            message: "Login fail ho gaya"
        });
    }
});

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('registeredEvents');

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Profile fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Profile fetch nahi ho paya"
        });
    }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
    try {
        const { 
            name, 
            phone, 
            address, 
            city, 
            state, 
            pincode,
            sportsPreferences 
        } = req.body;

        const user = await User.findById(req.user._id);
        
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (city) user.city = city;
        if (state) user.state = state;
        if (pincode) user.pincode = pincode;
        if (sportsPreferences) {
            if (sportsPreferences.indoor) {
                user.sportsPreferences.indoor = sportsPreferences.indoor;
            }
            if (sportsPreferences.outdoor) {
                user.sportsPreferences.outdoor = sportsPreferences.outdoor;
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile update ho gaya",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                pincode: user.pincode,
                sportsPreferences: user.sportsPreferences
            }
        });
    } catch (error) {
        console.error("Profile update karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Profile update nahi ho paya",
            error: error.message
        });
    }
});

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

module.exports = router;
