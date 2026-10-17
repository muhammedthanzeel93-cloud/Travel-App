/**
 * WanderLust Client API Client
 * Strictly separates frontend UI logic from backend API services.
 * Seamlessly interfaces with the Express REST API server with intelligent offline fallback.
 */

const API_BASE = process.env.REACT_APP_API_URL || '/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API Client] ${endpoint} request failed or offline. Fallback triggered:`, error.message);
    throw error;
  }
}

export const apiClient = {
  // Health
  checkHealth: () => request('/health'),

  // Destinations
  getDestinations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/destinations${query ? `?${query}` : ''}`);
  },
  getTrendingDestinations: () => request('/destinations/trending'),
  getDestinationById: (id) => request(`/destinations/${id}`),
  createDestination: (data) =>
    request('/destinations', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Multi-Modal Routes & Transit
  calculateRoute: (data) =>
    request('/routes/plan', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getRouteHotels: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/routes/hotels${query ? `?${query}` : ''}`);
  },
  getEnrouteSpots: (category) =>
    request(`/routes/enroute-spots${category ? `?category=${category}` : ''}`),

  // AI Concierge & Pathfinder
  generateAIItinerary: (preferences) =>
    request('/ai/itinerary', {
      method: 'POST',
      body: JSON.stringify(preferences)
    }),
  sendAIChatMessage: (message, context = {}) =>
    request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    }),

  // Instagram Social Feed & Posts
  getPosts: () => request('/posts'),
  createPost: (data) =>
    request('/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  toggleLike: (postId) =>
    request(`/posts/${postId}/like`, {
      method: 'POST'
    }),
  addComment: (postId, text) =>
    request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text })
    }),
  toggleSave: (postId) =>
    request(`/posts/${postId}/save`, {
      method: 'POST'
    }),

  // User Profile & Community
  getProfile: () => request('/profile'),
  updateProfile: (data) =>
    request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  getStoryHighlights: () => request('/profile/story-highlights'),
  getFollowers: () => request('/profile/followers'),
  getFollowing: () => request('/profile/following'),
  toggleFollow: (explorerId) =>
    request(`/profile/follow/${explorerId}`, {
      method: 'POST'
    }),
  getCommunityExplorers: () => request('/profile/community'),

  // Dynamic Budget
  calculateBudget: (data) =>
    request('/budget/calculate', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export default apiClient;
