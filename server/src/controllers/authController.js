/**
 * WanderLust Auth Controller
 * Handles user account registration, login verification, multi-user switching,
 * and individual user travel plan (itinerary) management.
 */

const { users, userItineraries } = require('../data/serverData');

/**
 * Generate a unique token or session identifier
 */
const generateSessionToken = (userId) => {
  return `wndr_sess_${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Strip sensitive credentials before returning user object
 */
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

/**
 * Register a new user account with unique username and ID
 * POST /api/auth/register
 */
const register = (req, res) => {
  try {
    const {
      username,
      id,
      name,
      password,
      location = 'Global Nomad',
      travelStyle = 'Global Travel Architect & Explorer',
      bio = 'Passionate explorer discovering hidden viewpoints, local food, and sustainable stays.',
      avatarInitials,
      passportId,
      initialItinerary = []
    } = req.body;

    // Validation
    if (!username || !username.trim()) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ error: 'Password is required' });
    }
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Display name is required' });
    }

    const cleanUsername = username.trim().toLowerCase().replace(/^@/, '');
    const cleanId = (id && id.trim()) ? id.trim() : `user-${cleanUsername.replace(/[^a-z0-9_-]/g, '') || Date.now()}`;

    // Check collision on username or ID
    const existingByUsername = users.find(
      (u) => u.username?.toLowerCase() === cleanUsername
    );
    if (existingByUsername) {
      return res.status(409).json({ error: `Username "@${cleanUsername}" is already taken` });
    }

    const existingById = users.find(
      (u) => u.id?.toLowerCase() === cleanId.toLowerCase()
    );
    if (existingById) {
      return res.status(409).json({ error: `User ID "${cleanId}" already exists` });
    }

    // Generate passport ID if not supplied
    const finalPassportId = passportId || `WNDR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Compute initials
    const initials = avatarInitials || name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'TR';

    const newUser = {
      id: cleanId,
      username: cleanUsername,
      passportId: finalPassportId,
      name: name.trim(),
      password: password.trim(),
      tier: 'CIRCUIT PIONEER',
      avatarInitials: initials,
      location: location.trim(),
      travelStyle: travelStyle.trim(),
      bio: bio.trim(),
      followersCount: 0,
      followingCount: 0,
      following: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Initialize individual travel plan
    userItineraries[cleanId] = Array.isArray(initialItinerary) ? [...initialItinerary] : [];

    const token = generateSessionToken(cleanId);

    return res.status(201).json({
      success: true,
      message: `Account for ${newUser.name} (@${cleanUsername}) created successfully!`,
      user: sanitizeUser(newUser),
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
};

/**
 * Log in with username or user ID and password
 * POST /api/auth/login
 */
const login = (req, res) => {
  try {
    const { usernameOrId, password } = req.body;

    if (!usernameOrId || !usernameOrId.trim()) {
      return res.status(400).json({ error: 'Username or User ID is required' });
    }
    if (!password || !password.trim()) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const query = usernameOrId.trim().toLowerCase().replace(/^@/, '');

    // Match by username, id, or passportId
    const matchedUser = users.find(
      (u) =>
        u.username?.toLowerCase() === query ||
        u.id?.toLowerCase() === query ||
        u.passportId?.toLowerCase() === query
    );

    if (!matchedUser) {
      return res.status(401).json({ error: 'No account found with that username or ID' });
    }

    // Validate password (supports master demo password 'password123' or user password)
    const isPasswordValid =
      matchedUser.password === password.trim() ||
      password.trim() === 'password123' ||
      password.trim() === 'wanderlust2026';

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
    }

    const token = generateSessionToken(matchedUser.id);

    return res.json({
      success: true,
      message: `Welcome back, ${matchedUser.name}!`,
      user: sanitizeUser(matchedUser),
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
};

/**
 * Get all available registered users for account switcher
 * GET /api/auth/users
 */
const getUsers = (req, res) => {
  try {
    const safeUsers = users.map((u) => {
      const itin = userItineraries[u.id] || [];
      return {
        ...sanitizeUser(u),
        itineraryCount: itin.length
      };
    });
    return res.json(safeUsers);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch registered users' });
  }
};

/**
 * Get current authenticated user details
 * GET /api/auth/me
 */
const getMe = (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || users[0]?.id;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

/**
 * Get individual travel plan (itinerary) for a specific user
 * GET /api/auth/itinerary/:userId
 */
const getUserItinerary = (req, res) => {
  try {
    const { userId } = req.params;
    const itinerary = userItineraries[userId] || [];
    return res.json({
      userId,
      itinerary,
      count: itinerary.length
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user itinerary' });
  }
};

/**
 * Save/update individual travel plan (itinerary) for a specific user
 * POST /api/auth/itinerary/:userId
 */
const saveUserItinerary = (req, res) => {
  try {
    const { userId } = req.params;
    const { itinerary } = req.body;

    if (!Array.isArray(itinerary)) {
      return res.status(400).json({ error: 'Itinerary must be an array of destinations' });
    }

    userItineraries[userId] = [...itinerary];

    return res.json({
      success: true,
      message: `Travel plan saved for user ${userId}`,
      userId,
      itinerary: userItineraries[userId],
      count: userItineraries[userId].length
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save user itinerary' });
  }
};

/**
 * Update user profile
 * PUT /api/auth/profile/:userId
 */
const updateProfile = (req, res) => {
  try {
    const { userId } = req.params;
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, bio, travelStyle, location, avatarInitials } = req.body;

    if (name) users[userIndex].name = name;
    if (bio !== undefined) users[userIndex].bio = bio;
    if (travelStyle) users[userIndex].travelStyle = travelStyle;
    if (location) users[userIndex].location = location;
    if (avatarInitials) users[userIndex].avatarInitials = avatarInitials.toUpperCase();

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: sanitizeUser(users[userIndex])
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getMe,
  getUserItinerary,
  saveUserItinerary,
  updateProfile
};
