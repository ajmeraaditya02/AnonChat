// routes/user.js
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Define user routes
router.post('/send',otpController.sendOTP);
router.post('/verify',otpController.verifyOTP);

module.exports = router;
