const { userProfile, explorers, storyHighlights, posts } = require('../data/serverData');

/**
 * Controller: User Profile, Story Highlights & Community Network
 */
const getProfile = (req, res) => {
  const currentFollowingCount = explorers.filter((e) => e.isFollowing).length;

  res.json({
    success: true,
    data: {
      ...userProfile,
      postsCount: posts.length,
      followingCount: currentFollowingCount
    }
  });
};

const updateProfile = (req, res) => {
  const { name, handle, location, bio, travelStyle } = req.body;

  if (name) userProfile.name = name.trim();
  if (handle) userProfile.handle = handle.trim();
  if (location) userProfile.location = location.trim();
  if (bio) userProfile.bio = bio.trim();
  if (travelStyle) userProfile.travelStyle = travelStyle.trim();

  res.json({
    success: true,
    message: 'Profile credentials updated successfully.',
    data: userProfile
  });
};

const getStoryHighlights = (req, res) => {
  res.json({
    success: true,
    count: storyHighlights.length,
    data: storyHighlights
  });
};

const getFollowers = (req, res) => {
  res.json({
    success: true,
    count: userProfile.followersCount,
    data: explorers
  });
};

const getFollowing = (req, res) => {
  const followed = explorers.filter((e) => e.isFollowing);
  res.json({
    success: true,
    count: followed.length,
    data: followed
  });
};

const toggleFollowExplorer = (req, res) => {
  const { id } = req.params;
  const explorer = explorers.find((e) => e.id === id);

  if (!explorer) {
    return res.status(404).json({
      success: false,
      message: `Explorer ${id} not found in community network.`
    });
  }

  explorer.isFollowing = !explorer.isFollowing;
  explorer.isMutual = explorer.isFollowing;

  const currentFollowingCount = explorers.filter((e) => e.isFollowing).length;
  userProfile.followingCount = currentFollowingCount;

  res.json({
    success: true,
    message: explorer.isFollowing ? `Now following ${explorer.name}` : `Unfollowed ${explorer.name}`,
    data: {
      id: explorer.id,
      name: explorer.name,
      isFollowing: explorer.isFollowing,
      totalFollowing: currentFollowingCount
    }
  });
};

const getCommunityExplorers = (req, res) => {
  res.json({
    success: true,
    count: explorers.length,
    data: explorers
  });
};

module.exports = {
  getProfile,
  updateProfile,
  getStoryHighlights,
  getFollowers,
  getFollowing,
  toggleFollowExplorer,
  getCommunityExplorers
};
