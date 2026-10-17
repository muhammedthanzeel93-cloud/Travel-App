const { posts, userProfile } = require('../data/serverData');

/**
 * Controller: Instagram-Style Posts & Social Feed
 */
const getPosts = (req, res) => {
  res.json({
    success: true,
    count: posts.length,
    data: posts
  });
};

const createPost = (req, res) => {
  const { image, caption, location } = req.body;

  if (!image || !caption) {
    return res.status(400).json({
      success: false,
      message: 'Both photo image URL and caption are required.'
    });
  }

  const newPost = {
    id: `post-${Date.now()}`,
    author: userProfile.name || 'Aysha Rayan',
    handle: userProfile.handle || '@aysha_explorer',
    avatar: userProfile.avatarInitials || 'AR',
    location: (location || 'Scenic Horizons').trim(),
    image: image.trim(),
    caption: caption.trim(),
    likesCount: 1,
    isLiked: true,
    saved: false,
    timestamp: 'Just now',
    comments: []
  };

  posts.unshift(newPost);
  userProfile.postsCount = posts.length;

  res.status(201).json({
    success: true,
    message: 'Post published to travel feed successfully.',
    data: newPost
  });
};

const toggleLike = (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post ${id} not found.`
    });
  }

  post.isLiked = !post.isLiked;
  post.likesCount = post.isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);

  res.json({
    success: true,
    data: {
      id: post.id,
      isLiked: post.isLiked,
      likesCount: post.likesCount
    }
  });
};

const addComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Comment text cannot be empty.'
    });
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post ${id} not found.`
    });
  }

  const newComment = {
    id: `comment-${Date.now()}`,
    user: userProfile.name,
    handle: userProfile.handle,
    text: text.trim()
  };

  post.comments.push(newComment);

  res.status(201).json({
    success: true,
    data: newComment
  });
};

const toggleSave = (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post ${id} not found.`
    });
  }

  post.saved = !post.saved;

  res.json({
    success: true,
    data: {
      id: post.id,
      saved: post.saved
    }
  });
};

module.exports = {
  getPosts,
  createPost,
  toggleLike,
  addComment,
  toggleSave
};
