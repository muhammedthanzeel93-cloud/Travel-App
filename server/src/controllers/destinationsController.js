const { destinations } = require('../data/serverData');

/**
 * Controller: Destinations
 */
const getDestinations = (req, res) => {
  const { search, season, tag, state } = req.query;
  let filtered = [...destinations];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (season) {
    filtered = filtered.filter((d) => d.season.toLowerCase() === season.toLowerCase());
  }

  if (tag) {
    filtered = filtered.filter((d) => d.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }

  if (state) {
    filtered = filtered.filter((d) => d.state.toLowerCase() === state.toLowerCase());
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

const getTrendingDestinations = (req, res) => {
  const trending = destinations.filter((d) => d.isTrending || d.rating >= 4.9);
  res.json({
    success: true,
    count: trending.length,
    data: trending
  });
};

const getDestinationById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: `Destination with ID ${req.params.id} not found.`
    });
  }

  res.json({
    success: true,
    data: destination
  });
};

const createDestination = (req, res) => {
  const { title, location, state, country, pricePerDay, tags, description, image } = req.body;

  if (!title || !location) {
    return res.status(400).json({
      success: false,
      message: 'Title and location are required.'
    });
  }

  const newDest = {
    id: Date.now(),
    title: title.trim(),
    location: location.trim(),
    state: state || 'Custom',
    country: country || 'India',
    rating: 5.0,
    reviewsCount: 1,
    pricePerDay: Number(pricePerDay) || 3500,
    tags: Array.isArray(tags) ? tags : ['User Added', 'Explorer Special'],
    season: 'All-Year',
    isTrending: false,
    image: image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: description || 'Custom traveler discovered location.',
    recommendedDays: 2,
    bestTimeToVisit: 'Year-round',
    stayDetails: {
      type: 'Local Guesthouse / Homestay',
      rating: 4.8,
      price: '₹3,000/night',
      amenities: ['Local Dining', 'Free WiFi', 'Host Support']
    }
  };

  destinations.unshift(newDest);

  res.status(201).json({
    success: true,
    message: 'Destination location created successfully.',
    data: newDest
  });
};

module.exports = {
  getDestinations,
  getTrendingDestinations,
  getDestinationById,
  createDestination
};
