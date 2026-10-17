const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  toggleLike,
  addComment,
  toggleSave
} = require('../controllers/postsController');

router.get('/', getPosts);
router.post('/', createPost);
router.post('/:id/like', toggleLike);
router.post('/:id/comments', addComment);
router.post('/:id/save', toggleSave);

module.exports = router;
