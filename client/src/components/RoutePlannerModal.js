import React, { useState, useMemo } from 'react';
import {
  calculateRoutePlan,
  TRANSIT_MODES,
  TRANSIT_MODE_CONFIG,
  ROUTE_STAY_CATEGORIES,
  STAY_SERVICES,
  ENROUTE_SPOT_CATEGORIES
} from '../data/destinationsData';

/**
 * RoutePlannerModal Component
 * Interactive modal supporting route planning between an origin (start)
 * and destination with transit options: walking, car, and public transport.
 * Includes complete functionality to filter and select hotels and stay services
 * along the route for multi-day trips.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Dismiss callback
 * @param {string} props.startLocation - Current origin/start string
 * @param {Function} props.setStartLocation - Setter for origin
 * @param {string} props.destination - Destination query/name
 * @param {Function} props.setDestination - Setter for destination
 * @param {Array} props.destinations - Available destination catalog
 * @param {Function} [props.onAddToItinerary] - Optional add-to-trip callback
 * @param {Function} [props.onAddStayToItinerary] - Specific stay add-to-trip callback
 * @param {Function} [props.onOpenAIChat] - Optional launch AI chat callback
 */
export default function RoutePlannerModal({
  isOpen,
  onClose,
  startLocation = '',
  setStartLocation,
  destination = '',
  setDestination,
  destinations = [],
  onAddToItinerary,
  onAddStayToItinerary,
  onOpenAIChat,
}) {
  const [activeMode, setActiveMode] = useState(TRANSIT_MODES.CAR);
  const [customStart, setCustomStart] = useState(startLocation || 'Calicut');
  const [selectedDestName, setSelectedDestName] = useState(destination || 'Munnar');

  // Multi-day trip and stay filter states
  const [isMultiDayMode, setIsMultiDayMode] = useState(true);
  const [selectedDayFilter, setSelectedDayFilter] = useState('all'); // 'all', 1, 2, 3
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Enroute spots filters and selections (famous spots, food spots, viewpoints)
  const [selectedSpotCategory, setSelectedSpotCategory] = useState('all'); // 'all', 'famous', 'food', 'viewpoint'
  const [spotSearchQuery, setSpotSearchQuery] = useState('');
  const [spotSortMode, setSpotSortMode] = useState('distance'); // 'distance', 'rating'
  const [bookmarkedSpots, setBookmarkedSpots] = useState({});

  // Selected route accommodations state: { [hotelId]: { hotel, room, nights, dayNumber } }
  const [selectedStays, setSelectedStays] = useState({});
  // Track selected room per hotel: { [hotelId]: roomId }
  const [hotelRoomPicks, setHotelRoomPicks] = useState({});
  // Track nights per hotel: { [hotelId]: nights }
  const [hotelNightsPicks, setHotelNightsPicks] = useState({});

  // Local user toast alert inside modal
  const [toastAlert, setToastAlert] = useState(null);

  const showModalToast = (msg) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(null), 3200);
  };

  // Sync initial props
  React.useEffect(() => {
    if (startLocation) setCustomStart(startLocation);
  }, [startLocation]);

  React.useEffect(() => {
    if (destination) setSelectedDestName(destination);
  }, [destination]);

  // Find destination object from catalog
  const currentDestObj = useMemo(() => {
    if (!destinations || destinations.length === 0) return null;
    return (
      destinations.find(
        (d) =>
          d.name.toLowerCase() === selectedDestName.toLowerCase() ||
          d.id === selectedDestName.toLowerCase()
      ) || destinations[0]
    );
  }, [destinations, selectedDestName]);

  // Calculate comprehensive route plan based on start and destination
  const routePlan = useMemo(() => {
    return calculateRoutePlan(customStart || 'Current Location', currentDestObj || selectedDestName, activeMode);
  }, [customStart, currentDestObj, selectedDestName, activeMode]);

  // All en-route stays
  const allRouteHotels = useMemo(() => {
    return routePlan?.routeHotels || [];
  }, [routePlan]);

  // Filtered route stays based on active filters
  const filteredHotels = useMemo(() => {
    return allRouteHotels.filter((hotel) => {
      // Day filter
      if (selectedDayFilter !== 'all' && hotel.dayNumber !== Number(selectedDayFilter)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && hotel.category !== selectedCategory) {
        return false;
      }
      // Price Tier filter
      if (selectedPriceTier === 'budget' && hotel.pricePerNight > 3500) return false;
      if (selectedPriceTier === 'mid' && (hotel.pricePerNight < 3500 || hotel.pricePerNight > 7000)) return false;
      if (selectedPriceTier === 'luxury' && hotel.pricePerNight < 7000) return false;
      // Rating filter
      if (minRating > 0 && hotel.rating < minRating) return false;
      // Services & amenities filter (ALL selected must match)
      if (selectedServices.length > 0) {
        const hotelServices = hotel.services || [];
        const hasAll = selectedServices.every((srvId) => hotelServices.includes(srvId));
        if (!hasAll) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = hotel.name.toLowerCase().includes(q);
        const matchLoc = (hotel.locationName || '').toLowerCase().includes(q);
        const matchTagline = (hotel.tagline || '').toLowerCase().includes(q);
        const matchServices = (hotel.services || []).some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchTagline && !matchServices) return false;
      }
      return true;
    });
  }, [allRouteHotels, selectedDayFilter, selectedCategory, selectedPriceTier, minRating, selectedServices, searchQuery]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDayFilter !== 'all') count++;
    if (selectedCategory !== 'all') count++;
    if (selectedPriceTier !== 'all') count++;
    if (minRating > 0) count++;
    if (selectedServices.length > 0) count += selectedServices.length;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedDayFilter, selectedCategory, selectedPriceTier, minRating, selectedServices, searchQuery]);

  // All en-route spots along the route (famous, food, viewpoints)
  const allEnrouteSpots = useMemo(() => {
    return routePlan?.enrouteSpots || [];
  }, [routePlan]);

  const famousCount = useMemo(() => routePlan?.famousSpots?.length || 0, [routePlan]);
  const foodCount = useMemo(() => routePlan?.foodSpots?.length || 0, [routePlan]);
  const viewpointCount = useMemo(() => routePlan?.viewpoints?.length || 0, [routePlan]);

  // Filtered en-route spots based on category, search query, and sort mode
  const filteredSpots = useMemo(() => {
    return allEnrouteSpots.filter((spot) => {
      if (selectedSpotCategory !== 'all' && spot.category !== selectedSpotCategory) {
        return false;
      }
      if (spotSearchQuery.trim()) {
        const q = spotSearchQuery.toLowerCase();
        const matchName = (spot.name || '').toLowerCase().includes(q);
        const matchLoc = (spot.locationName || '').toLowerCase().includes(q);
        const matchDesc = (spot.description || '').toLowerCase().includes(q);
        const matchSpec = (spot.specialty || '').toLowerCase().includes(q);
        const matchTags = (spot.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchDesc && !matchSpec && !matchTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (spotSortMode === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return a.distanceMarkKm - b.distanceMarkKm;
    });
  }, [allEnrouteSpots, selectedSpotCategory, spotSearchQuery, spotSortMode]);

  const handleToggleBookmarkSpot = (spot) => {
    setBookmarkedSpots((prev) => {
      const next = { ...prev };
      if (next[spot.id]) {
        delete next[spot.id];
        showModalToast(`Removed "${spot.name}" from planned stops`);
      } else {
        next[spot.id] = spot;
        showModalToast(`✓ Bookmarked "${spot.name}" as an en-route stop!`);
      }
      return next;
    });
  };

  if (!isOpen) return null;

  const currentOption = routePlan.transitOptions[activeMode] || routePlan.transitOptions[TRANSIT_MODES.CAR];
  const modeConfig = TRANSIT_MODE_CONFIG[activeMode];

  const handleSwap = () => {
    const prevStart = customStart;
    const prevDest = selectedDestName;
    setCustomStart(prevDest);
    setSelectedDestName(prevStart);
    if (setStartLocation) setStartLocation(prevDest);
    if (setDestination) setDestination(prevStart);
  };

  const handleStartChange = (val) => {
    setCustomStart(val);
    if (setStartLocation) setStartLocation(val);
  };

  const handleDestChange = (val) => {
    setSelectedDestName(val);
    if (setDestination) setDestination(val);
  };

  // Toggle service chip filter
  const handleToggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedDayFilter('all');
    setSelectedCategory('all');
    setSelectedPriceTier('all');
    setMinRating(0);
    setSelectedServices([]);
    setSearchQuery('');
    showModalToast('All hotel & stay filters reset.');
  };

  // Handle room pick for a hotel
  const handleSelectRoom = (hotelId, roomId) => {
    setHotelRoomPicks((prev) => ({
      ...prev,
      [hotelId]: roomId
    }));
    // Also update selectedStays if already selected
    if (selectedStays[hotelId]) {
      const hotel = allRouteHotels.find((h) => h.id === hotelId);
      const room = hotel?.rooms?.find((r) => r.id === roomId) || hotel?.rooms?.[0];
      setSelectedStays((prev) => ({
        ...prev,
        [hotelId]: {
          ...prev[hotelId],
          room
        }
      }));
    }
  };

  // Handle nights pick for a hotel
  const handleNightsChange = (hotelId, delta) => {
    const currentNights = hotelNightsPicks[hotelId] || 1;
    const newNights = Math.max(1, Math.min(14, currentNights + delta));
    setHotelNightsPicks((prev) => ({
      ...prev,
      [hotelId]: newNights
    }));
    if (selectedStays[hotelId]) {
      setSelectedStays((prev) => ({
        ...prev,
        [hotelId]: {
          ...prev[hotelId],
          nights: newNights
        }
      }));
    }
  };

  // Toggle stay selection for a hotel
  const handleToggleStaySelection = (hotel) => {
    const isCurrentlySelected = !!selectedStays[hotel.id];
    if (isCurrentlySelected) {
      setSelectedStays((prev) => {
        const next = { ...prev };
        delete next[hotel.id];
        return next;
      });
      showModalToast(`Deselected "${hotel.name}".`);
    } else {
      const chosenRoomId = hotelRoomPicks[hotel.id] || hotel.rooms?.[0]?.id;
      const room = hotel.rooms?.find((r) => r.id === chosenRoomId) || hotel.rooms?.[0] || {
        name: 'Deluxe Room',
        price: hotel.pricePerNight,
        capacity: '2 Adults'
      };
      const nights = hotelNightsPicks[hotel.id] || 1;

      setSelectedStays((prev) => ({
        ...prev,
        [hotel.id]: {
          hotel,
          room,
          nights,
          dayNumber: hotel.dayNumber || 1
        }
      }));
      showModalToast(`✓ Selected "${hotel.name}" for Day ${hotel.dayNumber || 1} stay!`);
    }
  };

  // Add individual stay directly to itinerary
  const handleAddSingleStayToPlan = (hotel) => {
    const chosenRoomId = hotelRoomPicks[hotel.id] || hotel.rooms?.[0]?.id;
    const room = hotel.rooms?.find((r) => r.id === chosenRoomId) || hotel.rooms?.[0] || {
      name: 'Deluxe Room',
      price: hotel.pricePerNight,
      capacity: '2 Adults'
    };
    const nights = hotelNightsPicks[hotel.id] || 1;

    const itineraryItem = {
      destinationId: hotel.id,
      destinationName: `${hotel.name} (${hotel.locationName})`,
      region: `${routePlan.startLocation} ➔ ${routePlan.destinationName} Corridor`,
      hotelName: hotel.name,
      roomName: room.name,
      roomPrice: room.price,
      nights: nights,
      totalPrice: room.price * nights,
      image: hotel.image,
      guests: room.capacity || '2 Adults',
      isRouteStay: true,
      routeCorridor: `${routePlan.startLocation} ➔ ${routePlan.destinationName}`,
      distanceMark: hotel.distanceMarkFormatted || `${hotel.distanceMarkKm} km mark`,
      dayLeg: hotel.dayNumber ? `Day ${hotel.dayNumber} Stay` : 'Route En-Route Halt'
    };

    if (onAddStayToItinerary) {
      onAddStayToItinerary(itineraryItem);
    } else if (onAddToItinerary) {
      onAddToItinerary(itineraryItem);
    }
    showModalToast(`🎒 Added "${hotel.name}" to your travel plan!`);
  };

  // Batch add all selected route stays to travel plan
  const handleAddAllSelectedStays = () => {
    const entries = Object.values(selectedStays);
    if (entries.length === 0) return;

    entries.forEach(({ hotel, room, nights }) => {
      const itineraryItem = {
        destinationId: hotel.id,
        destinationName: `${hotel.name} (${hotel.locationName})`,
        region: `${routePlan.startLocation} ➔ ${routePlan.destinationName} Corridor`,
        hotelName: hotel.name,
        roomName: room.name,
        roomPrice: room.price,
        nights: nights,
        totalPrice: room.price * nights,
        image: hotel.image,
        guests: room.capacity || '2 Adults',
        isRouteStay: true,
        routeCorridor: `${routePlan.startLocation} ➔ ${routePlan.destinationName}`,
        distanceMark: hotel.distanceMarkFormatted || `${hotel.distanceMarkKm} km mark`,
        dayLeg: hotel.dayNumber ? `Day ${hotel.dayNumber} Stay` : 'Route En-Route Halt'
      };

      if (onAddStayToItinerary) {
        onAddStayToItinerary(itineraryItem);
      } else if (onAddToItinerary) {
        onAddToItinerary(itineraryItem);
      }
    });

    showModalToast(`🎉 Confirmed and added ${entries.length} route stay(s) to your travel itinerary!`);
  };

  // Total selected stays count and budget
  const selectedEntries = Object.values(selectedStays);
  const totalSelectedStaysCost = selectedEntries.reduce(
    (sum, item) => sum + (item.room.price * item.nights),
    0
  );

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-dialog route-planner-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="route-header-icon">🗺️</span>
            <div>
              <h2 className="modal-main-title">Route Planning & Transit Engine</h2>
              <p className="modal-subtitle">
                Compare multi-modal routes: Walking trails, Driving highways, and Public transit networks
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close route planner">
            ✕
          </button>
        </div>

        {/* Transient In-Modal Toast Feedback */}
        {toastAlert && (
          <div className="route-modal-toast" role="status">
            <span>✨ {toastAlert}</span>
          </div>
        )}

        {/* Start & Destination Route Vector Selector */}
        <div className="route-inputs-card">
          <div className="route-endpoints-row">
            {/* Start Location Input */}
            <div className="route-endpoint-box">
              <label htmlFor="route-start-input">
                <span className="ep-icon">🛫</span> Start Location (Origin)
              </label>
              <div className="input-wrap">
                <input
                  id="route-start-input"
                  type="text"
                  value={customStart}
                  onChange={(e) => handleStartChange(e.target.value)}
                  placeholder="e.g. Calicut, Kochi, New Delhi, Airport..."
                />
                {customStart && (
                  <button className="ep-clear" onClick={() => handleStartChange('')} aria-label="Clear origin">
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Bidirectional Swap Button */}
            <button
              className="btn-swap-endpoints"
              onClick={handleSwap}
              title="Swap start location and destination"
              aria-label="Swap endpoints"
            >
              ⇄
            </button>

            {/* Destination Selector / Input */}
            <div className="route-endpoint-box">
              <label htmlFor="route-dest-select">
                <span className="ep-icon">📍</span> Destination
              </label>
              <div className="input-wrap">
                <select
                  id="route-dest-select"
                  value={currentDestObj?.name || selectedDestName}
                  onChange={(e) => handleDestChange(e.target.value)}
                  className="dest-select-dropdown"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="route-meta-strip">
            <span className="meta-corridor-tag">
              CORRIDOR: <strong>{routePlan.startLocation}</strong> ➔ <strong>{routePlan.destinationName}</strong>
            </span>
            <span className="meta-time-advice">
              ⏰ Best Time to Depart: <strong>{routePlan.bestTimeToDepart}</strong>
            </span>
          </div>
        </div>

        {/* ===================================================================
            TRANSIT MODE SELECTION TABS (Walking, Car, Public Transport)
            =================================================================== */}
        <div className="transit-modes-nav" role="tablist" aria-label="Transit Options">
          {Object.values(TRANSIT_MODES).map((modeKey) => {
            const config = TRANSIT_MODE_CONFIG[modeKey];
            const opt = routePlan.transitOptions[modeKey];
            const isActive = activeMode === modeKey;

            return (
              <button
                key={modeKey}
                role="tab"
                aria-selected={isActive}
                id={`transit-tab-${modeKey}`}
                className={`transit-mode-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveMode(modeKey)}
              >
                <div className="t-mode-icon-title">
                  <span className="t-icon">{config.icon}</span>
                  <div className="t-text-group">
                    <span className="t-label">{config.label}</span>
                    <span className="t-duration">{opt?.durationFormatted || 'Available'}</span>
                  </div>
                </div>

                <div className="t-sub-meta">
                  <span className="t-badge">{config.ecoBadge}</span>
                  <span className="t-cost">
                    {opt?.estimatedCost === 0 ? 'FREE' : `~₹${opt?.estimatedCost?.toLocaleString('en-IN')}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ===================================================================
            SELECTED TRANSIT MODE OVERVIEW & TELEMETRY MATRIX
            =================================================================== */}
        <div className="transit-active-overview">
          <div className="route-telemetry-banner">
            <div className="tel-card">
              <span className="tel-icon">⏱️</span>
              <div className="tel-body">
                <span className="tel-number">{currentOption.durationFormatted}</span>
                <span className="tel-label">Travel Time</span>
              </div>
            </div>

            <div className="tel-card">
              <span className="tel-icon">📍</span>
              <div className="tel-body">
                <span className="tel-number">{currentOption.distanceKm} km</span>
                <span className="tel-label">Total Distance</span>
              </div>
            </div>

            <div className="tel-card">
              <span className="tel-icon">💰</span>
              <div className="tel-body">
                <span className="tel-number">
                  {currentOption.estimatedCost === 0 ? '₹0' : `₹${currentOption.estimatedCost.toLocaleString('en-IN')}`}
                </span>
                <span className="tel-label">Estimated Transit Cost</span>
              </div>
            </div>

            <div className="tel-card">
              <span className="tel-icon">🌱</span>
              <div className="tel-body">
                <span className="tel-number">
                  {currentOption.carbonKg === 0 ? '0 kg' : `${currentOption.carbonKg} kg`}
                </span>
                <span className="tel-label">CO₂ Carbon</span>
              </div>
            </div>

            {currentOption.caloriesBurned && (
              <div className="tel-card">
                <span className="tel-icon">🔥</span>
                <div className="tel-body">
                  <span className="tel-number">{currentOption.caloriesBurned} kcal</span>
                  <span className="tel-label">Calories Burned</span>
                </div>
              </div>
            )}
          </div>

          <div className="transit-mode-details-box">
            <div className="mode-details-header">
              <div className="mode-route-title">
                <span className="mode-pill" style={{ background: modeConfig.color }}>
                  {modeConfig.icon} {modeConfig.label}
                </span>
                <span className="mode-highway-name">{currentOption.routeName}</span>
              </div>
              <span className="mode-scenic-pill">★ {currentOption.scenicRating} / 10 Scenic Score</span>
            </div>

            <p className="mode-cost-breakdown">
              💵 <strong>Cost & Tolls:</strong> {currentOption.costBreakdown}
            </p>

            {currentOption.scheduleOrFrequency && (
              <p className="mode-schedule-info">
                🕒 <strong>Schedule & Timing:</strong> {currentOption.scheduleOrFrequency}
              </p>
            )}

            {/* Highlights Chips */}
            <div className="mode-highlights-chips">
              <strong>Route Highlights:</strong>
              <div className="h-chips-list">
                {currentOption.highlights.map((h, i) => (
                  <span key={i} className="h-chip">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            WAYPOINTS & SCENIC CHECKPOINTS
            =================================================================== */}
        {routePlan.waypoints && routePlan.waypoints.length > 0 && (
          <div className="route-waypoints-section">
            <h3 className="section-title">
              <span>📍</span> Scenic Waypoints & Checkpoints ({routePlan.waypoints.length})
            </h3>
            <div className="waypoints-horizontal-scroll">
              {routePlan.waypoints.map((wp, i) => (
                <div key={i} className="waypoint-card">
                  <div className="wp-header">
                    <span className={`wp-type-badge type-${wp.type}`}>{wp.type}</span>
                    <span className="wp-dist">{wp.distanceMark}</span>
                  </div>
                  <h4 className="wp-name">{wp.name}</h4>
                  <p className="wp-desc">{wp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            EN-ROUTE DISCOVERIES: FAMOUS SPOTS, FOOD SPOTS & VIEWPOINTS
            =================================================================== */}
        <section className="route-enroute-spots-section" id="route-enroute-spots">
          {/* Header Bar */}
          <div className="enroute-spots-header-bar">
            <div className="enroute-title-block">
              <div className="enroute-title-row">
                <span className="enroute-badge-neon">DISCOVERIES EN ROUTE</span>
                <span className="enroute-count-chip">{allEnrouteSpots.length} Handpicked Stops</span>
              </div>
              <h3 className="enroute-main-heading">
                🌟 Famous Spots, Food Spots & Viewpoints Along the Route
              </h3>
              <p className="enroute-subheading">
                Explore iconic heritage monuments, authentic highway food spots, and breathtaking panoramic viewpoints along the corridor from <strong>{routePlan.startLocation}</strong> to <strong>{routePlan.destinationName}</strong>.
              </p>
            </div>

            {/* Metric Highlights Pill Track */}
            <div className="enroute-metrics-pill-track">
              <span className="metric-pill metric-famous">
                🏛️ <strong>{famousCount}</strong> Famous Spots
              </span>
              <span className="metric-pill metric-food">
                🍛 <strong>{foodCount}</strong> Food & Dining
              </span>
              <span className="metric-pill metric-viewpoint">
                🌅 <strong>{viewpointCount}</strong> Viewpoints
              </span>
            </div>
          </div>

          {/* Category Filter Tabs & Search Bar */}
          <div className="enroute-controls-row">
            {/* Category Tabs */}
            <div className="enroute-category-tabs" role="tablist" aria-label="Enroute Spot Categories">
              {Object.values(ENROUTE_SPOT_CATEGORIES).map((cat) => {
                const count = cat.id === 'all'
                  ? allEnrouteSpots.length
                  : cat.id === 'famous'
                  ? famousCount
                  : cat.id === 'food'
                  ? foodCount
                  : viewpointCount;
                const isActive = selectedSpotCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`enroute-tab-${cat.id}`}
                    className={`enroute-cat-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedSpotCategory(cat.id)}
                  >
                    <span className="tab-cat-icon">{cat.icon}</span>
                    <span className="tab-cat-label">{cat.label}</span>
                    <span className="tab-cat-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="enroute-search-sort-group">
              <div className="enroute-search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search spots, food, views, or specialty..."
                  value={spotSearchQuery}
                  onChange={(e) => setSpotSearchQuery(e.target.value)}
                  className="enroute-search-input"
                  aria-label="Search enroute spots"
                />
                {spotSearchQuery && (
                  <button
                    type="button"
                    className="btn-clear-search"
                    onClick={() => setSpotSearchQuery('')}
                    aria-label="Clear spot search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="enroute-sort-toggle">
                <label htmlFor="spot-sort-select">Sort:</label>
                <select
                  id="spot-sort-select"
                  value={spotSortMode}
                  onChange={(e) => setSpotSortMode(e.target.value)}
                  className="enroute-sort-select"
                  aria-label="Sort enroute spots"
                >
                  <option value="distance">📍 Distance from Start</option>
                  <option value="rating">★ Highest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* En-Route Spots Grid */}
          {filteredSpots.length === 0 ? (
            <div className="enroute-empty-state">
              <span className="empty-icon">🔍</span>
              <h4>No en-route spots match your search</h4>
              <p>Try resetting the category filter or searching for another keyword.</p>
              <button
                type="button"
                className="btn-text-subtle"
                onClick={() => { setSelectedSpotCategory('all'); setSpotSearchQuery(''); }}
              >
                Reset Spot Filters
              </button>
            </div>
          ) : (
            <div className="enroute-spots-grid">
              {filteredSpots.map((spot) => {
                const isBookmarked = !!bookmarkedSpots[spot.id];
                return (
                  <div
                    key={spot.id}
                    className={`enroute-spot-card category-${spot.category} ${isBookmarked ? 'spot-bookmarked' : ''}`}
                  >
                    {/* Card Thumbnail Wrap */}
                    <div className="spot-thumb-wrap">
                      <img
                        src={spot.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'}
                        alt={spot.name}
                        className="spot-thumb-img"
                        loading="lazy"
                      />
                      <div className="spot-thumb-gradient" />

                      {/* Distance from Start Tag */}
                      <div className="spot-dist-badge">
                        <span>📍 {spot.distanceMarkFormatted || `${spot.distanceMarkKm} km mark`}</span>
                      </div>

                      {/* Category Pill */}
                      <div className={`spot-category-pill pill-${spot.category}`}>
                        <span>{spot.icon} {spot.categoryLabel || spot.category}</span>
                      </div>

                      {/* Rating Star Badge */}
                      {spot.rating && (
                        <div className="spot-rating-badge">
                          ★ {spot.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="spot-content-body">
                      <div className="spot-title-row">
                        <h4 className="spot-name">{spot.name}</h4>
                      </div>

                      <div className="spot-location-line">
                        <span className="loc-pin">🛣️</span>
                        <span className="loc-text">{spot.locationName}</span>
                      </div>

                      <p className="spot-desc">{spot.description}</p>

                      {/* Highlights / Specialties Box */}
                      {spot.specialty && (
                        <div className="spot-specialty-box">
                          <span className="spec-label">
                            {spot.category === 'food' ? '🍛 Signature Taste:' : spot.category === 'viewpoint' ? '🌅 Scenic Vista:' : '🏛️ Key Feature:'}
                          </span>
                          <span className="spec-text">{spot.specialty}</span>
                        </div>
                      )}

                      {/* Meta Tags Row */}
                      <div className="spot-meta-row">
                        {spot.bestTimeToVisit && (
                          <span className="spot-meta-chip time-chip" title="Best Time to Stop">
                            ⏰ {spot.bestTimeToVisit}
                          </span>
                        )}
                        {spot.estimatedTime && (
                          <span className="spot-meta-chip duration-chip" title="Recommended Stop Duration">
                            ⏱️ {spot.estimatedTime}
                          </span>
                        )}
                      </div>

                      {/* Tags / Keywords */}
                      {spot.tags && spot.tags.length > 0 && (
                        <div className="spot-tags-row">
                          {spot.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="spot-tag-pill">#{tag}</span>
                          ))}
                        </div>
                      )}

                      {/* Card Footer Actions */}
                      <div className="spot-card-footer">
                        <button
                          type="button"
                          className={`btn-bookmark-spot ${isBookmarked ? 'active' : ''}`}
                          onClick={() => handleToggleBookmarkSpot(spot)}
                          aria-pressed={isBookmarked}
                          title={isBookmarked ? 'Remove from planned stops' : 'Bookmark stop along your route'}
                        >
                          {isBookmarked ? '✓ Stop Bookmarked' : '+ Add Stop to Route'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bookmarked Stops Bottom Deck */}
          {Object.keys(bookmarkedSpots).length > 0 && (
            <div className="enroute-bookmarked-deck">
              <div className="deck-info">
                <span className="deck-badge">⭐ Planned En-Route Stops ({Object.keys(bookmarkedSpots).length})</span>
                <div className="deck-chips-list">
                  {Object.values(bookmarkedSpots).map((sp) => (
                    <span key={sp.id} className="deck-spot-tag">
                      {sp.icon} {sp.name} ({sp.distanceMarkKm} km)
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="btn-add-spots-plan"
                onClick={() => {
                  Object.values(bookmarkedSpots).forEach((sp) => {
                    const item = {
                      destinationId: sp.id,
                      destinationName: `${sp.name} (Stop at ${sp.distanceMarkFormatted || sp.distanceMarkKm + ' km'})`,
                      region: `${routePlan.startLocation} ➔ ${routePlan.destinationName} Corridor`,
                      hotelName: sp.category === 'food' ? `Dining: ${sp.name}` : `Stop: ${sp.name}`,
                      roomName: sp.specialty || sp.categoryLabel,
                      roomPrice: 0,
                      nights: 1,
                      totalPrice: 0,
                      image: sp.image,
                      guests: 'En-Route Stop',
                      isEnrouteStop: true,
                      routeCorridor: `${routePlan.startLocation} ➔ ${routePlan.destinationName}`,
                      distanceMark: sp.distanceMarkFormatted || `${sp.distanceMarkKm} km mark`,
                      dayLeg: sp.categoryLabel
                    };
                    if (onAddToItinerary) onAddToItinerary(item);
                  });
                  showModalToast(`🎉 Added ${Object.keys(bookmarkedSpots).length} planned en-route stop(s) to your travel itinerary!`);
                }}
              >
                🎒 Add All Planned Stops to Travel Itinerary
              </button>
            </div>
          )}
        </section>

        {/* ===================================================================
            MULTI-DAY TRIPS: HOTELS & STAY SERVICES ALONG THE ROUTE
            =================================================================== */}
        <section className="route-stays-master-section" id="route-hotels-and-stays">
          {/* Section Header */}
          <div className="route-stays-header-bar">
            <div className="stays-title-block">
              <div className="stays-title-row">
                <span className="stays-badge-neon">MULTI-DAY ROAD TRIP ENGINE</span>
                <span className="stays-count-chip">{filteredHotels.length} Stays Available En-Route</span>
              </div>
              <h3 className="route-stays-main-heading">
                🏨 Hotels & Stay Services Along the Route
              </h3>
              <p className="route-stays-subheading">
                Filter and select verified highway hotels, boutique homestays, and luxury resorts across multi-day trip legs.
              </p>
            </div>

            {/* Multi-Day Trip Mode Toggle */}
            <div className="multiday-mode-pill-toggle">
              <button
                type="button"
                className={`btn-mode-toggle ${isMultiDayMode ? 'active' : ''}`}
                onClick={() => setIsMultiDayMode(true)}
              >
                🎒 Multi-Day Road Trip ({routePlan.multiDayPlan?.recommendedDays || 2} Days)
              </button>
              <button
                type="button"
                className={`btn-mode-toggle ${!isMultiDayMode ? 'active' : ''}`}
                onClick={() => setIsMultiDayMode(false)}
              >
                ⚡ Single-Day Direct Transit
              </button>
            </div>
          </div>

          {/* Multi-Day Journey Stepper Strip */}
          {isMultiDayMode && routePlan.multiDayPlan?.dayLegs && (
            <div className="multiday-stepper-container">
              <div className="stepper-track-header">
                <span className="stepper-label">🗓️ Recommended Multi-Day Journey Schedule:</span>
                <span className="stepper-hint">Click a Day to filter en-route stays along that segment</span>
              </div>

              <div className="multiday-legs-grid">
                {routePlan.multiDayPlan.dayLegs.map((leg) => {
                  const isDaySelected = selectedDayFilter === leg.dayNumber;
                  const hasSelectedStayForDay = selectedEntries.some((s) => s.dayNumber === leg.dayNumber);

                  return (
                    <div
                      key={leg.dayNumber}
                      className={`multiday-leg-card ${isDaySelected ? 'selected-leg' : ''} ${hasSelectedStayForDay ? 'leg-booked' : ''}`}
                      onClick={() => setSelectedDayFilter(isDaySelected ? 'all' : leg.dayNumber)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="leg-card-top">
                        <span className="leg-day-badge">Day {leg.dayNumber}</span>
                        <span className="leg-dist-tag">📍 ~{leg.distanceKm} km</span>
                        {hasSelectedStayForDay && (
                          <span className="leg-confirmed-pill">✓ Stay Booked</span>
                        )}
                      </div>
                      <h4 className="leg-title">{leg.title}</h4>
                      <p className="leg-target">
                        🎯 Target Halt: <strong>{leg.targetHalt}</strong>
                      </p>
                      <p className="leg-desc">{leg.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              INTERACTIVE FILTER BAR: Categories, Prices, Ratings, Stay Services
              =================================================================== */}
          <div className="route-stays-filter-panel">
            {/* Row 1: Search & Day Selector & Price Dropdown */}
            <div className="stays-filter-row-primary">
              {/* Quick Search Input */}
              <div className="stays-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search hotel name, town, or amenities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="stays-search-input"
                  aria-label="Search hotels along route"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn-clear-search"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear stay search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Day Segment Filter */}
              <div className="stays-filter-group">
                <label className="filter-label">Segment / Day:</label>
                <div className="filter-pill-group">
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedDayFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedDayFilter('all')}
                  >
                    All Days
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedDayFilter === 1 ? 'active' : ''}`}
                    onClick={() => setSelectedDayFilter(1)}
                  >
                    🌙 Day 1 Stops
                  </button>
                  <button
                    type="button"
                    className={`filter-pill-btn ${selectedDayFilter === 2 ? 'active' : ''}`}
                    onClick={() => setSelectedDayFilter(2)}
                  >
                    🌅 Day 2 Stays
                  </button>
                </div>
              </div>

              {/* Price Tier Filter */}
              <div className="stays-filter-group">
                <label className="filter-label">Budget Tier:</label>
                <select
                  className="stays-filter-select"
                  value={selectedPriceTier}
                  onChange={(e) => setSelectedPriceTier(e.target.value)}
                  aria-label="Filter by price tier"
                >
                  <option value="all">All Rates (Any Price)</option>
                  <option value="budget">Budget (Under ₹3,500)</option>
                  <option value="mid">Mid-Range (₹3,500 - ₹7,000)</option>
                  <option value="luxury">Luxury (₹7,000+)</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="stays-filter-group">
                <label className="filter-label">Min Rating:</label>
                <div className="filter-pill-group">
                  {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                    <button
                      key={ratingVal}
                      type="button"
                      className={`filter-pill-btn ${minRating === ratingVal ? 'active' : ''}`}
                      onClick={() => setMinRating(ratingVal)}
                    >
                      {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Stay Type / Category Filter Pills */}
            <div className="stays-categories-strip">
              <span className="strip-label">Stay Category:</span>
              <div className="category-pills-wrap">
                {Object.values(ROUTE_STAY_CATEGORIES).map((cat) => {
                  const isCatActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-pill-btn ${isCatActive ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-name">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Stay Services & Amenities Multi-Select Badges */}
            <div className="stay-services-filter-box">
              <div className="services-header-row">
                <span className="services-title">
                  ⚡ Filter by Route Amenities & Stay Services ({selectedServices.length} selected):
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    className="btn-reset-filters-link"
                    onClick={handleResetFilters}
                  >
                    Reset All Filters ({activeFiltersCount})
                  </button>
                )}
              </div>

              <div className="services-chips-grid">
                {Object.values(STAY_SERVICES).map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      className={`service-filter-chip ${isChecked ? 'active' : ''}`}
                      onClick={() => handleToggleService(srv.id)}
                      aria-pressed={isChecked}
                    >
                      <span className="srv-icon">{srv.icon}</span>
                      <span className="srv-label">{srv.label}</span>
                      {isChecked && <span className="srv-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filter Status Strip */}
          <div className="stays-match-status-strip">
            <span className="match-count-text">
              Showing <strong>{filteredHotels.length}</strong> of <strong>{allRouteHotels.length}</strong> verified accommodations along corridor
            </span>
            {activeFiltersCount > 0 && (
              <span className="active-filter-tags">
                Filtered by {activeFiltersCount} criteria
              </span>
            )}
          </div>

          {/* ===================================================================
              ROUTE HOTELS CARDS GRID
              =================================================================== */}
          {filteredHotels.length === 0 ? (
            <div className="no-route-hotels-box">
              <div className="no-hotels-icon">🏨</div>
              <h4>No accommodations matched your filters along this corridor</h4>
              <p>Try resetting some amenity filters or expanding your budget range.</p>
              <button
                type="button"
                className="btn-primary"
                onClick={handleResetFilters}
              >
                Reset Hotel Filters
              </button>
            </div>
          ) : (
            <div className="route-hotels-cards-grid">
              {filteredHotels.map((hotel) => {
                const isSelected = !!selectedStays[hotel.id];
                const chosenRoomId = hotelRoomPicks[hotel.id] || hotel.rooms?.[0]?.id;
                const activeRoom = hotel.rooms?.find((r) => r.id === chosenRoomId) || hotel.rooms?.[0] || {
                  name: 'Deluxe Room',
                  price: hotel.pricePerNight,
                  capacity: '2 Adults',
                  bed: '1 King Bed',
                  amenities: ['Breakfast Included', 'Wi-Fi']
                };
                const nights = hotelNightsPicks[hotel.id] || 1;
                const stayTotal = activeRoom.price * nights;

                return (
                  <div
                    key={hotel.id}
                    className={`route-hotel-card ${isSelected ? 'hotel-card-selected' : ''}`}
                  >
                    {/* Hotel Image with Badges */}
                    <div className="hotel-card-media">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="hotel-img"
                        loading="lazy"
                      />
                      <div className="hotel-overlay-badges">
                        <span className="hotel-stop-badge">
                          {hotel.stopBadge || `Day ${hotel.dayNumber || 1} Stop`}
                        </span>
                        <span className="hotel-rating-pill">
                          ★ {hotel.rating.toFixed(1)} ({hotel.reviewCount})
                        </span>
                      </div>
                      <span className="hotel-detour-tag">
                        🛣️ {hotel.detour || 'On Route'}
                      </span>
                    </div>

                    {/* Hotel Details Body */}
                    <div className="hotel-card-content">
                      <div className="hotel-meta-top">
                        <span className="hotel-distance-mark">
                          📍 {hotel.distanceMarkFormatted || `${hotel.distanceMarkKm} km mark`}
                        </span>
                        <span className="hotel-category-tag">
                          {ROUTE_STAY_CATEGORIES[hotel.category?.toUpperCase()]?.label || hotel.category}
                        </span>
                      </div>

                      <h4 className="hotel-name">{hotel.name}</h4>
                      <p className="hotel-location-name">📌 {hotel.locationName}</p>
                      <p className="hotel-tagline">{hotel.tagline}</p>

                      {/* Stay Services Chips */}
                      <div className="hotel-services-preview">
                        {hotel.services?.slice(0, 5).map((srvId) => {
                          const srvObj = Object.values(STAY_SERVICES).find((s) => s.id === srvId);
                          return (
                            <span key={srvId} className="h-srv-tag">
                              {srvObj?.icon || '•'} {srvObj?.label || srvId}
                            </span>
                          );
                        })}
                        {(hotel.services?.length || 0) > 5 && (
                          <span className="h-srv-more">
                            +{hotel.services.length - 5} more services
                          </span>
                        )}
                      </div>

                      {/* Room Selection Dropdown */}
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <div className="hotel-room-selection-row">
                          <label className="room-label">Room Type:</label>
                          <select
                            className="hotel-room-select"
                            value={chosenRoomId}
                            onChange={(e) => handleSelectRoom(hotel.id, e.target.value)}
                            aria-label={`Select room for ${hotel.name}`}
                          >
                            {hotel.rooms.map((room) => (
                              <option key={room.id} value={room.id}>
                                {room.name} — ₹{room.price.toLocaleString('en-IN')} / night ({room.bed})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Room Amenities preview */}
                      {activeRoom.amenities && (
                        <div className="room-perks-row">
                          {activeRoom.amenities.map((perk, i) => (
                            <span key={i} className="room-perk-chip">
                              ✓ {perk}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Pricing & Duration Controls */}
                      <div className="hotel-card-footer">
                        <div className="hotel-price-block">
                          <span className="room-night-price">
                            ₹{activeRoom.price.toLocaleString('en-IN')}
                            <small> / night</small>
                            {nights > 1 && (
                              <small style={{ color: '#059669', fontWeight: 700, marginLeft: '4px' }}>
                                (₹{stayTotal.toLocaleString('en-IN')} total)
                              </small>
                            )}
                          </span>

                          {/* Nights Counter */}
                          <div className="hotel-nights-stepper">
                            <button
                              type="button"
                              className="btn-stepper-mini"
                              onClick={() => handleNightsChange(hotel.id, -1)}
                              title="Decrease nights"
                            >
                              -
                            </button>
                            <span className="stepper-val">{nights} Night{nights > 1 ? 's' : ''}</span>
                            <button
                              type="button"
                              className="btn-stepper-mini"
                              onClick={() => handleNightsChange(hotel.id, 1)}
                              title="Increase nights"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Stay Selection Action Buttons */}
                        <div className="hotel-actions-group">
                          <button
                            type="button"
                            className={`btn-select-stay ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleToggleStaySelection(hotel)}
                          >
                            {isSelected ? '✓ Selected for Day ' + (hotel.dayNumber || 1) : `+ Select for Day ${hotel.dayNumber || 1}`}
                          </button>

                          <button
                            type="button"
                            className="btn-add-direct-stay"
                            onClick={() => handleAddSingleStayToPlan(hotel)}
                            title="Add this route hotel directly into your travel itinerary"
                          >
                            🎒 Add to Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===================================================================
              MULTI-DAY SELECTED STAYS SUMMARY DECK
              =================================================================== */}
          {selectedEntries.length > 0 && (
            <div className="selected-stays-summary-deck">
              <div className="deck-left-info">
                <span className="deck-badge">🎒 Confirmed Route Accommodations ({selectedEntries.length})</span>
                <div className="deck-items-list">
                  {selectedEntries.map(({ hotel, room, nights, dayNumber }) => (
                    <span key={hotel.id} className="deck-item-tag">
                      <strong>Day {dayNumber}:</strong> {hotel.name} • {room.name} ({nights}n: ₹{(room.price * nights).toLocaleString('en-IN')})
                    </span>
                  ))}
                </div>
              </div>

              <div className="deck-right-actions">
                <div className="deck-total-box">
                  <span className="deck-total-label">Total Stays Cost:</span>
                  <span className="deck-total-amount">₹{totalSelectedStaysCost.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  className="btn-deck-confirm-all"
                  onClick={handleAddAllSelectedStays}
                >
                  ✨ Add All Route Stays to Travel Plan
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ===================================================================
            STEP-BY-STEP TURN-BY-TURN NAVIGATION INSTRUCTIONS
            =================================================================== */}
        <div className="route-steps-section">
          <h3 className="section-title">
            <span>🧭</span> Turn-by-Turn Navigation ({currentOption.steps.length} Steps)
          </h3>

          <div className="route-steps-timeline">
            {currentOption.steps.map((step) => (
              <div key={step.stepNumber} className="step-timeline-item">
                <div className="step-marker">
                  <span className="step-num">{step.stepNumber}</span>
                  <span className="step-mode-icon">{step.icon || modeConfig.icon}</span>
                </div>
                <div className="step-content">
                  <div className="step-header">
                    <span className="step-distance-pill">
                      {step.distance} • {step.duration}
                    </span>
                    {step.landmark && (
                      <span className="step-landmark-tag">🏷️ {step.landmark}</span>
                    )}
                  </div>
                  <p className="step-instruction">{step.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-actions-footer">
          {currentDestObj && onAddToItinerary && (
            <button
              className="btn-primary"
              onClick={() => {
                onAddToItinerary(currentDestObj);
                onClose();
              }}
            >
              🎒 Add {currentDestObj.name} to Travel Plan
            </button>
          )}

          {onOpenAIChat && (
            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onOpenAIChat();
              }}
            >
              ✦ Ask WanderBot about this Route & Stays
            </button>
          )}

          <button className="btn-secondary" onClick={onClose}>
            Close Route Planner
          </button>
        </div>
      </div>
    </div>
  );
}
