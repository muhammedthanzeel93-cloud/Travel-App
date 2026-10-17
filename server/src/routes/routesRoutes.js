const express = require('express');
const router = express.Router();
const {
  calculateRoutePlan,
  getRouteHotels,
  getEnrouteSpots
} = require('../controllers/routesController');

router.post('/plan', calculateRoutePlan);
router.get('/hotels', getRouteHotels);
router.get('/enroute-spots', getEnrouteSpots);

module.exports = router;
