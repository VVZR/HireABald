const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  baldType: {
    type: String,
    required: [true, 'Bald type is required'],
    enum: ['fully-bald', 'shiny-bald', 'tactical-bald', 'monk-bald'],
    default: 'fully-bald'
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration in hours is required'],
    min: 1
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
