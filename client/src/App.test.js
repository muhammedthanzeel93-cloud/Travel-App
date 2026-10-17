import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import {
  calculateRoutePlan,
  TRANSIT_MODES,
  TRANSIT_MODE_CONFIG,
  ROUTE_STAY_CATEGORIES,
  STAY_SERVICES,
  PRICE_TIERS,
  ENROUTE_SPOT_CATEGORIES,
  INITIAL_DESTINATIONS,
  DEFAULT_USER_PROFILE,
  COMMUNITY_EXPLORERS
} from './data/destinationsData';
import {
  generateCustomItinerary,
  findDestinationMatches,
  TRAVEL_VIBES,
  BUDGET_TIERS
} from './utils/aiTravelEngine';

test('renders WanderLust header and explore navigation', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/WanderLust/i);
  expect(brandElements.length).toBeGreaterThan(0);

  const exploreTab = screen.getByText(/Explore All/i);
  expect(exploreTab).toBeInTheDocument();
});

test('renders destination cards with star ratings and stay details', () => {
  render(<App />);
  // Check for destination name
  const munnarTitle = screen.getByRole('heading', { name: /Munnar/i });
  expect(munnarTitle).toBeInTheDocument();

  // Check for stay preview
  expect(screen.getByText(/Tea County Heritage Resort & Spa/i)).toBeInTheDocument();

  // Check for ratings
  expect(screen.getAllByText(/4\.8/i).length).toBeGreaterThan(0);
});

test('opens destination modal and displays reviews and rating system', () => {
  render(<App />);
  const exploreButtons = screen.getAllByRole('button', { name: /Explore/i });
  expect(exploreButtons.length).toBeGreaterThan(0);
});

test('opens social media sharing modal with WhatsApp and Facebook options from header', () => {
  render(<App />);
  const shareHeaderBtn = screen.getByRole('button', { name: /Share/i });
  expect(shareHeaderBtn).toBeInTheDocument();

  // Click share in header with fireEvent
  fireEvent.click(shareHeaderBtn);

  // Check share modal appears
  expect(screen.getByText(/Share Your Travel Plan/i)).toBeInTheDocument();
  expect(screen.getByText(/Share on WhatsApp/i)).toBeInTheDocument();
  expect(screen.getByText(/Share on Facebook/i)).toBeInTheDocument();
  expect(screen.getByText(/Post on X \(Twitter\)/i)).toBeInTheDocument();
  expect(screen.getByText(/Send via Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Copy Itinerary Text & Link/i)).toBeInTheDocument();
});

test('opens social media share modal from DestinationModal', () => {
  render(<App />);
  const exploreButtons = screen.getAllByRole('button', { name: /Explore ➔/i });
  fireEvent.click(exploreButtons[0]);

  // DestinationModal is now open, look for share button
  const sharePlanBtns = screen.getAllByRole('button', { name: /Share/i });
  expect(sharePlanBtns.length).toBeGreaterThan(0);
  
  // Click share plan inside DestinationModal
  fireEvent.click(sharePlanBtns[0]);

  // Check share options
  expect(screen.getByText(/Share on WhatsApp/i)).toBeInTheDocument();
  expect(screen.getByText(/Share on Facebook/i)).toBeInTheDocument();
});

test('opens global AI assistant chat interface from header button', () => {
  render(<App />);
  const aiButtons = screen.getAllByRole('button', { name: /Ask AI/i });
  expect(aiButtons.length).toBeGreaterThan(0);

  // Click to open AI Assistant
  fireEvent.click(aiButtons[0]);

  // Verify chat window elements
  expect(screen.getByRole('heading', { name: /WanderBot AI/i })).toBeInTheDocument();
  expect(screen.getByText(/destinations indexed/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Ask anything/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Trending Spots/i })).toBeInTheDocument();
});

test('opens AI concierge chat tab in DestinationModal', () => {
  render(<App />);
  const exploreButtons = screen.getAllByRole('button', { name: /Explore ➔/i });
  fireEvent.click(exploreButtons[0]);

  // Click AI Concierge tab in DestinationModal
  const aiTabBtn = screen.getByRole('button', { name: /🤖 AI Concierge/i });
  expect(aiTabBtn).toBeInTheDocument();
  fireEvent.click(aiTabBtn);

  // Check destination-specific AI concierge pane
  expect(screen.getByText(/WanderBot AI Concierge • Munnar/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Ask WanderBot anything about Munnar/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Ask AI ➤/i })).toBeInTheDocument();
});

