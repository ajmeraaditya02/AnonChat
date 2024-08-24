const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/auth');
const roleMiddleware=require('../middlewares/role')

router.post('/create',authMiddleware.authenticate,(req,res,next)=>{req.role=["creator"];next();},roleMiddleware.role,chatController.create);
router.get('/entry',authMiddleware.authenticate,(req,res,next)=>{req.role=["creator","joinee"];next();},roleMiddleware.role,chatController.entry);


module.exports = router;
