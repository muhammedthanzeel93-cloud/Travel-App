const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getStoryHighlights,
  getFollowers,
  getFollowing,
  toggleFollowExplorer,
  getCommunityExplorers,
  getFavoritePlaces,
  pinFavoritePlace,
  unpinFavoritePlace
} = require('../controllers/profileController');

router.get('/', getProfile);
router.put('/', updateProfile);
router.get('/story-highlights', getStoryHighlights);
router.get('/followers', getFollowers);
router.get('/following', getFollowing);
router.post('/follow/:id', toggleFollowExplorer);
router.get('/community', getCommunityExplorers);
router.get('/favorites', getFavoritePlaces);
router.post('/favorites', pinFavoritePlace);
router.delete('/favorites/:id', unpinFavoritePlace);

module.exports = router;