test('displays live budget in header and opens BudgetCalculatorModal', () => {
  render(<App />);
  const budgetBtn = screen.getByRole('button', { name: /💰 Budget:/i });
  expect(budgetBtn).toBeInTheDocument();

  // Click budget button in header
  fireEvent.click(budgetBtn);

  // Check modal appears with total estimated cost and breakdown
  expect(screen.getByRole('heading', { name: /Trip Budget Calculator/i })).toBeInTheDocument();
  expect(screen.getByText(/Total Estimated Trip Cost/i)).toBeInTheDocument();
  expect(screen.getByText(/Itemized Cost Breakdown/i)).toBeInTheDocument();
  expect(screen.getByText(/Number of Travelers/i)).toBeInTheDocument();
});

test('renders budget calculator with live cost breakdown in ItineraryView', () => {
  render(<App />);
  // Click Plan tab in header
  const planBtn = screen.getByRole('button', { name: /🎒 Plan/i });
  fireEvent.click(planBtn);

  // Verify ItineraryView renders Budget Calculator card
  expect(screen.getByText(/💰 Trip Budget Calculator/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Total Estimated Trip Cost/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Stays & Hotel Accommodations|Stays \(/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Proceed to Book All Stays/i })).toBeInTheDocument();
});

test('renders futuristic navigation bar with links to Home, Explore, Trips, and Profile', () => {
  render(<App />);

  // Check all 4 core navigation dock links exist within the main navigation bar
  const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
  const homeBtn = within(mainNav).getByRole('button', { name: /Home/i });
  const exploreBtn = within(mainNav).getByRole('button', { name: /Explore/i });
  const tripsBtn = within(mainNav).getByRole('button', { name: /Trips/i });
  const profileBtn = within(mainNav).getByRole('button', { name: /Profile/i });

  expect(homeBtn).toBeInTheDocument();
  expect(exploreBtn).toBeInTheDocument();
  expect(tripsBtn).toBeInTheDocument();
  expect(profileBtn).toBeInTheDocument();
});

test('navigates seamlessly between Home, Trips, Profile, and Explore views', () => {
  render(<App />);

  const mainNav = screen.getByRole('navigation', { name: /Main Navigation/i });
  const homeBtn = within(mainNav).getByRole('button', { name: /Home/i });
  const exploreBtn = within(mainNav).getByRole('button', { name: /Explore/i });
  const tripsBtn = within(mainNav).getByRole('button', { name: /Trips/i });
  const profileBtn = within(mainNav).getByRole('button', { name: /Profile/i });

  // 1. Click Home link
  fireEvent.click(homeBtn);

  // Check Home view elements
  expect(screen.getByRole('heading', { name: /Journey into the Future of Travel/i })).toBeInTheDocument();
  expect(screen.getByText(/Travel Command Center/i)).toBeInTheDocument();
  expect(screen.getByText(/Trending Horizons/i)).toBeInTheDocument();
  expect(screen.getByText(/Curated Horizons/i)).toBeInTheDocument();

  // 2. Click Profile link
  fireEvent.click(profileBtn);

  // Check Profile view elements
  expect(screen.getByRole('heading', { name: /Aysha Rayan/i })).toBeInTheDocument();
  expect(screen.getByText(/APEX VOYAGER/i)).toBeInTheDocument();
  expect(screen.getByText(/Travel Milestones & Badges/i)).toBeInTheDocument();
  expect(screen.getByText(/Traveler Configuration Deck/i)).toBeInTheDocument();
  expect(screen.getByText(/Pioneer Explorer/i)).toBeInTheDocument();

  // 3. Click Trips link
  fireEvent.click(tripsBtn);

  // Check Trips view elements
  expect(screen.getByText(/Trip Budget Calculator/i)).toBeInTheDocument();

  // 4. Click Explore link to return to discovery grid
  fireEvent.click(exploreBtn);

  // Verify Explore All tab and cards are active
  expect(screen.getByText(/Explore All/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Munnar/i })).toBeInTheDocument();
});

