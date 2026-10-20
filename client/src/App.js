import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { INITIAL_DESTINATIONS, INITIAL_ITINERARY, DEFAULT_USER_PROFILE, COMMUNITY_EXPLORERS, INITIAL_USER_ACCOUNTS, SEED_USER_ITINERARIES } from './data/destinationsData';
import DestinationCard from './components/DestinationCard';
import DestinationModal from './components/DestinationModal';
import CreateLocationModal from './components/CreateLocationModal';
import ItineraryView from './components/ItineraryView';
import ShareItineraryModal from './components/ShareItineraryModal';
import AIAssistantChat from './components/AIAssistantChat';
import BudgetCalculatorModal from './components/BudgetCalculatorModal';
import { calculateTripBudget, DEFAULT_BUDGET_CONFIG } from './utils/budgetCalculator';
import FuturisticNavBar from './components/FuturisticNavBar';
import HomeView from './components/HomeView';
import ProfileView from './components/ProfileView';
import RoutePlannerModal from './components/RoutePlannerModal';
import AuthModal from './components/AuthModal';
import apiClient from './services/apiClient';

/**
 * ============================================================================
 * DESTINATION DATA STRUCTURE SPECIFICATION
 * ============================================================================
 * 
 * @typedef {Object} HotelRoom
 * @property {string} id - Unique identifier for room type (e.g. "tc-deluxe")
 * @property {string} name - Room title (e.g. "Deluxe Valley View Room")
 * @property {string} bed - Bed arrangement (e.g. "1 King Bed")
 * @property {string} capacity - Guest capacity (e.g. "2 Adults")
 * @property {string} [size] - Room dimensions (e.g. "380 sq ft")
 * @property {number} pricePerNight - Pricing in local currency (e.g. 5200)
 * @property {string[]} amenities - Room specific perks (e.g. ["Balcony", "Rain Shower"])
 * @property {string} [image] - Direct photo URL of the room
 * 
 * @typedef {Object} StayDetails
 * @property {string} hotelName - Name of accommodation (e.g. "Tea County Heritage Resort")
 * @property {number} hotelRating - Star rating of the hotel (e.g. 4.7)
 * @property {string} stayType - Type of stay (e.g. "Luxury Hillside Eco-Resort")
 * @property {string} checkIn - Check-in time (e.g. "14:00")
 * @property {string} checkOut - Check-out time (e.g. "11:00")
 * @property {string} locationAddress - Full street / locality address
 * @property {string} cancellationPolicy - Booking cancellation terms
 * @property {string[]} amenities - Property-wide facilities (Pool, Spa, Breakfast, Wi-Fi)
 * 
 * @typedef {Object} Transportation
 * @property {string} nearestAirport - Nearest airport with distance & driving time
 * @property {string} nearestRailway - Nearest railway terminal
 * @property {string} roadAccess - Road highway connectivity advice
 * 
 * @typedef {Object} TravelFeatures
 * @property {string} bestTimeToVisit - Optimal travel window and seasonal highlights
 * @property {string} weather - Average temperature and climatic conditions
 * @property {string} idealStayDuration - Suggested duration (e.g. "3 - 4 Days")
 * @property {Transportation} transportation - Transit connectivity breakdown
 * @property {string[]} popularActivities - Signature outdoor and cultural experiences
 * @property {string[]} travelTags - Discoverability tags (e.g. ["Nature", "Trekking"])
 * 
 * @typedef {Object} Destination
 * @property {string|number} id - Unique destination ID
 * @property {string} name - Destination city/region name
 * @property {string} region - State and Country
 * @property {string} tagline - Inspiring brief description
 * @property {string} category - Destination category (Hills, Heritage, Beach, etc.)
 * @property {number} rating - Star rating (e.g. 4.8)
 * @property {number} reviewCount - Number of traveler reviews
 * @property {number} price - Starting base price per night
 * @property {boolean} isTrending - Indicates trending popular destination
 * @property {boolean} isUserCreated - Indicates user-created custom location
 * @property {string[]} images - Multi-image gallery URLs
 * @property {string[]} famousSpots - Signature landmarks and attractions
 * @property {string[]} foodSpots - Top-rated culinary spots and dishes
 * @property {string[]} viewpoints - Scenic overlooks and photography points
 * @property {StayDetails} stayDetails - Hotel accommodation policies and facilities
 * @property {HotelRoom[]} hotelRooms - Available room options and pricing
 * @property {TravelFeatures} travelFeatures - Weather, seasonality, transit, and activities
 * 
 * @typedef {'walking' | 'car' | 'public_transport'} TransitMode
 * 
 * @typedef {Object} RouteStep
 * @property {number} stepNumber - Sequential order of the maneuver (e.g. 1)
 * @property {string} instruction - Navigation maneuver text
 * @property {string} distance - Distance for this segment (e.g. "42 km")
 * @property {string} duration - Estimated time for this segment (e.g. "45 mins")
 * @property {string} mode - Specific sub-mode ('walk' | 'car' | 'bus' | 'train')
 * @property {string} icon - Step visual indicator ("🚶", "🚗", "🚌", "🚆")
 * @property {string} [landmark] - Significant landmark along this leg
 * 
 * @typedef {Object} TransitOption
 * @property {TransitMode} mode - Transit mode key ('walking' | 'car' | 'public_transport')
 * @property {string} label - Human-readable mode title
 * @property {string} icon - Visual icon ("🚶", "🚗", "🚌")
 * @property {number} durationMinutes - Total duration in minutes
 * @property {string} durationFormatted - Display duration string (e.g. "3 hrs 45 mins")
 * @property {number} distanceKm - Route distance in kilometers
 * @property {number} estimatedCost - Estimated traveler cost in INR (₹)
 * @property {string} costBreakdown - Cost breakdown details
 * @property {string} routeName - Main highway / scenic route descriptor
 * @property {string} difficulty - Route difficulty rating
 * @property {number} scenicRating - Scenic vista rating (out of 10)
 * @property {number} carbonKg - Estimated carbon footprint in kg CO2
 * @property {boolean} isEcoFriendly - Whether this is an eco-friendly option
 * @property {string[]} highlights - Key sights along this transit option
 * @property {RouteStep[]} steps - Turn-by-turn navigation maneuvers
 * 
 * @typedef {Object} RoutePlan
 * @property {string} id - Unique route ID
 * @property {string} startLocation - Starting location name (origin)
 * @property {string} destinationId - Target destination ID
 * @property {string} destinationName - Target destination display name
 * @property {number} primaryDistanceKm - Driving distance in kilometers
 * @property {string} recommendedMode - Optimal mode ('car' | 'public_transport' | 'walking')
 * @property {string} bestTimeToDepart - Recommended departure window
 * @property {Object.<TransitMode, TransitOption>} transitOptions - Mode-specific transit routes (walking, car, public_transport)
 * ============================================================================
 */

