import React, { useState, useMemo, useEffect, useCallback } from 'react';

/**
 * Curated Story Highlights from Followed Creators & Users
 */
export const STORY_HIGHLIGHTS_DATA = [
  {
    id: 'story-1',
    creatorId: 'user-sameer',
    creatorName: 'Dr. Sameer Siddiqui',
    creatorHandle: '@sameer_peaks',
    creatorAvatar: 'SS',
    destinationId: 'zanskar-valley-ladakh',
    destinationName: 'Zanskar Valley, Ladakh',
    seasonTag: '❄️ Sub-zero Chadar Trek',
    caption: 'Frozen river Chadar trail at -14°C! The gorge ice is pristine today. Ancient Himalayan passes never fail to inspire awe.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '2h ago',
    likesCount: 524,
    viewsCount: '1.8k'
  },
  {
    id: 'story-2',
    creatorId: 'user-elena',
    creatorName: 'Elena Rostova',
    creatorHandle: '@elena_wanderer',
    creatorAvatar: 'ER',
    destinationId: 'jaipur-rajasthan',
    destinationName: 'Amer Fort, Jaipur',
    seasonTag: '🏰 Royal Winter Golden Hour',
    caption: 'Sunset tea from the ramparts of Amer Fort. Winter evenings in Rajasthan with crisp desert breezes are pure magic.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '4h ago',
    likesCount: 842,
    viewsCount: '3.1k'
  },
  {
    id: 'story-3',
    creatorId: 'user-kenji',
    creatorName: 'Kenji Sato',
    creatorHandle: '@kenji_routes',
    creatorAvatar: 'KS',
    destinationId: 'munnar-kerala',
    destinationName: 'Top Station, Munnar',
    seasonTag: '☕ Mountain Mist & Campfire',
    caption: 'Early morning cloud beds rolling over Top Station! 11°C with fresh cardamom and hot local filter coffee. Road-tripper heaven.',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '6h ago',
    likesCount: 618,
    viewsCount: '2.4k'
  },
  {
    id: 'story-4',
    creatorId: 'user-chloe',
    creatorName: 'Chloe Dupont',
    creatorHandle: '@chloe_ecolife',
    creatorAvatar: 'CD',
    destinationId: 'maldives-atoll',
    destinationName: 'Baa Atoll, Maldives',
    seasonTag: '🌴 Warm Winter Lagoon',
    caption: 'Escaped the freeze to calm 28°C turquoise lagoons. Zero single-use plastics and solar-powered overwater villas.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '8h ago',
    likesCount: 1104,
    viewsCount: '4.5k'
  },
  {
    id: 'story-5',
    creatorId: 'user-nikhil',
    creatorName: 'Nikhil Varma',
    creatorHandle: '@nikhil_nomad',
    creatorAvatar: 'NV',
    destinationId: 'hyderabad-india',
    destinationName: 'Taj Falaknuma Palace',
    seasonTag: '👑 Nizam Winter Gala',
    caption: 'Evening qawwali music echoing through the palace courtyard. The grand 101-seater dining hall is illuminated for winter banquet.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '11h ago',
    likesCount: 476,
    viewsCount: '1.9k'
  },
  {
    id: 'story-6',
    creatorId: 'user-maya',
    creatorName: 'Maya Lin',
    creatorHandle: '@maya_culinary',
    creatorAvatar: 'ML',
    destinationId: 'kyoto-japan',
    destinationName: 'Gion District, Kyoto',
    seasonTag: '🏮 Winter Lantern Walk',
    caption: 'Steaming seasonal yudofu hotpot and roasted green tea while light flurries dust the wooden machiya roofs.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '14h ago',
    likesCount: 923,
    viewsCount: '3.7k'
  },
  {
    id: 'story-7',
    creatorId: 'f-1',
    creatorName: 'Kabir Mehta',
    creatorHandle: '@kabir_trails',
    creatorAvatar: 'KM',
    destinationId: 'munnar-kerala',
    destinationName: 'Anamudi Peak Trail',
    seasonTag: '🏔️ High Peak Frost',
    caption: 'Summiting the highest peak in South India in crisp winter morning light. Nilgiri Tahr herds grazing right along the edge.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    timeAgo: '18h ago',
    likesCount: 389,
    viewsCount: '1.5k'
  }
];

/**
 * Curated Itinerary Plans Handcrafted by Followed Creators
 */
