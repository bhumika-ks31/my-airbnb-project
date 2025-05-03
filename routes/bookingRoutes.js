
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/book', async (req, res) => {
  const { listingId, startDate, endDate } = req.body;
  try {
    const newBooking = new Booking({
      listingId,
      startDate,
      endDate,
    });

    await newBooking.save();
    res.redirect(`/listings`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error making the booking');
  }
});

module.exports = router;
