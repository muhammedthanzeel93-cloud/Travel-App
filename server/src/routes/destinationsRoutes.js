const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getTrendingDestinations,
  getDestinationById,
  createDestination
} = require('../controllers/destinationsController');

router.get('/', getDestinations);
router.get('/trending', getTrendingDestinations);
router.get('/:id', getDestinationById);
router.post('/', createDestination);

module.exports = router;
