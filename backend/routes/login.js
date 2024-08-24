// routes/user.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const authMiddleware=require('../middlewares/auth')
// Define user routes
router.post('/in', loginController.validateLogin);
router.get('/',authMiddleware.verify);
router.post('/out',loginController.logout)

module.exports = router;
