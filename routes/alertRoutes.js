
const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

router.post('/setAlert', async (req, res) => {
  const { location } = req.body;
  try {
    const newAlert = new Alert({ location });
    await newAlert.save();
    res.send('Alert set successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error setting alert');
  }
});

module.exports = router;
