const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getStoryHighlights,
  getFollowers,
  getFollowing,
  toggleFollowExplorer,
  getCommunityExplorers
} = require('../controllers/profileController');

router.get('/', getProfile);
router.put('/', updateProfile);
router.get('/story-highlights', getStoryHighlights);
router.get('/followers', getFollowers);
router.get('/following', getFollowing);
router.post('/follow/:id', toggleFollowExplorer);
router.get('/community', getCommunityExplorers);

module.exports = router;
