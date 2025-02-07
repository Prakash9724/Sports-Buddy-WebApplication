const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration controller
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log('Registration attempt for:', { email }); // Debug log

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email pehle se registered hai"
            });
        }

        // Hash password explicitly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        console.log('New user registered:', {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            hashedPassword: user.password // Debug log
        });

        res.status(201).json({
            success: true,
            message: "Registration successful ho gaya",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Registration mein error:", error);
        res.status(500).json({
            success: false,
            message: "Registration mein kuch gadbad ho gayi",
            error: error.message
        });
    }
};

// User login controller
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', { email }); // Debug log

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email aur password dono daalna zaroori hai"
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log('User found:', user ? 'Yes' : 'No'); // Debug log

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email ya password galat hai"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Debug log

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email ya password galat hai"
            });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send response without password
        const userResponse = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };

        res.status(200).json({
            success: true,
            message: "Login successful ho gaya",
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again",
            error: error.message
        });
    }
};

// Get user profile with all details
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('registeredEvents');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Profile fetch karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Profile fetch karne mein problem hui"
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updateData = req.body;
        
        console.log('Updating user:', userId);
        console.log('Update data:', updateData);

        // Update user document
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    firstName: updateData.firstName,
                    lastName: updateData.lastName,
                    email: updateData.email,
                    personal: updateData.personal,
                    professional: updateData.professional
                }
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log('Updated user:', updatedUser); // Debug log

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};

// Change user password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Purana password galat hai"
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password change ho gaya"
        });

    } catch (error) {
        console.error("Password change karne mein error:", error);
        res.status(500).json({
            success: false,
            message: "Password change karne mein problem hui"
        });
    }
};
