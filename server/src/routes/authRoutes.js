const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);
router.get('/me', authController.getMe);
router.get('/itinerary/:userId', authController.getUserItinerary);
router.post('/itinerary/:userId', authController.saveUserItinerary);
router.put('/profile/:userId', authController.updateProfile);

module.exports = router;
