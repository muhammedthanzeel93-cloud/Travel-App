/**
 * WanderLust Server Data Store
 * In-memory server database initialized with curated travel spots,
 * route infrastructure, social feed posts, and user profile state.
 */

const INITIAL_DESTINATIONS = [
  {
    id: 1,
    title: 'Munnar Tea Valleys & Cloud Beds',
    location: 'Kerala, India',
    state: 'Kerala',
    country: 'India',
    rating: 4.9,
    reviewsCount: 328,
    pricePerDay: 4200,
    tags: ['Hill Station', 'Tea Estates', 'Western Ghats', 'Eco-Tourism'],
    season: 'Winter',
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'Rolling emerald tea hills shrouded in ethereal morning mist, home to Anamudi peak and colonial-era bungalows.',
    recommendedDays: 3,
    bestTimeToVisit: 'September to March',
    altitude: '1,532 m',
    stayDetails: {
      type: 'Luxury Eco-Bungalow',
      rating: 4.8,
      price: '₹4,500/night',
      amenities: ['Tea Plantation View', 'Organic Dining', 'Fireplace', 'Free WiFi']
    }
  },
  {
    id: 2,
    title: 'Zanskar Frozen River & Chadar Trail',
    location: 'Ladakh, India',
    state: 'Ladakh',
    country: 'India',
    rating: 4.95,
    reviewsCount: 412,
    pricePerDay: 7800,
    tags: ['High Altitude', 'Glacier Trek', 'Sub-Zero', 'Himalayas'],
    season: 'Winter',
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'An otherworldly winter expedition traversing the frozen turquoise ice canyon of Zanskar river at -15°C.',
    recommendedDays: 6,
    bestTimeToVisit: 'January to February',
    altitude: '3,850 m',
    stayDetails: {
      type: 'High-Altitude Alpine Dome & Heated Lodge',
      rating: 4.9,
      price: '₹7,200/night',
      amenities: ['Thermal Heating', 'Oxygen Stations', 'Expedition Guides', 'Campfire']
    }
  },
  {
    id: 3,
    title: 'Amer Fort & Royal Jaipur Palaces',
    location: 'Rajasthan, India',
    state: 'Rajasthan',
    country: 'India',
    rating: 4.85,
    reviewsCount: 520,
    pricePerDay: 5400,
    tags: ['Heritage', 'Forts & Palaces', 'Royal History', 'Architecture'],
    season: 'Winter',
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'Majestic red sandstone and marble ramparts overlooking Maota Lake, illuminated by warm winter sunsets.',
    recommendedDays: 3,
    bestTimeToVisit: 'October to March',
    altitude: '431 m',
    stayDetails: {
      type: 'Heritage Haveli Suite',
      rating: 4.7,
      price: '₹5,800/night',
      amenities: ['Courtyard Pool', 'Royal High Tea', 'Spa & Wellness', 'Valet']
    }
  },
  {
    id: 4,
    title: 'Baa Atoll Biosphere & Coral Lagoons',
    location: 'Baa Atoll, Maldives',
    state: 'Baa Atoll',
    country: 'Maldives',
    rating: 4.92,
    reviewsCount: 290,
    pricePerDay: 18500,
    tags: ['Tropical', 'Overwater Villa', 'Manta Rays', 'Scuba Diving'],
    season: 'All-Year',
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'UNESCO Biosphere Reserve boasting crystalline turquoise lagoons and thriving coral sanctuaries.',
    recommendedDays: 5,
    bestTimeToVisit: 'November to April',
    altitude: '1 m',
    stayDetails: {
      type: 'Overwater Sunset Villa',
      rating: 4.95,
      price: '₹22,000/night',
      amenities: ['Direct Lagoon Access', 'Private Plunge Pool', 'Glass Floor Viewing', 'Butler']
    }
  },
  {
    id: 5,
    title: 'Gion Historic Machiya & Lantern Trails',
    location: 'Kyoto, Japan',
    state: 'Kansai',
    country: 'Japan',
    rating: 4.88,
    reviewsCount: 375,
    pricePerDay: 12000,
    tags: ['Cultural Heritage', 'Lanterns', 'Temples', 'Culinary'],
    season: 'All-Year',
    isTrending: false,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Cobblestone streets lined with wooden merchant townhouses, steaming tea ceremonies, and silent zen gardens.',
    recommendedDays: 4,
    bestTimeToVisit: 'Year-round',
    altitude: '50 m',
    stayDetails: {
      type: 'Traditional Luxury Ryokan',
      rating: 4.9,
      price: '₹14,500/night',
      amenities: ['Onsen Hot Springs', 'Kaiseki Dinner', 'Tatami Suites', 'Garden Views']
    }
  }
];

const INITIAL_POSTS = [
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
  }
];

const INITIAL_EXPLORERS = [
  {
    id: 'exp-1',
    name: 'Dr. Sameer Siddiqui',
    handle: '@sameer_peaks',
    role: 'High-Altitude Alpine Scout & Geologist',
    location: 'Dehradun, India',
    followersCount: 3840,
    followingCount: 194,
    avatar: 'SS',
    isFollowing: true,
    isMutual: true
  },
  {
    id: 'exp-2',
    name: 'Elena Rostova',
    handle: '@elena_wanderer',
    role: 'Visual Storyteller & Heritage Documentarian',
    location: 'St. Petersburg / Goa',
    followersCount: 5920,
    followingCount: 280,
    avatar: 'ER',
    isFollowing: true,
    isMutual: true
  },
  {
    id: 'exp-3',
    name: 'Kenji Sato',
    handle: '@kenji_routes',
    role: 'Transit Architect & Sub-Zero Route Specialist',
    location: 'Sapporo / Leh',
    followersCount: 4120,
    followingCount: 145,
    avatar: 'KS',
    isFollowing: false,
    isMutual: false
  },
  {
    id: 'exp-4',
    name: 'Chloe Dupont',
    handle: '@chloe_ecolife',
    role: 'Marine Conservationist & Coral Diver',
    location: 'Marseille / Male',
    followersCount: 2890,
    followingCount: 310,
    avatar: 'CD',
    isFollowing: false,
    isMutual: false
  }
];

const USER_PROFILE = {
  name: 'Aysha Rayan',
  handle: '@aysha_explorer',
  passportId: 'WNDR-2026-X79',
  tier: 'APEX VOYAGER',
  avatarInitials: 'AR',
  location: 'Bangalore, India',
  travelStyle: 'Global Travel Architect & Explorer',
  bio: 'Pioneering high-altitude Himalayan ascents, historic silk roads, and secluded marine sanctuaries. Curating sustainable luxury routes with AI telemetry.',
  followersCount: 1240,
  followingCount: 2,
  postsCount: 3
};

const STORY_HIGHLIGHTS = [
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
  }
];

module.exports = {
  destinations: [...INITIAL_DESTINATIONS],
  posts: [...INITIAL_POSTS],
  explorers: [...INITIAL_EXPLORERS],
  userProfile: { ...USER_PROFILE },
  storyHighlights: [...STORY_HIGHLIGHTS]
};