test('core data structure supports route planning with walking, car, and public transport options', () => {
  // 1. Verify TRANSIT_MODES enum
  expect(TRANSIT_MODES.WALKING).toBe('walking');
  expect(TRANSIT_MODES.CAR).toBe('car');
  expect(TRANSIT_MODES.PUBLIC_TRANSPORT).toBe('public_transport');

  // 2. Verify TRANSIT_MODE_CONFIG metadata
  expect(TRANSIT_MODE_CONFIG[TRANSIT_MODES.WALKING].label).toMatch(/Walking/i);
  expect(TRANSIT_MODE_CONFIG[TRANSIT_MODES.CAR].label).toMatch(/Car/i);
  expect(TRANSIT_MODE_CONFIG[TRANSIT_MODES.PUBLIC_TRANSPORT].label).toMatch(/Public Transport/i);

  // 3. Test calculateRoutePlan with curated corridor (Calicut to Munnar)
  const route = calculateRoutePlan('Calicut', 'Munnar');
  expect(route).toBeDefined();
  expect(route.startLocation).toBe('Calicut');
  expect(route.destinationName).toBe('Munnar');
  expect(route.primaryDistanceKm).toBeGreaterThan(0);
  expect(Array.isArray(route.waypoints)).toBe(true);
  expect(route.waypoints.length).toBeGreaterThan(0);
  expect(route.bestTimeToDepart).toBeDefined();

  // 4. Verify all 3 transit options: walking, car, public_transport
  const { walking, car, public_transport } = route.transitOptions;
  expect(walking).toBeDefined();
  expect(car).toBeDefined();
  expect(public_transport).toBeDefined();

  // Walking transit option
  expect(walking.mode).toBe('walking');
  expect(walking.distanceKm).toBeGreaterThan(0);
  expect(walking.durationMinutes).toBeGreaterThan(0);
  expect(walking.estimatedCost).toBe(0);
  expect(walking.isEcoFriendly).toBe(true);
  expect(Array.isArray(walking.steps)).toBe(true);
  expect(walking.steps.length).toBeGreaterThan(0);

  // Car transit option
  expect(car.mode).toBe('car');
  expect(car.distanceKm).toBe(route.primaryDistanceKm);
  expect(car.durationMinutes).toBeGreaterThan(0);
  expect(car.estimatedCost).toBeGreaterThan(0);
  expect(Array.isArray(car.steps)).toBe(true);
  expect(car.steps.length).toBeGreaterThan(0);

  // Public Transport transit option
  expect(public_transport.mode).toBe('public_transport');
  expect(public_transport.distanceKm).toBeGreaterThan(0);
  expect(public_transport.durationMinutes).toBeGreaterThan(0);
  expect(public_transport.estimatedCost).toBeGreaterThan(0);
  expect(public_transport.isEcoFriendly).toBe(true);
  expect(Array.isArray(public_transport.steps)).toBe(true);
  expect(public_transport.steps.length).toBeGreaterThan(0);

  // 5. Test dynamic calculation for custom arbitrary start and destination
  const customRoute = calculateRoutePlan('Bangalore', 'Goa');
  expect(customRoute).toBeDefined();
  expect(customRoute.startLocation).toBe('Bangalore');
  expect(customRoute.destinationName).toBe('Goa');
  expect(customRoute.transitOptions.walking).toBeDefined();
  expect(customRoute.transitOptions.car).toBeDefined();
  expect(customRoute.transitOptions.public_transport).toBeDefined();
});

