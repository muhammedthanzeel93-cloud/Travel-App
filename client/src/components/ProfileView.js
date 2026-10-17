import React, { useState, useEffect } from 'react';
import { COMMUNITY_EXPLORERS, DEFAULT_USER_PROFILE } from '../data/destinationsData';

/**
 * Initial Curated Seed Posts for the Instagram-Style Travel Feed
 */
export const INITIAL_USER_POSTS = [
  {
    id: 'post-1',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Top Station, Munnar',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Woke up at 5:30 AM to catch the sea of clouds rolling over the Western Ghats. The crisp 11°C air and endless emerald tea valleys are beyond words! ☕🌄 #Munnar #TeaValleys #WesternGhats #WanderLust',
    likesCount: 342,
    isLiked: false,
    saved: false,
    timestamp: '2 hours ago',
    comments: [
      { id: 'c1', user: 'Dr. Sameer Siddiqui', handle: '@sameer_peaks', text: 'Top Station cloud bed is legendary in winter! Did you hike up from Lockhart?' },
      { id: 'c2', user: 'Elena Rostova', handle: '@elena_wanderer', text: 'Stunning lighting Aysha! That morning golden mist is pure poetry.' }
    ]
  },
  {
    id: 'post-2',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Zanskar Valley, Ladakh',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    caption: 'Standing on the frozen Chadar ice canyon at -14°C. Complete silence, turquoise ice beneath our crampons, and sheer granite walls reaching into the sky. ❄️🏔️ #ChadarTrek #Zanskar #Himalayas #GlacierExpedition',
    likesCount: 518,
    isLiked: true,
    saved: true,
    timestamp: '1 day ago',
    comments: [
      { id: 'c3', user: 'Kenji Sato', handle: '@kenji_routes', text: 'Sub-zero perfection! Ice thickness looks very solid this season.' }
    ]
  },
  {
    id: 'post-3',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Amer Fort, Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    caption: 'Golden hour illuminating the marble courtyards and ancient ramparts of Amer Fort. Rajasthan during winter evenings is an absolute dream. 🏰✨ #Jaipur #IncredibleIndia #RoyalHeritage #PalaceTrail',
    likesCount: 429,
    isLiked: false,
    saved: false,
    timestamp: '3 days ago',
    comments: [
      { id: 'c4', user: 'Nikhil Varma', handle: '@nikhil_nomad', text: 'The mirror work in Sheesh Mahal right at sunset is unreal!' }
    ]
  },
  {
    id: 'post-4',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Baa Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Steps from bed into 28°C crystalline waters. Snorkeled with two gentle manta rays right off the reef edge this afternoon. 🌴🌊🤿 #Maldives #OverwaterVilla #CoralSanctuary #TropicalEscape',
    likesCount: 684,
    isLiked: false,
    saved: false,
    timestamp: '5 days ago',
    comments: [
      { id: 'c5', user: 'Chloe Dupont', handle: '@chloe_ecolife', text: 'Baa Atoll biosphere reserve is so special. Glad to see healthy reef life!' }
    ]
  },
  {
    id: 'post-5',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Gion District, Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Quiet lantern-lit evening along the stone paths of Shirakawa Canal. Steaming roasted hojicha and wooden machiya heritage. 🏮🍵 #Kyoto #Gion #HistoricTravel #JapanVibes',
    likesCount: 391,
    isLiked: true,
    saved: false,
    timestamp: '1 week ago',
    comments: []
  },
  {
    id: 'post-6',
    author: 'Aysha Rayan',
    handle: '@aysha_explorer',
    avatar: 'AR',
    location: 'Taj Falaknuma Palace, Hyderabad',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    caption: 'Regal carriage arrival and sunset tea overlooking the City of Pearls. The Nizam heritage restoration here is unmatched. 👑☕ #Hyderabad #FalaknumaPalace #RegalHospitality',
    likesCount: 462,
    isLiked: false,
    saved: true,
    timestamp: '2 weeks ago',
    comments: []
  }
];

/**
 * Story Highlights Presets for Profile
 */
export const PROFILE_STORY_HIGHLIGHTS = [
  {
    id: 'hl-1',
    title: '❄️ Ladakh',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Sub-Zero Chadar',
    caption: 'Glacial treks across the frozen Zanskar river canyon. -14°C pristine powder and mountain stupas.'
  },
  {
    id: 'hl-2',
    title: '☕ Munnar',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Cloud Beds & Tea',
    caption: 'Dawn sunrise above cloud beds at Top Station. Fresh cardamom spices and heritage bungalow mornings.'
  },
  {
    id: 'hl-3',
    title: '🏰 Rajasthan',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Royal Golden Hour',
    caption: 'Amer Fort ramparts and sunset high tea over the desert hills. Candlelit palace courtyards.'
  },
  {
    id: 'hl-4',
    title: '🏖️ Maldives',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Turquoise Reefs',
    caption: 'Solar overwater retreats and swimming with gentle mantas along the house reef.'
  },
  {
    id: 'hl-5',
    title: '🏮 Kyoto',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Lantern Trails',
    caption: 'Winter evenings through Gion stone alleys, hot yudofu, and silent moss temples.'
  },
  {
    id: 'hl-6',
    title: '🎒 Gear',
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    seasonTag: 'Alpine Kit',
    caption: 'Ultralight cold-weather expedition essentials, thermals, and mirrorless trail setup.'
  }
];

/**
 * Curated Preset Photo Library for Quick Post Creation
 */
export const PHOTO_PRESETS = [
  {
    label: '🌲 Munnar Tea Slopes',
    url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Top Station, Munnar'
  },
  {
    label: '❄️ Zanskar Frozen Pass',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Zanskar Valley, Ladakh'
  },
  {
    label: '🏰 Amer Fort Sunset',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Amer Fort, Jaipur'
  },
  {
    label: '🌴 Maldives Coral Reef',
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Baa Atoll, Maldives'
  },
  {
    label: '🏮 Kyoto Bamboo & Lanterns',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Gion District, Kyoto'
  },
  {
    label: '🏖️ Varkala Red Cliffs',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    defaultLocation: 'Varkala Beach, Kerala'
  }
];

