/**
 * Controller: Budget Modeling & Cost Forecasting
 */

const calculateBudget = (req, res) => {
  const { destinations = [], travelers = 2, days = 3, stayTier = 'comfort', travelStyle = 'balanced' } = req.body;

  const baseRatesPerDay = {
    budget: { accommodation: 1800, food: 800, transport: 600, activities: 400 },
    comfort: { accommodation: 4200, food: 1600, transport: 1200, activities: 900 },
    luxury: { accommodation: 9500, food: 3200, transport: 2400, activities: 2000 }
  };

  const selectedTier = baseRatesPerDay[stayTier] || baseRatesPerDay.comfort;
  const numDays = Number(days) || 3;
  const numTravelers = Number(travelers) || 2;

  const accommodationTotal = selectedTier.accommodation * numDays;
  const foodTotal = selectedTier.food * numDays * numTravelers;
  const transportTotal = selectedTier.transport * numDays;
  const activitiesTotal = selectedTier.activities * numDays * numTravelers;
  const subtotal = accommodationTotal + foodTotal + transportTotal + activitiesTotal;
  const contingencyBuffer = Math.round(subtotal * 0.1); // 10% safety buffer
  const grandTotal = subtotal + contingencyBuffer;

  res.json({
    success: true,
    data: {
      destinationsCount: destinations.length,
      travelers: numTravelers,
      days: numDays,
      stayTier,
      travelStyle,
      breakdown: {
        accommodation: accommodationTotal,
        food: foodTotal,
        transport: transportTotal,
        activities: activitiesTotal,
        contingencyBuffer
      },
      grandTotal,
      currency: 'INR (₹)',
      perPersonCost: Math.round(grandTotal / numTravelers)
    }
  });
};

module.exports = {
  calculateBudget
};
