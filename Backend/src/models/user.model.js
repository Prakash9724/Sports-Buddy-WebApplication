const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name daalna zaroori hai"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name daalna zaroori hai"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email daalna zaroori hai"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email daalo']
    },
    password: {
        type: String,
        required: [true, "Password daalna zaroori hai"],
        minlength: [6, "Password kam se kam 6 characters ka hona chahiye"]
    },
    // Personal Information
    personal: {
        phone: String,
        gender: String,
        dateOfBirth: Date,
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    // Professional Information
    professional: {
        occupation: String,
        company: String,
        experience: String,
        education: String,
        skills: [String]
    },
    // Sports Preferences
    sportsPreferences: {
        indoor: [String],
        outdoor: [String],
        skillLevel: String,
        availability: [String],
        preferredLocations: [String]
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// First name aur last name ko capitalize karne ke liye
userSchema.pre('save', function(next) {
    if (this.firstName) {
        this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    }
    if (this.lastName) {
        this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
    }
    next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('Comparing passwords:');
        console.log('Candidate password:', candidatePassword);
        console.log('Stored hash:', this.password);
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Password match result:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Password comparison error:', error);
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);