export default function TravelAppMVP() {
  // Origin & destination inputs
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // Primary destinations state containing detailed destination data with reviews
  const [destinations, setDestinations] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_destinations_v3');
      if (saved) return JSON.parse(saved);

      const oldSaved = localStorage.getItem('wanderlust_destinations_v2');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        return parsed.map((item) => {
          const seedMatch = INITIAL_DESTINATIONS.find((init) => init.id === item.id);
          return {
            ...item,
            reviews: item.reviews && item.reviews.length > 0 ? item.reviews : (seedMatch?.reviews || [])
          };
        });
      }
      return INITIAL_DESTINATIONS;
    } catch (e) {
      console.error('Failed to parse saved destinations:', e);
      return INITIAL_DESTINATIONS;
    }
  });

  // Multi-user authentication & accounts state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_active_user_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse active user:', e);
    }
    return INITIAL_USER_ACCOUNTS[0]; // Aysha Rayan by default
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_accounts_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse registered users:', e);
    }
    return INITIAL_USER_ACCOUNTS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register' | 'switch'

  // Helper to load isolated travel plan for a specific user
  const loadUserItinerary = useCallback((userId) => {
    try {
      const userKey = `wanderlust_itinerary_user_${userId}`;
      const saved = localStorage.getItem(userKey);
      if (saved) return JSON.parse(saved);
      if (SEED_USER_ITINERARIES && SEED_USER_ITINERARIES[userId]) {
        return SEED_USER_ITINERARIES[userId];
      }
      if (userId === 'user-aysha') {
        const legacySaved = localStorage.getItem('wanderlust_itinerary_v2');
        if (legacySaved) return JSON.parse(legacySaved);
        return INITIAL_ITINERARY;
      }
      return [];
    } catch (e) {
      console.error('Failed to load user itinerary:', e);
      return [];
    }
  }, []);

  // User itinerary state strictly isolated per user account
  const [myItinerary, setMyItinerary] = useState(() => {
    const initUser = (() => {
      try {
        const saved = localStorage.getItem('wanderlust_active_user_v1');
        return saved ? JSON.parse(saved) : INITIAL_USER_ACCOUNTS[0];
      } catch {
        return INITIAL_USER_ACCOUNTS[0];
      }
    })();
    return loadUserItinerary(initUser.id);
  });

  // Top-level futuristic navigation ('home' | 'explore' | 'trips' | 'profile')
  const [activeNav, setActiveNav] = useState('explore');

  // Sub-tabs for explore view and active filters
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'trending' | 'user-created' | 'itinerary'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);

  // Switch top-level futuristic navigation seamlessly
  const handleNavChange = (navKey) => {
    setActiveNav(navKey);
    if (navKey === 'trips') {
      setActiveTab('itinerary');
    } else if (navKey === 'explore' && activeTab === 'itinerary') {
      setActiveTab('explore');
    }
  };

  // Modal inspection & creation states
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareModalMode, setShareModalMode] = useState('itinerary');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [aiAssistantInitialMode, setAiAssistantInitialMode] = useState('chat');
  const [aiAssistantPreselectedDest, setAiAssistantPreselectedDest] = useState(null);
  const [aiAssistantInitialVibe, setAiAssistantInitialVibe] = useState(null);

  // User profile state with localStorage sync
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_user_profile_v1');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch (e) {
      console.error('Failed to parse saved user profile:', e);
      return DEFAULT_USER_PROFILE;
    }
  });

  // Budget calculator config state with localStorage sync
  const [budgetConfig, setBudgetConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_budget_config_v1');
      return saved ? JSON.parse(saved) : DEFAULT_BUDGET_CONFIG;
    } catch (e) {
      return DEFAULT_BUDGET_CONFIG;
    }
  });

  // User toast notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Sync active user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_active_user_v1', JSON.stringify(currentUser));
    } catch (e) {
      console.error('LocalStorage write error for active user:', e);
    }
  }, [currentUser]);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_accounts_v1', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('LocalStorage write error for registered users:', e);
    }
  }, [registeredUsers]);

  // Sync user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_user_profile_v1', JSON.stringify(userProfile));
    } catch (e) {
      console.error('LocalStorage write error for profile:', e);
    }
  }, [userProfile]);

  // Sync budget config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_budget_config_v1', JSON.stringify(budgetConfig));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [budgetConfig]);

  // Sync destinations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_destinations_v3', JSON.stringify(destinations));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [destinations]);

  // Sync user-isolated itinerary to localStorage & backend
  useEffect(() => {
    if (!currentUser?.id) return;
    try {
      const userKey = `wanderlust_itinerary_user_${currentUser.id}`;
      localStorage.setItem(userKey, JSON.stringify(myItinerary));
      if (currentUser.id === 'user-aysha') {
        localStorage.setItem('wanderlust_itinerary_v2', JSON.stringify(myItinerary));
      }
      apiClient.saveUserItinerary(currentUser.id, myItinerary).catch(() => {});
    } catch (e) {
      console.error('LocalStorage write error for user itinerary:', e);
    }
  }, [myItinerary, currentUser?.id]);

  // Fetch users from backend API if available
  useEffect(() => {
    apiClient.getAuthUsers().then((res) => {
      if (res?.users && res.users.length > 0) {
        setRegisteredUsers((prev) => {
          const merged = [...prev];
          res.users.forEach((ru) => {
            if (!merged.some((mu) => mu.id === ru.id || mu.username === ru.username)) {
              merged.push(ru);
            }
          });
          return merged;
        });
      }
    }).catch(() => {});
  }, []);

  // Multi-user authentication handlers: switch, login, register, logout
  const handleSwitchUser = useCallback((selectedUser) => {
    if (!selectedUser) return;

    if (currentUser?.id) {
      try {
        localStorage.setItem(`wanderlust_itinerary_user_${currentUser.id}`, JSON.stringify(myItinerary));
      } catch (e) {}
    }

    setCurrentUser(selectedUser);

    setUserProfile((prev) => ({
      ...prev,
      id: selectedUser.id,
      name: selectedUser.name,
      username: selectedUser.username,
      handle: `@${selectedUser.username}`,
      passportId: selectedUser.passportId || selectedUser.id,
      tier: selectedUser.tier || 'APEX VOYAGER',
      avatarInitials: selectedUser.avatarInitials || selectedUser.name.slice(0, 2).toUpperCase(),
      location: selectedUser.location || prev.location,
      travelStyle: selectedUser.travelStyle || prev.travelStyle,
      bio: selectedUser.bio || prev.bio,
      followersCount: selectedUser.followersCount ?? prev.followersCount,
      followingCount: selectedUser.followingCount ?? prev.followingCount,
      following: selectedUser.following || []
    }));

    const userItin = loadUserItinerary(selectedUser.id);
    setMyItinerary(userItin);

    apiClient.getUserItinerary(selectedUser.id).then((res) => {
      if (res?.itinerary) {
        setMyItinerary(res.itinerary);
      }
    }).catch(() => {});

    showToast(`👋 Switched to account: ${selectedUser.name} (@${selectedUser.username}) • ID: ${selectedUser.passportId || selectedUser.id}`);
  }, [currentUser?.id, myItinerary, loadUserItinerary, showToast]);

  const handleLoginUser = useCallback(({ usernameOrId, password }) => {
    const cleanInput = usernameOrId.trim().toLowerCase().replace(/^@/, '');
    const user = registeredUsers.find(
      (u) =>
        u.username?.toLowerCase() === cleanInput ||
        u.id?.toLowerCase() === cleanInput ||
        u.passportId?.toLowerCase() === cleanInput
    );

    if (!user) {
      return { error: `Account with username or ID "${usernameOrId}" was not found.` };
    }

    if (user.password && user.password !== password) {
      return { error: 'Incorrect password. (Hint: demo accounts use "password123")' };
    }

    handleSwitchUser(user);
    apiClient.login({ usernameOrId, password }).catch(() => {});
    return { success: true, user };
  }, [registeredUsers, handleSwitchUser]);

  const handleRegisterUser = useCallback((newUserData) => {
    const updatedUsers = [...registeredUsers, newUserData];
    setRegisteredUsers(updatedUsers);

    try {
      localStorage.setItem(`wanderlust_itinerary_user_${newUserData.id}`, JSON.stringify([]));
    } catch (e) {}

    apiClient.register(newUserData).catch(() => {});
    handleSwitchUser(newUserData);
    showToast(`✨ Welcome to WanderLust, ${newUserData.name}! Passport ID: ${newUserData.passportId}`);
  }, [registeredUsers, handleSwitchUser, showToast]);

  const handleLogoutUser = useCallback(() => {
    handleSwitchUser(INITIAL_USER_ACCOUNTS[0]);
    showToast('Logged out of traveler account. Reverted to default explorer.');
  }, [handleSwitchUser, showToast]);

  const handleOpenAuthModal = useCallback((tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  // Global ESC key listener to dismiss open modals for keyboard a11y & responsive UX
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedDestination) setSelectedDestination(null);
        else if (isRouteModalOpen) setIsRouteModalOpen(false);
        else if (isCreateModalOpen) setIsCreateModalOpen(false);
        else if (isShareModalOpen) setIsShareModalOpen(false);
        else if (isBudgetModalOpen) setIsBudgetModalOpen(false);
        else if (isAIChatOpen) setIsAIChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDestination, isRouteModalOpen, isCreateModalOpen, isShareModalOpen, isBudgetModalOpen, isAIChatOpen]);

  // Open Social Share Modal with a specific mode ('itinerary' | 'destination' | 'profile')
  const handleOpenShareModal = useCallback((mode = 'itinerary') => {
    setShareModalMode(mode);
    setIsShareModalOpen(true);
  }, []);

  // Update user profile credentials
  const handleUpdateProfile = useCallback((updatedFields) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    showToast('✓ Profile credentials updated successfully!');
  }, [showToast]);

  // Follow or unfollow a community explorer or traveler
  const handleToggleFollow = useCallback((explorerId) => {
    setUserProfile((prev) => {
      const currentFollowing = prev.following || [];
      const isFollowing = currentFollowing.includes(explorerId);
      const nextFollowing = isFollowing
        ? currentFollowing.filter((id) => id !== explorerId)
        : [...currentFollowing, explorerId];
      
      const explorerObj = COMMUNITY_EXPLORERS.find(e => e.id === explorerId) ||
        (prev.followers || []).find(f => f.id === explorerId);
      const explorerName = explorerObj ? explorerObj.name : 'explorer';

      if (isFollowing) {
        showToast(`Unfollowed ${explorerName}.`);
      } else {
        showToast(`✨ You are now following ${explorerName}!`);
      }

      return {
        ...prev,
        following: nextFollowing,
      };
    });
  }, [showToast]);

  // Adopt a curated travel plan from a followed creator into the user's active itinerary
  const handleAdoptCreatorPlan = useCallback((plan) => {
    if (!plan || !plan.items || plan.items.length === 0) return;

    setMyItinerary((prev) => {
      const existingIds = new Set(prev.map((item) => item.destinationId || item.name));
      const newItems = plan.items.filter((item) => !existingIds.has(item.destinationId));

      if (newItems.length === 0) {
        showToast(`Destinations from "${plan.title}" are already in your travel itinerary!`);
        return prev;
      }

      showToast(`✨ Adopted "${plan.title}" by ${plan.creator}! Added ${newItems.length} destination(s) to your trip.`);
      return [...prev, ...newItems];
    });
  }, [showToast]);

  // Add a user-created location into state
  const handleCreateDestination = (newLocation) => {
    const formattedLocation = {
      ...newLocation,
      reviews: newLocation.reviews || []
    };
    setDestinations((prev) => [formattedLocation, ...prev]);
    showToast(`✨ "${newLocation.name}" has been created and added to destinations!`);
    setActiveNav('explore');
    setActiveTab('user-created');
  };

  // Handle adding a user review and star rating out of 5
  const handleAddReview = (destId, reviewData) => {
    setDestinations((prevDestinations) => {
      return prevDestinations.map((d) => {
        if (d.id === destId) {
          const existingReviews = d.reviews || [];
          const updatedReviews = [reviewData, ...existingReviews];

          // Recalculate average star rating
          const totalRatingPoints = updatedReviews.reduce((sum, r) => sum + Number(r.rating || 5), 0);
          const newAvgRating = parseFloat((totalRatingPoints / updatedReviews.length).toFixed(1));
          const newReviewCount = (d.reviewCount || existingReviews.length) + 1;

          const updatedDest = {
            ...d,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: newReviewCount
          };

          // Also update selectedDestination if currently open in modal
          if (selectedDestination && selectedDestination.id === destId) {
            setSelectedDestination(updatedDest);
          }

          return updatedDest;
        }
        return d;
      });
    });

    showToast(`⭐ Review posted by ${reviewData.author}! Rated ${reviewData.rating}/5 stars.`);
  };

  // Reset to default sample locations if needed
  const handleResetDestinations = () => {
    if (window.confirm('Reset all destinations back to original curated list? Any custom locations will be cleared.')) {
      setDestinations(INITIAL_DESTINATIONS);
      showToast('Destinations restored to default curated catalog.');
    }
  };

  // Add destination to itinerary with specific room configuration
  const handleAddToItinerary = (itineraryItem) => {
    const existingIndex = myItinerary.findIndex(
      (item) => item.destinationId === itineraryItem.destinationId
    );

    if (existingIndex > -1) {
      // Update existing
      const updated = [...myItinerary];
      updated[existingIndex] = itineraryItem;
      setMyItinerary(updated);
      showToast(`Updated "${itineraryItem.destinationName}" in your travel plan!`);
    } else {
      setMyItinerary([...myItinerary, itineraryItem]);
      showToast(`Added "${itineraryItem.destinationName}" (${itineraryItem.roomName}) to your plan!`);
    }
    setSelectedDestination(null);
  };

  // Quick one-click add to itinerary
  const handleQuickAdd = (dest) => {
    const isAdded = myItinerary.some((item) => item.destinationId === dest.id || item.name === dest.name);
    if (isAdded) {
      showToast(`"${dest.name}" is already in your itinerary. Click "Details" to adjust room & nights.`);
      return;
    }

    const defaultRoom = dest.hotelRooms?.[0];
    const defaultNights = 3;
    const roomPrice = defaultRoom?.pricePerNight || dest.price || 5000;

    const newItem = {
      destinationId: dest.id,
      destinationName: dest.name,
      region: dest.region,
      hotelName: dest.stayDetails?.hotelName || dest.hotel || 'Featured Stay',
      roomName: defaultRoom?.name || 'Deluxe Room',
      roomPrice: roomPrice,
      nights: defaultNights,
      totalPrice: roomPrice * defaultNights,
      image: dest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      guests: defaultRoom?.capacity || '2 Adults'
    };

    setMyItinerary([...myItinerary, newItem]);
    showToast(`✓ Added "${dest.name}" to your itinerary!`);
  };

  // Open AI Itinerary Architect & Destination Matcher
  const handleOpenAIPlanner = (dest = null, initialVibe = null) => {
    setAiAssistantInitialMode('architect');
    setAiAssistantPreselectedDest(dest);
    setAiAssistantInitialVibe(initialVibe);
    setIsAIChatOpen(true);
  };

  // Apply custom AI generated itinerary directly into trips portfolio
  const handleApplyCustomItinerary = (actionableItem) => {
    handleAddToItinerary(actionableItem);
    setActiveNav('trips');
    setActiveTab('itinerary');
    setIsAIChatOpen(false);
    showToast(`✨ Customized Itinerary for "${actionableItem.destinationName}" added to your Travel Plan!`);
  };

  // Remove from itinerary
  const handleRemoveFromItinerary = (index) => {
    const destName = myItinerary[index]?.destinationName || 'Destination';
    const updated = myItinerary.filter((_, i) => i !== index);
    setMyItinerary(updated);
    showToast(`Removed "${destName}" from your plan.`);
  };

  // Update nights in itinerary
  const handleUpdateNights = (index, newNights) => {
    const updated = [...myItinerary];
    const item = updated[index];
    item.nights = newNights;
    item.totalPrice = (item.roomPrice || item.price || 5000) * newNights;
    setMyItinerary(updated);
  };

  // Set of added destination identifiers for O(1) membership lookup
  const addedDestinationIds = useMemo(() => {
    const set = new Set();
    myItinerary.forEach((item) => {
      if (item.destinationId) set.add(item.destinationId);
      if (item.destinationName) set.add(item.destinationName);
    });
    return set;
  }, [myItinerary]);

  const handleSelectDestination = useCallback((dest) => {
    setSelectedDestination(dest);
  }, []);

  // Filter logic across search query, tab, category, and star rating
  const filteredDestinations = useMemo(() => {
    const q = destination.trim().toLowerCase();

    return destinations.filter((dest) => {
      // Search query filter (destination name or spots)
      const matchesQuery = !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.region?.toLowerCase().includes(q) ||
        dest.famousSpots?.some((s) => s.toLowerCase().includes(q)) ||
        dest.foodSpots?.some((f) => f.toLowerCase().includes(q)) ||
        dest.viewpoints?.some((v) => v.toLowerCase().includes(q));

      // Active tab filter
      let matchesTab = true;
      if (activeTab === 'trending') {
        matchesTab = Boolean(dest.isTrending);
      } else if (activeTab === 'user-created') {
        matchesTab = Boolean(dest.isUserCreated);
      }

      // Category filter
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;

      // Rating filter
      const matchesRating = minRating === 0 || (dest.rating >= minRating);

      return matchesQuery && matchesTab && matchesCategory && matchesRating;
    });
  }, [destinations, destination, activeTab, selectedCategory, minRating]);

  // Unique categories for filter pills
  const categories = useMemo(() => [
    'All',
    'Hill Station & Nature',
    'Heritage & Royal',
    'Tropical Island & Beach',
    'Cultural & Historic',
    'High Altitude & Adventure'
  ], []);

  // Counts for tabs
  const trendingCount = useMemo(() => destinations.filter((d) => d.isTrending).length, [destinations]);
  const userCreatedCount = useMemo(() => destinations.filter((d) => d.isUserCreated).length, [destinations]);

  // Calculate live trip budget
  const tripBudget = useMemo(() => calculateTripBudget(myItinerary, budgetConfig), [myItinerary, budgetConfig]);

  return (
    <div className="travel-app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Futuristic Navigation Bar Dock */}
      <FuturisticNavBar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        itineraryCount={myItinerary.length}
        grandTotalBudget={tripBudget.grandTotal}
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        onOpenShareModal={() => handleOpenShareModal('itinerary')}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenRoutePlanner={() => setIsRouteModalOpen(true)}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        onOpenAuthModal={handleOpenAuthModal}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogoutUser}
      />

      {/* Main Container */}
      <main className="main-content-layout">
        {/* VIEW 1: HOME NEXUS */}
        {activeNav === 'home' && (
          <HomeView
            destinations={destinations}
            myItinerary={myItinerary}
            userProfile={userProfile}
            onNavigate={handleNavChange}
            onSelectDestination={handleSelectDestination}
            onQuickAdd={handleQuickAdd}
            onOpenAIChat={() => setIsAIChatOpen(true)}
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onOpenRoutePlanner={() => setIsRouteModalOpen(true)}
            onOpenAIPlanner={handleOpenAIPlanner}
            onAdoptCreatorPlan={handleAdoptCreatorPlan}
            onToggleFollow={handleToggleFollow}
            showToast={showToast}
          />
        )}

        {/* VIEW 2: PROFILE PASSPORT & COMMUNITY FOLLOWER NETWORK */}
        {activeNav === 'profile' && (
          <ProfileView
            myItinerary={myItinerary}
            grandTotalBudget={tripBudget.grandTotal}
            destinations={destinations}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onToggleFollow={handleToggleFollow}
            onOpenShareProfile={() => handleOpenShareModal('profile')}
            onNavigate={handleNavChange}
            onOpenAIChat={() => setIsAIChatOpen(true)}
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onSelectDestination={handleSelectDestination}
            onQuickAdd={handleQuickAdd}
            showToast={showToast}
            onOpenAuthModal={handleOpenAuthModal}
          />
        )}

        {/* VIEW 3: TRIPS & ITINERARY */}
        {activeNav === 'trips' && (
          <section className="itinerary-section">
            <ItineraryView
              itinerary={myItinerary}
              onRemoveItem={handleRemoveFromItinerary}
              onUpdateNights={handleUpdateNights}
              onExploreMore={() => handleNavChange('explore')}
              onOpenShareModal={() => handleOpenShareModal('itinerary')}
              budgetConfig={budgetConfig}
              onUpdateBudgetConfig={setBudgetConfig}
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
              onOpenRoutePlanner={() => setIsRouteModalOpen(true)}
              onOpenAIPlanner={handleOpenAIPlanner}
            />
          </section>
        )}

        {/* VIEW 4: EXPLORE DESTINATION CATALOG */}
        {activeNav === 'explore' && (
          <>
            {/* Navigation Tabs inside Explore */}
            <div className="tab-navigation-bar">
              <div className="primary-tabs">
                <button
                  className={`nav-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
                  onClick={() => setActiveTab('explore')}
                >
                  🌍 Explore All ({destinations.length})
                </button>

                <button
                  className={`nav-tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
                  onClick={() => setActiveTab('trending')}
                >
                  🔥 Trending Places ({trendingCount})
                </button>

                <button
                  className={`nav-tab-btn ${activeTab === 'user-created' ? 'active' : ''}`}
                  onClick={() => setActiveTab('user-created')}
                >
                  ✨ User Created ({userCreatedCount})
                </button>

                <button
                  className={`nav-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                  onClick={() => handleNavChange('trips')}
                >
                  💼 My Itinerary Portfolio ({myItinerary.length})
                </button>
              </div>

              {activeTab !== 'itinerary' && (
                <div className="reset-bar">
                  <button
                    className="btn-text-subtle"
                    onClick={handleResetDestinations}
                    title="Reset sample destinations back to initial seed data"
                  >
                    Reset Initial Data
                  </button>
                </div>
              )}
            </div>

            {/* Origin-Destination Trip Advisor Banner */}
            {origin && activeTab !== 'itinerary' && (
              <div className="origin-route-banner">
                <span className="route-banner-icon">🚀</span>
                <div className="route-banner-text">
                  <strong>Planning your trip from {origin}:</strong>
                  <span>
                    {destination
                      ? ` Discovering routes and accommodations for ${destination}. Check travel transit features in destination cards below!`
                      : ` Browse top curated spots, star ratings, and luxury hotel rooms below to build your itinerary from ${origin}.`}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-plan-route-banner"
                  onClick={() => setIsRouteModalOpen(true)}
                  title="Plan multi-modal route (Walking, Car, Public Transport)"
                >
                  🗺️ Plan Route (Walk • Car • Transit)
                </button>
                <button className="banner-dismiss-btn" onClick={() => setOrigin('')}>✕</button>
              </div>
            )}

            {/* Render Itinerary or Explore Catalog based on sub-tab */}
            {activeTab === 'itinerary' ? (
              <section className="itinerary-section">
                <ItineraryView
                  itinerary={myItinerary}
                  onRemoveItem={handleRemoveFromItinerary}
                  onUpdateNights={handleUpdateNights}
                  onExploreMore={() => setActiveTab('explore')}
                  onOpenShareModal={() => setIsShareModalOpen(true)}
                  budgetConfig={budgetConfig}
                  onUpdateBudgetConfig={setBudgetConfig}
                  onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
                  onOpenRoutePlanner={() => setIsRouteModalOpen(true)}
                  onOpenAIPlanner={handleOpenAIPlanner}
                />
              </section>
            ) : (
              <section className="explore-section">
                {/* Filter Controls Bar */}
                <div className="filters-control-bar">
                  {/* Category Pills */}
                  <div className="category-pills-list">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Star Rating Filter */}
                  <div className="rating-filter-group">
                    <label>Filter Rating:</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="rating-select"
                    >
                      <option value={0}>All Star Ratings</option>
                      <option value={4.7}>★ 4.7 & Above</option>
                      <option value={4.8}>★ 4.8 & Above</option>
                      <option value={4.9}>★ 4.9 Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Results Header Info */}
                <div className="results-meta-header">
                  <div className="results-count-title">
                    <h2>
                      {activeTab === 'trending' && '🔥 Trending Destinations'}
                      {activeTab === 'user-created' && '✨ Community & User-Created Locations'}
                      {activeTab === 'explore' && 'Curated World-Class Destinations'}
                    </h2>
                    <p className="results-subtitle">
                      Showing {filteredDestinations.length} destination{filteredDestinations.length === 1 ? '' : 's'} with star ratings, image galleries, famous spots, food spots, viewpoints, and hotel rooms.
                    </p>
                  </div>

                  {destination && (
                    <div className="active-search-chip">
                      <span>Searching: <b>"{destination}"</b></span>
                      <button onClick={() => setDestination('')}>✕</button>
                    </div>
                  )}
                </div>

                {/* Destination Grid */}
                {filteredDestinations.length === 0 ? (
                  <div className="no-results-card">
                    <div className="no-results-icon">🔍</div>
                    <h3>No destinations matched your criteria</h3>
                    <p>Try clearing your search query or selecting a different category filter.</p>
                    <div className="no-results-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          setDestination('');
                          setSelectedCategory('All');
                          setMinRating(0);
                        }}
                      >
                        Clear All Filters
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => setIsCreateModalOpen(true)}
                      >
                        + Create This Location
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="destination-grid">
                    {filteredDestinations.map((dest) => {
                      const isAdded = addedDestinationIds.has(dest.id) || addedDestinationIds.has(dest.name);

                      return (
                        <DestinationCard
                          key={dest.id}
                          destination={dest}
                          onSelect={handleSelectDestination}
                          onQuickAdd={handleQuickAdd}
                          isAdded={isAdded}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>

      {/* Detailed Destination View Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onAddToItinerary={handleAddToItinerary}
          onAddReview={handleAddReview}
          isAlreadyAdded={myItinerary.some((item) => item.destinationId === selectedDestination.id)}
          itinerary={myItinerary}
          origin={origin}
          onOpenRoutePlanner={() => {
            setDestination(selectedDestination.name);
            setIsRouteModalOpen(true);
          }}
        />
      )}

      {/* Multi-Modal Route Planning Modal (Walking, Car, Public Transport) */}
      {isRouteModalOpen && (
        <RoutePlannerModal
          isOpen={isRouteModalOpen}
          onClose={() => setIsRouteModalOpen(false)}
          startLocation={origin || 'Calicut'}
          setStartLocation={setOrigin}
          destination={destination || (selectedDestination ? selectedDestination.name : destinations[0]?.name) || 'Munnar'}
          setDestination={setDestination}
          destinations={destinations}
          onAddToItinerary={handleQuickAdd}
          onAddStayToItinerary={handleAddToItinerary}
          onOpenAIChat={() => setIsAIChatOpen(true)}
        />
      )}

      {/* Create Location Modal */}
      {isCreateModalOpen && (
        <CreateLocationModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateDestination}
        />
      )}

      {/* Itinerary & Profile Social Media Sharing Modal */}
      {isShareModalOpen && (
        <ShareItineraryModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          itinerary={myItinerary}
          userProfile={userProfile}
          initialShareMode={shareModalMode}
        />
      )}

      {/* Trip Budget Calculator Modal */}
      {isBudgetModalOpen && (
        <BudgetCalculatorModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          itinerary={myItinerary}
          budgetConfig={budgetConfig}
          onUpdateBudgetConfig={setBudgetConfig}
          onNavigateToItinerary={() => setActiveTab('itinerary')}
        />
      )}

      {/* Global A.I. Assistant Chat Interface */}
      {isAIChatOpen && (
        <AIAssistantChat
          isOpen={isAIChatOpen}
          onClose={() => {
            setIsAIChatOpen(false);
            setAiAssistantInitialMode('chat');
            setAiAssistantPreselectedDest(null);
            setAiAssistantInitialVibe(null);
          }}
          destinations={destinations}
          itinerary={myItinerary}
          initialMode={aiAssistantInitialMode}
          initialDestination={aiAssistantPreselectedDest}
          initialVibe={aiAssistantInitialVibe}
          onSelectDestination={(dest) => {
            setSelectedDestination(dest);
            setIsAIChatOpen(false);
          }}
          onAddToItinerary={handleAddToItinerary}
          onApplyCustomItinerary={handleApplyCustomItinerary}
          onNavigateTab={(tabName) => {
            if (tabName === 'itinerary') {
              setActiveNav('trips');
              setActiveTab('itinerary');
            } else {
              setActiveNav('explore');
              setActiveTab(tabName);
            }
            setIsAIChatOpen(false);
          }}
        />
      )}

      {/* Floating A.I. Assistant Launcher Button */}
      {!isAIChatOpen && (
        <button
          type="button"
          className="floating-ai-launcher"
          onClick={() => setIsAIChatOpen(true)}
          title="Chat with WanderBot AI Concierge"
        >
          <div className="launcher-sparkle">✦</div>
          <div className="launcher-text">
            <strong>Ask AI</strong>
            <span>Concierge</span>
          </div>
          <span className="launcher-pulse"></span>
        </button>
      )}

      {/* Traveler Authentication & Account Management Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        registeredUsers={registeredUsers}
        onLogin={handleLoginUser}
        onRegister={handleRegisterUser}
        onSwitchUser={handleSwitchUser}
        initialTab={authModalTab}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 WanderLust Travel Explorer • Complete Destination Details, Stays & Itinerary Planner</p>
          <div className="footer-links">
            <span>⭐ Verified Star Ratings</span>
            <span>•</span>
            <span>🏨 Luxury Hotel Rooms</span>
            <span>•</span>
            <span>🏛️ Famous & Food Spots</span>
            <span>•</span>
            <span>🌅 Scenic Viewpoints</span>
          </div>
        </div>
      </footer>
    </div>
  );
}