/**
 * ProfileView Component
 * Transformed Instagram-style traveler profile and social interaction platform featuring:
 * - Instagram-like profile header with accurate Follower and Following counts & user bio
 * - Horizontal story highlights section at the top of the feed
 * - Full post creation system allowing users to share photos with rich captions
 * - Grid view and Feed view toggles with real-time like/comment functionality
 * - Followers & Following interactive modal directories
 * - Preserved Community Explorer Network, achievements badges, and traveler preferences
 */
export default function ProfileView({
  myItinerary = [],
  grandTotalBudget = 0,
  destinations = [],
  userProfile = DEFAULT_USER_PROFILE,
  onUpdateProfile,
  onToggleFollow,
  onOpenShareProfile,
  onNavigate,
  onOpenAIChat,
  onOpenBudgetModal,
  onOpenCreateModal,
  showToast
}) {
  const profile = userProfile || DEFAULT_USER_PROFILE;

  // Active view tab in Instagram Profile
  const [activeProfileTab, setActiveProfileTab] = useState('posts'); // 'posts' | 'community' | 'trips' | 'badges'

  // Feed display mode: 'grid' | 'feed'
  const [feedMode, setFeedMode] = useState('grid');

  // Posts state with localStorage persistence
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_user_posts_v1');
      return saved ? JSON.parse(saved) : INITIAL_USER_POSTS;
    } catch (e) {
      return INITIAL_USER_POSTS;
    }
  });

  // Sync posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_user_posts_v1', JSON.stringify(posts));
    } catch (e) {
      console.error('LocalStorage write error for posts:', e);
    }
  }, [posts]);

  // Post Creation Modal State
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPostImage, setNewPostImage] = useState(PHOTO_PRESETS[0].url);
  const [newPostLocation, setNewPostLocation] = useState(PHOTO_PRESETS[0].defaultLocation);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);

  // Selected post for modal lightbox
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeCommentInput, setActiveCommentInput] = useState({});

  // Story Highlight Lightbox State
  const [activeStoryHighlight, setActiveStoryHighlight] = useState(null);

  // Followers & Following Modals
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  // Community explorer network filter & search
  const [networkSearch, setNetworkSearch] = useState('');
  const [networkFilter, setNetworkFilter] = useState('all'); // 'all' | 'following' | 'recommended'

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name || 'Aysha Rayan',
    handle: profile.handle || '@aysha_explorer',
    location: profile.location || 'Bangalore, India',
    bio: profile.bio || 'Global Travel Architect & High-Altitude Enthusiast.',
    avatarInitials: profile.avatarInitials || 'AR',
    travelStyle: profile.travelStyle || 'Luxury Eco-Resorts & High-Speed Transit',
  });

  // Travel preferences state
  const [preferences, setPreferences] = useState({
    stayStyle: 'Luxury Eco-Resorts & Heritage Palaces',
    transitStyle: 'High-Speed Rail & Scenic Coastal Drives',
    culinaryFocus: 'Authentic Local Flavors & Chef Specials',
    aiPersona: 'Proactive Concierge & Cultural Historian',
    currency: 'INR (₹)',
  });

  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Accurate Follower and Following Counts
  const followingList = profile.following || [];
  const followersList = profile.followers || [];
  const followingCount = followingList.length;
  const followersCount = (profile.followersCount || 1420) + (followersList.filter(f => f.isNewFollower).length);

  // Save Preferences
  const handleSavePreferences = (e) => {
    e.preventDefault();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // Save Profile Edit
  const handleSaveProfileEdit = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;

    if (onUpdateProfile) {
      onUpdateProfile({
        name: editForm.name.trim(),
        handle: editForm.handle.trim().startsWith('@') ? editForm.handle.trim() : `@${editForm.handle.trim()}`,
        location: editForm.location.trim(),
        bio: editForm.bio.trim(),
        avatarInitials: editForm.avatarInitials.trim().toUpperCase() || editForm.name.slice(0, 2).toUpperCase(),
        travelStyle: editForm.travelStyle.trim(),
      });
    }
    setIsEditModalOpen(false);
  };

  // Follow / Unfollow explorer
  const handleExplorerFollowToggle = (explorer) => {
    if (onToggleFollow) {
      onToggleFollow(explorer.id);
    }
  };

  // Filter Community Explorers
  const filteredExplorers = COMMUNITY_EXPLORERS.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(networkSearch.toLowerCase()) ||
      exp.role.toLowerCase().includes(networkSearch.toLowerCase()) ||
      exp.specialty.toLowerCase().includes(networkSearch.toLowerCase()) ||
      exp.location.toLowerCase().includes(networkSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (networkFilter === 'following') {
      return followingList.includes(exp.id);
    }
    if (networkFilter === 'recommended') {
      return !followingList.includes(exp.id);
    }
    return true;
  });

  // Handle Post Creation
  const handleCreatePostSubmit = (e) => {
    e.preventDefault();
    if (!newPostImage.trim() || !newPostCaption.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: profile.name || 'Aysha Rayan',
      handle: profile.handle || '@aysha_explorer',
      avatar: profile.avatarInitials || 'AR',
      location: newPostLocation.trim() || 'Scenic Horizons',
      image: newPostImage.trim(),
      caption: newPostCaption.trim(),
      likesCount: 1,
      isLiked: true,
      saved: false,
      timestamp: 'Just now',
      comments: []
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsCreatePostOpen(false);
    setNewPostCaption('');
    if (showToast) {
      showToast('✨ Post published to your travel feed!');
    }
  };

  // Toggle Like on Post
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1)
          };
        }
        return post;
      })
    );
  };

  // Toggle Save on Post
  const handleToggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextSaved = !post.saved;
          if (showToast) {
            showToast(nextSaved ? '🔖 Post saved to your collection!' : 'Removed from saved collection.');
          }
          return { ...post, saved: nextSaved };
        }
        return post;
      })
    );
  };

  // Add Comment to Post
  const handleAddComment = (postId) => {
    const commentText = (activeCommentInput[postId] || '').trim();
    if (!commentText) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      user: profile.name || 'Aysha Rayan',
      handle: profile.handle || '@aysha_explorer',
      text: commentText
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment]
          };
        }
        return post;
      })
    );

    setActiveCommentInput((prev) => ({ ...prev, [postId]: '' }));
    if (showToast) {
      showToast('💬 Comment posted!');
    }
  };

  const achievementBadges = [
    {
      id: 'pioneer',
      icon: '🏆',
      title: 'Pioneer Explorer',
      status: 'Unlocked',
      desc: 'Browsed and explored curated national destinations.',
      tier: 'Gold',
    },
    {
      id: 'architect',
      icon: '🧭',
      title: 'Route Architect',
      status: myItinerary.length > 0 ? 'Unlocked' : 'In Progress',
      desc: `${myItinerary.length} destinations engineered into custom travel plan.`,
      tier: myItinerary.length > 0 ? 'Platinum' : 'Bronze',
    },
    {
      id: 'community',
      icon: '🌐',
      title: 'Community Pioneer',
      status: followingCount > 0 ? 'Unlocked' : 'In Progress',
      desc: `Connected with ${followingCount} world-class travel architects in community network.`,
      tier: followingCount >= 3 ? 'Diamond' : followingCount > 0 ? 'Gold' : 'Bronze',
    },
    {
      id: 'neural',
      icon: '🤖',
      title: 'Neural Pathfinder',
      status: 'Unlocked',
      desc: 'Equipped with WanderBot AI quantum travel concierge.',
      tier: 'Diamond',
    },
    {
      id: 'luxury',
      icon: '💎',
      title: 'Luxury Connoisseur',
      status: 'Unlocked',
      desc: 'Evaluated 5-star hotel suites and premium stay amenities.',
      tier: 'Gold',
    },
    {
      id: 'eco',
      icon: '🌿',
      title: 'Eco Custodian',
      status: 'Unlocked',
      desc: 'Explored hill stations, tea valleys, and coastal sanctuaries.',
      tier: 'Emerald',
    },
    {
      id: 'budget',
      icon: '💰',
      title: 'Budget Strategist',
      status: 'Unlocked',
      desc: 'Configured live travel budget with itemized cost factors.',
      tier: 'Silver',
    },
  ];

  const handleTabClick = (tabKey, sectionId) => {
    setActiveProfileTab(tabKey);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="profile-view-container ig-profile-container" id="profile-view">
      {/* =========================================================================
          INSTAGRAM-STYLE PROFILE HEADER CARD
          ========================================================================= */}
      <section className="ig-profile-header-card passport-hero-card">
        <div className="passport-ambient-glow" aria-hidden="true" />

        <div className="ig-header-layout passport-layout">
          {/* Avatar with Vibrant Story Ring */}
          <div className="ig-avatar-zone passport-avatar-zone">
            <div className="ig-avatar-ring-gradient cyber-avatar-ring">
              <div className="ig-avatar-inner avatar-core">
                <span className="ig-avatar-text avatar-initials">{profile.avatarInitials || 'AR'}</span>
              </div>
            </div>
            <div className="passport-tier-pill ig-tier-pill">
              <span className="tier-icon">✦</span>
              <span className="tier-text">{profile.tier || 'APEX VOYAGER'}</span>
            </div>
          </div>

          {/* Profile Identity, Counters & Bio */}
          <div className="ig-details-zone passport-details-zone">
            {/* Top Row: Handle & Actions */}
            <div className="ig-top-identity-row passport-top-row">
              <div className="ig-handle-cluster passport-identity-block">
                <div className="passport-id-badge-row">
                  <span className="passport-id-tag">PASSPORT ID: {profile.passportId || 'WNDR-2026-X79'}</span>
                  <span className="passport-handle-pill">{profile.handle || '@aysha_explorer'}</span>
                  <span className="ig-verified-badge" title="Verified Travel Architect">✓</span>
                </div>
                <h1 className="passport-name ig-profile-title">{profile.name}</h1>
              </div>

              {/* Action Buttons: Edit, Share, New Post */}
              <div className="ig-header-buttons-cluster passport-actions-cluster">
                <button
                  type="button"
                  className="btn-ig-primary btn-passport-edit"
                  onClick={() => {
                    setEditForm({
                      name: profile.name,
                      handle: profile.handle,
                      location: profile.location,
                      bio: profile.bio,
                      avatarInitials: profile.avatarInitials,
                      travelStyle: profile.travelStyle,
                    });
                    setIsEditModalOpen(true);
                  }}
                  title="Edit Profile Credentials"
                >
                  ✏️ Edit Profile
                </button>

                <button
                  type="button"
                  className="btn-ig-create-post"
                  onClick={() => setIsCreatePostOpen(true)}
                  title="Create New Photo Post"
                >
                  📸 + New Post
                </button>

                <button
                  type="button"
                  className="btn-ig-secondary btn-passport-share"
                  onClick={onOpenShareProfile}
                  title="Share Traveler Passport & Credentials"
                >
                  📤 Share Passport
                </button>
              </div>
            </div>

            {/* Accurate Live Stats Matrix: Posts, Followers, Following */}
            <div className="ig-stats-row passport-stats-matrix">
              <div className="ig-stat-unit p-stat-box" onClick={() => setActiveProfileTab('posts')} role="button" tabIndex={0}>
                <span className="ig-stat-count p-stat-number">{posts.length}</span>
                <span className="ig-stat-tag p-stat-label">Posts</span>
              </div>

              <div
                className="ig-stat-unit p-stat-box highlight-social"
                onClick={() => setIsFollowersModalOpen(true)}
                role="button"
                tabIndex={0}
                title="View travelers following you"
              >
                <span className="ig-stat-count p-stat-number">{followersCount.toLocaleString('en-IN')}</span>
                <span className="ig-stat-tag p-stat-label">Followers</span>
              </div>

              <div
                className="ig-stat-unit p-stat-box highlight-social"
                onClick={() => setIsFollowingModalOpen(true)}
                role="button"
                tabIndex={0}
                title="View explorers you are following"
              >
                <span className="ig-stat-count p-stat-number">{followingCount}</span>
                <span className="ig-stat-tag p-stat-label">Following</span>
              </div>

              <div className="ig-stat-unit p-stat-box">
                <span className="ig-stat-count p-stat-number">{myItinerary.length}</span>
                <span className="ig-stat-tag p-stat-label">Destinations Planned</span>
              </div>

              <div className="ig-stat-unit p-stat-box">
                <span className="ig-stat-count p-stat-number">₹{grandTotalBudget.toLocaleString('en-IN')}</span>
                <span className="ig-stat-tag p-stat-label">Itinerary Value</span>
              </div>
            </div>

            {/* Bio Section */}
            <div className="ig-bio-block">
              <div className="ig-bio-tagline">
                <span className="passport-location-tag">📍 {profile.location || 'Bangalore, India'}</span>
                <span className="passport-divider">•</span>
                <span className="ig-style-text">{profile.travelStyle || 'Global Travel Architect & Explorer'}</span>
              </div>
              <p className="passport-bio-text ig-bio-paragraph">"{profile.bio}"</p>
              <div className="ig-bio-link">
                <span className="link-icon">🔗</span>
                <span className="link-url">wanderlust.travel/{profile.handle ? profile.handle.replace('@', '') : 'aysha_explorer'}</span>
              </div>
              <div className="ig-followed-by-meta">
                <span>Followed by <strong>dr_sameer</strong>, <strong>elena_wanderer</strong>, <strong>kenji_routes</strong> + {Math.max(0, followersCount - 3)} others</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL STORY HIGHLIGHTS SECTION (TOP OF FEED)
            ========================================================================= */}
        <div className="ig-story-highlights-bar" aria-label="Profile Story Highlights">
          {/* New Story Circle */}
          <div
            className="ig-highlight-item new-highlight"
            onClick={() => setIsCreatePostOpen(true)}
            role="button"
            tabIndex={0}
            title="Create a new post or story"
          >
            <div className="ig-highlight-ring add-highlight-ring">
              <div className="ig-highlight-avatar add-avatar">
                <span className="add-plus">+</span>
              </div>
            </div>
            <span className="ig-highlight-label">New Post</span>
          </div>

          {/* Curated Story Highlights */}
          {PROFILE_STORY_HIGHLIGHTS.map((hl) => (
            <div
              key={hl.id}
              className="ig-highlight-item"
              onClick={() => setActiveStoryHighlight(hl)}
              role="button"
              tabIndex={0}
              title={`View ${hl.title} Highlight`}
            >
              <div className="ig-highlight-ring">
                <div className="ig-highlight-avatar">
                  <img src={hl.coverImage} alt={hl.title} className="ig-highlight-thumb" />
                </div>
              </div>
              <span className="ig-highlight-label">{hl.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STORY HIGHLIGHT VIEWER LIGHTBOX
          ========================================================================= */}
      {activeStoryHighlight && (
        <div className="story-modal-overlay" onClick={() => setActiveStoryHighlight(null)}>
          <div className="story-viewer-card" onClick={(e) => e.stopPropagation()}>
            <div className="story-progress-bar-container">
              <div className="story-progress-bar-fill" />
            </div>

            <div className="story-viewer-header">
              <div className="story-author-info">
                <div className="story-header-avatar">{profile.avatarInitials || 'AR'}</div>
                <div className="story-author-names">
                  <strong>{profile.name}</strong>
                  <span className="story-author-handle">{profile.handle || '@aysha_explorer'}</span>
                </div>
              </div>
              <button className="story-close-btn" onClick={() => setActiveStoryHighlight(null)}>✕</button>
            </div>

            <div className="story-media-stage">
              <img src={activeStoryHighlight.coverImage} alt={activeStoryHighlight.title} className="story-media-image" />
              <div className="story-vignette-overlay" />
              <div className="story-season-badge">{activeStoryHighlight.seasonTag}</div>
            </div>

            <div className="story-viewer-footer">
              <p className="story-caption-text">{activeStoryHighlight.caption}</p>
              <div className="story-action-bar">
                <span className="story-views-tag">👁️ 1.2k views</span>
                <button className="btn-story-explore" onClick={() => { setActiveStoryHighlight(null); onNavigate('explore'); }}>
                  🧭 Explore Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          POST CREATION MODAL
          ========================================================================= */}
      {isCreatePostOpen && (
        <div className="modal-backdrop post-creation-backdrop" onClick={() => setIsCreatePostOpen(false)}>
          <div className="modal-dialog ig-post-create-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ig-create-dialog-header">
              <h3>Create New Travel Post</h3>
              <button className="modal-close-btn" onClick={() => setIsCreatePostOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="ig-post-create-form">
              {/* Image Preview & Selector */}
              <div className="post-create-preview-zone">
                <img src={newPostImage} alt="Post preview" className="post-preview-img" />
                <div className="post-preset-selector-bar">
                  <span className="preset-label">Choose Destination Preset Photo:</span>
                  <div className="preset-chips-track">
                    {PHOTO_PRESETS.map((preset, pIdx) => (
                      <button
                        type="button"
                        key={pIdx}
                        className={`preset-chip-btn ${selectedPresetIdx === pIdx ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedPresetIdx(pIdx);
                          setNewPostImage(preset.url);
                          setNewPostLocation(preset.defaultLocation);
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Image URL Option */}
              <div className="form-group">
                <label>Custom Photo URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  required
                />
              </div>

              {/* Location Tag */}
              <div className="form-group">
                <label>Destination / Location Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Top Station, Munnar or Zanskar Valley, Ladakh"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  required
                />
              </div>

              {/* Caption */}
              <div className="form-group">
                <label>Caption & Hashtags</label>
                <textarea
                  rows={3}
                  placeholder="Write an inspiring travel caption with hashtags (e.g. #WanderLust #WinterEscape #HighAltitude)..."
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn-modal-cancel" onClick={() => setIsCreatePostOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save btn-publish-post">
                  📸 Share Post to Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          INSTAGRAM NAVIGATION TAB BAR
          ========================================================================= */}
      <div className="ig-tab-navigation-bar" role="tablist">
        <button
          className={`ig-nav-tab-btn ${activeProfileTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabClick('posts', 'ig-posts-section')}
          role="tab"
          aria-selected={activeProfileTab === 'posts'}
        >
          <span className="tab-icon">📷</span>
          <span className="tab-label">Posts ({posts.length})</span>
        </button>

        <button
          className={`ig-nav-tab-btn ${activeProfileTab === 'community' ? 'active' : ''}`}
          onClick={() => handleTabClick('community', 'community-network-section')}
          role="tab"
          aria-selected={activeProfileTab === 'community'}
        >
          <span className="tab-icon">👥</span>
          <span className="tab-label">Community Network ({COMMUNITY_EXPLORERS.length})</span>
        </button>

        <button
          className={`ig-nav-tab-btn ${activeProfileTab === 'trips' ? 'active' : ''}`}
          onClick={() => handleTabClick('trips', 'ig-trips-section')}
          role="tab"
          aria-selected={activeProfileTab === 'trips'}
        >
          <span className="tab-icon">🎒</span>
          <span className="tab-label">Saved Trips ({myItinerary.length})</span>
        </button>

        <button
          className={`ig-nav-tab-btn ${activeProfileTab === 'badges' ? 'active' : ''}`}
          onClick={() => handleTabClick('badges', 'profile-milestones-section')}
          role="tab"
          aria-selected={activeProfileTab === 'badges'}
        >
          <span className="tab-icon">🎖️</span>
          <span className="tab-label">Badges & Preferences</span>
        </button>
      </div>

      {/* =========================================================================
          POSTS & FEED (GRID VIEW & STREAM VIEW)
          ========================================================================= */}
      <section className="ig-posts-section" id="ig-posts-section" aria-label="User Travel Posts">
          {/* Feed Controls Header */}
          <div className="ig-feed-controls-bar">
            <div className="feed-header-title">
              <h3>Travel Memories & Captured Horizons</h3>
              <span className="feed-subtitle">{posts.length} posts shared with the community</span>
            </div>

            <div className="feed-view-mode-toggle">
              <button
                className={`view-mode-btn ${feedMode === 'grid' ? 'active' : ''}`}
                onClick={() => setFeedMode('grid')}
                title="3x3 Grid View"
              >
                ⊞ Grid
              </button>
              <button
                className={`view-mode-btn ${feedMode === 'feed' ? 'active' : ''}`}
                onClick={() => setFeedMode('feed')}
                title="Stream Feed View"
              >
                ☰ Feed
              </button>
              <button
                className="btn-feed-create-shortcut"
                onClick={() => setIsCreatePostOpen(true)}
              >
                + New Post
              </button>
            </div>
          </div>

          {/* 1. GRID VIEW (CLASSIC 3X3 INSTAGRAM PROFILE GRID) */}
          {feedMode === 'grid' && (
            <div className="ig-photo-grid">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="ig-grid-tile"
                  onClick={() => setSelectedPost(post)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={post.image} alt={post.location} className="ig-grid-thumb" />
                  <div className="ig-grid-overlay">
                    <div className="ig-grid-meta">
                      <span>❤️ {post.likesCount}</span>
                      <span>💬 {post.comments?.length || 0}</span>
                    </div>
                    <span className="ig-grid-location-tag">📍 {post.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. FEED VIEW (VERTICAL INSTAGRAM POST STREAM) */}
          {feedMode === 'feed' && (
            <div className="ig-stream-feed-list">
              {posts.map((post) => (
                <article key={post.id} className="ig-post-card">
                  {/* Post Header */}
                  <div className="ig-post-header">
                    <div className="ig-post-author-box">
                      <div className="ig-post-author-avatar">{post.avatar}</div>
                      <div className="ig-post-author-text">
                        <div className="author-name-line">
                          <strong>{post.author}</strong>
                          <span className="author-handle-micro">{post.handle}</span>
                        </div>
                        <span className="post-location-tag">📍 {post.location}</span>
                      </div>
                    </div>
                    <span className="post-time-stamp">{post.timestamp}</span>
                  </div>

                  {/* Post Media */}
                  <div className="ig-post-media-wrap">
                    <img src={post.image} alt={post.caption} className="ig-post-img" />
                  </div>

                  {/* Post Action Buttons */}
                  <div className="ig-post-action-bar">
                    <div className="post-action-left">
                      <button
                        type="button"
                        className={`btn-ig-action like ${post.isLiked ? 'liked' : ''}`}
                        onClick={() => handleToggleLike(post.id)}
                        title="Like post"
                      >
                        {post.isLiked ? '❤️' : '🤍'}
                      </button>
                      <button
                        type="button"
                        className="btn-ig-action comment"
                        onClick={() => setSelectedPost(post)}
                        title="View comments"
                      >
                        💬
                      </button>
                      <button
                        type="button"
                        className="btn-ig-action share"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(`${post.author}'s post from ${post.location}: "${post.caption}"`);
                          }
                          if (showToast) showToast('🔗 Post link copied to clipboard!');
                        }}
                        title="Share post"
                      >
                        📤
                      </button>
                    </div>

                    <button
                      type="button"
                      className={`btn-ig-action save ${post.saved ? 'saved' : ''}`}
                      onClick={() => handleToggleSave(post.id)}
                      title="Save post"
                    >
                      {post.saved ? '🔖' : '🏷️'}
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="ig-post-likes-line">
                    <strong>{post.likesCount.toLocaleString('en-IN')} likes</strong>
                  </div>

                  {/* Caption */}
                  <div className="ig-post-caption-box">
                    <strong className="caption-author">{post.handle}</strong>{' '}
                    <span className="caption-body">{post.caption}</span>
                  </div>

                  {/* Comments Preview */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="ig-post-comments-preview">
                      {post.comments.map((c) => (
                        <div key={c.id} className="comment-line">
                          <strong className="comment-user">{c.handle || c.user}</strong>{' '}
                          <span className="comment-text">{c.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Add Comment Input */}
                  <div className="ig-add-comment-row">
                    <input
                      type="text"
                      placeholder="Add a comment for the traveler..."
                      value={activeCommentInput[post.id] || ''}
                      onChange={(e) => setActiveCommentInput({ ...activeCommentInput, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                    />
                    <button
                      type="button"
                      className="btn-post-comment"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Post
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      {/* =========================================================================
          POST DETAIL MODAL (LIGHTBOX)
          ========================================================================= */}
      {selectedPost && (
        <div className="modal-backdrop post-lightbox-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="modal-dialog ig-post-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPost(null)}>✕</button>

            <div className="post-lightbox-layout">
              <div className="lightbox-image-side">
                <img src={selectedPost.image} alt={selectedPost.caption} className="lightbox-img" />
              </div>

              <div className="lightbox-details-side">
                {/* Header */}
                <div className="lightbox-header">
                  <div className="ig-post-author-avatar">{selectedPost.avatar}</div>
                  <div>
                    <strong>{selectedPost.author}</strong>
                    <span className="lightbox-location">📍 {selectedPost.location}</span>
                  </div>
                </div>

                {/* Caption & Comments List */}
                <div className="lightbox-comments-scroll">
                  <div className="lightbox-caption-entry">
                    <strong>{selectedPost.handle}</strong>
                    <p>{selectedPost.caption}</p>
                    <span className="caption-date">{selectedPost.timestamp}</span>
                  </div>

                  {selectedPost.comments?.map((c) => (
                    <div key={c.id} className="lightbox-comment-entry">
                      <strong>{c.handle || c.user}</strong>
                      <p>{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Lightbox Footer Actions */}
                <div className="lightbox-footer">
                  <div className="ig-post-action-bar">
                    <div className="post-action-left">
                      <button
                        type="button"
                        className={`btn-ig-action like ${selectedPost.isLiked ? 'liked' : ''}`}
                        onClick={() => handleToggleLike(selectedPost.id)}
                      >
                        {selectedPost.isLiked ? '❤️' : '🤍'}
                      </button>
                      <button
                        type="button"
                        className="btn-ig-action share"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(`${selectedPost.author} at ${selectedPost.location}: ${selectedPost.caption}`);
                          }
                          if (showToast) showToast('🔗 Post link copied!');
                        }}
                      >
                        📤
                      </button>
                    </div>
                    <span className="lightbox-likes-count">❤️ {selectedPost.likesCount}</span>
                  </div>

                  <div className="ig-add-comment-row">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={activeCommentInput[selectedPost.id] || ''}
                      onChange={(e) => setActiveCommentInput({ ...activeCommentInput, [selectedPost.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(selectedPost.id);
                      }}
                    />
                    <button type="button" className="btn-post-comment" onClick={() => handleAddComment(selectedPost.id)}>
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FOLLOWERS INTERACTIVE DIRECTORY MODAL
          ========================================================================= */}
      {isFollowersModalOpen && (
        <div className="modal-backdrop followers-modal-backdrop" onClick={() => setIsFollowersModalOpen(false)}>
          <div className="modal-dialog ig-followers-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ig-dialog-header">
              <h3>Followers ({followersCount})</h3>
              <button className="modal-close-btn" onClick={() => setIsFollowersModalOpen(false)}>✕</button>
            </div>

            <div className="ig-dialog-list">
              {followersList.map((follower) => {
                const isMutual = followingList.includes(follower.id) || Boolean(follower.isFollowing);
                return (
                  <div key={follower.id} className="ig-user-row">
                    <div className="ig-user-avatar-hex">{follower.avatar}</div>
                    <div className="ig-user-meta">
                      <strong>{follower.name}</strong>
                      <span className="ig-user-handle">{follower.handle}</span>
                      <span className="ig-user-role">{follower.role} • 📍 {follower.location}</span>
                    </div>
                    <button
                      type="button"
                      className={`btn-ig-follow-pill ${isMutual ? 'following' : 'follow'}`}
                      onClick={() => {
                        if (onToggleFollow) onToggleFollow(follower.id);
                      }}
                    >
                      {isMutual ? 'Following' : 'Follow Back'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FOLLOWING INTERACTIVE DIRECTORY MODAL
          ========================================================================= */}
      {isFollowingModalOpen && (
        <div className="modal-backdrop following-modal-backdrop" onClick={() => setIsFollowingModalOpen(false)}>
          <div className="modal-dialog ig-followers-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ig-dialog-header">
              <h3>Following ({followingCount})</h3>
              <button className="modal-close-btn" onClick={() => setIsFollowingModalOpen(false)}>✕</button>
            </div>

            <div className="ig-dialog-list">
              {COMMUNITY_EXPLORERS.filter((exp) => followingList.includes(exp.id)).map((exp) => (
                <div key={exp.id} className="ig-user-row">
                  <div className="ig-user-avatar-hex">{exp.avatar}</div>
                  <div className="ig-user-meta">
                    <strong>{exp.name}</strong>
                    <span className="ig-user-handle">{exp.handle}</span>
                    <span className="ig-user-role">{exp.role} • 📍 {exp.location}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-ig-follow-pill following"
                    onClick={() => handleExplorerFollowToggle(exp)}
                  >
                    Following
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          COMMUNITY EXPLORER NETWORK (PRESERVED FOR TEST & NETWORK DISCOVERY)
          ========================================================================= */}
      <section
        className={`community-network-section ${activeProfileTab === 'community' ? 'tab-active' : ''}`}
        id="community-network-section"
      >
        <div className="network-header-bar">
          <div>
            <h3>Community Travel Architects & Explorer Network</h3>
            <p className="network-subtitle">
              Connect with verified high-altitude scouts, eco curators, and transit planners. Follow fellow travelers to sync route inspiration and share itineraries.
            </p>
          </div>

          {/* Filter and Search Bar */}
          <div className="network-controls-cluster">
            <div className="network-search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search creators by name, specialty, location..."
                value={networkSearch}
                onChange={(e) => setNetworkSearch(e.target.value)}
                className="network-search-input"
              />
              {networkSearch && (
                <button className="clear-search-btn" onClick={() => setNetworkSearch('')}>✕</button>
              )}
            </div>

            <div className="network-filter-pills">
              <button
                type="button"
                className={`n-filter-btn ${networkFilter === 'all' ? 'active' : ''}`}
                onClick={() => setNetworkFilter('all')}
              >
                All ({COMMUNITY_EXPLORERS.length})
              </button>
              <button
                type="button"
                className={`n-filter-btn ${networkFilter === 'following' ? 'active' : ''}`}
                onClick={() => setNetworkFilter('following')}
              >
                Following ({followingCount})
              </button>
              <button
                type="button"
                className={`n-filter-btn ${networkFilter === 'recommended' ? 'active' : ''}`}
                onClick={() => setNetworkFilter('recommended')}
              >
                Recommended
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Community Explorer Cards */}
        <div className="community-explorers-grid">
          {filteredExplorers.map((explorer) => {
            const isFollowing = followingList.includes(explorer.id);

            return (
              <div key={explorer.id} className={`explorer-network-card ${isFollowing ? 'is-following' : ''}`}>
                <div className="explorer-card-header">
                  <div className="explorer-avatar-pod">
                    <div className="explorer-avatar-ring">
                      <span className="explorer-initials">{explorer.avatar}</span>
                    </div>
                    <div className="explorer-identity">
                      <h4 className="explorer-name">{explorer.name}</h4>
                      <span className="explorer-handle">{explorer.handle}</span>
                    </div>
                  </div>

                  {/* Live Follow Toggle Button */}
                  <button
                    type="button"
                    className={`btn-follow-toggle ${isFollowing ? 'following' : 'not-following'}`}
                    onClick={() => handleExplorerFollowToggle(explorer)}
                  >
                    <span className="follow-default-text">
                      {isFollowing ? '✓ Following' : '+ Follow'}
                    </span>
                    {isFollowing && <span className="follow-hover-text">Unfollow</span>}
                  </button>
                </div>

                <div className="explorer-role-row">
                  <span className="explorer-role-chip">{explorer.role}</span>
                  <span className="explorer-location-chip">📍 {explorer.location}</span>
                </div>

                <p className="explorer-bio">{explorer.bio}</p>

                <div className="explorer-meta-footer">
                  <div className="explorer-stat-item">
                    <span className="stat-val">{explorer.followersCount.toLocaleString('en-IN')}</span>
                    <span className="stat-lbl">Followers</span>
                  </div>
                  <div className="explorer-stat-item">
                    <span className="stat-val">{explorer.tripsPlanned}</span>
                    <span className="stat-lbl">Trips Engineered</span>
                  </div>
                  <div className="explorer-tags-row">
                    <span className="specialty-badge">{explorer.specialty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Followers Directory List */}
        <div className="followers-directory-subblock">
          <div className="followers-header-bar">
            <div>
              <h3>Travelers Following You ({followersList.length})</h3>
              <p className="followers-subtitle">
                Travelers and adventurers tuned into your route plans, reviews, and passport milestones.
              </p>
            </div>
          </div>

          <div className="followers-list-container">
            {followersList.map((follower) => {
              const isMutual = followingList.includes(follower.id) || Boolean(follower.isFollowing);

              return (
                <div key={follower.id} className="follower-row-card">
                  <div className="follower-avatar-bubble">
                    <span>{follower.avatar}</span>
                  </div>

                  <div className="follower-info-block">
                    <div className="follower-name-row">
                      <h4>{follower.name}</h4>
                      <span className="follower-handle">{follower.handle}</span>
                      {isMutual && <span className="mutual-tag">✦ Mutual Follow</span>}
                    </div>
                    <div className="follower-role-text">{follower.role} • 📍 {follower.location}</div>
                    <p className="follower-bio-snippet">"{follower.bio}"</p>
                  </div>

                  <div className="follower-action-block">
                    <button
                      type="button"
                      className={`btn-follow-toggle ${isMutual ? 'following' : 'not-following'}`}
                      onClick={() => {
                        if (onToggleFollow) onToggleFollow(follower.id);
                      }}
                    >
                      <span className="follow-default-text">
                        {isMutual ? '✓ Following' : '+ Follow Back'}
                      </span>
                      {isMutual && <span className="follow-hover-text">Unfollow</span>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SAVED ITINERARY & TRIPS
          ========================================================================= */}
      <section className="ig-trips-section" id="ig-trips-section" aria-label="Saved Itinerary Plans">
        <div className="ig-trips-header">
          <h3>Planned Horizons & Room Reservations ({myItinerary.length})</h3>
          <button className="btn-ig-manage-trips" onClick={() => onNavigate('trips')}>
            🎒 Open Full Trip Manager
          </button>
        </div>

        {myItinerary.length === 0 ? (
          <div className="ig-empty-trips-card">
            <span className="empty-icon">🎒</span>
            <h4>No Destinations in Active Plan</h4>
            <p>Explore curated horizons and add rooms to your itinerary.</p>
            <button className="btn-ig-primary" onClick={() => onNavigate('explore')}>
              🧭 Explore Catalog
            </button>
          </div>
        ) : (
          <div className="ig-trips-grid">
            {myItinerary.map((item, idx) => (
              <div key={idx} className="ig-trip-card">
                <div className="trip-card-header">
                  <h4>{item.destinationName || item.name}</h4>
                  <span className="trip-nights-badge">⏱️ {item.nights || 2} Nights</span>
                </div>
                <p className="trip-hotel-text">🏨 {item.hotelName || 'Curated Resort'} • {item.roomName || 'Deluxe Room'}</p>
                <div className="trip-card-footer">
                  <span className="trip-price-val">₹{((item.roomPrice || item.price || 5000) * (item.nights || 2)).toLocaleString('en-IN')}</span>
                  <button className="btn-trip-view" onClick={() => onNavigate('trips')}>
                    View Details ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          ACHIEVEMENTS & PREFERENCES DECK
          ========================================================================= */}
      <div
        className="profile-grid-columns"
        id="profile-milestones-section"
      >
        {/* Achievement Badges Matrix */}
        <section className="profile-column-card badges-column">
          <div className="column-header">
            <div className="column-title-group">
              <span className="column-icon">🎖️</span>
              <h3>Travel Milestones & Badges</h3>
            </div>
            <span className="badge-count-tag">
              {achievementBadges.filter(b => b.status === 'Unlocked').length}/{achievementBadges.length} Unlocked
            </span>
          </div>

          <div className="badges-list">
            {achievementBadges.map((badge) => (
              <div key={badge.id} className={`achievement-badge-card ${badge.status === 'Unlocked' ? 'unlocked' : 'locked'}`}>
                <div className="badge-icon-wrap">
                  <span className="b-icon">{badge.icon}</span>
                  <span className={`tier-badge-label tier-${badge.tier.toLowerCase()}`}>{badge.tier}</span>
                </div>
                <div className="badge-content">
                  <div className="badge-header-row">
                    <h4 className="badge-title">{badge.title}</h4>
                    <span className="badge-status-chip">{badge.status}</span>
                  </div>
                  <p className="badge-desc">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Preferences & Settings Panel */}
        <section className="profile-column-card preferences-column">
          <div className="column-header">
            <div className="column-title-group">
              <span className="column-icon">⚙️</span>
              <h3>Traveler Configuration Deck</h3>
            </div>
            <span className="preferences-auto-tag">✦ Syncs Live</span>
          </div>

          {isSavedNotice && (
            <div className="pref-saved-banner">
              ✓ Travel preferences updated in neural profile!
            </div>
          )}

          <form className="preferences-form" onSubmit={handleSavePreferences}>
            <div className="pref-field-group">
              <label htmlFor="pref-stay">Preferred Accommodation Style</label>
              <select
                id="pref-stay"
                value={preferences.stayStyle}
                onChange={(e) => setPreferences({ ...preferences, stayStyle: e.target.value })}
              >
                <option value="Luxury Eco-Resorts & Heritage Palaces">Luxury Eco-Resorts & Heritage Palaces</option>
                <option value="Boutique Hillside Villas & Cottages">Boutique Hillside Villas & Cottages</option>
                <option value="Scenic Coastal Retreats & Private Balconies">Scenic Coastal Retreats & Private Balconies</option>
                <option value="Budget-Friendly Adventure Hostels">Budget-Friendly Adventure Hostels</option>
              </select>
            </div>

            <div className="pref-field-group">
              <label htmlFor="pref-transit">Transit & Connectivity Preference</label>
              <select
                id="pref-transit"
                value={preferences.transitStyle}
                onChange={(e) => setPreferences({ ...preferences, transitStyle: e.target.value })}
              >
                <option value="High-Speed Rail & Scenic Coastal Drives">High-Speed Rail & Scenic Coastal Drives</option>
                <option value="Express Domestic Flights & Airport Transfers">Express Domestic Flights & Airport Transfers</option>
                <option value="Scenic Mountain Road Trips & Hired Cabs">Scenic Mountain Road Trips & Hired Cabs</option>
              </select>
            </div>

            <div className="pref-field-group">
              <label htmlFor="pref-culinary">Culinary Discovery Focus</label>
              <select
                id="pref-culinary"
                value={preferences.culinaryFocus}
                onChange={(e) => setPreferences({ ...preferences, culinaryFocus: e.target.value })}
              >
                <option value="Authentic Local Flavors & Chef Specials">Authentic Local Flavors & Chef Specials</option>
                <option value="Fine Dining & Luxury Heritage Banquets">Fine Dining & Luxury Heritage Banquets</option>
                <option value="Street Food Trails & Night Markets">Street Food Trails & Night Markets</option>
                <option value="Organic Farm-to-Table & Plant-Based Menus">Organic Farm-to-Table & Plant-Based Menus</option>
              </select>
            </div>

            <div className="pref-field-group">
              <label htmlFor="pref-ai">WanderBot AI Concierge Personality</label>
              <select
                id="pref-ai"
                value={preferences.aiPersona}
                onChange={(e) => setPreferences({ ...preferences, aiPersona: e.target.value })}
              >
                <option value="Proactive Concierge & Cultural Historian">Proactive Concierge & Cultural Historian</option>
                <option value="Adventure Navigator & Trail Scout">Adventure Navigator & Trail Scout</option>
                <option value="Budget Optimizer & Savings Specialist">Budget Optimizer & Savings Specialist</option>
                <option value="Luxury Leisure Connoisseur">Luxury Leisure Connoisseur</option>
              </select>
            </div>

            <div className="pref-field-group">
              <label htmlFor="pref-currency">Default Currency Unit</label>
              <select
                id="pref-currency"
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              >
                <option value="INR (₹)">Indian Rupee — INR (₹)</option>
                <option value="USD ($)">US Dollar — USD ($)</option>
                <option value="EUR (€)">Euro — EUR (€)</option>
                <option value="GBP (£)">British Pound — GBP (£)</option>
              </select>
            </div>

            <button type="submit" className="btn-save-preferences">
              Save Traveler Preferences
            </button>
          </form>
        </section>
      </div>

      {/* =========================================================================
          EDIT PROFILE MODAL
          ========================================================================= */}
      {isEditModalOpen && (
        <div className="modal-backdrop edit-profile-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-dialog edit-profile-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsEditModalOpen(false)}
              title="Close Edit Profile"
              aria-label="Close Edit Profile"
            >
              ✕
            </button>

            <div className="edit-profile-header">
              <div className="edit-header-icon">✏️</div>
              <div>
                <h3>Update Traveler Profile</h3>
                <p>Customize your identity, avatar credentials, and passport bio on WanderLust.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfileEdit} className="edit-profile-form">
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="edit-name">Full Name</label>
                  <input
                    type="text"
                    id="edit-name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-handle">Explorer Handle</label>
                  <input
                    type="text"
                    id="edit-handle"
                    value={editForm.handle}
                    onChange={(e) => setEditForm({ ...editForm, handle: e.target.value })}
                    placeholder="@handle"
                    required
                  />
                </div>
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="edit-location">Base Location</label>
                  <input
                    type="text"
                    id="edit-location"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-avatar">Avatar Initials</label>
                  <input
                    type="text"
                    id="edit-avatar"
                    maxLength={3}
                    value={editForm.avatarInitials}
                    onChange={(e) => setEditForm({ ...editForm, avatarInitials: e.target.value.toUpperCase() })}
                    placeholder="AR"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-style">Travel Style / Catchphrase</label>
                <input
                  type="text"
                  id="edit-style"
                  value={editForm.travelStyle}
                  onChange={(e) => setEditForm({ ...editForm, travelStyle: e.target.value })}
                  placeholder="e.g. Luxury Eco-Resorts & High-Speed Transit"
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-bio">Traveler Bio</label>
                <textarea
                  id="edit-bio"
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Share your travel philosophy, milestones, and favorite destinations..."
                />
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modal-save"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
