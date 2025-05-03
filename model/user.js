const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  preferences: {
    weather: { type: String, enum: ['warm', 'cool'] },
    activity: [String],  // Example: ["hiking", "beach", "culture"]
  },
  pastTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  reviews: [{
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    rating: Number,
    comments: String
  }],
});

module.exports = mongoose.model('User', userSchema);
