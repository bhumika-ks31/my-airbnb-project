const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  weather: String,  // "warm", "cool"
  activities: [String],  // Example: ["hiking", "beach"]
});

module.exports = mongoose.model('Destination', destinationSchema);
