const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  sport: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  entryFee: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: String,
  rules: [String],
  facilities: [String],
  image: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema); 