export const CREATOR_TRAVEL_PLANS = [
  {
    id: 'plan-winter-mist',
    creatorId: 'user-sameer',
    creator: 'Dr. Sameer Siddiqui',
    creatorHandle: '@sameer_peaks',
    creatorAvatar: 'SS',
    creatorRole: 'Western Ghats Specialist & Glaciologist',
    title: '4-Day Western Ghats Winter Mist & Peak Expedition',
    tagline: 'High-altitude cloud valleys, sunrise peaks & tea estate heritage',
    seasonBadge: '❄️ Winter Chill & Mist',
    duration: '4 Days / 3 Nights',
    estimatedBudget: 18500,
    destinationsCovered: ['Munnar', 'Top Station', 'Eravikulam'],
    routeHighlights: ['Kochi ➔ Lockhart Gap ➔ Top Station Panorama ➔ Anamudi'],
    primaryDestinationId: 'munnar-kerala',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    tags: ['Mist & Frost', 'Heritage Eco-Stay', 'Trek & Viewpoints'],
    items: [
      {
        destinationId: 'munnar-kerala',
        destinationName: 'Munnar',
        region: 'Kerala, India',
        hotelName: 'Tea County Heritage Resort & Spa',
        roomName: 'Deluxe Valley View Room',
        roomPrice: 5200,
        nights: 3,
        activitiesCount: 4
      }
    ]
  },
  {
    id: 'plan-royal-palace',
    creatorId: 'user-elena',
    creator: 'Elena Rostova',
    creatorHandle: '@elena_wanderer',
    creatorAvatar: 'ER',
    creatorRole: 'Coastal & Heritage Architecture Connoisseur',
    title: '3-Day Royal Winter Palaces & Golden Courtyards',
    tagline: 'Mughal ramparts, golden sunsets & candlelit heritage courtyards',
    seasonBadge: '🏰 Golden Winter Season',
    duration: '3 Days / 2 Nights',
    estimatedBudget: 24000,
    destinationsCovered: ['Jaipur', 'Amer Fort', 'Jal Mahal'],
    routeHighlights: ['Delhi ➔ Amer Fort ➔ Nahargarh Sunset ➔ Hawa Mahal'],
    primaryDestinationId: 'jaipur-rajasthan',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tags: ['Royal Palaces', 'Fine Dining', 'Stepwells & Forts'],
    items: [
      {
        destinationId: 'jaipur-rajasthan',
        destinationName: 'Jaipur',
        region: 'Rajasthan, India',
        hotelName: 'The Raj Palace Grand Heritage',
        roomName: 'Heritage Suite',
        roomPrice: 9500,
        nights: 2,
        activitiesCount: 5
      }
    ]
  },
  {
    id: 'plan-frozen-pass',
    creatorId: 'user-kenji',
    creator: 'Kenji Sato',
    creatorHandle: '@kenji_routes',
    creatorAvatar: 'KS',
    creatorRole: 'Multi-Modal Transit & Mountain Scout',
    title: '5-Day High-Altitude Frozen Chadar & Monastery Trail',
    tagline: 'Extreme winter photography, frozen canyons & silent monasteries',
    seasonBadge: '❄️ Sub-Zero Snow Wonder',
    duration: '5 Days / 4 Nights',
    estimatedBudget: 32000,
    destinationsCovered: ['Zanskar Valley', 'Padum', 'Karsha'],
    routeHighlights: ['Leh ➔ Shingo La ➔ Padum ➔ Karsha Monastery'],
    primaryDestinationId: 'zanskar-valley-ladakh',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['Snow Expedition', 'Sub-Zero Chadar', 'Glacier Stays'],
    items: [
      {
        destinationId: 'zanskar-valley-ladakh',
        destinationName: 'Zanskar Valley',
        region: 'Ladakh, India',
        hotelName: 'Zanskar Alpine Glacier Lodge',
        roomName: 'Heated Panorama Chalet',
        roomPrice: 6500,
        nights: 4,
        activitiesCount: 4
      }
    ]
  },
  {
    id: 'plan-warm-winter-beach',
    creatorId: 'user-chloe',
    creator: 'Chloe Dupont',
    creatorHandle: '@chloe_ecolife',
    creatorAvatar: 'CD',
    creatorRole: 'Sustainable Eco-Resort & Marine Curator',
    title: '4-Day Warm Winter Overwater Coral Sanctuary',
    tagline: 'Zero-carbon luxury villas, private reefs & tropical winter sun',
    seasonBadge: '🌴 Warm Winter Sun',
    duration: '4 Days / 3 Nights',
    estimatedBudget: 42000,
    destinationsCovered: ['Maldives', 'Baa Atoll', 'Hanifaru Bay'],
    routeHighlights: ['Malé Seaplane ➔ Overwater Villa ➔ Coral Reef Safari'],
    primaryDestinationId: 'maldives-atoll',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    tags: ['Warm Winter', 'Overwater Villa', 'Manta Snorkel'],
    items: [
      {
        destinationId: 'maldives-atoll',
        destinationName: 'Maldives',
        region: 'Baa Atoll',
        hotelName: 'Soneva Jani Eco Overwater Resort',
        roomName: 'Water Villa with Private Pool',
        roomPrice: 14000,
        nights: 3,
        activitiesCount: 3
      }
    ]
  }
];

/**
 * Seasonal Winter Destinations Metadata Enricher
 */
const WINTER_DESTINATION_HIGHLIGHTS = {
  'munnar-kerala': {
    badge: '❄️ Crisp Mountain Chill',
    tempRange: '10°C - 18°C • Mist & Campfires',
    winterFeature: 'Peak winter mist blankets Top Station with blooming Neelakurinji slopes & warm tea lounges.'
  },
  'zanskar-valley-ladakh': {
    badge: '❄️ Frozen Chadar & Snow Peaks',
    tempRange: '-18°C - -4°C • Glacial Wonder',
    winterFeature: 'Legendary frozen river trek across frozen gorges with pristine clear night skies.'
  },
  'jaipur-rajasthan': {
    badge: '🏰 Royal Golden Sun & Breezy Nights',
    tempRange: '12°C - 24°C • Pleasant Season',
    winterFeature: 'Golden winter sunshine across Amer Fort ramparts followed by evening royal courtyard dining.'
  },
  'hyderabad-india': {
    badge: '🍲 Winter Nizam Feasts',
    tempRange: '16°C - 28°C • Mild & Dry',
    winterFeature: 'Perfect dry winter evenings for historic Golkonda night walks and fragrant royal biryani trails.'
  },
  'maldives-atoll': {
    badge: '🌴 Warm Winter Escape',
    tempRange: '26°C - 30°C • Turquoise Seas',
    winterFeature: 'Calm dry northeast monsoon seas ideal for manta ray encounters and sunset overwater dining.'
  },
  'kyoto-japan': {
    badge: '🏮 Winter Lanterns & Temples',
    tempRange: '2°C - 9°C • Crisp & Serene',
    winterFeature: 'Quiet winter temple gardens dusted with snow, steaming onsen baths, and illuminated bamboo paths.'
  },
  'santorini-greece': {
    badge: '🌅 Peaceful Off-Season Coast',
    tempRange: '11°C - 16°C • Tranquil Cliffs',
    winterFeature: 'Quiet caldera views without the summer crowds, cozy wine tavernas, and dramatic sunsets.'
  }
};

