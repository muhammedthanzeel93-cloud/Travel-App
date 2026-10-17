const express = require('express');
const router = express.Router();
const { generateItinerary, chat } = require('../controllers/aiController');

router.post('/itinerary', generateItinerary);
router.post('/chat', chat);

module.exports = router;