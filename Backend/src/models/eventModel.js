const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event ka title daalna zaroori hai"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Event ka description daalna zaroori hai"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Event ki category daalna zaroori hai"]
    },
    date: {
        type: Date,
        required: [true, "Event ki date daalna zaroori hai"]
    },
    time: {
        type: String,
        required: [true, "Event ka time daalna zaroori hai"]
    },
    venue: {
        type: String,
        required: [true, "Event ka venue daalna zaroori hai"]
    },
    capacity: {
        type: Number,
        required: [true, "Event ki capacity daalna zaroori hai"]
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    price: {
        type: Number,
        required: [true, "Event ki price daalna zaroori hai"],
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        required: [true, "Event ki image daalna zaroori hai"]
    }
}, {
    timestamps: true
});

// Title ko capitalize karne ke liye
eventSchema.pre('save', function(next) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    next();
});

module.exports = mongoose.model('Event', eventSchema);
