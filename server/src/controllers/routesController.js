/**
 * Controller: Multi-Modal Route Planning & Transit
 */

const calculateRoutePlan = (req, res) => {
  const { origin = 'Bangalore', destination = 'Munnar', transitMode = 'car', isMultiDay = false } = req.body;

  const modeSpeeds = {
    car: { speed: 65, costFactor: 8.5, label: 'Driving (Road Trip)' },
    transit: { speed: 50, costFactor: 4.2, label: 'Public Transit (Train / Bus)' },
    walking: { speed: 4.5, costFactor: 0.5, label: 'Walking / Trekking Path' }
  };

  const selectedMode = modeSpeeds[transitMode] || modeSpeeds.car;
  const estimatedDistance = Math.floor(Math.random() * 250) + 320; // 320 - 570 km
  const travelHours = Number((estimatedDistance / selectedMode.speed).toFixed(1));
  const estimatedFuelTransitCost = Math.round(estimatedDistance * selectedMode.costFactor);

  const daysCount = isMultiDay ? Math.ceil(travelHours / 6) : 1;
  const dayBreakdown = [];

  for (let d = 1; d <= daysCount; d++) {
    dayBreakdown.push({
      day: d,
      segment: `Stage ${d}: Km ${((d - 1) * Math.floor(estimatedDistance / daysCount))} to ${d * Math.floor(estimatedDistance / daysCount)}`,
      stopover: d === daysCount ? destination : `Highway Transit Hub ${d}`,
      drivingHours: (travelHours / daysCount).toFixed(1),
      highlight: `Scenic viewpoints and regional rest zones along Highway corridor.`
    });
  }

  const enrouteSpots = [
    {
      id: 'sp-1',
      name: 'Cheeyappara & Valara Waterfalls',
      category: 'viewpoint',
      tag: 'Scenic Viewpoint',
      distanceFromRoute: '0.2 km off NH-85',
      rating: 4.8,
      recommendedStop: '30 mins',
      desc: 'Cascading multi-tier waterfalls surrounded by dense tropical foliage.'
    },
    {
      id: 'sp-2',
      name: 'Royal Heritage Highway Dhaba & Roastery',
      category: 'food',
      tag: 'Food Spot',
      distanceFromRoute: '0.5 km from Turnpike',
      rating: 4.7,
      recommendedStop: '45 mins',
      desc: 'Fresh clay-oven naans, local cardamom filter coffee, and spiced curries.'
    },
    {
      id: 'sp-3',
      name: 'Ancient Stone Bridge & Hill Fort Lookout',
      category: 'famous',
      tag: 'Famous Landmark',
      distanceFromRoute: '1.2 km off Main Pass',
      rating: 4.9,
      recommendedStop: '1 hour',
      desc: '16th-century granite watchtower offering panoramic horizon vistas.'
    }
  ];

  const routeHotels = [
    {
      id: 'rh-1',
      name: 'Highland Mist Valley Resort',
      rating: 4.8,
      pricePerNight: 4200,
      amenities: ['Free WiFi', 'Breakfast Included', 'Mountain View', 'EV Charging'],
      locationTag: 'Near Stage 1 Stopover'
    },
    {
      id: 'rh-2',
      name: 'The Orchid Transit Grand Hotel',
      rating: 4.6,
      pricePerNight: 3500,
      amenities: ['Free WiFi', 'Swimming Pool', 'Buffet Restaurant'],
      locationTag: 'Mid-Route Expressway Hub'
    },
    {
      id: 'rh-3',
      name: 'Alpine Eco-Bungalow & Cottages',
      rating: 4.9,
      pricePerNight: 5800,
      amenities: ['Free WiFi', 'Breakfast Included', 'Fireplace', 'Spa & Wellness', 'Mountain View'],
      locationTag: 'Destination Approach'
    }
  ];

  res.json({
    success: true,
    data: {
      origin,
      destination,
      transitMode,
      modeLabel: selectedMode.label,
      distanceKm: estimatedDistance,
      durationHours: travelHours,
      estimatedCost: estimatedFuelTransitCost,
      isMultiDay,
      daysCount,
      dayBreakdown,
      enrouteSpots,
      routeHotels
    }
  });
};

const getRouteHotels = (req, res) => {
  const { minRating = 4.0, maxPrice, amenity } = req.query;

  const allHotels = [
    {
      id: 'rh-1',
      name: 'Highland Mist Valley Resort',
      rating: 4.8,
      pricePerNight: 4200,
      amenities: ['Free WiFi', 'Breakfast Included', 'Mountain View', 'EV Charging']
    },
    {
      id: 'rh-2',
      name: 'The Orchid Transit Grand Hotel',
      rating: 4.6,
      pricePerNight: 3500,
      amenities: ['Free WiFi', 'Swimming Pool', 'Buffet Restaurant']
    },
    {
      id: 'rh-3',
      name: 'Alpine Eco-Bungalow & Cottages',
      rating: 4.9,
      pricePerNight: 5800,
      amenities: ['Free WiFi', 'Breakfast Included', 'Fireplace', 'Spa & Wellness', 'Mountain View']
    },
    {
      id: 'rh-4',
      name: 'WanderLust Express Motel',
      rating: 4.3,
      pricePerNight: 2200,
      amenities: ['Free WiFi', 'Free Parking', 'EV Charging']
    }
  ];

  let filtered = allHotels.filter((h) => h.rating >= Number(minRating));

  if (maxPrice) {
    filtered = filtered.filter((h) => h.pricePerNight <= Number(maxPrice));
  }

  if (amenity) {
    filtered = filtered.filter((h) =>
      h.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

const getEnrouteSpots = (req, res) => {
  const { category } = req.query;

  const spots = [
    { id: 'sp-1', name: 'Cheeyappara Waterfalls', category: 'viewpoint', rating: 4.8 },
    { id: 'sp-2', name: 'Royal Heritage Highway Dhaba', category: 'food', rating: 4.7 },
    { id: 'sp-3', name: 'Ancient Stone Bridge', category: 'famous', rating: 4.9 },
    { id: 'sp-4', name: 'Lockhart Gap Panorama Deck', category: 'viewpoint', rating: 4.95 }
  ];

  const filtered = category
    ? spots.filter((s) => s.category.toLowerCase() === category.toLowerCase())
    : spots;

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

module.exports = {
  calculateRoutePlan,
  getRouteHotels,
  getEnrouteSpots
};
