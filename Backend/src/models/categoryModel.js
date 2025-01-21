const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category ka naam daalna zaroori hai"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Category ka description daalna zaroori hai"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Category name ko capitalize karne ke liye
categorySchema.pre('save', function(next) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    next();
});

module.exports = mongoose.model('Category', categorySchema);
