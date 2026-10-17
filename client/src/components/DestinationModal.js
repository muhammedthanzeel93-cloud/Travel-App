import React, { useState, useMemo } from 'react';
import ShareItineraryModal from './ShareItineraryModal';
import DestinationAIChat from './DestinationAIChat';
import { calculateRoutePlan, TRANSIT_MODES, TRANSIT_MODE_CONFIG } from '../data/destinationsData';

export default function DestinationModal({
  destination,
  onClose,
  onAddToItinerary,
  onAddReview,
  isAlreadyAdded,
  itinerary = [],
  origin = '',
  onOpenRoutePlanner,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [stayNights, setStayNights] = useState(3);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'spots', 'stay', 'travel', 'reviews'
  const [transitMode, setTransitMode] = useState(TRANSIT_MODES.CAR);
  const [spotCategory, setSpotCategory] = useState('all'); // 'all', 'famous', 'food', 'viewpoints'
  const [reviewFilterRating, setReviewFilterRating] = useState(0); // 0 = all ratings
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Write Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTravelerType, setNewTravelerType] = useState('Couple');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Local state for tracking helpful votes on reviews
  const [helpfulVotes, setHelpfulVotes] = useState({});

  // Calculate multi-modal route plan from origin (or nearest airport/hub) to this destination
  const routePlan = useMemo(() => {
    if (!destination) return null;
    const start = origin || destination.travelFeatures?.transportation?.nearestAirport || 'Cochin / Nearest Hub';
    return calculateRoutePlan(start, destination, transitMode);
  }, [origin, destination, transitMode]);

  if (!destination) return null;

  const {
    id: destId,
    name,
    region,
    tagline,
    rating = 4.8,
    reviewCount = 1000,
    category,
    images = [],
    famousSpots = [],
    foodSpots = [],
    viewpoints = [],
    stayDetails = {},
    hotelRooms = [],
    travelFeatures = {},
    reviews = [],
    isTrending,
    isUserCreated
  } = destination;

  const validImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'];

  const currentImage = validImages[selectedImageIndex] || validImages[0];

  const activeTransitOption = routePlan?.transitOptions?.[transitMode] || routePlan?.transitOptions?.[TRANSIT_MODES.CAR];
  const selectedRoom = hotelRooms[selectedRoomIndex] || hotelRooms[0];
  const roomPrice = selectedRoom?.pricePerNight || destination.price || 5000;
  const totalCost = roomPrice * stayNights;

  const handleNextPhoto = () => {
    setSelectedImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevPhoto = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleAdd = () => {
    onAddToItinerary({
      destinationId: destId,
      destinationName: name,
      region,
      hotelName: stayDetails.hotelName || 'Luxury Hotel',
      roomName: selectedRoom?.name || 'Deluxe Room',
      roomPrice: roomPrice,
      nights: stayNights,
      totalPrice: totalCost,
      image: currentImage,
      guests: selectedRoom?.capacity || '2 Adults'
    });
  };

  const handleHelpfulClick = (revId, currentCount = 0) => {
    if (helpfulVotes[revId]) return; // already voted
    setHelpfulVotes((prev) => ({
      ...prev,
      [revId]: (currentCount || 0) + 1
    }));
  };

  const parseSpotText = (spotText) => {
    const match = spotText.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      return { title: match[1].trim(), details: match[2].trim() };
    }
    return { title: spotText, details: '' };
  };

  const renderStars = (score, max = 5) => {
    const fullStars = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;
    return (
      <span className="star-icon-render" title={`${score} out of ${max} stars`}>
        {'★'.repeat(fullStars)}
        {hasHalf && '½'}
        {'☆'.repeat(Math.max(0, max - fullStars - (hasHalf ? 1 : 0)))}
      </span>
    );
  };

  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return '5 Stars — Excellent & Exceptional 🤩';
      case 4: return '4 Stars — Very Good Experience 😊';
      case 3: return '3 Stars — Average / Satisfactory 😐';
      case 2: return '2 Stars — Disappointing / Fair 😕';
      case 1: return '1 Star — Poor Experience 😡';
      default: return `${stars} Stars`;
    }
  };

  // Submit new review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!newComment.trim() || newComment.trim().length < 10) {
      setFormError('Please write a detailed review (at least 10 characters).');
      return;
    }

    setFormError('');

    const newReview = {
      id: `review-${Date.now()}`,
      author: newAuthor.trim(),
      rating: Number(newRating),
      travelerType: newTravelerType,
      title: newTitle.trim() || `${newRating}-Star Experience in ${name}`,
      comment: newComment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verifiedStay: true,
      helpfulCount: 0
    };

    if (onAddReview) {
      onAddReview(destId, newReview);
    }

    setFormSuccess(true);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setNewRating(5);

    setTimeout(() => {
      setFormSuccess(false);
      setShowReviewForm(false);
    }, 2400);
  };

  // Filter reviews by rating if selected
  const filteredReviews = reviews.filter((rev) => {
    if (reviewFilterRating === 0) return true;
    if (reviewFilterRating === 5) return rev.rating === 5;
    if (reviewFilterRating === 4) return rev.rating >= 4;
    return rev.rating <= 3;
  });

  // Calculate rating breakdown distribution
  const totalReviewsCount = reviews.length || 1;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.round(r.rating);
    if (ratingCounts[star] !== undefined) ratingCounts[star]++;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close Modal">✕</button>

        {/* Modal Top Hero Media Section with Interactive Carousel */}
        <div className="modal-hero-section">
          <div className="modal-main-image-wrap">
            <img src={currentImage} alt={name} className="modal-main-image" />
            <div className="modal-image-overlay">
              <div className="modal-badge-group">
                <button
                  type="button"
                  className="pill-badge rating-badge clickable-badge"
                  onClick={() => setActiveTab('reviews')}
                  title="Click to view all reviews and ratings"
                >
                  ★ {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
                </button>
                <span className="pill-badge recommend-badge">
                  ❤️ {Math.min(99, Math.round(rating * 20))}% Recommend
                </span>
                {isTrending && <span className="pill-badge trending-badge">🔥 Trending Spot</span>}
                {isUserCreated && <span className="pill-badge user-created-badge">✨ User Created Gem</span>}
                <span className="pill-badge category-badge">{category}</span>
                <button
                  type="button"
                  className="pill-badge share-header-pill"
                  onClick={() => setIsShareOpen(true)}
                  title="Share destination and itinerary via WhatsApp, Facebook, or Copy Link"
                >
                  📤 Share Plan
                </button>
                <button
                  type="button"
                  className="pill-badge ai-header-pill"
                  onClick={() => setActiveTab('ai')}
                  title="Ask WanderBot AI Concierge about this destination"
                >
                  🤖 Ask AI
                </button>
              </div>
              <h2 className="modal-dest-title">{name}</h2>
              <p className="modal-dest-region">📍 {region}</p>
            </div>

            {/* Gallery Arrows */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="modal-gallery-arrow prev"
                  onClick={handlePrevPhoto}
                  title="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="modal-gallery-arrow next"
                  onClick={handleNextPhoto}
                  title="Next image"
                >
                  ›
                </button>

                <div className="modal-image-counter">
                  📷 {selectedImageIndex + 1} / {validImages.length}
                </div>
              </>
            )}
          </div>

          {/* Interactive Thumbnails Strip */}
          {validImages.length > 1 && (
            <div className="modal-thumbnails-strip">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb-btn ${idx === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <img src={img} alt={`${name} preview ${idx + 1}`} />
                  <span className="thumb-idx">{idx + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Sub Navigation Tabs */}
        <div className="modal-tab-nav">
          <button
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Highlights
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'spots' ? 'active' : ''}`}
            onClick={() => setActiveTab('spots')}
          >
            All Spots ({famousSpots.length + foodSpots.length + viewpoints.length})
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'stay' ? 'active' : ''}`}
            onClick={() => setActiveTab('stay')}
          >
            Stay Details & Rooms ({hotelRooms.length})
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'travel' ? 'active' : ''}`}
            onClick={() => setActiveTab('travel')}
          >
            Travel & Transit
          </button>
          <button
            className={`modal-tab-btn tab-btn-reviews ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Reviews & Ratings ({reviews.length})
          </button>
          <button
            className={`modal-tab-btn tab-btn-ai ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            🤖 AI Concierge
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-content">
          {/* ========================================================
              TAB 1: OVERVIEW & HIGHLIGHTS
              ======================================================== */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="overview-callout">
                <span className="quote-mark">“</span>
                <div>
                  <p className="tagline-text">{tagline}</p>
                  <p className="overview-subtext">
                    Experience top-tier hospitality at <b>{stayDetails.hotelName}</b> with verified {stayDetails.hotelRating}★ luxury, panoramic viewpoints, and authentic local food spots.
                  </p>
                </div>
              </div>

              {/* Quick 3-Column Highlights Summary */}
              <div className="highlights-columns">
                {/* Famous Spots Column */}
                <div className="hl-col">
                  <div className="hl-header">
                    <span className="hl-icon">🏛️</span>
                    <h4>Famous Spots ({famousSpots.length})</h4>
                  </div>
                  <ul>
                    {famousSpots.slice(0, 4).map((spot, i) => {
                      const { title } = parseSpotText(spot);
                      return <li key={i}><b>{title}</b></li>;
                    })}
                  </ul>
                  {famousSpots.length > 4 && (
                    <button className="link-subtle" onClick={() => { setActiveTab('spots'); setSpotCategory('famous'); }}>
                      View all {famousSpots.length} spots →
                    </button>
                  )}
                </div>

                {/* Food Spots Column */}
                <div className="hl-col">
                  <div className="hl-header">
                    <span className="hl-icon">🍲</span>
                    <h4>Food & Dining ({foodSpots.length})</h4>
                  </div>
                  <ul>
                    {foodSpots.slice(0, 4).map((food, i) => {
                      const { title, details } = parseSpotText(food);
                      return (
                        <li key={i}>
                          <b>{title}</b>
                          {details && <span className="list-sub-item"> — {details}</span>}
                        </li>
                      );
                    })}
                  </ul>
                  {foodSpots.length > 4 && (
                    <button className="link-subtle" onClick={() => { setActiveTab('spots'); setSpotCategory('food'); }}>
                      View all {foodSpots.length} food spots →
                    </button>
                  )}
                </div>

                {/* Viewpoints Column */}
                <div className="hl-col">
                  <div className="hl-header">
                    <span className="hl-icon">🌅</span>
                    <h4>Viewpoints ({viewpoints.length})</h4>
                  </div>
                  <ul>
                    {viewpoints.slice(0, 4).map((vp, i) => {
                      const { title, details } = parseSpotText(vp);
                      return (
                        <li key={i}>
                          <b>{title}</b>
                          {details && <span className="list-sub-item"> — {details}</span>}
                        </li>
                      );
                    })}
                  </ul>
                  {viewpoints.length > 4 && (
                    <button className="link-subtle" onClick={() => { setActiveTab('spots'); setSpotCategory('viewpoints'); }}>
                      View all {viewpoints.length} viewpoints →
                    </button>
                  )}
                </div>
              </div>

              {/* Stay Snapshot Box */}
              <div className="hotel-snapshot-card">
                <div className="hotel-snap-left">
                  <span className="hotel-snap-badge">Recommended Stay & Resort</span>
                  <h3>{stayDetails.hotelName}</h3>
                  <p className="hotel-type-line">
                    ★ {stayDetails.hotelRating} Hotel • {stayDetails.stayType}
                  </p>
                  <p className="hotel-address">📍 {stayDetails.locationAddress}</p>
                  <div className="mini-amenities-row">
                    {stayDetails.amenities?.slice(0, 4).map((am, i) => (
                      <span key={i} className="mini-am-tag">✓ {am}</span>
                    ))}
                  </div>
                </div>
                <div className="hotel-snap-right">
                  <span className="price-tag">From ₹{roomPrice.toLocaleString('en-IN')}<span className="rate-unit"> /night</span></span>
                  <button className="btn-secondary" onClick={() => setActiveTab('stay')}>
                    Explore All {hotelRooms.length} Rooms ➔
                  </button>
                </div>
              </div>

              {/* Traveler Sentiment & Reviews Snapshot Card */}
              <div className="traveler-sentiment-card">
                <div className="sentiment-header">
                  <div className="sentiment-title-wrap">
                    <span className="sentiment-icon">⭐</span>
                    <div>
                      <h4 className="sentiment-title">Traveler Reviews & Verified Ratings</h4>
                      <p className="sentiment-sub">
                        Rated <b>{rating.toFixed(1)} / 5.0</b> based on <b>{reviewCount.toLocaleString()}</b> traveler reviews
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-sentiment-action"
                    onClick={() => { setActiveTab('reviews'); setShowReviewForm(true); }}
                  >
                    ✍️ Write a Review
                  </button>
                </div>

                {reviews.length > 0 && (
                  <div className="sentiment-quote-box" onClick={() => setActiveTab('reviews')}>
                    <span className="quote-badge">Latest Review</span>
                    <p className="quote-comment">"{reviews[0].comment}"</p>
                    <div className="quote-author-row">
                      <span className="quote-author">— <b>{reviews[0].author}</b> ({reviews[0].travelerType || 'Traveler'})</span>
                      <span className="quote-stars">{'★'.repeat(reviews[0].rating)}</span>
                    </div>
                  </div>
                )}

                <div className="sentiment-footer-row">
                  <button className="link-reviews-explore" onClick={() => setActiveTab('reviews')}>
                    Read all {reviews.length} written reviews & ratings ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: ALL SPOTS (FAMOUS, FOOD & VIEWPOINTS)
              ======================================================== */}
          {activeTab === 'spots' && (
            <div className="tab-pane">
              {/* Filter Pills for Spots */}
              <div className="spot-filter-pills">
                <button
                  className={`spot-filter-pill ${spotCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSpotCategory('all')}
                >
                  All Spots ({famousSpots.length + foodSpots.length + viewpoints.length})
                </button>
                <button
                  className={`spot-filter-pill ${spotCategory === 'famous' ? 'active' : ''}`}
                  onClick={() => setSpotCategory('famous')}
                >
                  🏛️ Famous Spots ({famousSpots.length})
                </button>
                <button
                  className={`spot-filter-pill ${spotCategory === 'food' ? 'active' : ''}`}
                  onClick={() => setSpotCategory('food')}
                >
                  🍲 Food & Dining ({foodSpots.length})
                </button>
                <button
                  className={`spot-filter-pill ${spotCategory === 'viewpoints' ? 'active' : ''}`}
                  onClick={() => setSpotCategory('viewpoints')}
                >
                  🌅 Scenic Viewpoints ({viewpoints.length})
                </button>
              </div>

              {/* Famous Spots Section */}
              {(spotCategory === 'all' || spotCategory === 'famous') && (
                <div className="spot-section">
                  <h3 className="section-title">
                    <span>🏛️</span> Famous Attractions & Landmarks ({famousSpots.length})
                  </h3>
                  <div className="spots-card-grid">
                    {famousSpots.map((spot, index) => {
                      const { title, details } = parseSpotText(spot);
                      return (
                        <div key={index} className="spot-item-card famous-card">
                          <div className="spot-index-num">0{index + 1}</div>
                          <div className="spot-item-content">
                            <strong className="spot-name">{title}</strong>
                            <p className="spot-desc">
                              {details || 'Premier historical landmark, cultural site, and sightseeing attraction.'}
                            </p>
                            <span className="spot-badge-tag">🏛️ Famous Attraction</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Food Spots Section */}
              {(spotCategory === 'all' || spotCategory === 'food') && (
                <div className="spot-section">
                  <h3 className="section-title">
                    <span>🍲</span> Legendary Food Spots & Culinary Highlights ({foodSpots.length})
                  </h3>
                  <div className="spots-card-grid">
                    {foodSpots.map((spot, index) => {
                      const { title, details } = parseSpotText(spot);
                      return (
                        <div key={index} className="spot-item-card food-spot-card">
                          <div className="spot-index-num food-num">🍲</div>
                          <div className="spot-item-content">
                            <div className="food-spot-header">
                              <strong className="spot-name">{title}</strong>
                              <span className="must-try-pill">Must Try</span>
                            </div>
                            <p className="spot-desc food-delicacy">
                              <b>Specialty:</b> {details || 'Authentic regional dishes, fresh local spices, and traditional recipes.'}
                            </p>
                            <span className="spot-badge-tag food-badge">🍴 Culinary Highlight</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Viewpoints Section */}
              {(spotCategory === 'all' || spotCategory === 'viewpoints') && (
                <div className="spot-section">
                  <h3 className="section-title">
                    <span>🌅</span> Breathtaking Scenic Viewpoints ({viewpoints.length})
                  </h3>
                  <div className="spots-card-grid">
                    {viewpoints.map((vp, index) => {
                      const { title, details } = parseSpotText(vp);
                      return (
                        <div key={index} className="spot-item-card viewpoint-card">
                          <div className="spot-index-num viewpoint-num">🌅</div>
                          <div className="spot-item-content">
                            <strong className="spot-name">{title}</strong>
                            <p className="spot-desc">
                              {details || 'Spectacular golden hour vantage point offering sweeping horizon views and photo opportunities.'}
                            </p>
                            <span className="spot-badge-tag view-badge">📸 Panoramic Vista</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: STAY DETAILS & HOTEL ROOMS
              ======================================================== */}
          {activeTab === 'stay' && (
            <div className="tab-pane">
              {/* Comprehensive Stay Details Banner */}
              <div className="stay-details-banner">
                <div className="stay-banner-header">
                  <div>
                    <div className="stay-chips-row">
                      <span className="hotel-meta-chip">★ {stayDetails.hotelRating} Hotel</span>
                      <span className="hotel-meta-chip stay-category-chip">{stayDetails.stayType}</span>
                    </div>
                    <h3 className="banner-hotel-title">{stayDetails.hotelName}</h3>
                    <p className="banner-address">📍 {stayDetails.locationAddress}</p>
                  </div>

                  <div className="stay-policy-badges">
                    <div className="policy-pill">
                      <span>Check-in:</span> <b>{stayDetails.checkIn || '14:00'}</b>
                    </div>
                    <div className="policy-pill">
                      <span>Check-out:</span> <b>{stayDetails.checkOut || '11:00'}</b>
                    </div>
                  </div>
                </div>

                <div className="policy-note">
                  🛡️ <b>Cancellation Policy:</b> {stayDetails.cancellationPolicy || 'Free cancellation available.'}
                </div>

                {/* Stay Amenities Grid */}
                <div className="stay-amenities-wrap">
                  <h4>Property Amenities & Guest Services:</h4>
                  <div className="amenity-chips-grid">
                    {stayDetails.amenities?.map((amenity, i) => (
                      <div key={i} className="amenity-chip">
                        <span className="check-icon">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Room Selection Grid */}
              <div className="rooms-section-header">
                <div>
                  <h3 className="section-title">
                    <span>🛏️</span> Available Hotel Rooms & Suites ({hotelRooms.length})
                  </h3>
                  <p className="section-hint">
                    Choose your desired room configuration to update the itinerary pricing.
                  </p>
                </div>
              </div>

              <div className="room-cards-grid">
                {hotelRooms.map((room, idx) => (
                  <div
                    key={room.id || idx}
                    className={`hotel-room-card ${idx === selectedRoomIndex ? 'room-selected' : ''}`}
                    onClick={() => setSelectedRoomIndex(idx)}
                  >
                    <div className="room-card-top">
                      {room.image && (
                        <div className="room-thumb-wrap">
                          <img src={room.image} alt={room.name} className="room-thumb-img" />
                          <div className="room-thumb-overlay">
                            {idx === selectedRoomIndex && <span className="selected-ribbon">Selected</span>}
                          </div>
                        </div>
                      )}

                      <div className="room-header-text">
                        <div className="room-selection-radio">
                          <input
                            type="radio"
                            name="hotelRoomChoice"
                            checked={idx === selectedRoomIndex}
                            onChange={() => setSelectedRoomIndex(idx)}
                          />
                          <h4 className="room-title">{room.name}</h4>
                        </div>

                        <div className="room-meta-specs">
                          <span>🛏️ {room.bed}</span>
                          <span>👥 {room.capacity}</span>
                          {room.size && <span>📐 {room.size}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="room-perks-list">
                      {room.amenities?.map((am, i) => (
                        <span key={i} className="room-perk-tag">✓ {am}</span>
                      ))}
                    </div>

                    <div className="room-price-row">
                      <div className="room-rate">
                        ₹{room.pricePerNight?.toLocaleString('en-IN')} <span className="rate-unit">/ night</span>
                      </div>
                      <button
                        type="button"
                        className={`btn-select-room ${idx === selectedRoomIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRoomIndex(idx);
                        }}
                      >
                        {idx === selectedRoomIndex ? '✓ Selected Room' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: TRAVEL FEATURES & TRANSIT
              ======================================================== */}
          {activeTab === 'travel' && (
            <div className="tab-pane">
              <div className="travel-features-grid">
                <div className="feature-box">
                  <div className="feature-icon">🗓️</div>
                  <div className="feature-content">
                    <h4>Best Time to Visit</h4>
                    <p>{travelFeatures.bestTimeToVisit || 'Year-round destination'}</p>
                  </div>
                </div>

                <div className="feature-box">
                  <div className="feature-icon">⛅</div>
                  <div className="feature-content">
                    <h4>Climate & Weather</h4>
                    <p>{travelFeatures.weather || 'Pleasant weather'}</p>
                  </div>
                </div>

                <div className="feature-box">
                  <div className="feature-icon">⏳</div>
                  <div className="feature-content">
                    <h4>Recommended Stay</h4>
                    <p>{travelFeatures.idealStayDuration || '3 - 4 Days'}</p>
                  </div>
                </div>
              </div>

              {/* Transportation Details */}
              <div className="transit-section">
                <h3 className="section-title">
                  <span>✈️</span> Transportation & Connectivity
                </h3>
                <div className="transit-list">
                  <div className="transit-item">
                    <span className="transit-type-icon">🛫 Nearest Airport:</span>
                    <span className="transit-text">{travelFeatures.transportation?.nearestAirport || 'Local Airport'}</span>
                  </div>
                  <div className="transit-item">
                    <span className="transit-type-icon">🚆 Nearest Railway:</span>
                    <span className="transit-text">{travelFeatures.transportation?.nearestRailway || 'Central Railway Station'}</span>
                  </div>
                  <div className="transit-item">
                    <span className="transit-type-icon">🚗 Road Connectivity:</span>
                    <span className="transit-text">{travelFeatures.transportation?.roadAccess || 'Connected via National Highways'}</span>
                  </div>
                </div>
              </div>

              {/* Multi-Modal Route Planning (Walking, Car, Public Transport) */}
              <div className="destination-route-section">
                <div className="section-header-flex">
                  <h3 className="section-title">
                    <span>🗺️</span> Multi-Modal Route Planning & Transit
                  </h3>
                  {onOpenRoutePlanner && (
                    <button
                      className="btn-open-route-planner"
                      onClick={onOpenRoutePlanner}
                      type="button"
                    >
                      Open Full Route Planner ➔
                    </button>
                  )}
                </div>

                <p className="route-section-subtitle">
                  Transit options from <strong>{routePlan.startLocation}</strong> to <strong>{name}</strong>:
                </p>

                {/* Transit Mode Selection Tabs */}
                <div className="modal-transit-tabs" role="tablist" aria-label="Transit Mode Options">
                  {Object.values(TRANSIT_MODES).map((modeKey) => {
                    const cfg = TRANSIT_MODE_CONFIG[modeKey];
                    const opt = routePlan.transitOptions[modeKey];
                    const isSelected = transitMode === modeKey;
                    return (
                      <button
                        key={modeKey}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`modal-transit-tab-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setTransitMode(modeKey)}
                      >
                        <span className="m-icon">{cfg.icon}</span>
                        <div className="m-text">
                          <span className="m-title">{cfg.label}</span>
                          <span className="m-time">{opt?.durationFormatted || 'Available'}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Transit Option Card */}
                {activeTransitOption && (
                  <div className="modal-transit-card">
                    <div className="transit-card-top">
                      <div>
                        <h4 className="transit-card-route-name">
                          {TRANSIT_MODE_CONFIG[transitMode].icon} {activeTransitOption.routeName}
                        </h4>
                        <span className="transit-distance-tag">
                          📍 {activeTransitOption.distanceKm} km • ⏱️ {activeTransitOption.durationFormatted}
                        </span>
                      </div>
                      <div className="transit-cost-chip">
                        {activeTransitOption.estimatedCost === 0 ? 'FREE' : `~₹${activeTransitOption.estimatedCost.toLocaleString('en-IN')}`}
                      </div>
                    </div>

                    <p className="transit-card-breakdown">
                      💵 <strong>Estimated Cost:</strong> {activeTransitOption.costBreakdown}
                    </p>

                    <div className="transit-eco-row">
                      <span className="transit-eco-pill">
                        🌱 Carbon: {activeTransitOption.carbonKg} kg CO₂
                      </span>
                      <span className="transit-difficulty-pill">
                        Difficulty: {activeTransitOption.difficulty}
                      </span>
                      <span className="transit-scenic-pill">
                        ★ {activeTransitOption.scenicRating}/10 Scenery
                      </span>
                    </div>

                    {/* Step-by-Step Preview */}
                    <div className="transit-steps-preview">
                      <strong>Navigation Route Steps ({activeTransitOption.steps.length}):</strong>
                      <div className="transit-steps-mini-list">
                        {activeTransitOption.steps.map((st) => (
                          <div key={st.stepNumber} className="transit-step-mini">
                            <span className="st-num">{st.stepNumber}</span>
                            <span className="st-desc">{st.instruction}</span>
                            <span className="st-dist">({st.distance})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Multi-Day Route Stays Highlight */}
                {routePlan?.routeHotels && routePlan.routeHotels.length > 0 && (
                  <div className="destination-route-stays-block" style={{ marginTop: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>🏨</span> Verified Stays Along This Route ({routePlan.routeHotels.length})
                        </h4>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                          En-route hotels, boutique homestays, and highway transit lodges for multi-day trips
                        </p>
                      </div>
                      {onOpenRoutePlanner && (
                        <button
                          type="button"
                          className="btn-open-route-planner"
                          onClick={onOpenRoutePlanner}
                          title="Open Full Route Planner to filter and select hotels along route"
                        >
                          Filter & Select Route Stays ➔
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                      {routePlan.routeHotels.slice(0, 3).map((hotel) => (
                        <div
                          key={hotel.id}
                          style={{
                            display: 'flex',
                            gap: '10px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '10px',
                            cursor: onOpenRoutePlanner ? 'pointer' : 'default'
                          }}
                          onClick={onOpenRoutePlanner}
                        >
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0284c7' }}>
                              📍 {hotel.distanceMarkFormatted || `${hotel.distanceMarkKm} km`}
                            </span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {hotel.name}
                            </span>
                            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#059669' }}>
                              From ₹{hotel.pricePerNight?.toLocaleString('en-IN')}/night • ★ {hotel.rating}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* En-Route Discoveries Along Planned Route: Famous Spots, Food Spots & Viewpoints */}
                {routePlan?.enrouteSpots && routePlan.enrouteSpots.length > 0 && (
                  <div className="destination-route-enroute-block" style={{ marginTop: '16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>📍</span> Discoveries Along Planned Route ({routePlan.enrouteSpots.length})
                        </h4>
                        <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                          {routePlan.famousSpots?.length || 0} Famous Spots • {routePlan.foodSpots?.length || 0} Food Stops • {routePlan.viewpoints?.length || 0} Scenic Viewpoints
                        </p>
                      </div>
                      {onOpenRoutePlanner && (
                        <button
                          type="button"
                          className="btn-open-route-planner"
                          onClick={onOpenRoutePlanner}
                          title="Open Full Route Planner to view all famous spots, food spots and viewpoints along your route"
                        >
                          Explore All En-Route Stops ➔
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                      {routePlan.enrouteSpots.slice(0, 4).map((spot) => {
                        const catBadgeColor = spot.category === 'famous'
                          ? { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' }
                          : spot.category === 'food'
                          ? { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' }
                          : { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' };

                        return (
                          <div
                            key={spot.id}
                            style={{
                              display: 'flex',
                              gap: '10px',
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '10px',
                              cursor: onOpenRoutePlanner ? 'pointer' : 'default',
                              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                            }}
                            onClick={onOpenRoutePlanner}
                          >
                            <img
                              src={spot.image}
                              alt={spot.name}
                              style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px' }}>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    padding: '2px 6px',
                                    borderRadius: '999px',
                                    backgroundColor: catBadgeColor.bg,
                                    color: catBadgeColor.color,
                                    border: `1px solid ${catBadgeColor.border}`
                                  }}
                                >
                                  {spot.icon} {spot.categoryLabel}
                                </span>
                                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0284c7' }}>
                                  📍 {spot.distanceMarkFormatted || `${spot.distanceMarkKm} km`}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {spot.name}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                ⭐ {spot.specialty}
                              </span>
                              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669' }}>
                                ★ {spot.rating} • {spot.estimatedTime}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Popular Activities */}
              <div className="activities-section">
                <h3 className="section-title">
                  <span>🎯</span> Curated Activities & Experiences ({travelFeatures.popularActivities?.length || 0})
                </h3>
                <div className="activities-chips">
                  {travelFeatures.popularActivities?.map((act, i) => (
                    <div key={i} className="activity-chip">
                      <span>⚡</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tags */}
              <div className="tags-section">
                <h4>Vibe & Category Tags:</h4>
                <div className="tags-chips">
                  {travelFeatures.travelTags?.map((tag, i) => (
                    <span key={i} className="vibe-tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: REVIEWS & RATINGS SYSTEM
              ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="tab-pane">
              {/* Reviews Summary Scoreboard Card */}
              <div className="reviews-scorecard-banner">
                <div className="scorecard-left">
                  <div className="big-rating-number">{rating.toFixed(1)}</div>
                  <div className="scorecard-stars-block">
                    {renderStars(rating)}
                    <span className="scorecard-total-reviews">
                      Based on <b>{reviewCount.toLocaleString()}</b> verified ratings
                    </span>
                    <span className="scorecard-recommend-line">
                      ❤️ <b>{Math.min(99, Math.round(rating * 20))}%</b> of guests recommend this destination
                    </span>
                  </div>
                </div>

                {/* Rating Distribution Breakdown Bars */}
                <div className="scorecard-bars-col">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingCounts[stars] || 0;
                    const pct = Math.round((count / totalReviewsCount) * 100);
                    return (
                      <div key={stars} className="rating-dist-row">
                        <span className="dist-star-label">{stars} ★</span>
                        <div className="dist-bar-track">
                          <div className="dist-bar-fill" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="dist-count-label">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="scorecard-right-action">
                  <button
                    type="button"
                    className="btn-open-review-form"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? '✕ Close Form' : '✍️ Write a Review'}
                  </button>
                  <span className="form-toggle-hint">Share your travel experience</span>
                </div>
              </div>

              {/* "Write a Review" Form Card */}
              {showReviewForm && (
                <div className="write-review-card">
                  <div className="write-review-header">
                    <h4>Share Your Experience for {name}</h4>
                    <p>Rate the destination out of 5 stars and write a review to help fellow travelers.</p>
                  </div>

                  {formSuccess ? (
                    <div className="review-success-banner">
                      <span className="success-icon">✓</span>
                      <div>
                        <strong>Thank you for your review!</strong>
                        <p>Your rating and feedback have been added to {name}'s reviews.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="review-form-content">
                      {formError && <div className="form-error-alert">{formError}</div>}

                      {/* Interactive 5-Star Rating Selector */}
                      <div className="star-rating-selector-group">
                        <label className="field-label">Overall Star Rating (out of 5) *</label>
                        <div className="interactive-stars-row">
                          {[1, 2, 3, 4, 5].map((starVal) => {
                            const isFilled = (hoverRating || newRating) >= starVal;
                            return (
                              <button
                                key={starVal}
                                type="button"
                                className={`star-picker-btn ${isFilled ? 'filled' : ''}`}
                                onMouseEnter={() => setHoverRating(starVal)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setNewRating(starVal)}
                                title={`Rate ${starVal} out of 5`}
                              >
                                ★
                              </button>
                            );
                          })}
                          <span className="star-rating-descriptor">
                            {getRatingLabel(hoverRating || newRating)}
                          </span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="field-label">Your Name *</label>
                          <input
                            type="text"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            placeholder="e.g. Aisha Khan"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="field-label">Traveler Type</label>
                          <select
                            value={newTravelerType}
                            onChange={(e) => setNewTravelerType(e.target.value)}
                          >
                            <option value="Couple">Couple / Romantic</option>
                            <option value="Family">Family Vacation</option>
                            <option value="Solo Explorer">Solo Explorer</option>
                            <option value="Friends Trip">Friends Trip</option>
                            <option value="Adventure">Adventure Traveler</option>
                            <option value="Business">Business / Leisure</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="field-label">Review Headline / Title</label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Unforgettable tea estate walks and serene misty views"
                        />
                      </div>

                      <div className="form-group">
                        <label className="field-label">Your Review & Tips *</label>
                        <textarea
                          rows="4"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="What did you like best? How were the hotel rooms, food spots, and scenic viewpoints? Any transit tips for future visitors?"
                          required
                        />
                      </div>

                      <div className="review-form-actions">
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn-submit-review">
                          Submit Review ★
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Reviews Feed Section Header & Filter */}
              <div className="reviews-feed-header">
                <div>
                  <h3 className="section-title" style={{ margin: 0 }}>
                    <span>💬</span> Traveler Reviews ({filteredReviews.length})
                  </h3>
                </div>

                {/* Filter Reviews by Star Rating */}
                <div className="review-rating-filters">
                  <span className="filter-label">Filter by:</span>
                  <button
                    className={`filter-btn ${reviewFilterRating === 0 ? 'active' : ''}`}
                    onClick={() => setReviewFilterRating(0)}
                  >
                    All ({reviews.length})
                  </button>
                  <button
                    className={`filter-btn ${reviewFilterRating === 5 ? 'active' : ''}`}
                    onClick={() => setReviewFilterRating(5)}
                  >
                    5 Stars ({ratingCounts[5] || 0})
                  </button>
                  <button
                    className={`filter-btn ${reviewFilterRating === 4 ? 'active' : ''}`}
                    onClick={() => setReviewFilterRating(4)}
                  >
                    4+ Stars ({(ratingCounts[5] || 0) + (ratingCounts[4] || 0)})
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              {filteredReviews.length === 0 ? (
                <div className="no-reviews-box">
                  <p>No reviews match this filter. Be the first to review!</p>
                  <button className="btn-primary" onClick={() => setShowReviewForm(true)}>
                    + Write a Review
                  </button>
                </div>
              ) : (
                <div className="reviews-list-col">
                  {filteredReviews.map((rev, idx) => {
                    const initials = rev.author
                      ? rev.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                      : 'TR';
                    const helpfulCount = helpfulVotes[rev.id] !== undefined
                      ? helpfulVotes[rev.id]
                      : (rev.helpfulCount || 0);

                    return (
                      <div key={rev.id || idx} className="review-card-item">
                        <div className="review-card-header">
                          <div className="reviewer-info-left">
                            <div className="reviewer-avatar">{initials}</div>
                            <div>
                              <div className="reviewer-name-row">
                                <span className="reviewer-name">{rev.author}</span>
                                {rev.verifiedStay && (
                                  <span className="verified-stay-badge">✓ Verified Stay</span>
                                )}
                              </div>
                              <div className="reviewer-meta-sub">
                                <span className="review-date">{rev.date}</span>
                                {rev.travelerType && (
                                  <>
                                    <span className="meta-dot">•</span>
                                    <span className="traveler-type-pill">{rev.travelerType}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="review-rating-score-block">
                            <div className="review-stars-visual">
                              {renderStars(rev.rating)}
                            </div>
                            <span className="review-score-text">{rev.rating}.0 / 5.0</span>
                          </div>
                        </div>

                        {rev.title && (
                          <h4 className="review-headline">"{rev.title}"</h4>
                        )}

                        <p className="review-body-text">{rev.comment}</p>

                        <div className="review-card-footer">
                          <button
                            type="button"
                            className={`btn-helpful ${helpfulVotes[rev.id] ? 'voted' : ''}`}
                            onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                            title="Mark review as helpful"
                          >
                            👍 Helpful ({helpfulCount})
                          </button>
                          <span className="verified-booking-note">Verified Guest Review</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 6: AI CONCIERGE & PLANNING ASSISTANT
              ======================================================== */}
          {activeTab === 'ai' && (
            <div className="tab-pane ai-tab-pane">
              <DestinationAIChat
                destination={destination}
                selectedRoom={selectedRoom}
                stayNights={stayNights}
                onAddToItinerary={handleAdd}
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Booking / Add to Plan Bar */}
        <div className="modal-footer-booking-bar">
          <div className="booking-summary-left">
            <div className="selected-room-note">
              Configuring stay: <b>{selectedRoom?.name || 'Standard Room'}</b> at <b>{stayDetails.hotelName}</b>
            </div>
            <div className="duration-picker">
              <label>Stay Duration: </label>
              <div className="counter-controls">
                <button
                  type="button"
                  onClick={() => setStayNights(Math.max(1, stayNights - 1))}
                  className="counter-btn"
                  title="Decrease nights"
                >-</button>
                <span className="night-count">{stayNights} Night{stayNights === 1 ? '' : 's'}</span>
                <button
                  type="button"
                  onClick={() => setStayNights(stayNights + 1)}
                  className="counter-btn"
                  title="Increase nights"
                >+</button>
              </div>
            </div>
          </div>

          <div className="booking-summary-right">
            <div className="total-calculation">
              <span className="total-label">Total Trip Estimate:</span>
              <span className="total-price">₹{totalCost.toLocaleString('en-IN')}</span>
              <span className="taxes-note">(₹{roomPrice.toLocaleString('en-IN')} × {stayNights} nights)</span>
            </div>

            <button
              type="button"
              className="btn-share-modal-plan"
              onClick={() => setIsShareOpen(true)}
              title="Share via WhatsApp, Facebook, or Copy Link"
            >
              📤 Share
            </button>

            <button
              type="button"
              className="btn-add-modal-itinerary"
              onClick={handleAdd}
            >
              {isAlreadyAdded ? '✓ Update in Plan' : '+ Add to Travel Plan'}
            </button>
          </div>
        </div>

        {/* Social Media Sharing Modal */}
        <ShareItineraryModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          destination={destination}
          selectedRoom={selectedRoom}
          stayNights={stayNights}
          itinerary={itinerary}
        />
      </div>
    </div>
  );
}
