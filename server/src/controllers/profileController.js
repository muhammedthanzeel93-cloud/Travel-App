const { userProfile, explorers, storyHighlights, posts, favoritePlaces } = require('../data/serverData');

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

const getFavoritePlaces = (req, res) => {
  res.json({
    success: true,
    count: favoritePlaces.length,
    data: favoritePlaces
  });
};

const pinFavoritePlace = (req, res) => {
  const { destinationId, name, region, category, rating, image, recommendationNote, highlightTag, recommendedSeason, mustVisitSpots } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Destination name is required to pin to favorite highlights.'
    });
  }

  // Check if already pinned
  const existingIdx = favoritePlaces.findIndex((f) => f.destinationId === destinationId || f.name.toLowerCase() === name.toLowerCase());
  if (existingIdx !== -1) {
    // Update existing recommendation note
    favoritePlaces[existingIdx] = {
      ...favoritePlaces[existingIdx],
      recommendationNote: recommendationNote || favoritePlaces[existingIdx].recommendationNote,
      highlightTag: highlightTag || favoritePlaces[existingIdx].highlightTag,
      pinnedAt: 'Pinned by Traveler'
    };
    return res.json({
      success: true,
      message: `${name} updated in your profile highlights!`,
      data: favoritePlaces[existingIdx]
    });
  }

  const newFavorite = {
    id: `fav-${Date.now()}`,
    destinationId: destinationId || `dest-${Date.now()}`,
    name: name.trim(),
    region: (region || 'Global Horizon').trim(),
    category: (category || 'Curated Escape').trim(),
    rating: Number(rating) || 4.8,
    image: image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    recommendationNote: (recommendationNote || 'One of my all-time favorite travel spots! Highly recommended for explorers.').trim(),
    highlightTag: (highlightTag || '⭐ Traveler Recommended').trim(),
    recommendedSeason: (recommendedSeason || 'All-Season').trim(),
    pinnedAt: 'Pinned by Traveler',
    mustVisitSpots: Array.isArray(mustVisitSpots) && mustVisitSpots.length > 0 ? mustVisitSpots : ['Scenic Viewpoints', 'Local Food Gem']
  };

  favoritePlaces.unshift(newFavorite);

  res.status(201).json({
    success: true,
    message: `${newFavorite.name} pinned to your profile highlights!`,
    data: newFavorite
  });
};

const unpinFavoritePlace = (req, res) => {
  const { id } = req.params;
  const index = favoritePlaces.findIndex((f) => f.id === id || f.destinationId === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Favorite destination with ID ${id} not found.`
    });
  }

  const removed = favoritePlaces.splice(index, 1)[0];

  res.json({
    success: true,
    message: `${removed.name} unpinned from your profile highlights.`,
    data: removed
  });
};

module.exports = {
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
};
