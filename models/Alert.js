
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  location: { type: String, required: true },
});

module.exports = mongoose.model('Alert', alertSchema);
