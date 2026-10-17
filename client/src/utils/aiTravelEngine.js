/**
 * AI Travel Concierge Response & Planning Engine
 * Powers WanderBot - the intelligent travel planning assistant for WanderLust.
 * Supports customized multi-day itinerary generation, intelligent destination matching,
 * budget recommendations, packing checklists, and context-aware travel guidance.
 */

// Helper to sanitize and normalize text for keyword matching
export function normalizeText(text) {
  return (text || '').toLowerCase().trim();
}

/**
 * Format currency in Indian Rupees style (INR)
 */
export function formatCurrency(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

/**
 * Curated Travel Vibes / Styles for Destination Selection
 */
export const TRAVEL_VIBES = [
  {
    id: 'hills-nature',
    label: '🌲 Hill Stations & Nature',
    icon: '🌲',
    categoryKeyword: 'Hill',
    description: 'Crisp mountain air, rolling tea estates, waterfalls and mist-covered peaks',
    keywords: ['hill', 'mountain', 'nature', 'mist', 'altitude', 'tea', 'valley', 'cool', 'fog']
  },
  {
    id: 'tropical-beach',
    label: '🏖️ Tropical Beaches & Islands',
    icon: '🏖️',
    categoryKeyword: 'Beach',
    description: 'Turquoise lagoons, overwater villas, coral reefs, and sunset boat cruises',
    keywords: ['beach', 'island', 'tropical', 'ocean', 'sea', 'coast', 'reef', 'snorkeling', 'scuba']
  },
  {
    id: 'heritage-culture',
    label: '🏛️ Royal Heritage & Culture',
    icon: '🏛️',
    categoryKeyword: 'Heritage',
    description: 'Centuries-old forts, grand palaces, royal dining, and artisan bazaars',
    keywords: ['heritage', 'royal', 'palace', 'culture', 'historic', 'fort', 'temple', 'nizam', 'maharaja']
  },
  {
    id: 'high-adventure',
    label: '🏔️ High Altitude & Adventure',
    icon: '🏔️',
    categoryKeyword: 'Adventure',
    description: 'Glacial passes, remote cliffside monasteries, starry skies and untamed wilderness',
    keywords: ['adventure', 'trek', 'glacier', 'altitude', 'expedition', 'hike', 'climb', 'pass', 'monastery']
  },
  {
    id: 'romantic-couples',
    label: '💖 Romantic & Honeymoon',
    icon: '💖',
    categoryKeyword: 'Honeymoon',
    description: 'Private cave plunge pools, candlelit garden dining, and secluded sunset vistas',
    keywords: ['romantic', 'honeymoon', 'couple', 'anniversary', 'intimate', 'candlelight', 'sunset']
  }
];

/**
 * Budget Tier Presets
 */
export const BUDGET_TIERS = [
  {
    id: 'economy',
    label: 'Economy (< ₹10,000/night)',
    maxPrice: 10000,
    desc: 'Value boutique rooms, local culinary hubs & smart transit'
  },
  {
    id: 'comfort',
    label: 'Premium Comfort (₹10,000 - ₹25,000/night)',
    maxPrice: 25000,
    desc: '4-5★ scenic resorts with private balconies & included breakfast'
  },
  {
    id: 'luxury',
    label: 'Ultra Luxury (> ₹25,000/night)',
    maxPrice: Infinity,
    desc: 'Presidential palace suites, overwater villas, private plunge pools & butler service'
  }
];

/**
 * Trip Duration Options
 */
export const DURATION_OPTIONS = [
  { days: 2, label: '2 Days (Weekend Escape)' },
  { days: 3, label: '3 Days (Classic Retreat)' },
  { days: 4, label: '4 Days (Immersive Journey)' },
  { days: 5, label: '5 Days (Grand Expedition)' }
];

/**
 * Companion Types
 */
export const COMPANION_OPTIONS = [
  { id: 'Couple', label: 'Couple / Honeymoon', icon: '💑' },
  { id: 'Solo Explorer', label: 'Solo Explorer', icon: '🎒' },
  { id: 'Family', label: 'Family with Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'Friends', label: 'Group of Friends', icon: '👥' }
];

/**
 * Get context-sensitive quick suggestion chips
 */
export function getQuickPrompts(destination = null, itinerary = []) {
  if (destination) {
    return [
      `🗓️ Plan 3-Day Custom Itinerary for ${destination.name}`,
      `🎒 What should I pack for ${destination.name}?`,
      `🌅 Best sunrise & viewpoints in ${destination.name}`,
      `🍲 Top food spots & local specialties`,
      `🏨 Recommend best room at ${destination.stayDetails?.hotelName?.split(' ')[0] || 'hotel'}`,
      `🚗 How to reach ${destination.name}?`
    ];
  }

  const prompts = [
    '✨ Plan a 3-Day Custom Itinerary',
    '🧭 Help Me Select a Destination',
    '💖 Romantic Honeymoon Custom Plan',
    '🌲 Best hill stations for a cool retreat',
    '🏖️ Tropical island & beach getaways',
    '💰 Budget trip recommendations under ₹20,000'
  ];

  if (itinerary.length > 0) {
    prompts.unshift(`💼 Review my current ${itinerary.length}-stop travel plan`);
  }

  return prompts;
}

/**
 * AI Destination Matchmaker Engine
 * Evaluates destination catalog against user preferences: vibe, budget tier, duration, companions.
 * Returns ranked destinations with % match score and personalized reasoning.
 */
export function findDestinationMatches({
  vibe = 'hills-nature',
  budgetTier = 'comfort',
  durationDays = 3,
  companions = 'Couple',
  destinations = []
}) {
  if (!destinations || destinations.length === 0) return [];

  const selectedVibeObj = TRAVEL_VIBES.find((v) => v.id === vibe) || TRAVEL_VIBES[0];
  const targetBudget = BUDGET_TIERS.find((b) => b.id === budgetTier) || BUDGET_TIERS[1];

  const scored = destinations.map((dest) => {
    let score = 70; // baseline score
    const reasons = [];

    const normCat = normalizeText(dest.category || '');
    const normTagline = normalizeText(dest.tagline || '');
    const normTags = (dest.travelFeatures?.travelTags || []).map(normalizeText).join(' ');

    // 1. Vibe Keyword Matching
    const matchedVibe = selectedVibeObj.keywords.some(
      (kw) => normCat.includes(kw) || normTagline.includes(kw) || normTags.includes(kw)
    );
    if (matchedVibe) {
      score += 16;
      reasons.push(`Perfect match for ${selectedVibeObj.label.replace(/^[^\s]+\s/, '')}`);
    } else {
      reasons.push(`Diverse experiences aligned with ${dest.category || 'Travel'}`);
    }

    // 2. Budget Tier Compatibility
    const basePrice = dest.price || 5000;
    if (targetBudget.id === 'economy') {
      if (basePrice <= 10000) {
        score += 8;
        reasons.push(`Affordable stay rates from ${formatCurrency(basePrice)}/night`);
      } else {
        score -= 6;
      }
    } else if (targetBudget.id === 'luxury') {
      if (basePrice >= 14000) {
        score += 8;
        reasons.push(`World-class 5-star luxury at ${dest.stayDetails?.hotelName || 'Luxury Resort'}`);
      } else {
        score += 2;
      }
    } else {
      // Comfort
      score += 7;
      reasons.push(`Verified hospitality at ${dest.stayDetails?.hotelName || 'Boutique Resort'}`);
    }

    // 3. Companion compatibility (Reviews check)
    const matchingReviews = (dest.reviews || []).filter(
      (r) => normalizeText(r.travelerType).includes(normalizeText(companions))
    );
    if (matchingReviews.length > 0) {
      score += 5;
      reasons.push(`Highly praised by fellow ${companions} travelers (${dest.rating}★ rating)`);
    } else {
      reasons.push(`Rated ${dest.rating}★ across ${dest.reviewCount || 100}+ guest reviews`);
    }

    // 4. Trending boost
    if (dest.isTrending) {
      score += 3;
    }

    // Duration alignment
    const idealDuration = dest.travelFeatures?.idealStayDuration || '3 - 4 Days';
    reasons.push(`Optimal trip length: ${idealDuration} (Fits your ${durationDays}-day schedule)`);

    // Pick recommended room
    const rooms = dest.hotelRooms || [];
    let recommendedRoom = rooms[0] || { name: 'Deluxe Room', pricePerNight: dest.price || 5000, capacity: '2 Adults' };
    if (targetBudget.id === 'luxury' && rooms.length > 1) {
      recommendedRoom = rooms[rooms.length - 1];
    } else if (targetBudget.id === 'comfort' && rooms.length > 1) {
      recommendedRoom = rooms[1] || rooms[0];
    }

    // Clamp score between 72% and 99%
    const finalScore = Math.min(99, Math.max(72, score));

    return {
      destination: dest,
      matchScore: finalScore,
      matchReasons: reasons.slice(0, 3),
      recommendedRoom,
      vibe: selectedVibeObj.label
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Generates an end-to-end customized itinerary for a destination with day-by-day plans,
 * recommended hotel room, and an itemized budget calculation.
 */
export function generateCustomItinerary({
  destination = null,
  destinationId = null,
  durationDays = 3,
  tripVibe = 'hills-nature',
  budgetTier = 'comfort',
  companions = 'Couple',
  destinations = []
}) {
  let targetDest = destination;
  if (!targetDest && destinationId && destinations.length > 0) {
    targetDest = destinations.find((d) => d.id === destinationId);
  }
  if (!targetDest && destinations.length > 0) {
    const matches = findDestinationMatches({ vibe: tripVibe, budgetTier, durationDays, companions, destinations });
    targetDest = matches[0]?.destination || destinations[0];
  }
  if (!targetDest) return null;

  const daysCount = Math.max(1, Math.min(7, Number(durationDays) || 3));
  const nights = daysCount; // Stays cover the days duration

  // Select optimal hotel room based on budget tier
  const rooms = targetDest.hotelRooms || [];
  let selectedRoom = rooms[0] || {
    id: `rm-${targetDest.id}-default`,
    name: 'Deluxe Suite',
    pricePerNight: targetDest.price || 6000,
    capacity: '2 Adults',
    amenities: ['Breakfast Buffet', 'Ensuite Bath', 'High-speed Wi-Fi']
  };

  if (budgetTier === 'luxury' && rooms.length > 1) {
    selectedRoom = rooms[rooms.length - 1];
  } else if (budgetTier === 'comfort' && rooms.length > 1) {
    selectedRoom = rooms[1] || rooms[0];
  }

  const spots = targetDest.famousSpots || ['Local Heritage Square', 'Botanical Gardens', 'Cultural Museum'];
  const foods = targetDest.foodSpots || ['Regional Specialty Restaurant', 'Sunset Bistro', 'Artisanal Cafe'];
  const views = targetDest.viewpoints || ['Panoramic Ridge Lookout', 'Sunset Observation Point'];
  const activities = targetDest.travelFeatures?.popularActivities || ['Guided Walking Exploration', 'Scenic Photography'];

  // Construct Day-by-Day Customized Plan
  const dailyPlan = [];
  for (let i = 1; i <= daysCount; i++) {
    const spotIdx = (i - 1) % spots.length;
    const nextSpotIdx = i % spots.length;
    const viewIdx = (i - 1) % views.length;
    const foodIdx = (i - 1) % foods.length;
    const nextFoodIdx = i % foods.length;
    const actIdx = (i - 1) % activities.length;

    let dayTitle = `Day ${i}: Exploration & Discovery`;
    let theme = 'Highlights & Local Flavors';

    if (i === 1) {
      dayTitle = `Day 1: Arrival, Check-in & Scenic Horizons`;
      theme = 'Settling In, Welcome Refreshments & Sunset Vistas';
    } else if (i === daysCount && daysCount > 1) {
      dayTitle = `Day ${i}: Morning Trails, Souvenirs & Departure`;
      theme = 'Leisurely Breakfast, Final Panoramic Walk & Farewell';
    } else if (i === 2) {
      dayTitle = `Day 2: Signature Landmarks & Cultural Immersion`;
      theme = 'Iconic Attractions, Local Cuisine & Twilight Charm';
    } else if (i === 3) {
      dayTitle = `Day 3: Deep Nature Trails & Gourmet Dining`;
      theme = 'Off-the-Beaten-Path Viewpoints & Signature Meals';
    }

    const morningPlan = i === 1
      ? `Check-in at ${targetDest.stayDetails?.hotelName || 'your resort'}, settle into your ${selectedRoom.name}, and enjoy fresh welcome beverages.`
      : `Golden hour sunrise walk at ${views[viewIdx] || 'Scenic Lookout'}, followed by artisan breakfast at the resort.`;

    const afternoonPlan = `Immerse in ${spots[spotIdx] || 'signature landmark'}. Relish an authentic lunch featuring ${foods[foodIdx]?.split('(')[0] || 'local delicacies'}. Experience ${activities[actIdx] || 'local guided sightseeing'}.`;

    const eveningPlan = i === daysCount
      ? `Final stroll along ${views[nextSpotIdx] || 'the town promenade'}, souvenir shopping, and sunset dinner before departure.`
      : `Visit ${views[viewIdx] || 'sunset point'} for panoramic dusk colors. Candlelit dinner tasting at ${foods[nextFoodIdx] || foods[foodIdx] || 'fine dining restaurant'}.`;

    dailyPlan.push({
      dayNumber: i,
      title: dayTitle,
      theme,
      morning: morningPlan,
      afternoon: afternoonPlan,
      evening: eveningPlan,
      spotHighlight: spots[spotIdx] || 'Iconic Sight',
      culinaryHighlight: foods[foodIdx] || 'Regional Cuisine'
    });
  }

  // Cost estimates
  const stayCost = selectedRoom.pricePerNight * nights;
  const travelersMultiplier = companions === 'Solo Explorer' ? 1 : (companions === 'Family' ? 3 : 2);
  const estimatedMeals = 1400 * daysCount * travelersMultiplier;
  const estimatedTransitActivities = 1000 * daysCount * travelersMultiplier;
  const grandEstimatedBudget = stayCost + estimatedMeals + estimatedTransitActivities;

  const itineraryTitle = `${daysCount}-Day ${companions} Customized Journey in ${targetDest.name}`;

  const actionableItem = {
    destinationId: targetDest.id,
    destinationName: targetDest.name,
    region: targetDest.region,
    hotelName: targetDest.stayDetails?.hotelName || 'Luxury Resort',
    roomName: selectedRoom.name,
    roomPrice: selectedRoom.pricePerNight,
    nights: nights,
    totalPrice: stayCost,
    image: targetDest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    guests: selectedRoom.capacity || `${travelersMultiplier} Travelers`,
    aiCustomItinerary: {
      title: itineraryTitle,
      durationDays: daysCount,
      vibe: tripVibe,
      companions,
      dailyPlan
    }
  };

  return {
    title: itineraryTitle,
    destination: targetDest,
    durationDays: daysCount,
    nights,
    companions,
    vibe: tripVibe,
    selectedRoom,
    dailyPlan,
    estimatedBudget: {
      stayCost,
      estimatedMeals,
      estimatedTransitActivities,
      grandTotal: grandEstimatedBudget
    },
    actionableItem
  };
}

/**
 * Generate intelligent, rich response based on query, available destinations,
 * active destination context, and user's itinerary.
 */
export function generateAIResponse({ query, destinations = [], currentDestination = null, itinerary = [] }) {
  const q = normalizeText(query);
  const actions = [];

  // 1. If active destination context is provided (e.g. within DestinationModal)
  if (currentDestination) {
    return generateDestinationSpecificResponse(q, currentDestination, actions);
  }

  // 2. Check if user is asking to CREATE A CUSTOM ITINERARY
  const isItineraryRequest = (
    q.includes('plan') ||
    q.includes('itinerary') ||
    q.includes('schedule') ||
    q.includes('custom') ||
    q.includes('day trip') ||
    q.includes('3-day') ||
    q.includes('2-day') ||
    q.includes('4-day') ||
    q.includes('5-day')
  ) && !q.includes('review') && !q.includes('portfolio') && !q.includes('my plan');

  if (isItineraryRequest) {
    // Check if a specific destination name is in the query
    const matchedDest = destinations.find((d) => q.includes(normalizeText(d.name)));
    const targetDest = matchedDest || destinations[0];

    let durationDays = 3;
    if (q.includes('2 day') || q.includes('2-day') || q.includes('weekend')) durationDays = 2;
    if (q.includes('4 day') || q.includes('4-day')) durationDays = 4;
    if (q.includes('5 day') || q.includes('5-day')) durationDays = 5;

    let companions = 'Couple';
    if (q.includes('solo')) companions = 'Solo Explorer';
    if (q.includes('family') || q.includes('kid')) companions = 'Family';
    if (q.includes('friend')) companions = 'Friends';

    const customItin = generateCustomItinerary({
      destination: targetDest,
      durationDays,
      companions,
      destinations
    });

    if (customItin) {
      actions.push({
        label: `✦ Apply ${customItin.durationDays}-Day ${customItin.destination.name} Plan to My Trips`,
        actionType: 'apply-custom-itinerary',
        payload: customItin.actionableItem
      });
      actions.push({
        label: `📍 Explore ${customItin.destination.name} Rooms & Views`,
        actionType: 'explore',
        payload: customItin.destination
      });

      const daySummary = customItin.dailyPlan.map((d) =>
        `**${d.title}**\n` +
        `• 🌅 *Morning:* ${d.morning}\n` +
        `• ☀️ *Afternoon:* ${d.afternoon}\n` +
        `• 🌙 *Evening:* ${d.evening}`
      ).join('\n\n');

      const text = `🗓️ **${customItin.title}** ✦\n\n` +
        `I've crafted a customized ${customItin.durationDays}-day travel itinerary for **${customItin.destination.name}** (${customItin.destination.region}) tailored for a **${companions}** retreat:\n\n` +
        `🏨 **Recommended Stay:** ${customItin.destination.stayDetails?.hotelName} — *${customItin.selectedRoom.name}* (${formatCurrency(customItin.selectedRoom.pricePerNight)}/night)\n` +
        `💰 **Estimated Total Budget:** ${formatCurrency(customItin.estimatedBudget.grandTotal)} (Includes accommodation, signature meals & local activities)\n\n` +
        `📋 **Daily Schedule Breakdown:**\n\n` +
        `${daySummary}\n\n` +
        `Click **"Apply Plan to My Trips"** below to add this stay and schedule directly to your travel portfolio!`;

      return {
        text,
        actions,
        customItinerary: customItin
      };
    }
  }

  // 3. Check if user is asking to SELECT A DESTINATION / RECOMMENDATIONS
  const isDestinationSelectionQuery = (
    q.includes('select') ||
    q.includes('choose') ||
    q.includes('recommend') ||
    q.includes('where should') ||
    q.includes('where to go') ||
    q.includes('suggest') ||
    q.includes('match') ||
    q.includes('which destination')
  );

  if (isDestinationSelectionQuery) {
    let vibe = 'hills-nature';
    if (q.includes('beach') || q.includes('island') || q.includes('sea') || q.includes('tropical')) vibe = 'tropical-beach';
    if (q.includes('heritage') || q.includes('royal') || q.includes('palace') || q.includes('culture') || q.includes('history')) vibe = 'heritage-culture';
    if (q.includes('adventure') || q.includes('trek') || q.includes('glacier') || q.includes('mountain') || q.includes('ladakh')) vibe = 'high-adventure';
    if (q.includes('romantic') || q.includes('honeymoon') || q.includes('couple')) vibe = 'romantic-couples';

    const matches = findDestinationMatches({ vibe, destinations, durationDays: 3 });
    const topMatches = matches.slice(0, 3);

    topMatches.forEach((m) => {
      actions.push({
        label: `📍 View ${m.destination.name} (${m.matchScore}% Match)`,
        actionType: 'explore',
        payload: m.destination
      });
      actions.push({
        label: `🗓️ Plan Itinerary for ${m.destination.name}`,
        actionType: 'plan-itinerary',
        payload: m.destination
      });
    });

    const matchTextList = topMatches.map((m, idx) =>
      `**${idx + 1}. ${m.destination.name} (${m.destination.region})** — 🎯 **${m.matchScore}% AI Match**\n` +
      `   *${m.destination.tagline}*\n` +
      `   • **Why It Matches:** ${m.matchReasons.join(' • ')}\n` +
      `   • **Stay:** ${m.destination.stayDetails?.hotelName} (${m.destination.rating}★)\n` +
      `   • **From:** ${formatCurrency(m.destination.price)}/night`
    ).join('\n\n');

    return {
      text: `🧭 **WanderBot AI Destination Recommendations:**\n\n` +
        `Based on your travel interests, here are the top matching horizons:\n\n` +
        `${matchTextList}\n\n` +
        `Select any destination below to inspect rooms and viewpoints, or generate a tailored multi-day schedule!`,
      actions,
      destinationMatches: topMatches
    };
  }

  // 4. Check if user is asking about a specific destination by name from the list
  const matchedDest = destinations.find((d) => q.includes(normalizeText(d.name)));
  if (matchedDest) {
    actions.push({
      label: `📍 Explore ${matchedDest.name}`,
      actionType: 'explore',
      payload: matchedDest
    });
    actions.push({
      label: `🗓️ Generate ${matchedDest.name} Itinerary`,
      actionType: 'plan-itinerary',
      payload: matchedDest
    });
    actions.push({
      label: `➕ Add ${matchedDest.name} to Plan`,
      actionType: 'add',
      payload: matchedDest
    });
    return generateDestinationSpecificResponse(q, matchedDest, actions);
  }

  // 5. Itinerary Review & Portfolio Questions
  if (q.includes('itinerary') || q.includes('my plan') || q.includes('review') || q.includes('portfolio') || q.includes('budget')) {
    if (itinerary.length > 0) {
      const grandTotal = itinerary.reduce((sum, item) => sum + (item.totalPrice || (item.roomPrice * item.nights) || 0), 0);
      const totalNights = itinerary.reduce((sum, item) => sum + (item.nights || 1), 0);
      const destNames = itinerary.map((i) => i.destinationName).join(', ');

      actions.push({
        label: '🎒 View Full Itinerary',
        actionType: 'tab',
        payload: 'itinerary'
      });

      let text = `🎒 **Your WanderLust Travel Portfolio Analysis** ✈️\n\n` +
        `• **Current Stops (${itinerary.length}):** ${destNames}\n` +
        `• **Total Trip Duration:** ${totalNights} Nights\n` +
        `• **Estimated Budget:** ${formatCurrency(grandTotal)} (Accommodation & Stays)\n\n` +
        `✨ **WanderBot Concierge Insights:**\n` +
        `1. **Pacing:** An average of ${(totalNights / itinerary.length).toFixed(1)} nights per destination provides a balanced balance between relaxation and sightseeing.\n` +
        `2. **Logistics:** Stays include verified premium hotel rooms with flexible amenities.\n` +
        `3. **Pro Tip:** Make sure to book activities in advance during peak season!\n\n` +
        `Would you like me to recommend another stop to pair with your itinerary, or give you packing tips?`;

      return { text, actions };
    } else {
      actions.push({
        label: '✨ Build Custom Itinerary with AI',
        actionType: 'custom',
        payload: 'Plan a 3-Day Custom Itinerary'
      });
      actions.push({
        label: '🧭 Help Me Select a Destination',
        actionType: 'custom',
        payload: 'Help me select a destination'
      });
      actions.push({
        label: '🌍 Explore Catalog',
        actionType: 'tab',
        payload: 'explore'
      });

      return {
        text: `Your travel plan is currently empty! 🗺️\n\nI can help you build an incredible custom journey. Tell me what kind of trip you love:\n` +
          `• 🌲 **Hill Stations & Tea Hills** (e.g. Munnar, Ooty, Manali)\n` +
          `• 🏖️ **Pristine Beaches & Snorkeling** (e.g. Maldives, Havelock Island)\n` +
          `• 🏛️ **Royal Palaces & Culture** (e.g. Jaipur, Hyderabad)\n` +
          `• 🏔️ **High Altitude Adventure** (e.g. Zanskar Valley, Ladakh)\n\n` +
          `Or ask me: *"Plan a 3-day romantic itinerary"*!`,
        actions
      };
    }
  }

  // 6. Trending & Hot Spots
  if (q.includes('trending') || q.includes('popular') || q.includes('hot') || q.includes('famous')) {
    const trending = destinations.filter((d) => d.isTrending);
    trending.slice(0, 3).forEach((d) => {
      actions.push({
        label: `📍 View ${d.name}`,
        actionType: 'explore',
        payload: d
      });
    });

    const listText = trending.map((d, i) =>
      `**${i + 1}. ${d.name} (${d.region})** ⭐ ${d.rating}\n` +
      `   *${d.tagline}*\n` +
      `   🏨 Stay: ${d.stayDetails?.hotelName || 'Luxury Resort'} • From ${formatCurrency(d.price)}/night\n` +
      `   🏛️ Highlights: ${d.famousSpots?.slice(0, 2).join(', ')}`
    ).join('\n\n');

    return {
      text: `🔥 **Top Trending Destinations Right Now on WanderLust:**\n\n${listText}\n\n` +
        `Click any destination below to inspect rooms, viewpoints, and food recommendations!`,
      actions
    };
  }

  // 7. Category: Hill Stations / Mountains / Nature
  if (q.includes('hill') || q.includes('mountain') || q.includes('nature') || q.includes('cool') || q.includes('fog') || q.includes('tea')) {
    const hills = destinations.filter((d) => d.category?.includes('Hill') || d.category?.includes('Nature') || d.category?.includes('Altitude'));
    hills.slice(0, 3).forEach((d) => {
      actions.push({
        label: `📍 Explore ${d.name}`,
        actionType: 'explore',
        payload: d
      });
    });

    const suggestions = (hills.length > 0 ? hills : destinations.slice(0, 2)).map((d) =>
      `🌲 **${d.name} (${d.region})** — ${d.tagline}\n` +
      `• **Ideal Season:** ${d.travelFeatures?.bestTimeToVisit || 'October - March'}\n` +
      `• **Signature Experience:** ${d.famousSpots?.[0] || 'Scenic Trekking'}\n` +
      `• **Top Viewpoint:** ${d.viewpoints?.[0]?.split('(')[0] || 'Panoramic Valley'}`
    ).join('\n\n');

    return {
      text: `⛰️ **Here are the premier Hill Stations & Mountain Retreats:**\n\n${suggestions}\n\n` +
        `Would you like a custom daily itinerary or packing list for any of these?`,
      actions
    };
  }

  // 8. Category: Beach / Island / Tropical / Coastal
  if (q.includes('beach') || q.includes('island') || q.includes('tropical') || q.includes('sea') || q.includes('ocean') || q.includes('scuba')) {
    const beaches = destinations.filter((d) => d.category?.includes('Beach') || d.category?.includes('Island') || d.category?.includes('Tropical') || d.category?.includes('Coastal'));
    const target = beaches.length > 0 ? beaches : destinations;
    target.slice(0, 2).forEach((d) => {
      actions.push({
        label: `📍 Explore ${d.name}`,
        actionType: 'explore',
        payload: d
      });
    });

    const list = target.map((d) =>
      `🏖️ **${d.name} (${d.region})**\n` +
      `• **Stay:** ${d.stayDetails?.hotelName} (${d.stayDetails?.hotelRating}★)\n` +
      `• **Highlights:** ${d.famousSpots?.slice(0, 2).join(', ')}\n` +
      `• **Must Try Dish:** ${d.foodSpots?.[0]?.split('(')[0] || 'Fresh Seafood'}`
    ).join('\n\n');

    return {
      text: `🌴 **Dreaming of Sun, Sand & Turquoise Waters?**\n\n${list}\n\n` +
        `Tap any card to check out sea-facing private villas and coral reef excursions!`,
      actions
    };
  }

  // 9. Category: Heritage / Royal / Culture / Historic
  if (q.includes('heritage') || q.includes('culture') || q.includes('history') || q.includes('royal') || q.includes('fort') || q.includes('palace')) {
    const heritage = destinations.filter((d) => d.category?.includes('Heritage') || d.category?.includes('Cultural'));
    const target = heritage.length > 0 ? heritage : destinations;
    target.slice(0, 2).forEach((d) => {
      actions.push({
        label: `📍 Explore ${d.name}`,
        actionType: 'explore',
        payload: d
      });
    });

    const list = target.map((d) =>
      `🏛️ **${d.name} (${d.region})**\n` +
      `• **Heritage Vibe:** ${d.tagline}\n` +
      `• **Historic Landmarks:** ${d.famousSpots?.slice(0, 3).join(', ')}\n` +
      `• **Authentic Dining:** ${d.foodSpots?.[0] || 'Local Heritage Cuisine'}`
    ).join('\n\n');

    return {
      text: `👑 **Step Back in Time with Royal Heritage & Architecture:**\n\n${list}\n\n` +
        `Let me know if you would like royal palace suite recommendations!`,
      actions
    };
  }

  // 10. Budget-specific queries (e.g. under 20k, cheap, affordable)
  if (q.includes('budget') || q.includes('under') || q.includes('cheap') || q.includes('affordable') || q.includes('price')) {
    const sortedByPrice = [...destinations].sort((a, b) => (a.price || 5000) - (b.price || 5000));
    const budgetDest = sortedByPrice[0] || destinations[0];

    actions.push({
      label: `📍 View ${budgetDest.name}`,
      actionType: 'explore',
      payload: budgetDest
    });
    actions.push({
      label: `🗓️ Plan Budget Itinerary for ${budgetDest.name}`,
      actionType: 'plan-itinerary',
      payload: budgetDest
    });

    return {
      text: `💰 **Smart Budget Travel Recommendation:**\n\n` +
        `**${budgetDest.name} (${budgetDest.region})** is our top value getaway!\n` +
        `• **Starting Room Rate:** ${formatCurrency(budgetDest.price)}/night at *${budgetDest.stayDetails?.hotelName}*\n` +
        `• **3-Night Estimated Stay:** ${formatCurrency(budgetDest.price * 3)}\n` +
        `• **Included Perks:** Free breakfast, guided morning walks & Wi-Fi\n` +
        `• **Affordable Food Spots:** ${budgetDest.foodSpots?.[0] || 'Local eateries'}\n\n` +
        `💡 **Money-Saving Tip:** Travel during shoulder months (mid-week stays) to get up to 25% lower tariff!`,
      actions
    };
  }

  // 11. Romantic / Honeymoon / Couple queries
  if (q.includes('romantic') || q.includes('honeymoon') || q.includes('couple') || q.includes('anniversary')) {
    const romanticDest = destinations.find((d) => d.category?.includes('Hill') || d.category?.includes('Island') || d.category?.includes('Coastal')) || destinations[0];
    actions.push({
      label: `🗓️ Plan Romantic Itinerary for ${romanticDest.name}`,
      actionType: 'plan-itinerary',
      payload: romanticDest
    });
    actions.push({
      label: `📍 Explore ${romanticDest.name}`,
      actionType: 'explore',
      payload: romanticDest
    });

    return {
      text: `💖 **Romantic Getaways for Couples:**\n\n` +
        `I highly recommend **${romanticDest.name}**!\n` +
        `• **Vibe:** ${romanticDest.tagline}\n` +
        `• **Stay:** ${romanticDest.stayDetails?.hotelName} featuring private balcony suites and candle-lit garden dinners\n` +
        `• **Sunset Spot:** ${romanticDest.viewpoints?.[0] || 'Scenic Hilltop Outlook'}\n` +
        `• **Romantic Activity:** Twilight strolls through tea plantations and campfire evenings under the stars.\n\n` +
        `Would you like to book a private suite with heated plunge pool?`,
      actions
    };
  }

  // 12. Default General Concierge Greeting & Assistance
  return {
    text: `✦ **WanderBot A.I. Travel Concierge at Your Service!** 🌍\n\n` +
      `I can help you select the ideal destinations and craft customized daily itineraries. Here are some things you can ask me:\n\n` +
      `• *"Plan a 3-day itinerary for Munnar"*\n` +
      `• *"Help me select a destination for a couple's honeymoon"*\n` +
      `• *"Recommend budget trips under ₹20,000"*\n` +
      `• *"Show me trending destinations this week"*\n` +
      `• *"Review my current travel plan portfolio"*\n\n` +
      `What destination or travel style would you like to explore today?`,
    actions: [
      {
        label: '✨ Plan Custom Itinerary',
        actionType: 'custom',
        payload: 'Plan a 3-Day Custom Itinerary'
      },
      {
        label: '🧭 Help Me Select Destination',
        actionType: 'custom',
        payload: 'Help me select a destination'
      },
      {
        label: '🔥 Explore Trending',
        actionType: 'tab',
        payload: 'trending'
      }
    ]
  };
}

/**
 * Generates an in-depth answer tailored specifically to a single destination.
 */
function generateDestinationSpecificResponse(q, dest, existingActions = []) {
  const actions = [...existingActions];
  const stay = dest.stayDetails || {};
  const travel = dest.travelFeatures || {};
  const spots = dest.famousSpots || [];
  const foods = dest.foodSpots || [];
  const views = dest.viewpoints || [];
  const rooms = dest.hotelRooms || [];

  // ITINERARY GENERATION (1-day, 2-day, 3-day, etc.)
  if (q.includes('itinerary') || q.includes('plan') || q.includes('schedule') || q.includes('day') || q.includes('trip')) {
    const customItin = generateCustomItinerary({
      destination: dest,
      durationDays: 3,
      companions: 'Couple'
    });

    if (customItin) {
      actions.push({
        label: `✦ Apply 3-Day ${dest.name} Itinerary to Trips`,
        actionType: 'apply-custom-itinerary',
        payload: customItin.actionableItem
      });
    }

    const day1Spots = spots.slice(0, 2).join(' & ');
    const day2Spots = spots.slice(2, 4).join(' & ') || views[0] || 'Local sight-seeing';
    const day3Spots = views.slice(0, 2).join(' & ') || 'Relaxing resort exploration';

    return {
      text: `🗓️ **Curated 3-Day Itinerary for ${dest.name}** (${dest.region})\n\n` +
        `🌅 **Day 1: Arrival & Signature Landscapes**\n` +
        `• **Morning:** Check into *${stay.hotelName}*, enjoy welcome refreshments.\n` +
        `• **Afternoon:** Visit ${day1Spots || 'the historic core'}.\n` +
        `• **Evening:** Sunset dining at *${foods[0] || 'local culinary spot'}*.\n\n` +
        `🌲 **Day 2: Deep Exploration & Iconic Highlights**\n` +
        `• **Morning:** Sunrise at *${views[0] || 'Panoramic Viewpoint'}* for golden hour photography.\n` +
        `• **Afternoon:** Experience ${day2Spots}.\n` +
        `• **Evening:** Sample local specialties at *${foods[1] || foods[0] || 'authentic restaurant'}*.\n\n` +
        `✨ **Day 3: Serene Outlooks & Leisure Departure**\n` +
        `• **Morning:** Guided resort plantation stroll or spa therapy session.\n` +
        `• **Afternoon:** Souvenir shopping and visit ${day3Spots}.\n` +
        `• **Late Afternoon:** Wrap up trip with unforgettable memories!\n\n` +
        `💡 *Recommended Duration: ${travel.idealStayDuration || '3 - 4 Days'}*.\n\n` +
        `Click **"Apply Itinerary to Trips"** to instantly add this plan with room booking!`,
      actions,
      customItinerary: customItin
    };
  }

  // PACKING & WEATHER
  if (q.includes('pack') || q.includes('weather') || q.includes('cloth') || q.includes('temperature') || q.includes('rain') || q.includes('season')) {
    return {
      text: `🎒 **Packing & Weather Guide for ${dest.name}**\n\n` +
        `🌤️ **Current Climatic Conditions:**\n` +
        `• **Weather Pattern:** ${travel.weather || 'Pleasant and temperate'}\n` +
        `• **Optimal Travel Season:** ${travel.bestTimeToVisit || 'October through March'}\n\n` +
        `🧳 **Essential Packing Checklist:**\n` +
        `1. **Clothing:** Comfortable breathable cottons for daytime, and lightweight fleece or jacket for cool evenings.\n` +
        `2. **Footwear:** Sturdy walking or trail shoes with reliable grip for viewpoints and uneven terrain.\n` +
        `3. **Protection:** Sunglasses, UV sunblock, wide-brim hat, and an umbrella/poncho.\n` +
        `4. **Tech & Gear:** High-capacity power bank, DSLR/phone with wide-angle lens, and universal adapter.\n` +
        `5. **Health:** Insect repellent, personal medication, and reusable hydration flask.`,
      actions
    };
  }

  // FOOD & CULINARY
  if (q.includes('food') || q.includes('eat') || q.includes('dish') || q.includes('restaurant') || q.includes('cuisine') || q.includes('cafe')) {
    const foodList = foods.map((f, idx) => `• **${idx + 1}.** ${f}`).join('\n');

    return {
      text: `🍲 **WanderLust Gastronomic Guide: ${dest.name}**\n\n` +
        `Here are the highest-rated must-try dining spots and regional delicacies:\n\n` +
        `${foodList || '• Indulge in authentic regional delicacies and fresh local harvests.'}\n\n` +
        `☕ **Concierge Tip:** Don't miss the signature breakfast buffet at *${stay.hotelName}*, which features fresh local brews!`,
      actions
    };
  }

  // VIEWPOINTS & SUNRISE / SUNSET
  if (q.includes('view') || q.includes('spot') || q.includes('sunset') || q.includes('sunrise') || q.includes('photo') || q.includes('scenic')) {
    const viewList = views.map((v, idx) => `• **${idx + 1}.** ${v}`).join('\n');
    const famousList = spots.map((s, idx) => `• **${idx + 1}.** ${s}`).join('\n');

    return {
      text: `🌅 **Top Viewpoints & Scenic Outlooks in ${dest.name}:**\n\n` +
        `${viewList}\n\n` +
        `🏛️ **Signature Landmarks & Attractions:**\n` +
        `${famousList}\n\n` +
        `📸 **Photography Tip:** Arrive 25 minutes prior to sunrise or sunset for optimal diffused lighting and cloud formations.`,
      actions
    };
  }

  // HOTEL & ROOM RECOMMENDATIONS
  if (q.includes('hotel') || q.includes('room') || q.includes('stay') || q.includes('resort') || q.includes('villa') || q.includes('bed')) {
    const roomSummary = rooms.map((r) =>
      `• **${r.name}:** ${formatCurrency(r.pricePerNight)}/night (${r.capacity}, ${r.bed}) — *${r.amenities?.slice(0, 3).join(', ')}*`
    ).join('\n');

    return {
      text: `🏨 **Accommodation & Suite Advisor: ${stay.hotelName}** (${stay.hotelRating}★)\n\n` +
        `• **Stay Category:** ${stay.stayType || 'Luxury Property'}\n` +
        `• **Location:** ${stay.locationAddress || 'Prime Location'}\n` +
        `• **Check-in / Check-out:** ${stay.checkIn || '14:00'} / ${stay.checkOut || '11:00'}\n` +
        `• **Cancellation:** ${stay.cancellationPolicy || 'Flexible cancellation available'}\n\n` +
        `🛏️ **Available Room Configurations:**\n${roomSummary}\n\n` +
        `🎁 **Included Amenities:** ${stay.amenities?.slice(0, 4).join(', ')}.`,
      actions
    };
  }

  // TRANSIT & COMMUTE
  if (q.includes('reach') || q.includes('transit') || q.includes('airport') || q.includes('train') || q.includes('road') || q.includes('drive') || q.includes('flight')) {
    const trans = travel.transportation || {};
    return {
      text: `🚗 **How to Reach & Transit Details: ${dest.name}**\n\n` +
        `• ✈️ **Nearest Airport:** ${trans.nearestAirport || 'Major international/domestic airport connectivity'}\n` +
        `• 🚆 **Nearest Railway:** ${trans.nearestRailway || 'Regional rail terminal with express train access'}\n` +
        `• 🛣️ **Road & Highway Access:** ${trans.roadAccess || 'Scenic state and national highway network'}\n\n` +
        `🚕 **Concierge Transit Tip:** Pre-booked airport private cabs or scenic self-drive rentals are the most comfortable choices for this route.`,
      actions
    };
  }

  // GENERAL DESTINATION OVERVIEW
  return {
    text: `✦ **WanderBot Guide for ${dest.name} (${dest.region})** ⭐ ${dest.rating}/5.0\n\n` +
      `*"${dest.tagline}"*\n\n` +
      `• **Best Season:** ${travel.bestTimeToVisit || 'October to March'}\n` +
      `• **Ideal Duration:** ${travel.idealStayDuration || '3 - 4 Days'}\n` +
      `• **Hotel:** ${stay.hotelName} (${stay.hotelRating}★ luxury)\n` +
      `• **Top Attraction:** ${spots[0] || 'Iconic Sightseeing'}\n` +
      `• **Scenic Outlook:** ${views[0] || 'Panoramic View'}\n\n` +
      `Ask me anything specific like *"What should I pack?"*, *"Generate 3-day schedule"*, or *"Best places to eat"*!`,
    actions
  };
}