/**
 * HomeView Component - Redesigned Sleek & User-Friendly Travel Hub
 * Features:
 * 1. Top Instagram-style Story Highlights from followed creators
 * 2. Interactive Story Highlights Player Modal
 * 3. Compact, futuristic Hero Banner with telemetry pods
 * 4. Travel Command Modules
 * 5. Dedicated Seasonal Winter & Trending Horizons section
 * 6. Dedicated Popular Travel Plans from Followed Creators with 1-click trip adoption
 * 7. AI Travel Architect banner
 * 8. Refined About Section detailing platform vision & architecture
 * 9. Community contribution banner
 */
export default function HomeView({
  destinations = [],
  myItinerary = [],
  userProfile = {},
  onNavigate,
  onSelectDestination,
  onQuickAdd,
  onOpenAIChat,
  onOpenBudgetModal,
  onOpenCreateModal,
  onOpenRoutePlanner,
  onOpenAIPlanner,
  onAdoptCreatorPlan,
  onToggleFollow,
  showToast
}) {
  // State for active story in the Instagram-style story player
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [storyLiked, setStoryLiked] = useState({});
  const [viewedStories, setViewedStories] = useState(() => new Set());
  const [isAddStoryOpen, setIsAddStoryOpen] = useState(false);
  const [customStoryCaption, setCustomStoryCaption] = useState('');
  const [customStoryLocation, setCustomStoryLocation] = useState('');
  const [userStories, setUserStories] = useState([]);

  // Filter for Trending / Winter Horizons tab
  const [trendingSeasonFilter, setTrendingSeasonFilter] = useState('all'); // 'all' | 'winter' | 'warm' | 'royal'

  // Filter for Followed Creator Plans
  const [selectedCreatorFilter, setSelectedCreatorFilter] = useState('all'); // 'all' | 'user-sameer' | 'user-elena' | etc.

  // Combined stories: custom user stories + followed creator stories
  const allStories = useMemo(() => {
    return [...userStories, ...STORY_HIGHLIGHTS_DATA];
  }, [userStories]);

  // Active story object
  const currentStory = activeStoryIndex !== null ? allStories[activeStoryIndex] : null;

  // Open story handler
  const handleOpenStory = (index) => {
    setActiveStoryIndex(index);
    setViewedStories((prev) => {
      const next = new Set(prev);
      next.add(allStories[index]?.id);
      return next;
    });
  };

  // Close story handler
  const handleCloseStory = useCallback(() => {
    setActiveStoryIndex(null);
  }, []);

  // Navigate story next/prev
  const handleNextStory = useCallback(() => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex < allStories.length - 1) {
      handleOpenStory(activeStoryIndex + 1);
    } else {
      handleCloseStory();
    }
  }, [activeStoryIndex, allStories.length, handleCloseStory]);

  const handlePrevStory = useCallback(() => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex > 0) {
      handleOpenStory(activeStoryIndex - 1);
    }
  }, [activeStoryIndex]);

  // Story keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    if (activeStoryIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNextStory();
      else if (e.key === 'ArrowLeft') handlePrevStory();
      else if (e.key === 'Escape') handleCloseStory();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex, handleNextStory, handlePrevStory, handleCloseStory]);

  // Toggle like for active story
  const handleToggleStoryLike = (storyId) => {
    setStoryLiked((prev) => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
    if (showToast) {
      showToast(storyLiked[storyId] ? 'Removed like' : '❤️ Liked traveler story!');
    }
  };

  // User adds their own story moment
  const handleCreateUserStory = (e) => {
    e.preventDefault();
    if (!customStoryCaption.trim()) return;

    const newStory = {
      id: `user-story-${Date.now()}`,
      creatorId: 'current-user',
      creatorName: userProfile.name || 'Aysha Rayan',
      creatorHandle: userProfile.handle || '@aysha_voyager',
      creatorAvatar: userProfile.avatar || 'AR',
      destinationId: 'user-dest',
      destinationName: customStoryLocation || 'Scenic Horizons',
      seasonTag: '✨ My Live Highlight',
      caption: customStoryCaption,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
      timeAgo: 'Just now',
      likesCount: 1,
      viewsCount: '1'
    };

    setUserStories((prev) => [newStory, ...prev]);
    setCustomStoryCaption('');
    setCustomStoryLocation('');
    setIsAddStoryOpen(false);
    if (showToast) {
      showToast('✨ Story published! Visible to your explorer community.');
    }
  };

  // Filtered seasonal destinations
  const filteredSeasonalDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      if (trendingSeasonFilter === 'all') return true;
      if (trendingSeasonFilter === 'winter') {
        return (
          dest.id === 'zanskar-valley-ladakh' ||
          dest.id === 'munnar-kerala' ||
          dest.id === 'kyoto-japan' ||
          dest.category?.toLowerCase().includes('hill') ||
          dest.category?.toLowerCase().includes('high altitude')
        );
      }
      if (trendingSeasonFilter === 'warm') {
        return (
          dest.id === 'maldives-atoll' ||
          dest.id === 'santorini-greece' ||
          dest.category?.toLowerCase().includes('beach') ||
          dest.category?.toLowerCase().includes('coastal')
        );
      }
      if (trendingSeasonFilter === 'royal') {
        return (
          dest.id === 'jaipur-rajasthan' ||
          dest.id === 'hyderabad-india' ||
          dest.category?.toLowerCase().includes('heritage') ||
          dest.category?.toLowerCase().includes('royal')
        );
      }
      return true;
    });
  }, [destinations, trendingSeasonFilter]);

  // Filtered creator plans
  const filteredCreatorPlans = useMemo(() => {
    if (selectedCreatorFilter === 'all') return CREATOR_TRAVEL_PLANS;
    return CREATOR_TRAVEL_PLANS.filter((p) => p.creatorId === selectedCreatorFilter);
  }, [selectedCreatorFilter]);

  // Handle plan adoption
  const handleAdoptPlan = (plan) => {
    if (onAdoptCreatorPlan) {
      onAdoptCreatorPlan(plan);
    } else {
      // Fallback
      plan.items.forEach((item) => {
        const dest = destinations.find((d) => d.id === item.destinationId) || {
          id: item.destinationId,
          name: item.destinationName,
          region: item.region,
          price: item.roomPrice
        };
        onQuickAdd(dest);
      });
      if (showToast) {
        showToast(`✨ Adopted "${plan.title}" by ${plan.creator}!`);
      }
    }
  };

  return (
    <div className="home-view-container" id="home-view">
      {/* =========================================================================
          SECTION 1: INSTAGRAM-STYLE STORY HIGHLIGHTS BAR
          ========================================================================= */}
      <section className="story-highlights-section" aria-label="Explorer Story Highlights">
        <div className="story-highlights-header">
          <div className="story-title-row">
            <span className="story-radar-dot" aria-hidden="true" />
            <span className="story-section-title">Traveler Stories</span>
            <span className="story-count-badge">{allStories.length} active</span>
          </div>
          <span className="story-hint-text">Tap circle to view live moments</span>
        </div>

        <div className="story-carousel-track">
          {/* Add Your Story Item */}
          <div
            className="story-circle-item user-add-story"
            onClick={() => setIsAddStoryOpen(true)}
            role="button"
            tabIndex={0}
            title="Share a new story moment"
          >
            <div className="story-avatar-ring add-ring">
              <div className="story-avatar-inner user-avatar">
                <span>{userProfile.avatar || 'AR'}</span>
                <span className="story-add-badge">+</span>
              </div>
            </div>
            <span className="story-username">Your Story</span>
          </div>

          {/* Followed Creators Stories */}
          {allStories.map((story, idx) => {
            const hasViewed = viewedStories.has(story.id);
            return (
              <div
                key={story.id}
                className={`story-circle-item ${hasViewed ? 'viewed' : 'unread'}`}
                onClick={() => handleOpenStory(idx)}
                role="button"
                tabIndex={0}
                title={`View story by ${story.creatorName}`}
              >
                <div className={`story-avatar-ring ${hasViewed ? 'seen' : 'glow'}`}>
                  <div className="story-avatar-inner">
                    <img
                      src={story.image}
                      alt={story.creatorName}
                      className="story-thumb-img"
                    />
                    <span className="story-creator-tag">{story.creatorAvatar}</span>
                  </div>
                </div>
                <span className="story-username">
                  {story.creatorName.split(' ')[0]}
                </span>
                <span className="story-dest-micro">
                  {story.destinationName.split(',')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE STORY VIEWER MODAL (INSTAGRAM-STYLE LIGHTBOX)
          ========================================================================= */}
      {currentStory && (
        <div className="story-modal-overlay" onClick={handleCloseStory}>
          <div
            className="story-viewer-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Story Top Progress Indicator Bar */}
            <div className="story-progress-bar-container">
              <div className="story-progress-bar-fill" />
            </div>

            {/* Story Header */}
            <div className="story-viewer-header">
              <div className="story-author-info">
                <div className="story-header-avatar">{currentStory.creatorAvatar}</div>
                <div className="story-author-names">
                  <div className="story-author-row">
                    <strong>{currentStory.creatorName}</strong>
                    <span className="story-author-handle">{currentStory.creatorHandle}</span>
                  </div>
                  <div className="story-meta-row">
                    <span className="story-location-pill">📍 {currentStory.destinationName}</span>
                    <span className="story-time-ago">• {currentStory.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="story-header-actions">
                <button
                  className="story-close-btn"
                  onClick={handleCloseStory}
                  title="Close story (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Story Visual Media Canvas */}
            <div className="story-media-stage">
              <img
                src={currentStory.image}
                alt={currentStory.caption}
                className="story-media-image"
              />
              <div className="story-vignette-overlay" />

              {/* Season Highlight Badge */}
              <div className="story-season-badge">
                {currentStory.seasonTag}
              </div>

              {/* Story Navigation Tap Targets */}
              <button
                className="story-nav-btn prev"
                onClick={handlePrevStory}
                disabled={activeStoryIndex === 0}
                title="Previous story"
              >
                ‹
              </button>
              <button
                className="story-nav-btn next"
                onClick={handleNextStory}
                title="Next story"
              >
                ›
              </button>
            </div>

            {/* Story Caption & Interactivity Footer */}
            <div className="story-viewer-footer">
              <p className="story-caption-text">{currentStory.caption}</p>

              <div className="story-action-bar">
                <div className="story-social-toggles">
                  <button
                    className={`btn-story-like ${storyLiked[currentStory.id] ? 'liked' : ''}`}
                    onClick={() => handleToggleStoryLike(currentStory.id)}
                  >
                    {storyLiked[currentStory.id] ? '❤️' : '🤍'}{' '}
                    <span>
                      {(currentStory.likesCount || 0) + (storyLiked[currentStory.id] ? 1 : 0)}
                    </span>
                  </button>
                  <span className="story-views-tag">👁️ {currentStory.viewsCount} views</span>
                </div>

                <div className="story-trip-ctas">
                  {currentStory.destinationId && currentStory.destinationId !== 'user-dest' && (
                    <button
                      className="btn-story-explore"
                      onClick={() => {
                        const matched = destinations.find(
                          (d) => d.id === currentStory.destinationId
                        );
                        if (matched) {
                          handleCloseStory();
                          onSelectDestination(matched);
                        } else {
                          onNavigate('explore');
                        }
                      }}
                    >
                      🧭 Explore Destination
                    </button>
                  )}

                  {currentStory.destinationId && currentStory.destinationId !== 'user-dest' && (
                    <button
                      className="btn-story-quick-add"
                      onClick={() => {
                        const matched = destinations.find(
                          (d) => d.id === currentStory.destinationId
                        );
                        if (matched) {
                          onQuickAdd(matched);
                          if (showToast) {
                            showToast(`Added ${matched.name} to your trips from Story!`);
                          }
                        }
                      }}
                    >
                      + Add to Trip
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD USER STORY MODAL
          ========================================================================= */}
      {isAddStoryOpen && (
        <div className="add-story-modal-overlay" onClick={() => setIsAddStoryOpen(false)}>
          <div
            className="add-story-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="add-story-header">
              <h3>Share Travel Story Highlight</h3>
              <button
                className="add-story-close"
                onClick={() => setIsAddStoryOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateUserStory}>
              <div className="story-input-group">
                <label>Location / Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Manali Snow Valley, Varkala Cliff..."
                  value={customStoryLocation}
                  onChange={(e) => setCustomStoryLocation(e.target.value)}
                  required
                />
              </div>

              <div className="story-input-group">
                <label>Moment Caption</label>
                <textarea
                  rows={3}
                  placeholder="What's happening right now? (e.g. Fresh snow flurries over the pass, cozy fireplace evening...)"
                  value={customStoryCaption}
                  onChange={(e) => setCustomStoryCaption(e.target.value)}
                  required
                />
              </div>

              <div className="add-story-footer">
                <button
                  type="button"
                  className="btn-story-cancel"
                  onClick={() => setIsAddStoryOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-story-submit">
                  ✨ Publish Story Moment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: FUTURISTIC HERO BANNER (COMPACT & SLEEK)
          ========================================================================= */}
      <section className="futuristic-hero-section">
        <div className="hero-cyber-grid" aria-hidden="true" />
        <div className="hero-radial-beam" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="badge-pulse-dot" />
            <span className="badge-text">QUANTUM TRAVEL ARCHITECTURE • AI POWERED</span>
          </div>

          <h1 className="hero-headline">
            Journey into the <span className="gradient-highlight">Future of Travel</span>
          </h1>

          <p className="hero-description">
            Experience next-level exploration. Discover world-class destinations with live star ratings,
            itemized accommodation budgets, curated culinary scenes, scenic viewpoints, and autonomous A.I. itinerary planning.
          </p>

          <div className="hero-cta-group">
            <button
              className="hero-primary-btn"
              onClick={() => onNavigate('explore')}
              id="hero-explore-btn"
            >
              <span className="btn-icon">🧭</span> Explore All Destinations
            </button>

            <button
              className="hero-ai-btn"
              onClick={onOpenAIChat}
              id="hero-ai-btn"
            >
              <span className="btn-icon">✦</span> Launch WanderBot AI
            </button>

            <button
              className="hero-trips-btn"
              onClick={() => onNavigate('trips')}
              id="hero-trips-btn"
            >
              <span className="btn-icon">🎒</span> View My Trips ({myItinerary.length})
            </button>
          </div>

          {/* Futuristic Metric Telemetry Pods */}
          <div className="hero-telemetry-grid">
            <div className="telemetry-card">
              <div className="telemetry-val">{destinations.length}+</div>
              <div className="telemetry-label">Curated Horizons</div>
              <div className="telemetry-sub">Hills, Heritage & Coasts</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-val">4.85★</div>
              <div className="telemetry-label">Traveler Rating</div>
              <div className="telemetry-sub">Verified Guest Reviews</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-val">100%</div>
              <div className="telemetry-label">Real-time Stays</div>
              <div className="telemetry-sub">Resorts & Luxury Suites</div>
            </div>

            <div className="telemetry-card">
              <div className="telemetry-val">0.18s</div>
              <div className="telemetry-label">AI Planning Speed</div>
              <div className="telemetry-sub">WanderBot Neural Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: QUICK TRAVEL COMMAND MODULES
          ========================================================================= */}
      <section className="command-modules-section">
        <div className="section-header-row">
          <div>
            <span className="section-micro-tag">INTELLIGENT SYSTEMS</span>
            <h2 className="section-title">Travel Command Center</h2>
          </div>
        </div>

        <div className="command-cards-grid">
          <div
            className="command-card"
            onClick={() => onNavigate('explore')}
            role="button"
            tabIndex={0}
          >
            <div className="command-card-icon">🧭</div>
            <div className="command-card-title">Explore Catalog</div>
            <p className="command-card-desc">
              Browse destinations filtered by category, star ratings, famous landmarks, food hubs, and viewpoints.
            </p>
            <span className="command-card-link">Launch Catalog ➔</span>
          </div>

          <div
            className="command-card"
            onClick={() => onNavigate('trips')}
            role="button"
            tabIndex={0}
          >
            <div className="command-card-icon">🎒</div>
            <div className="command-card-title">Trips & Itinerary</div>
            <p className="command-card-desc">
              Manage your active travel portfolio with room selections, night durations, and instant social sharing.
            </p>
            <span className="command-card-link">Manage Trips ({myItinerary.length}) ➔</span>
          </div>

          <div
            className="command-card"
            onClick={onOpenBudgetModal}
            role="button"
            tabIndex={0}
          >
            <div className="command-card-icon">💰</div>
            <div className="command-card-title">Budget Calculator</div>
            <p className="command-card-desc">
              Dynamic cost breakdown covering stays, meals, transit, activities, and contingency estimates.
            </p>
            <span className="command-card-link">Calculate Cost ➔</span>
          </div>

          <div
            className="command-card"
            onClick={onOpenAIChat}
            role="button"
            tabIndex={0}
          >
            <div className="command-card-icon">🤖</div>
            <div className="command-card-title">WanderBot AI Concierge</div>
            <p className="command-card-desc">
              Real-time conversational travel assistance for weather, best seasons, secret spots, and packing tips.
            </p>
            <span className="command-card-link">Ask Assistant ➔</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DEDICATED TRENDING HORIZONS & SEASONAL WINTER DESTINATIONS
          ========================================================================= */}
      <section className="trending-winter-spotlight-section">
        <div className="section-header-row">
          <div>
            <span className="section-micro-tag">SEASONAL CURATION • WINTER & ESCAPES</span>
            <h2 className="section-title">Trending Horizons & Seasonal Escapes</h2>
            <p className="section-subtitle">
              Spotlight on crisp winter wonderlands, golden heritage season, and warm tropical retreats.
            </p>
          </div>

          <div className="season-filter-pills-bar">
            <button
              className={`season-pill-btn ${trendingSeasonFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTrendingSeasonFilter('all')}
            >
              🔥 All Trending
            </button>
            <button
              className={`season-pill-btn ${trendingSeasonFilter === 'winter' ? 'active' : ''}`}
              onClick={() => setTrendingSeasonFilter('winter')}
            >
              ❄️ Winter Wonders & Snow
            </button>
            <button
              className={`season-pill-btn ${trendingSeasonFilter === 'warm' ? 'active' : ''}`}
              onClick={() => setTrendingSeasonFilter('warm')}
            >
              🌴 Warm Winter Beaches
            </button>
            <button
              className={`season-pill-btn ${trendingSeasonFilter === 'royal' ? 'active' : ''}`}
              onClick={() => setTrendingSeasonFilter('royal')}
            >
              🏰 Royal Winter Palaces
            </button>
          </div>
        </div>

        <div className="spotlight-cards-grid">
          {filteredSeasonalDestinations.slice(0, 4).map((dest) => {
            const isAdded = myItinerary.some(
              (item) => item.destinationId === dest.id || item.destinationName === dest.name
            );
            const winterMeta = WINTER_DESTINATION_HIGHLIGHTS[dest.id] || {
              badge: '✨ Trending Horizon',
              tempRange: dest.travelFeatures?.weather || 'Pleasant & Mild',
              winterFeature: dest.tagline
            };

            return (
              <div key={dest.id} className="spotlight-card seasonal-spotlight-card">
                <div className="spotlight-image-wrap">
                  <img
                    src={dest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={dest.name}
                    className="spotlight-img"
                  />
                  <div className="spotlight-overlay-gradient" />
                  <span className="seasonal-weather-badge">
                    {winterMeta.badge}
                  </span>
                  <div className="spotlight-rating-badge">
                    ★ {dest.rating || 4.8}
                  </div>
                </div>

                <div className="spotlight-card-body">
                  <div className="spotlight-meta">
                    <span className="spotlight-region">{dest.region}</span>
                    <span className="spotlight-category">{dest.category}</span>
                  </div>

                  <h3 className="spotlight-name">{dest.name}</h3>
                  <p className="spotlight-winter-feature">
                    {winterMeta.winterFeature}
                  </p>

                  <div className="spotlight-temp-pill">
                    🌡️ <strong>{winterMeta.tempRange}</strong>
                  </div>

                  <div className="spotlight-stay-preview">
                    <span className="stay-label">Featured Stay:</span>
                    <span className="stay-name">{dest.stayDetails?.hotelName || 'Luxury Resort'}</span>
                    <span className="stay-price-meta">From ₹{(dest.price || 5000).toLocaleString('en-IN')}/night</span>
                  </div>

                  <div className="spotlight-actions">
                    <button
                      className="spotlight-btn-explore"
                      onClick={() => onSelectDestination(dest)}
                    >
                      Details & Rooms ➔
                    </button>

                    <button
                      className={`spotlight-btn-add ${isAdded ? 'added' : ''}`}
                      onClick={() => onQuickAdd(dest)}
                    >
                      {isAdded ? '✓ Added' : '+ Add to Trip'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DEDICATED POPULAR TRAVEL PLANS FROM FOLLOWED CREATORS
          ========================================================================= */}
      <section className="creator-plans-section" aria-label="Curated Travel Plans">
        <div className="section-header-row">
          <div>
            <span className="section-micro-tag">COMMUNITY MASTERPIECES • VERIFIED ARCHITECTS</span>
            <h2 className="section-title">Popular Travel Plans from Followed Creators</h2>
            <p className="section-subtitle">
              Ready-to-book multi-day itineraries crafted by glaciologists, historians, and coastal architects.
            </p>
          </div>

          <div className="creator-filter-pills-bar">
            <button
              className={`creator-filter-btn ${selectedCreatorFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCreatorFilter('all')}
            >
              All Creators ({CREATOR_TRAVEL_PLANS.length})
            </button>
            <button
              className={`creator-filter-btn ${selectedCreatorFilter === 'user-sameer' ? 'active' : ''}`}
              onClick={() => setSelectedCreatorFilter('user-sameer')}
            >
              Dr. Sameer
            </button>
            <button
              className={`creator-filter-btn ${selectedCreatorFilter === 'user-elena' ? 'active' : ''}`}
              onClick={() => setSelectedCreatorFilter('user-elena')}
            >
              Elena Rostova
            </button>
            <button
              className={`creator-filter-btn ${selectedCreatorFilter === 'user-kenji' ? 'active' : ''}`}
              onClick={() => setSelectedCreatorFilter('user-kenji')}
            >
              Kenji Sato
            </button>
            <button
              className={`creator-filter-btn ${selectedCreatorFilter === 'user-chloe' ? 'active' : ''}`}
              onClick={() => setSelectedCreatorFilter('user-chloe')}
            >
              Chloe Dupont
            </button>
          </div>
        </div>

        <div className="creator-plans-grid">
          {filteredCreatorPlans.map((plan) => {
            const isFollowed = (userProfile.following || []).includes(plan.creatorId);
            const isAdopted = myItinerary.some((item) =>
              plan.items.some((pi) => pi.destinationId === item.destinationId)
            );

            return (
              <div key={plan.id} className="creator-plan-card">
                {/* Creator Header */}
                <div className="creator-plan-header">
                  <div className="creator-profile-badge">
                    <div className="creator-avatar-hex">{plan.creatorAvatar}</div>
                    <div className="creator-titles">
                      <div className="creator-name-row">
                        <strong>{plan.creator}</strong>
                        <span className="creator-badge-check">✓</span>
                      </div>
                      <span className="creator-role-tag">{plan.creatorRole}</span>
                    </div>
                  </div>

                  <button
                    className={`btn-follow-toggle ${isFollowed ? 'following' : ''}`}
                    onClick={() => onToggleFollow && onToggleFollow(plan.creatorId)}
                    title={isFollowed ? 'Following creator' : 'Follow creator'}
                  >
                    {isFollowed ? '✓ Following' : '+ Follow'}
                  </button>
                </div>

                {/* Plan Cover Photo with Duration & Season Overlay */}
                <div className="creator-plan-media">
                  <img src={plan.coverImage} alt={plan.title} className="creator-plan-img" />
                  <div className="creator-plan-media-overlay" />
                  <span className="plan-season-badge">{plan.seasonBadge}</span>
                  <span className="plan-duration-badge">⏱️ {plan.duration}</span>
                </div>

                {/* Plan Body */}
                <div className="creator-plan-body">
                  <h3 className="creator-plan-title">{plan.title}</h3>
                  <p className="creator-plan-tagline">{plan.tagline}</p>

                  {/* Route Corridor Trail */}
                  <div className="creator-route-trail">
                    <span className="trail-label">Curated Route Corridor:</span>
                    <div className="trail-flow">
                      {plan.routeHighlights[0]}
                    </div>
                  </div>

                  {/* Tag Pills */}
                  <div className="creator-plan-tags">
                    {plan.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="creator-plan-tag-pill">{tag}</span>
                    ))}
                  </div>

                  {/* Budget & Adoption Footer */}
                  <div className="creator-plan-footer">
                    <div className="plan-budget-callout">
                      <span className="budget-micro">Estimated Budget</span>
                      <strong className="budget-val">₹{plan.estimatedBudget.toLocaleString('en-IN')}</strong>
                    </div>

                    <div className="plan-cta-cluster">
                      <button
                        className={`btn-adopt-plan ${isAdopted ? 'adopted' : ''}`}
                        onClick={() => handleAdoptPlan(plan)}
                      >
                        {isAdopted ? '✓ In Your Trips' : 'Adopt Plan ➔'}
                      </button>

                      {onOpenRoutePlanner && (
                        <button
                          className="btn-preview-route"
                          onClick={onOpenRoutePlanner}
                          title="Open Route Planner for this route"
                        >
                          🗺️ Route
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: AI DESTINATION SELECTOR & ITINERARY ARCHITECT BANNER
          ========================================================================= */}
      <section className="home-ai-architect-banner">
        <div className="home-ai-banner-card">
          <div className="home-ai-banner-left">
            <div className="home-ai-badge">
              <span className="badge-pulse-dot" />
              <span>NEURAL TRAVEL ARCHITECT • DESTINATION MATCHING</span>
            </div>
            <h2 className="home-ai-banner-title">
              Let AI Match Your Travel Style & Plan Custom Itineraries
            </h2>
            <p className="home-ai-banner-desc">
              Choose your ideal vibe. WanderBot AI analyzes your group, duration, and budget to recommend the highest-compatibility destinations and generate a complete day-by-day itinerary with hotel rooms.
            </p>
            <div className="home-vibe-chips">
              <button
                type="button"
                className="home-vibe-btn"
                onClick={() => (onOpenAIPlanner ? onOpenAIPlanner(null, 'hills-nature') : onOpenAIChat())}
              >
                🌲 Hill Stations & Nature
              </button>
              <button
                type="button"
                className="home-vibe-btn"
                onClick={() => (onOpenAIPlanner ? onOpenAIPlanner(null, 'tropical-beach') : onOpenAIChat())}
              >
                🏖️ Tropical Beach & Islands
              </button>
              <button
                type="button"
                className="home-vibe-btn"
                onClick={() => (onOpenAIPlanner ? onOpenAIPlanner(null, 'heritage-culture') : onOpenAIChat())}
              >
                🏛️ Royal Heritage & Palaces
              </button>
              <button
                type="button"
                className="home-vibe-btn"
                onClick={() => (onOpenAIPlanner ? onOpenAIPlanner(null, 'high-adventure') : onOpenAIChat())}
              >
                🏔️ High Altitude Adventure
              </button>
            </div>
          </div>

          <div className="home-ai-banner-right">
            <button
              type="button"
              className="btn-home-launch-ai"
              onClick={() => (onOpenAIPlanner ? onOpenAIPlanner() : onOpenAIChat())}
              id="home-ai-architect-btn"
            >
              <span className="btn-sparkle">✦</span>
              <strong>Launch AI Architect</strong>
              <span className="btn-subtext">Custom Plans & Stays</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: REFINED ABOUT SECTION (VISION & PLATFORM FEATURES)
          ========================================================================= */}
      <section className="about-platform-section" id="about-wanderlust" aria-label="About WanderLust">
        <div className="about-header-block">
          <div className="about-badge-pill">
            <span className="badge-pulse-dot" />
            <span>VISION & PLATFORM ARCHITECTURE</span>
          </div>

          <h2 className="about-main-title">
            The Autonomous Travel Operating System
          </h2>

          <p className="about-vision-lead">
            WanderLust bridges the divide between aspirational travel dreams and seamless execution. 
            We unify multi-modal route pathfinding, neural itinerary concierges, transparent live stay budgeting, 
            and a verified community explorer network into a single, cohesive travel platform designed for modern voyagers.
          </p>
        </div>

        {/* 4 Core Architectural Feature Pillars */}
        <div className="about-pillars-grid">
          <div className="about-pillar-card">
            <div className="pillar-icon-box">🧭</div>
            <h3 className="pillar-title">Multi-Modal Route Engine</h3>
            <p className="pillar-desc">
              Intelligent Dijkstra-based pathfinding across road highways, mountain rail, and walking corridors with en-route hotel filtering, food hubs, scenic ratings, and eco-carbon metrics.
            </p>
            <div className="pillar-tags">
              <span>Walking & Car</span>
              <span>En-Route Stays</span>
              <span>Turn-by-Turn</span>
            </div>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-icon-box">🤖</div>
            <h3 className="pillar-title">WanderBot AI Concierge</h3>
            <p className="pillar-desc">
              Dual-mode conversational intelligence that matches your personal travel vibe, selects peak-compatibility destinations, and synthesizes customized day-by-day itineraries in seconds.
            </p>
            <div className="pillar-tags">
              <span>Vibe Matching</span>
              <span>Day-by-Day Plans</span>
              <span>24/7 Concierge</span>
            </div>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-icon-box">💰</div>
            <h3 className="pillar-title">Transparent Budget Engine</h3>
            <p className="pillar-desc">
              Granular cost telemetry itemizing hotel rooms, transit fuel/fares, dining, and activities with configurable contingency cushions for zero unexpected travel expenses.
            </p>
            <div className="pillar-tags">
              <span>Itemized Stays</span>
              <span>INR Currency</span>
              <span>Contingency Buffers</span>
            </div>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-icon-box">🌍</div>
            <h3 className="pillar-title">Explorer Passport & Community</h3>
            <p className="pillar-desc">
              A decentralized social network for authentic explorers. Share trip itineraries across WhatsApp & LinkedIn, follow domain specialists, and publish your own secret viewpoints.
            </p>
            <div className="pillar-tags">
              <span>Traveler Badges</span>
              <span>Creator Followers</span>
              <span>Multi-Channel Share</span>
            </div>
          </div>
        </div>

        {/* Platform Telemetry Band */}
        <div className="about-telemetry-band">
          <div className="about-stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Global Destinations</span>
          </div>
          <div className="stat-divider" />
          <div className="about-stat-item">
            <span className="stat-number">4.85★</span>
            <span className="stat-label">Verified Guest Reviews</span>
          </div>
          <div className="stat-divider" />
          <div className="about-stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Real-time Stays Pricing</span>
          </div>
          <div className="stat-divider" />
          <div className="about-stat-item">
            <span className="stat-number">0.18s</span>
            <span className="stat-label">Neural Route Calculation</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="about-cta-row">
          <button
            className="btn-about-explore"
            onClick={() => onNavigate('explore')}
          >
            🧭 Browse All Destinations ➔
          </button>
          <button
            className="btn-about-ai"
            onClick={onOpenAIChat}
          >
            ✦ Consult WanderBot AI Concierge
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: COMMUNITY INVITATION BANNER
          ========================================================================= */}
      <section className="community-cta-banner">
        <div className="community-banner-content">
          <div className="community-icon-orb">✨</div>
          <div className="community-text">
            <h3>Discovered an Uncharted Haven?</h3>
            <p>
              Contribute your own secret viewpoints, local food gems, and boutique stays to the WanderLust ecosystem.
            </p>
          </div>
          <button
            className="btn-community-create"
            onClick={onOpenCreateModal}
          >
            + Create Custom Location
          </button>
        </div>
      </section>
    </div>
  );
}
