// routes/user.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Define user routes
router.post('/', registerController.addUser);
router.post('/checkUser',registerController.checkUser);
router.post('/forgot',registerController.forgotPassword);
module.exports = router;
