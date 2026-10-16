/**
 * Travel Trip Budget Calculator Engine
 * Calculates accommodation, transit, dining, activities, taxes, and contingency reserves.
 */

export const DEFAULT_BUDGET_CONFIG = {
  travelers: 2,
  transportMode: 'cab', // 'flight' | 'train' | 'cab' | 'none'
  diningTier: 'standard', // 'budget' | 'standard' | 'luxury'
  activitiesTier: 'moderate', // 'minimal' | 'moderate' | 'adventure'
  includeTax: true, // 12% GST
  bufferPercent: 10 // 0 | 5 | 10 | 15%
};

export const TRANSPORT_OPTIONS = {
  flight: {
    id: 'flight',
    label: '✈️ Domestic Flight',
    description: 'Fast regional flights',
    ratePerTravelerPerStop: 5500,
    isFlatVehicle: false
  },
  train: {
    id: 'train',
    label: '🚆 Express Train',
    description: 'Scenic AC rail travel',
    ratePerTravelerPerStop: 1500,
    isFlatVehicle: false
  },
  cab: {
    id: 'cab',
    label: '🚕 Private Cab / Rental',
    description: 'Chauffeured vehicle per stop',
    ratePerStop: 2800,
    isFlatVehicle: true
  },
  none: {
    id: 'none',
    label: '🚶 Self-Arranged / Local',
    description: 'No intercity transport cost',
    ratePerStop: 0,
    isFlatVehicle: true
  }
};

export const DINING_TIERS = {
  budget: {
    id: 'budget',
    label: '🍛 Street & Local Dhaba',
    ratePerDayPerTraveler: 600,
    description: 'Authentic local food joints'
  },
  standard: {
    id: 'standard',
    label: '🍽️ Casual Restaurants',
    ratePerDayPerTraveler: 1400,
    description: 'Balanced cafes & bistros'
  },
  luxury: {
    id: 'luxury',
    label: '🍷 Gourmet & Resort Dining',
    ratePerDayPerTraveler: 3200,
    description: 'Fine dining & multi-course meals'
  }
};

export const ACTIVITIES_TIERS = {
  minimal: {
    id: 'minimal',
    label: '📸 Free Sightseeing',
    ratePerDayPerTraveler: 0,
    description: 'Self-guided walks & parks'
  },
  moderate: {
    id: 'moderate',
    label: '🏛️ Guided Tours & Tickets',
    ratePerDayPerTraveler: 750,
    description: 'Museums, palaces & monuments'
  },
  adventure: {
    id: 'adventure',
    label: '🪂 Outdoor Adventures',
    ratePerDayPerTraveler: 1800,
    description: 'Safaris, trekking, boating'
  }
};

/**
 * Calculates complete multi-category budget for an itinerary.
 */
