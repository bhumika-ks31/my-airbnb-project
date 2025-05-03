
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/submitReview', async (req, res) => {
  const { listingId, propertyRating, hostRating, reviewText } = req.body;
  try {
    const newReview = new Review({
      listingId,
      propertyRating,
      hostRating,
      reviewText,
    });
    await newReview.save();
    res.redirect(`/listings`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting review');
  }
});

module.exports = router;
