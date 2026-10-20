const express = require('express');
const router = express.Router();
const {
  getAllPackages,
  getPackageById,
  createPackage
} = require('../controllers/packagesController');

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.post('/', createPackage);

module.exports = router;