export function calculateTripBudget(itinerary = [], userConfig = {}) {
  const config = { ...DEFAULT_BUDGET_CONFIG, ...userConfig };
  const travelers = Math.max(1, Number(config.travelers || 2));
  const totalStops = itinerary.length;

  // Total nights across all stops
  const totalNights = itinerary.reduce((sum, item) => sum + (Number(item.nights) || 1), 0);
  const effectiveDays = Math.max(1, totalNights);

  // 1. Accommodations Total
  const accommodationsTotal = itinerary.reduce((sum, item) => {
    const nights = Number(item.nights) || 1;
    const roomPrice = Number(item.roomPrice || item.price || 5000);
    return sum + (item.totalPrice || (roomPrice * nights));
  }, 0);

  // 2. Transport Total
  let transportTotal = 0;
  const transportOption = TRANSPORT_OPTIONS[config.transportMode] || TRANSPORT_OPTIONS.cab;
  if (totalStops > 0) {
    if (transportOption.isFlatVehicle) {
      transportTotal = (transportOption.ratePerStop || 0) * totalStops;
    } else {
      transportTotal = (transportOption.ratePerTravelerPerStop || 0) * travelers * totalStops;
    }
  }

  // 3. Food & Dining Total
  const diningOption = DINING_TIERS[config.diningTier] || DINING_TIERS.standard;
  const foodTotal = diningOption.ratePerDayPerTraveler * travelers * effectiveDays;

  // 4. Activities & Sightseeing Total
  const activityOption = ACTIVITIES_TIERS[config.activitiesTier] || ACTIVITIES_TIERS.moderate;
  const activitiesTotal = activityOption.ratePerDayPerTraveler * travelers * effectiveDays;

  // 5. Hospitality Tax (GST 12% on stays)
  const taxRate = config.includeTax ? 0.12 : 0;
  const taxTotal = Math.round(accommodationsTotal * taxRate);

  // 6. Emergency / Contingency Buffer
  const preBufferSubtotal = accommodationsTotal + transportTotal + foodTotal + activitiesTotal + taxTotal;
  const bufferPercent = Number(config.bufferPercent || 0);
  const bufferTotal = Math.round(preBufferSubtotal * (bufferPercent / 100));

  // Grand Total
  const grandTotal = preBufferSubtotal + bufferTotal;
  const costPerPerson = travelers > 0 ? Math.round(grandTotal / travelers) : grandTotal;
  const costPerDay = effectiveDays > 0 ? Math.round(grandTotal / effectiveDays) : grandTotal;

  // Calculate percentages for visual category bar
  const safeTotal = grandTotal || 1;
  const percentages = {
    accommodations: Math.round((accommodationsTotal / safeTotal) * 100),
    transport: Math.round((transportTotal / safeTotal) * 100),
    food: Math.round((foodTotal / safeTotal) * 100),
    activities: Math.round((activitiesTotal / safeTotal) * 100),
    tax: Math.round((taxTotal / safeTotal) * 100),
    buffer: Math.round((bufferTotal / safeTotal) * 100)
  };

  return {
    travelers,
    totalNights,
    effectiveDays,
    totalStops,
    accommodationsTotal,
    transportTotal,
    foodTotal,
    activitiesTotal,
    taxTotal,
    bufferTotal,
    grandTotal,
    costPerPerson,
    costPerDay,
    percentages,
    config
  };
}

/**
 * Generate human-readable text summary of the calculated budget
 */
export function formatBudgetSummaryText(calculated, itinerary = []) {
  const {
    travelers,
    totalNights,
    totalStops,
    accommodationsTotal,
    transportTotal,
    foodTotal,
    activitiesTotal,
    taxTotal,
    bufferTotal,
    grandTotal,
    costPerPerson
  } = calculated;

  const destList = itinerary.map((i, idx) => `  ${idx + 1}. ${i.destinationName} (${i.nights || 1} nights)`).join('\n');

  return `📊 *WanderLust Trip Budget Estimate*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👥 Travelers: ${travelers} Adults\n` +
    `⏳ Duration: ${totalNights} Nights • 📍 Stops: ${totalStops}\n` +
    (destList ? `${destList}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🏨 Stays & Rooms: ₹${accommodationsTotal.toLocaleString('en-IN')}\n` +
    `🚗 Transportation: ₹${transportTotal.toLocaleString('en-IN')}\n` +
    `🍲 Dining & Meals: ₹${foodTotal.toLocaleString('en-IN')}\n` +
    `🎟️ Sightseeing: ₹${activitiesTotal.toLocaleString('en-IN')}\n` +
    `🏛️ Hospitality Tax (GST): ₹${taxTotal.toLocaleString('en-IN')}\n` +
    `🛡️ Reserve Buffer: ₹${bufferTotal.toLocaleString('en-IN')}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 *TOTAL ESTIMATED COST:* ₹${grandTotal.toLocaleString('en-IN')}\n` +
    `👤 *Cost Per Traveler:* ₹${costPerPerson.toLocaleString('en-IN')}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Calculated on WanderLust Travel Explorer`;
}