test('opens RoutePlannerModal from futuristic navigation bar and toggles transit modes', () => {
  render(<App />);

  // Click Routes button in Futuristic Navigation Bar
  const routesBtn = screen.getByRole('button', { name: /Routes/i });
  expect(routesBtn).toBeInTheDocument();
  fireEvent.click(routesBtn);

  // Check Route Planner modal is opened
  expect(screen.getByRole('heading', { name: /Route Planning & Transit Engine/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/Start Location/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();

  // Verify all 3 transit options tabs exist
  const walkingTab = screen.getByRole('tab', { name: /Walking & Trekking/i });
  const carTab = screen.getByRole('tab', { name: /Car \/ Driving/i });
  const ptTab = screen.getByRole('tab', { name: /Public Transport/i });

  expect(walkingTab).toBeInTheDocument();
  expect(carTab).toBeInTheDocument();
  expect(ptTab).toBeInTheDocument();

  // Switch to Walking tab
  fireEvent.click(walkingTab);
  expect(walkingTab).toHaveAttribute('aria-selected', 'true');
  expect(screen.getAllByText(/Zero Emissions/i).length).toBeGreaterThan(0);

  // Switch to Public Transport tab
  fireEvent.click(ptTab);
  expect(ptTab).toHaveAttribute('aria-selected', 'true');

  // Test swap button
  const swapBtn = screen.getByRole('button', { name: /Swap endpoints/i });
  fireEvent.click(swapBtn);

  // Close modal
  const closeBtns = screen.getAllByRole('button', { name: /Close route planner/i });
  fireEvent.click(closeBtns[0]);
});

test('supports route planning in DestinationModal and launches full route planner', () => {
  render(<App />);
  const exploreButtons = screen.getAllByRole('button', { name: /Explore ➔/i });
  fireEvent.click(exploreButtons[0]);

  // Click Travel & Transit tab in DestinationModal
  const travelTab = screen.getByRole('button', { name: /Travel & Transit/i });
  fireEvent.click(travelTab);

  // Verify route section header
  expect(screen.getByText(/Multi-Modal Route Planning & Transit/i)).toBeInTheDocument();

  // Verify full route planner trigger button inside DestinationModal
  const openPlannerBtn = screen.getByRole('button', { name: /Open Full Route Planner ➔/i });
  expect(openPlannerBtn).toBeInTheDocument();
  fireEvent.click(openPlannerBtn);

  // Verify RoutePlannerModal opened
  expect(screen.getByRole('heading', { name: /Route Planning & Transit Engine/i })).toBeInTheDocument();
});

test('route plan data structure supports multi-day road trips, route hotels, and stay service filters', () => {
  // 1. Verify stay category definitions
  expect(ROUTE_STAY_CATEGORIES.LUXURY).toBeDefined();
  expect(ROUTE_STAY_CATEGORIES.HIGHWAY).toBeDefined();
  expect(ROUTE_STAY_CATEGORIES.BOUTIQUE).toBeDefined();
  expect(ROUTE_STAY_CATEGORIES.ECO_NATURE).toBeDefined();
  expect(ROUTE_STAY_CATEGORIES.BUDGET).toBeDefined();

  // 2. Verify stay service amenities definitions
  expect(STAY_SERVICES.EV_CHARGING.id).toBe('ev_charging');
  expect(STAY_SERVICES.FREE_BREAKFAST.id).toBe('free_breakfast');
  expect(STAY_SERVICES.SWIMMING_POOL.id).toBe('pool');
  expect(STAY_SERVICES.SPA_WELLNESS.id).toBe('spa');
  expect(STAY_SERVICES.CHECKIN_24H.id).toBe('checkin_24h');

  // 3. Test Calicut-Munnar route plan multiDayPlan and routeHotels
  const route = calculateRoutePlan('Calicut', 'Munnar');
  expect(route.multiDayPlan).toBeDefined();
  expect(route.multiDayPlan.isMultiDay).toBe(true);
  expect(Array.isArray(route.multiDayPlan.dayLegs)).toBe(true);
  expect(route.multiDayPlan.dayLegs.length).toBeGreaterThanOrEqual(2);

  // 4. Test route hotels along corridor
  expect(Array.isArray(route.routeHotels)).toBe(true);
  expect(route.routeHotels.length).toBeGreaterThan(0);

  const sampleHotel = route.routeHotels[0];
  expect(sampleHotel.name).toBeDefined();
  expect(sampleHotel.locationName).toBeDefined();
  expect(sampleHotel.category).toBeDefined();
  expect(sampleHotel.rating).toBeGreaterThan(0);
  expect(sampleHotel.pricePerNight).toBeGreaterThan(0);
  expect(Array.isArray(sampleHotel.services)).toBe(true);
  expect(Array.isArray(sampleHotel.rooms)).toBe(true);
  expect(sampleHotel.rooms.length).toBeGreaterThan(0);
});

test('filters and selects hotels and stay services along the route in RoutePlannerModal', () => {
  render(<App />);

  // Open Route Planner from Futuristic Navigation Bar
  const routesBtn = screen.getByRole('button', { name: /Routes/i });
  fireEvent.click(routesBtn);

  // Check section header for hotels along the route
  expect(screen.getByRole('heading', { name: /Hotels & Stay Services Along the Route/i })).toBeInTheDocument();
  expect(screen.getByText(/MULTI-DAY ROAD TRIP ENGINE/i)).toBeInTheDocument();
  expect(screen.getByText(/Recommended Multi-Day Journey Schedule/i)).toBeInTheDocument();

  // Verify Day filter pills exist
  expect(screen.getByRole('button', { name: /All Days/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Day 1 Stops/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Day 2 Stays/i })).toBeInTheDocument();

  // Verify stay services filter chips (EV Fast Charging, Free Breakfast, Swimming Pool, etc.)
  const evChip = screen.getByRole('button', { name: /EV Fast Charging/i });
  const breakfastChip = screen.getByRole('button', { name: /Free Breakfast/i });
  expect(evChip).toBeInTheDocument();
  expect(breakfastChip).toBeInTheDocument();

  // Verify hotel cards are displayed
  expect(screen.getByText(/The Grand Malabar Highway Transit Suites/i)).toBeInTheDocument();
  expect(screen.getByText(/Arya Vaidya Heritage Wellness Resort & Spa/i)).toBeInTheDocument();

  // Test filter by service: click EV Fast Charging
  fireEvent.click(evChip);
  expect(evChip).toHaveClass('active');

  // Verify search filter input
  const searchInput = screen.getByPlaceholderText(/Search hotel name, town, or amenities/i);
  fireEvent.change(searchInput, { target: { value: 'Grand Malabar' } });
  expect(screen.getByText(/The Grand Malabar Highway Transit Suites/i)).toBeInTheDocument();

  // Select this stay for Day 1
  const selectBtns = screen.getAllByRole('button', { name: /\+ Select for Day 1/i });
  expect(selectBtns.length).toBeGreaterThan(0);
  fireEvent.click(selectBtns[0]);

  // Check stay is selected and Confirmed Route Accommodations summary deck appears
  expect(screen.getByText(/✓ Selected for Day 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Confirmed Route Accommodations/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add All Route Stays to Travel Plan/i })).toBeInTheDocument();

  // Click Add All Route Stays to Travel Plan
  const addAllBtn = screen.getByRole('button', { name: /Add All Route Stays to Travel Plan/i });
  fireEvent.click(addAllBtn);

  // Close modal
  const closeBtns = screen.getAllByRole('button', { name: /Close route planner/i });
  fireEvent.click(closeBtns[0]);
});

test('calculateRoutePlan core data structure returns famousSpots, foodSpots, viewpoints, and enrouteSpots with valid metadata', () => {
  // 1. Verify en-route spot category constants
  expect(ENROUTE_SPOT_CATEGORIES.ALL.id).toBe('all');
  expect(ENROUTE_SPOT_CATEGORIES.FAMOUS.id).toBe('famous');
  expect(ENROUTE_SPOT_CATEGORIES.FOOD.id).toBe('food');
  expect(ENROUTE_SPOT_CATEGORIES.VIEWPOINT.id).toBe('viewpoint');

  // 2. Test curated route (Calicut to Munnar)
  const route = calculateRoutePlan('Calicut', 'Munnar');
  expect(Array.isArray(route.famousSpots)).toBe(true);
  expect(Array.isArray(route.foodSpots)).toBe(true);
  expect(Array.isArray(route.viewpoints)).toBe(true);
  expect(Array.isArray(route.enrouteSpots)).toBe(true);

  expect(route.famousSpots.length).toBeGreaterThanOrEqual(4);
  expect(route.foodSpots.length).toBeGreaterThanOrEqual(4);
  expect(route.viewpoints.length).toBeGreaterThanOrEqual(4);
  expect(route.enrouteSpots.length).toBe(
    route.famousSpots.length + route.foodSpots.length + route.viewpoints.length
  );

  // 3. Verify chronological order of enrouteSpots by distanceMarkKm
  for (let i = 0; i < route.enrouteSpots.length - 1; i++) {
    expect(route.enrouteSpots[i].distanceMarkKm).toBeLessThanOrEqual(route.enrouteSpots[i + 1].distanceMarkKm);
  }

  // 4. Verify fields on famous, food, and viewpoint spots
  const sampleFamous = route.famousSpots[0];
  expect(sampleFamous.id).toBeDefined();
  expect(sampleFamous.name).toBeDefined();
  expect(sampleFamous.category).toBe('famous');
  expect(sampleFamous.specialty).toBeDefined();
  expect(sampleFamous.rating).toBeGreaterThan(0);
  expect(sampleFamous.image).toBeDefined();

  const sampleFood = route.foodSpots[0];
  expect(sampleFood.category).toBe('food');
  expect(sampleFood.specialty).toBeDefined();
  expect(sampleFood.bestTimeToVisit).toBeDefined();

  const sampleViewpoint = route.viewpoints[0];
  expect(sampleViewpoint.category).toBe('viewpoint');
  expect(sampleViewpoint.specialty).toBeDefined();
  expect(sampleViewpoint.estimatedTime).toBeDefined();

  // 5. Verify dynamic route generation supports all three categories
  const dynamicRoute = calculateRoutePlan('Bangalore', 'Goa');
  expect(dynamicRoute.famousSpots.length).toBeGreaterThanOrEqual(2);
  expect(dynamicRoute.foodSpots.length).toBeGreaterThanOrEqual(2);
  expect(dynamicRoute.viewpoints.length).toBeGreaterThanOrEqual(2);
  expect(dynamicRoute.enrouteSpots.length).toBeGreaterThanOrEqual(6);
});

test('RoutePlannerModal renders en-route spots section with Famous, Food, and Viewpoint tabs and allows filtering and bookmarking', () => {
  render(<App />);

  // Open Route Planner from Futuristic Navigation Bar
  const routesBtn = screen.getByRole('button', { name: /Routes/i });
  fireEvent.click(routesBtn);

  // Check section header for en-route spots along the route
  expect(screen.getByRole('heading', { name: /Famous Spots, Food Spots & Viewpoints Along the Route/i })).toBeInTheDocument();
  expect(screen.getByText(/DISCOVERIES EN ROUTE/i)).toBeInTheDocument();

  // Verify all 4 category tabs exist
  const allTab = screen.getByRole('tab', { name: /All Enroute Spots/i });
  const famousTab = screen.getByRole('tab', { name: /Famous Spots/i });
  const foodTab = screen.getByRole('tab', { name: /Food & Dining/i });
  const viewpointTab = screen.getByRole('tab', { name: /Scenic Viewpoints/i });

  expect(allTab).toBeInTheDocument();
  expect(famousTab).toBeInTheDocument();
  expect(foodTab).toBeInTheDocument();
  expect(viewpointTab).toBeInTheDocument();

  // Test category filtering: switch to Food & Dining
  fireEvent.click(foodTab);
  expect(foodTab).toHaveClass('active');

  // Verify search input filters en-route spots
  const searchInput = screen.getByPlaceholderText(/Search spots, food, views, or specialty/i);
  fireEvent.change(searchInput, { target: { value: 'Paragon' } });
  expect(screen.getByText(/Paragon Express/i)).toBeInTheDocument();

  // Test bookmarking a spot
  const bookmarkBtns = screen.getAllByRole('button', { name: /\+ Add Stop to Route/i });
  expect(bookmarkBtns.length).toBeGreaterThan(0);
  fireEvent.click(bookmarkBtns[0]);

  // Check bookmark button state changed and Planned En-Route Stops bottom deck is visible
  expect(screen.getByRole('button', { name: /✓ Stop Bookmarked/i })).toBeInTheDocument();
  expect(screen.getByText(/Planned En-Route Stops/i)).toBeInTheDocument();

  // Click Add All Planned Stops to Travel Itinerary
  const addSpotsBtn = screen.getByRole('button', { name: /Add All Planned Stops to Travel Itinerary/i });
  expect(addSpotsBtn).toBeInTheDocument();
  fireEvent.click(addSpotsBtn);

  // Switch to Viewpoints tab
  fireEvent.click(viewpointTab);
  expect(viewpointTab).toHaveClass('active');

  // Clear search input
  const clearBtn = screen.getByRole('button', { name: /Clear spot search/i });
  fireEvent.click(clearBtn);

  // Verify scenic viewpoints appear
  expect(screen.getAllByText(/Neriamangalam River Bridge|Lockhart Gap|Cheeyappara/i).length).toBeGreaterThan(0);

  // Close Route Planner modal
  const closeBtns = screen.getAllByRole('button', { name: /Close route planner/i });
  fireEvent.click(closeBtns[0]);
});

test('DestinationModal Travel & Transit tab displays preview of en-route famous spots, food spots, and viewpoints', () => {
  render(<App />);

  // Open DestinationModal for Munnar
  const exploreButtons = screen.getAllByRole('button', { name: /Explore ➔/i });
  fireEvent.click(exploreButtons[0]);

  // Switch to Travel & Transit tab
  const travelTab = screen.getByRole('button', { name: /Travel & Transit/i });
  fireEvent.click(travelTab);

  // Verify En-Route Discoveries preview card is rendered
  expect(screen.getByText(/Discoveries Along Planned Route/i)).toBeInTheDocument();
  expect(screen.getByText(/Famous Spots •/i)).toBeInTheDocument();
  expect(screen.getByText(/Food Stops •/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Scenic Viewpoints/i).length).toBeGreaterThan(0);

  // Verify explore button inside DestinationModal
  const exploreStopsBtn = screen.getByRole('button', { name: /Explore All En-Route Stops ➔/i });
  expect(exploreStopsBtn).toBeInTheDocument();
});

test('aiTravelEngine core engine generates customized multi-day itineraries and matches destinations based on user preferences', () => {
  const munnar = INITIAL_DESTINATIONS.find((d) => d.name === 'Munnar');
  expect(munnar).toBeDefined();

  // 1. Generate customized 3-day itinerary
  const customPlan = generateCustomItinerary({
    destination: munnar,
    durationDays: 3,
    tripVibe: 'hills-nature',
    budgetTier: 'comfort',
    companions: 'Couple',
    destinations: INITIAL_DESTINATIONS
  });

  expect(customPlan).toBeDefined();
  expect(customPlan.title).toMatch(/3-Day Couple Customized Journey in Munnar/i);
  expect(customPlan.durationDays).toBe(3);
  expect(customPlan.dailyPlan).toHaveLength(3);
  expect(customPlan.dailyPlan[0].morning).toContain('Check-in');
  expect(customPlan.selectedRoom).toBeDefined();
  expect(customPlan.estimatedBudget.grandTotal).toBeGreaterThan(0);
  expect(customPlan.actionableItem.destinationName).toBe('Munnar');
  expect(customPlan.actionableItem.aiCustomItinerary).toBeDefined();

  // 2. Find destination matches for tropical beach
  const beachMatches = findDestinationMatches({
    vibe: 'tropical-beach',
    budgetTier: 'luxury',
    durationDays: 4,
    companions: 'Couple',
    destinations: INITIAL_DESTINATIONS
  });

  expect(beachMatches.length).toBeGreaterThan(0);
  expect(beachMatches[0].matchScore).toBeGreaterThanOrEqual(75);
  expect(beachMatches[0].matchReasons.length).toBeGreaterThan(0);
  expect(beachMatches[0].destination).toBeDefined();
});

test('AIAssistantChat supports dual-mode architecture, generates custom itineraries and applies them to active trips', async () => {
  render(<App />);

  // Open global AI Assistant
  const aiButtons = screen.getAllByRole('button', { name: /ask ai/i });
  fireEvent.click(aiButtons[0]);

  expect(screen.getByText(/WanderBot AI/i)).toBeInTheDocument();

  // Verify dual-mode tabs
  const chatModeTab = screen.getByRole('button', { name: /AI Concierge Chat/i });
  const architectModeTab = screen.getByRole('button', { name: /Itinerary Architect & Destination Matcher/i });
  expect(chatModeTab).toBeInTheDocument();
  expect(architectModeTab).toBeInTheDocument();

  // Switch to Architect mode
  fireEvent.click(architectModeTab);
  expect(architectModeTab).toHaveClass('active');

  // Verify preference controls
  expect(screen.getByText(/Destination Target:/i)).toBeInTheDocument();
  expect(screen.getByText(/Travel Style \/ Vibe:/i)).toBeInTheDocument();
  expect(screen.getByText(/Trip Duration:/i)).toBeInTheDocument();

  // Select Hill Station vibe
  const hillVibeBtn = screen.getByRole('button', { name: /Hill Stations & Nature/i });
  fireEvent.click(hillVibeBtn);
  expect(hillVibeBtn).toHaveClass('active');

  // Click Generate Custom Itinerary button
  const generateBtn = screen.getByRole('button', { name: /Generate Custom Itinerary & Destination Matches/i });
  fireEvent.click(generateBtn);

  // Wait for generated plan card to appear
  const applyBtn = await screen.findByRole('button', { name: /Apply Custom Itinerary to My Trips/i });
  expect(applyBtn).toBeInTheDocument();

  // Verify destination match recommendations carousel
  expect(screen.getByText(/Top Destination Matches for Your Preferences/i)).toBeInTheDocument();
  expect(screen.getAllByText(/AI Match/i).length).toBeGreaterThan(0);

  // Click Apply Custom Itinerary
  fireEvent.click(applyBtn);

  // Verify application navigates to Trips and displays the itinerary with AI Custom badge
  expect(await screen.findByText(/My Travel Plan Portfolio/i)).toBeInTheDocument();
  expect(screen.getAllByText(/AI Custom Plan/i).length).toBeGreaterThan(0);
});

test('ItineraryView and HomeView integrate AI Itinerary Architect launchers', () => {
  render(<App />);

  // 1. Navigate to Home
  const homeNavLink = screen.getByRole('button', { name: /🪐 Home/i });
  fireEvent.click(homeNavLink);

  // Verify AI banner exists on Home
  expect(screen.getByText(/Let AI Match Your Travel Style & Plan Custom Itineraries/i)).toBeInTheDocument();
  const launchHomeAIBtn = screen.getByRole('button', { name: /Launch AI Architect/i });
  expect(launchHomeAIBtn).toBeInTheDocument();

  // Launch AI from Home
  fireEvent.click(launchHomeAIBtn);
  expect(screen.getByText(/Itinerary Architect & Destination Matcher/i)).toBeInTheDocument();

  // Close AI modal
  const closeBtn = screen.getByRole('button', { name: /Close AI Assistant/i });
  fireEvent.click(closeBtn);

  // 2. Navigate to Trips
  const tripsNavLink = document.getElementById('nav-link-trips');
  fireEvent.click(tripsNavLink);

  // Verify AI Custom Itinerary button in header actions
  const aiItinBtn = screen.getByRole('button', { name: /AI Custom Itinerary/i });
  expect(aiItinBtn).toBeInTheDocument();

  // Click AI Custom Itinerary
  fireEvent.click(aiItinBtn);
  expect(screen.getByText(/Itinerary Architect & Destination Matcher/i)).toBeInTheDocument();
});

test('renders user profile credentials, allows editing credentials and persists updates', () => {
  render(<App />);

  // Navigate to Profile view
  const profileNavLink = document.getElementById('nav-link-profile');
  fireEvent.click(profileNavLink);

  // 1. Verify default traveler credentials & telemetry
  expect(screen.getByRole('heading', { name: /Aysha Rayan/i })).toBeInTheDocument();
  expect(screen.getByText(/@aysha_explorer/i)).toBeInTheDocument();
  expect(screen.getByText(/APEX VOYAGER/i)).toBeInTheDocument();
  expect(screen.getByText(/PASSPORT ID: WNDR-2026-X79/i)).toBeInTheDocument();
  expect(screen.getByText(/Bangalore, India/i)).toBeInTheDocument();

  // Telemetry metrics
  expect(screen.getByText(/1,420/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Followers/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Following/i).length).toBeGreaterThan(0);

  // 2. Open Edit Profile Modal
  const editProfileBtn = screen.getByRole('button', { name: /Edit Profile/i });
  expect(editProfileBtn).toBeInTheDocument();
  fireEvent.click(editProfileBtn);

  // Verify modal dialog is open
  expect(screen.getByRole('heading', { name: /Update Traveler Profile/i })).toBeInTheDocument();

  // Edit name and bio
  const nameInput = document.getElementById('edit-name');
  const bioInput = document.getElementById('edit-bio');
  const locationInput = document.getElementById('edit-location');

  fireEvent.change(nameInput, { target: { value: 'Aysha Rayan-Explorer' } });
  fireEvent.change(bioInput, { target: { value: 'Crafting alpine routes across the Western Ghats and Himalayas.' } });
  fireEvent.change(locationInput, { target: { value: 'Manali, India' } });

  // Save changes
  const saveBtn = screen.getByRole('button', { name: /Save Profile Changes/i });
  fireEvent.click(saveBtn);

  // 3. Verify updated details appear in the passport hero
  expect(screen.getByRole('heading', { name: /Aysha Rayan-Explorer/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Manali, India/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Crafting alpine routes across the Western Ghats and Himalayas./i)).toBeInTheDocument();
});

test('renders community explorer network, supports live follow/unfollow and follower directory', () => {
  render(<App />);

  // Navigate to Profile view
  const profileNavLink = document.getElementById('nav-link-profile');
  fireEvent.click(profileNavLink);

  // 1. Verify Community Network section and seed explorers
  expect(screen.getByText(/Community Travel Architects & Explorer Network/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Dr. Sameer Siddiqui/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Elena Rostova/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Kenji Sato/i })).toBeInTheDocument();

  // Initial Following metric starts at 2 (Dr. Sameer Siddiqui & Elena Rostova)
  const initialFollowingBoxes = screen.getAllByText('2');
  expect(initialFollowingBoxes.length).toBeGreaterThan(0);

  // Find follow button for Kenji Sato (not currently followed)
  const followButtons = screen.getAllByRole('button', { name: /\+ Follow/i });
  expect(followButtons.length).toBeGreaterThan(0);

  // Click follow on Kenji Sato
  fireEvent.click(followButtons[0]);

  // Following metric should now increment to 3
  expect(screen.getAllByText('3').length).toBeGreaterThan(0);

  // 2. Unfollow an explorer (Dr. Sameer Siddiqui)
  const followingButtons = screen.getAllByRole('button', { name: /Following/i });
  expect(followingButtons.length).toBeGreaterThan(0);

  fireEvent.click(followingButtons[0]);

  // Following metric returns to 2
  expect(screen.getAllByText('2').length).toBeGreaterThan(0);

  // 3. Test explorer search filtering
  const searchInput = screen.getByPlaceholderText(/Search creators by name, specialty, location.../i);
  fireEvent.change(searchInput, { target: { value: 'Western Ghats' } });

  expect(screen.getByRole('heading', { name: /Dr. Sameer Siddiqui/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /Kenji Sato/i })).not.toBeInTheDocument();

  // Clear search
  fireEvent.change(searchInput, { target: { value: '' } });
  expect(screen.getByRole('heading', { name: /Kenji Sato/i })).toBeInTheDocument();

  // 4. Verify Followers Directory
  expect(screen.getByText(/Travelers Following You/i)).toBeInTheDocument();
  expect(screen.getByText(/Kabir Mehta/i)).toBeInTheDocument();
  expect(screen.getByText(/Zoya Khan/i)).toBeInTheDocument();
  expect(screen.getAllByText(/✦ Mutual Follow/i).length).toBeGreaterThan(0);
});

test('supports social sharing of traveler passport with LinkedIn and Community Hub publishing', () => {
  render(<App />);

  // Navigate to Profile view
  const profileNavLink = document.getElementById('nav-link-profile');
  fireEvent.click(profileNavLink);

  // Click Share Passport button in Passport Hero
  const sharePassportBtn = screen.getByRole('button', { name: /Share Passport/i });
  expect(sharePassportBtn).toBeInTheDocument();
  fireEvent.click(sharePassportBtn);

  // Verify Share Modal appears with Traveler Passport mode active
  expect(screen.getByText(/Share Your Travel Plan/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Traveler Passport/i })).toHaveClass('active');

  // Verify preview contains traveler passport credentials
  expect(screen.getByText(/Message Preview/i)).toBeInTheDocument();
  const preElement = screen.getByText(/WanderLust Traveler Passport/i);
  expect(preElement).toBeInTheDocument();

  // Verify Social Share Buttons
  expect(screen.getByRole('button', { name: /Share on WhatsApp/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Share on Facebook/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Post on X \(Twitter\)/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Share on LinkedIn/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Publish to Community/i })).toBeInTheDocument();

  // Click Publish to Community Hub
  const publishCommunityBtn = screen.getByRole('button', { name: /Publish to Community/i });
  fireEvent.click(publishCommunityBtn);

  // Expect published banner to appear
  expect(screen.getByText(/Published to WanderLust Community Hub!/i)).toBeInTheDocument();

  // Close share modal
  const closeShareModalBtn = screen.getByRole('button', { name: /Close Share Modal/i });
  fireEvent.click(closeShareModalBtn);
  expect(screen.queryByText(/Published to WanderLust Community Hub!/i)).not.toBeInTheDocument();
});




