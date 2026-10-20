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
  id: 'user-aysha',
  name: 'Aysha Rayan',
  username: 'aysha_explorer',
  handle: '@aysha_explorer',
  passportId: 'WNDR-2026-X79',
  tier: 'APEX VOYAGER',
  avatarInitials: 'AR',
  location: 'Bangalore, India',
  travelStyle: 'Global Travel Architect & Explorer',
  bio: 'Pioneering high-altitude Himalayan ascents, historic silk roads, and secluded marine sanctuaries. Curating sustainable luxury routes with AI telemetry.',
  followersCount: 1240,
  followingCount: 2,
  postsCount: 3,
  password: 'password123'
};

const INITIAL_USERS = [
  {
    id: 'user-aysha',
    username: 'aysha_explorer',
    passportId: 'WNDR-2026-X79',
    name: 'Aysha Rayan',
    password: 'password123',
    tier: 'APEX VOYAGER',
    avatarInitials: 'AR',
    location: 'Bangalore, India',
    travelStyle: 'Global Travel Architect & Explorer',
    bio: 'Pioneering high-altitude Himalayan ascents, historic silk roads, and secluded marine sanctuaries. Curating sustainable luxury routes with AI telemetry.',
    followersCount: 1240,
    followingCount: 2,
    following: ['exp-1', 'exp-2'],
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: 'user-sameer',
    username: 'sameer_peaks',
    passportId: 'WNDR-2026-S12',
    name: 'Dr. Sameer Siddiqui',
    password: 'password123',
    tier: 'GLACIER PATHFINDER',
    avatarInitials: 'SS',
    location: 'Dehradun / Leh, India',
    travelStyle: 'Sub-Zero Glacier Treks & High-Altitude Geology',
    bio: 'Glaciologist and expedition lead mapping uncharted Himalayan corridors and high-altitude frozen passes.',
    followersCount: 3420,
    followingCount: 194,
    following: ['exp-2'],
    createdAt: '2026-02-10T14:30:00.000Z'
  },
  {
    id: 'user-elena',
    username: 'elena_wanderer',
    passportId: 'WNDR-2026-E45',
    name: 'Elena Rostova',
    password: 'password123',
    tier: 'ROYAL CONNOISSEUR',
    avatarInitials: 'ER',
    location: 'Jaipur / Goa, India',
    travelStyle: 'Heritage Palaces & Coastal Sanctuaries',
    bio: 'Documenting architectural marvels, royal havelis, and secluded coastal viewpoints.',
    followersCount: 5920,
    followingCount: 280,
    following: ['exp-1', 'exp-3'],
    createdAt: '2026-03-01T09:15:00.000Z'
  }
];

