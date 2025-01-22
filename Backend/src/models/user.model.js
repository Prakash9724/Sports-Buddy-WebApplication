const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User ka naam daalna zaroori hai"],
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
    phone: {
        type: String,
        required: [true, "Phone number daalna zaroori hai"],
        match: [/^[0-9]{10}$/, 'Valid phone number daalo']
    },
    address: {
        type: String,
        required: [true, "Address daalna zaroori hai"]
    },
    city: {
        type: String,
        required: [true, "City daalna zaroori hai"]
    },
    state: {
        type: String,
        required: [true, "State daalna zaroori hai"]
    },
    pincode: {
        type: String,
        required: [true, "Pincode daalna zaroori hai"]
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    sportsPreferences: {
        indoor: [{
            type: String,
            enum: ['Badminton', 'Table Tennis', 'Chess', 'Carrom', 'Boxing', 'Gym', 'Yoga', 'Swimming']
        }],
        outdoor: [{
            type: String,
            enum: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Athletics', 'Hockey', 'Kabaddi']
        }]
    }
}, {
    timestamps: true
});

// Password ko hash karne ke liye
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Name ko capitalize karne ke liye
userSchema.pre('save', function(next) {
    this.name = this.name.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    next();
});

module.exports = mongoose.model('User', userSchema);
