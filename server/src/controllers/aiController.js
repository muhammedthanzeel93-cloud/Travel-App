/**
 * Controller: AI Travel Concierge & Quantum Pathfinder
 */

const generateItinerary = (req, res) => {
  const {
    destination = 'Munnar Tea Valleys',
    days = 3,
    style = 'Eco-Adventure & Scenic Trails',
    budgetTier = 'Moderate',
    groupSize = 2,
    pace = 'Balanced'
  } = req.body;

  const numDays = Math.max(1, Math.min(14, Number(days) || 3));

  const itineraryDays = [];
  const sampleActivities = [
    { title: 'Morning Cloud Bed Sunrise Trek', time: '05:30 AM - 08:30 AM', note: 'Bring light thermals and camera.' },
    { title: 'Artisanal Tea Estate Factory Tour & Tasting', time: '10:00 AM - 12:30 PM', note: 'Sample first-flush white tea.' },
    { title: 'Traditional Kerala Banana-Leaf Lunch', time: '01:00 PM - 02:30 PM', note: 'Authentic local spices.' },
    { title: 'Forest Canopy Walk & Birdwatching Lookout', time: '03:30 PM - 06:00 PM', note: 'Spot endemic Nilgiri thrush.' },
    { title: 'Campfire Dinner Under Starlit Mountain Skies', time: '07:30 PM - 09:30 PM', note: 'Cozy alpine atmosphere.' }
  ];

  for (let d = 1; d <= numDays; d++) {
    itineraryDays.push({
      day: d,
      theme: `Day ${d}: Exploring ${destination} - ${style}`,
      activities: sampleActivities.slice((d - 1) % 3, ((d - 1) % 3) + 3),
      dailyBudgetEstimate: budgetTier === 'Luxury' ? 9500 : budgetTier === 'Backpacker' ? 2200 : 4800,
      insiderTip: `Day ${d} tip: Visit viewpoints early before 9:00 AM to beat midday haze and tourist buses.`
    });
  }

  res.json({
    success: true,
    data: {
      destination,
      totalDays: numDays,
      style,
      budgetTier,
      groupSize,
      pace,
      estimatedTotalBudget: itineraryDays.reduce((acc, d) => acc + d.dailyBudgetEstimate, 0) * (groupSize || 1),
      currency: 'INR (₹)',
      days: itineraryDays,
      packingTips: [
        'Light thermal layers for sub-15°C mornings',
        'Sturdy waterproof trail hiking boots',
        'Reusable insulated stainless water canister',
        'High UV sunscreen and polarized sunglasses'
      ]
    }
  });
};

const chat = (req, res) => {
  const { message = '', context = {} } = req.body;
  const msgLower = message.toLowerCase();

  let reply = '';

  if (msgLower.includes('budget') || msgLower.includes('cost')) {
    reply = `For ${context.destination || 'your destination'}, we recommend budgeting ₹3,500 - ₹5,500 per day for moderate comfort, or ₹8,000+ per day for luxury heritage resorts. Our dynamic budget calculator can model itemized costs for you!`;
  } else if (msgLower.includes('weather') || msgLower.includes('season') || msgLower.includes('winter')) {
    reply = `Winter (November through February) offers crisp clear mornings and comfortable afternoons, perfect for outdoor trekking and scenic viewpoints. Temperatures typically hover between 10°C and 22°C.`;
  } else if (msgLower.includes('pack') || msgLower.includes('gear')) {
    reply = `We recommend packing layered clothing (fleece/light down jacket for crisp dawn hours), quick-dry trekking pants, durable trail shoes, and power banks for mountain navigation.`;
  } else {
    reply = `Hello explorer! I am WanderBot, your AI quantum travel concierge. I can engineer customized day-by-day itineraries, recommend hidden culinary gems along your route, or configure hotel stays tailored to your budget. Where would you like to explore?`;
  }

  res.json({
    success: true,
    data: {
      reply,
      timestamp: new Date().toISOString(),
      botName: 'WanderBot AI Concierge',
      suggestedActions: ['Generate 3-Day Itinerary', 'Calculate Trip Budget', 'Explore En-Route Hotels']
    }
  });
};

module.exports = {
  generateItinerary,
  chat
};
