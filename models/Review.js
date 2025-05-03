
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  propertyRating: { type: Number, required: true },
  hostRating: { type: Number, required: true },
  reviewText: { type: String, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);