const USER_ITINERARIES = {
  'user-aysha': [
    {
      destinationId: 1,
      destinationName: 'Munnar Tea Valleys & Cloud Beds',
      region: 'Kerala, India',
      roomName: 'Deluxe Valley View Room',
      roomPrice: 5200,
      nights: 3,
      guests: '2 Adults'
    },
    {
      destinationId: 2,
      destinationName: 'Zanskar Frozen River & Chadar Trail',
      region: 'Ladakh, India',
      roomName: 'Stargazer Glamping Geodesic Dome',
      roomPrice: 5500,
      nights: 4,
      guests: '2 Adults'
    }
  ],
  'user-sameer': [
    {
      destinationId: 2,
      destinationName: 'Zanskar Frozen River & Chadar Trail',
      region: 'Ladakh, India',
      roomName: 'High-Altitude Alpine Dome & Heated Lodge',
      roomPrice: 7200,
      nights: 6,
      guests: '2 Adults'
    }
  ],
  'user-elena': [
    {
      destinationId: 3,
      destinationName: 'Amer Fort & Royal Jaipur Palaces',
      region: 'Rajasthan, India',
      roomName: 'Heritage Haveli Suite',
      roomPrice: 5800,
      nights: 4,
      guests: '2 Adults'
    }
  ]
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

const INITIAL_PACKAGES = [
  {
    id: 'pkg-1',
    title: '4-Day Western Ghats Mist & High-Altitude Tea Trail',
    tagline: 'High-altitude cloud valleys, sunrise peaks & luxury heritage eco-bungalows',
    creatorId: 'user-sameer',
    creatorName: 'Dr. Sameer Siddiqui',
    creatorHandle: '@sameer_peaks',
    creatorAvatar: 'SS',
    creatorRole: 'Western Ghats Specialist & Glaciologist',
    category: 'Winter Hill Station',
    seasonBadge: '❄️ Winter Chill & Mist',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    nightsCount: 3,
    price: 18500,
    originalPrice: 22000,
    pricingDetails: {
      basePrice: 18500,
      currency: 'INR (₹)',
      pricePerPerson: true,
      stayCost: 11500,
      transitCost: 3500,
      activitiesCost: 2500,
      taxesFees: 1000,
      inclusions: [
        '3 Nights in Tea County Heritage Eco-Resort',
        'Private 4x4 Transit from Kochi Airport/Station',
        'Guided Sunrise Trek to Top Station Panorama',
        'Eravikulam National Park Safari Passes',
        'Authentic Malabar Feast & Spiced Tea Tastings'
      ],
      exclusions: [
        'Flight/Train Fares to Kochi',
        'Personal Souvenirs & Alcoholic Beverages'
      ]
    },
    destinationsCovered: ['Munnar', 'Lockhart Gap', 'Top Station', 'Anamudi Peak'],
    primaryDestinationId: 'munnar-kerala',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    rating: 4.92,
    reviewsCount: 148,
    bookingsCount: 312,
    tags: ['Winter Mist', 'Eco-Luxury Stay', 'Guided Trek', 'All-Inclusive'],
    highlights: [
      '360° Cloud Bed Sunrise at Top Station (1,880m)',
      'Colonial Tea Factory Tour & Artisanal Leaf Tasting',
      'Nilgiri Tahr Sighting at Eravikulam Sanctuary',
      'Campfire Dinner with Cardamom Spiced Tea'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Ascent to Emerald Valleys & Colonial Welcome',
        morning: 'Scenic highway drive from Kochi via Cheeyappara waterfalls.',
        afternoon: 'Check-in to Tea County Heritage Eco-Resort. Valley-view high tea.',
        evening: 'Sunset stroll at Lockhart Gap and Malabar dinner.',
        stay: 'Tea County Heritage Resort & Spa (Deluxe Valley Room)',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Dawn Above Clouds & Tea Processing Secrets',
        morning: '5:30 AM 4x4 expedition to Top Station for sea-of-clouds sunrise.',
        afternoon: 'Colonial KDHP tea factory tour and master brewing session.',
        evening: 'Lakeside campfire by Mattupetty Lake.',
        stay: 'Tea County Heritage Resort & Spa',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Nilgiri Wildlife Sanctuary & Anamudi Foothills',
        morning: 'Guided safari in Eravikulam National Park.',
        afternoon: 'Lunch at Rapsy Restaurant and spice bazaar walk.',
        evening: 'Ayurvedic wellness rejuvenation and plantation dinner.',
        stay: 'Tea County Heritage Resort & Spa',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Attukal Cascades & Return Corridor',
        morning: 'Attukal waterfalls visit and fresh tea shopping.',
        afternoon: 'Scenic transfer back to Kochi airport/railway station.',
        evening: 'Expedition concludes.',
        stay: null,
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-2',
    title: '6-Day Zanskar Frozen Gorge & Chadar Expedition',
    tagline: 'World-famous sub-zero glacier canyon traversal across frozen Zanskar river',
    creatorId: 'user-sameer',
    creatorName: 'Dr. Sameer Siddiqui',
    creatorHandle: '@sameer_peaks',
    creatorAvatar: 'SS',
    creatorRole: 'Western Ghats Specialist & Glaciologist',
    category: 'High Altitude & Snow',
    seasonBadge: '🏔️ Sub-Zero Chadar',
    duration: '6 Days / 5 Nights',
    daysCount: 6,
    nightsCount: 5,
    price: 38000,
    originalPrice: 45000,
    pricingDetails: {
      basePrice: 38000,
      currency: 'INR (₹)',
      pricePerPerson: true,
      stayCost: 20000,
      transitCost: 6500,
      activitiesCost: 9500,
      taxesFees: 2000,
      inclusions: [
        '2 Nights Heated Lodge in Leh + 3 Nights Thermal Alpine Domes',
        'Certified High-Altitude Glaciologist & Porter Support',
        'Sub-Zero Crampons, Insulated Sleeping Bags & Oxygen Cylinders',
        'ALSA Permits & Wildlife Conservation Passes',
        'All High-Calorie Alpine Meals & Hot Soups'
      ],
      exclusions: [
        'Leh Flight Airfare',
        'Personal Cold-Weather Outerwear (Gore-Tex Down Jackets)'
      ]
    },
    destinationsCovered: ['Leh', 'Chilling', 'Tibb Cave', 'Nerak Frozen Waterfall'],
    primaryDestinationId: 'zanskar-valley-ladakh',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.96,
    reviewsCount: 89,
    bookingsCount: 164,
    tags: ['Sub-Zero Trek', 'Glacier Ice', 'Crampon Expeditions', 'High Adventure'],
    highlights: [
      'Walking on translucent turquoise river ice at -14°C',
      'The majestic 50-foot Nerak Frozen Waterfall',
      'Stargazing in pristine Bortle 1 high-altitude dark skies',
      'Thermal dome stays with wood-fired bukhari stoves'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Acclimatization in Leh (3,500m)',
        morning: 'Arrive at Leh Kushok Bakula Airport. Strict rest for acclimatization.',
        afternoon: 'Gentle walk through Leh Old Town and Shanti Stupa.',
        evening: 'Briefing with glaciologist team and gear inspection.',
        stay: 'The Grand Dragon Heated Luxury Lodge, Leh',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Scenic Drive to Chilling & Ice Step-Out',
        morning: 'Drive alongside the confluence of Indus and Zanskar rivers.',
        afternoon: 'First step onto the Chadar ice sheet at Chilling base camp.',
        evening: 'Camp setup and hot butter tea in heated mess tent.',
        stay: 'Chadar Expedition Alpine Camp (Tilat Do)',
        mealsIncluded: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 3,
        title: 'Deep Canyon Trek to Gyalpo & Tibb Caves',
        morning: 'Trekking through towering 600m granite walls on crystal ice.',
        afternoon: 'Crossing natural ice bridges with crampons.',
        evening: 'Cave campfire and local Ladakhi thukpa noodle dinner.',
        stay: 'Tibb Cave High-Altitude Dome',
        mealsIncluded: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 4,
        title: 'The Iconic Nerak Frozen Waterfall Finale',
        morning: 'Hike to the legendary Nerak waterfall frozen solid in turquoise ice.',
        afternoon: 'Photography at the ice cascade and hot ginger tea.',
        evening: 'Celebration dinner at Nerak village shelter.',
        stay: 'Nerak Village Alpine Shelter',
        mealsIncluded: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 5,
        title: 'Return Trail across Chilling Gorge',
        morning: 'Return trek observing changing ice formations.',
        afternoon: 'Transfer back to warm luxury hotel in Leh.',
        evening: 'Hot stone bath and traditional Ladakhi feast.',
        stay: 'The Grand Dragon Heated Luxury Lodge, Leh',
        mealsIncluded: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 6,
        title: 'Himalayan Flight Departure',
        morning: 'Sunrise view of Stok Kangri range and airport transfer.',
        afternoon: 'Flight departure.',
        evening: 'Expedition concludes.',
        stay: null,
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-3',
    title: '4-Day Royal Rajasthan Palaces & Desert Sunset Trail',
    tagline: 'Mughal sandstone ramparts, golden sunsets & candlelit heritage haveli suites',
    creatorId: 'user-elena',
    creatorName: 'Elena Rostova',
    creatorHandle: '@elena_wanderer',
    creatorAvatar: 'ER',
    creatorRole: 'Coastal & Heritage Architecture Connoisseur',
    category: 'Heritage & Palaces',
    seasonBadge: '🏰 Golden Winter Season',
    duration: '4 Days / 3 Nights',
    daysCount: 4,
    nightsCount: 3,
    price: 24500,
    originalPrice: 29000,
    pricingDetails: {
      basePrice: 24500,
      currency: 'INR (₹)',
      pricePerPerson: true,
      stayCost: 15500,
      transitCost: 4000,
      activitiesCost: 3800,
      taxesFees: 1200,
      inclusions: [
        '3 Nights in Samode Haveli / Heritage Palace Suite',
        'Chauffeured Luxury Vintage Car Transfers',
        'VIP Access to Amer Fort Sheesh Mahal & City Palace Royal Quarters',
        'Sunset High Tea on Nahargarh Fort Ramparts',
        'Curated Royal Rajput Thali Dinners with Folk Performances'
      ],
      exclusions: [
        'Personal Airfare/Train to Jaipur',
        'Custom Jewelry & Textile Purchases'
      ]
    },
    destinationsCovered: ['Jaipur', 'Amer Fort', 'Nahargarh', 'Jal Mahal'],
    primaryDestinationId: 'jaipur-rajasthan',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    reviewsCount: 204,
    bookingsCount: 410,
    tags: ['Royal Heritage', 'Palace Suites', 'Cultural Sunset', 'Luxury Haveli'],
    highlights: [
      'Private sunset tea overlooking Jaipur from Nahargarh ramparts',
      'Exclusive nighttime illuminations of Jal Mahal palace in the water',
      'Artisanal block printing workshop with master craftsmen',
      'Royal dining in a 250-year-old marble palace courtyard'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in the Pink City & Haveli Welcome',
        morning: 'Airport pick-up in vintage chauffeur car to Samode Haveli.',
        afternoon: 'Check-in, refreshing rose petal welcome drink & courtyard lunch.',
        evening: 'Sunset high tea atop Nahargarh Fort overlooking the glowing city.',
        stay: 'Samode Heritage Haveli Suite',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Amer Fort Splendor & Sheesh Mahal Reflections',
        morning: 'Morning excursion to Amer Fort and private guide through the Hall of Mirrors.',
        afternoon: 'Stop by Jal Mahal water palace & lunch at 1135 AD royal restaurant.',
        evening: 'Sound & Light spectacle at Amer Fort.',
        stay: 'Samode Heritage Haveli Suite',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'City Palace Curators & Johari Bazaar Gems',
        morning: 'Exclusive tour of City Palace Chandra Mahal private royal quarters.',
        afternoon: 'Heritage walk through Johari Bazaar with gemology master.',
        evening: 'Candlelit Rajasthani feast with live sarangi & sitar recitals.',
        stay: 'Samode Heritage Haveli Suite',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Hawa Mahal Dawn & Regal Farewell',
        morning: 'Early morning coffee across from Hawa Mahal wind facade.',
        afternoon: 'Artisan souvenir collection & transfer to Jaipur International Airport.',
        evening: 'Tour concludes.',
        stay: null,
        mealsIncluded: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-4',
    title: '5-Day Baa Atoll Biosphere & Overwater Lagoon Retreat',
    tagline: 'Solar-powered overwater villas, private manta ray encounters & pristine house reefs',
    creatorId: 'user-chloe',
    creatorName: 'Chloe Dupont',
    creatorHandle: '@chloe_ecolife',
    creatorAvatar: 'CD',
    creatorRole: 'Sustainable Eco-Resort & Tea Estate Curator',
    category: 'Tropical & Coastal',
    seasonBadge: '🌴 Warm Winter Lagoon',
    duration: '5 Days / 4 Nights',
    daysCount: 5,
    nightsCount: 4,
    price: 64000,
    originalPrice: 78000,
    pricingDetails: {
      basePrice: 64000,
      currency: 'INR (₹)',
      pricePerPerson: true,
      stayCost: 44000,
      transitCost: 10000,
      activitiesCost: 7500,
      taxesFees: 2500,
      inclusions: [
        '4 Nights in Solar Overwater Sunset Villa with Private Plunge Pool',
        'Round-trip Scenic Seaplane Transfers from Malé (Velana)',
        'Guided Manta Ray & Whale Shark Snorkeling with Marine Biologist',
        'Daily Organic Gourmet Breakfast & Sunset Lagoon Canapés',
        'Complimentary Stand-Up Paddleboards, Kayaks & Coral Reef Gear'
      ],
      exclusions: [
        'International Flights to Malé',
        'PADI Scuba Certification Courses'
      ]
    },
    destinationsCovered: ['Baa Atoll', 'Hanifaru Bay', 'Dharavandhoo Island'],
    primaryDestinationId: 'maldives-atoll',
    coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    reviewsCount: 112,
    bookingsCount: 228,
    tags: ['Overwater Villa', 'Marine Sanctuary', 'Seaplane', 'Eco-Luxury'],
    highlights: [
      'Snorkeling alongside gentle giant manta rays in Hanifaru Bay',
      'Direct steps from villa sundeck into crystal 28°C turquoise lagoons',
      'Zero single-use plastics and 100% solar-powered resort operations',
      'Private sunset sandbank dinner under equatorial constellations'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival over Atoll Archipelagos',
        morning: 'Board scenic seaplane at Malé flying over emerald atoll rings.',
        afternoon: 'Step onto jetty welcome. Check-in to Overwater Sunset Villa.',
        evening: 'Sunset barefoot dinner on the white sand shore.',
        stay: 'Soneva Fushi / Baa Atoll Eco-Overwater Villa',
        mealsIncluded: 'Dinner'
      },
      {
        day: 2,
        title: 'Hanifaru Bay Manta Ray Expedition',
        morning: 'Boat expedition with resident marine biologist to UNESCO Hanifaru Bay.',
        afternoon: 'Snorkel with feeding mantas along the outer reef wall.',
        evening: 'Cocktails over water with coral reef illumination.',
        stay: 'Baa Atoll Eco-Overwater Villa',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Coral Restoration & Turtle Sanctuary',
        morning: 'Adopt and plant a coral fragment at the reef nursery.',
        afternoon: 'Guided sea turtle safari along the island drop-off.',
        evening: 'Stargazing session at the overwater astronomical observatory.',
        stay: 'Baa Atoll Eco-Overwater Villa',
        mealsIncluded: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Deserted Sandbank Picnic & Wellness Spa',
        morning: 'Private boat drop on a pristine uninhabited sandbank.',
        afternoon: 'Ayurvedic ocean massage and stand-up paddleboarding.',
        evening: 'Chef special Maldivian grilled catch under candlelight.',
        stay: 'Baa Atoll Eco-Overwater Villa',
        mealsIncluded: 'Breakfast, Lunch & Dinner'
      },
      {
        day: 5,
        title: 'Farewell Lagoon Swim & Seaplane Return',
        morning: 'Sunrise lagoon swim directly from bedroom deck.',
        afternoon: 'Scenic seaplane return transfer to Malé airport.',
        evening: 'Departure.',
        stay: null,
        mealsIncluded: 'Breakfast'
      }
    ]
  }
];

const INITIAL_FAVORITES = [
  {
    id: 'fav-1',
    destinationId: 'munnar-kerala',
    name: 'Munnar',
    region: 'Kerala, India',
    category: 'Hill Station & Nature',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    recommendationNote: 'Waking up at 5:30 AM to catch the cloud bed rolling over Lockhart Gap is pure magic! Pair it with fresh spiced cardamom tea at Top Station.',
    highlightTag: '🌅 Cloud Beds & Tea Mist',
    recommendedSeason: 'Winter (Nov - Feb)',
    pinnedAt: 'Pinned by Traveler',
    mustVisitSpots: ['Top Station', 'KDHP Tea Museum', 'Rapsy Restaurant']
  },
  {
    id: 'fav-2',
    destinationId: 'zanskar-valley-ladakh',
    name: 'Zanskar Valley, Ladakh',
    region: 'Ladakh, India',
    category: 'High Altitude & Snow',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    recommendationNote: 'The sheer silence of the frozen Chadar river canyon at -14°C is humbling. Nothing on Earth compares to walking on turquoise river ice.',
    highlightTag: '❄️ Sub-Zero Glacier Trek',
    recommendedSeason: 'January - February',
    pinnedAt: 'Pinned by Traveler',
    mustVisitSpots: ['Nerak Frozen Waterfall', 'Chilling Gorge', 'Tibb Cave']
  },
  {
    id: 'fav-3',
    destinationId: 'jaipur-rajasthan',
    name: 'Amer Fort, Jaipur',
    region: 'Rajasthan, India',
    category: 'Heritage & Palaces',
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    recommendationNote: 'Sunset high tea on the Nahargarh Fort ramparts looking over the glowing Pink City. Make sure to visit Sheesh Mahal at golden hour.',
    highlightTag: '🏰 Royal Ramparts & Golden Hour',
    recommendedSeason: 'October - March',
    pinnedAt: 'Pinned by Traveler',
    mustVisitSpots: ['Sheesh Mahal', 'Nahargarh Ramparts', 'Jal Mahal']
  }
];

module.exports = {
  destinations: [...INITIAL_DESTINATIONS],
  posts: [...INITIAL_POSTS],
  explorers: [...INITIAL_EXPLORERS],
  userProfile: { ...USER_PROFILE },
  storyHighlights: [...STORY_HIGHLIGHTS],
  packages: [...INITIAL_PACKAGES],
  favoritePlaces: [...INITIAL_FAVORITES],
  users: [...INITIAL_USERS],
  userItineraries: { ...USER_ITINERARIES }
};
