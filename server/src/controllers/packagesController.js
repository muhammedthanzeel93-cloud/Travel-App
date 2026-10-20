const { packages } = require('../data/serverData');

/**
 * Controller: Travel Packages & Curated Expeditions Showcase
 */
const getAllPackages = (req, res) => {
  const { category, creatorId } = req.query;
  let results = [...packages];

  if (category && category !== 'all') {
    results = results.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(category.toLowerCase())))
    );
  }

  if (creatorId) {
    results = results.filter((p) => p.creatorId === creatorId);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
};

const getPackageById = (req, res) => {
  const { id } = req.params;
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return res.status(404).json({
      success: false,
      message: `Travel package with ID ${id} not found.`
    });
  }

  res.json({
    success: true,
    data: pkg
  });
};

const createPackage = (req, res) => {
  const {
    title,
    tagline,
    creatorName,
    creatorHandle,
    category,
    duration,
    price,
    pricingDetails,
    destinationsCovered,
    coverImage,
    highlights,
    itinerary
  } = req.body;

  if (!title || !price) {
    return res.status(400).json({
      success: false,
      message: 'Package title and price are required to publish a travel package.'
    });
  }

  const newPackage = {
    id: `pkg-${Date.now()}`,
    title: title.trim(),
    tagline: (tagline || 'Curated community travel package with verified stays & routes').trim(),
    creatorId: 'user-aysha',
    creatorName: (creatorName || 'Aysha Rayan').trim(),
    creatorHandle: (creatorHandle || '@aysha_explorer').trim(),
    creatorAvatar: 'AR',
    creatorRole: 'Community Travel Architect',
    category: (category || 'Community Showcase').trim(),
    seasonBadge: '✨ Community Curated',
    duration: (duration || '3 Days / 2 Nights').trim(),
    daysCount: parseInt(duration, 10) || 3,
    nightsCount: Math.max(1, (parseInt(duration, 10) || 3) - 1),
    price: Number(price),
    originalPrice: Math.round(Number(price) * 1.2),
    pricingDetails: pricingDetails || {
      basePrice: Number(price),
      currency: 'INR (₹)',
      pricePerPerson: true,
      stayCost: Math.round(Number(price) * 0.6),
      transitCost: Math.round(Number(price) * 0.2),
      activitiesCost: Math.round(Number(price) * 0.15),
      taxesFees: Math.round(Number(price) * 0.05),
      inclusions: [
        'Curated accommodations and stays',
        'Daily breakfast and localized food experiences',
        'Guided sightseeing and viewpoints entry passes'
      ],
      exclusions: ['Personal travel transit tickets', 'Personal shopping expenses']
    },
    destinationsCovered: Array.isArray(destinationsCovered)
      ? destinationsCovered
      : (destinationsCovered ? destinationsCovered.split(',').map((s) => s.trim()) : ['Scenic Destinations']),
    primaryDestinationId: 'custom-package',
    coverImage: coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    rating: 5.0,
    reviewsCount: 1,
    bookingsCount: 1,
    tags: ['Community Published', 'Verified Itinerary'],
    highlights: Array.isArray(highlights) && highlights.length > 0
      ? highlights
      : ['Custom curated daily itinerary', 'Verified stay recommendations'],
    itinerary: Array.isArray(itinerary) && itinerary.length > 0
      ? itinerary
      : [
          {
            day: 1,
            title: 'Arrival & Welcome Horizon',
            morning: 'Arrival and transit to accommodation.',
            afternoon: 'Check-in and local orientation tour.',
            evening: 'Sunset viewpoint and local dinner.',
            stay: 'Featured Curated Stay',
            mealsIncluded: 'Dinner'
          }
        ],
    publishedAt: new Date().toISOString()
  };

  packages.unshift(newPackage);

  res.status(201).json({
    success: true,
    message: 'Travel package published successfully to the showcase.',
    data: newPackage
  });
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage
};
