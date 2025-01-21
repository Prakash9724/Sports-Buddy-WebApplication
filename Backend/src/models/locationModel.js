const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Location ka naam daalna zaroori hai"],
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: [true, "Location ka address daalna zaroori hai"]
    },
    city: {
        type: String,
        required: [true, "Location ka city daalna zaroori hai"]
    },
    state: {
        type: String,
        required: [true, "Location ka state daalna zaroori hai"]
    },
    pincode: {
        type: String,
        required: [true, "Location ka pincode daalna zaroori hai"]
    },
    capacity: {
        type: Number,
        required: [true, "Location ki capacity daalna zaroori hai"]
    },
    facilities: [{
        type: String
    }],
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
        required: [true, "Location ki image daalna zaroori hai"]
    }
}, {
    timestamps: true
});

// Location name ko capitalize karne ke liye
locationSchema.pre('save', function(next) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    next();
});

module.exports = mongoose.model('Location', locationSchema);
