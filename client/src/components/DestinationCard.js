import React, { useState } from 'react';

function DestinationCard({ destination, onSelect, onQuickAdd, isAdded }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const {
    name,
    region,
    tagline,
    rating = 4.8,
    reviewCount = 500,
    price = 5000,
    category,
    images = [],
    famousSpots = [],
    foodSpots = [],
    viewpoints = [],
    isTrending,
    isUserCreated,
    stayDetails = {},
    hotelRooms = [],
    travelFeatures = {}
  } = destination;

  const validImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'];

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, idx) => {
    e.stopPropagation();
    setActiveImgIdx(idx);
  };

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;
    return (
      <div className="card-star-visual" title={`Rating: ${score} out of 5`}>
        {'★'.repeat(fullStars)}
        {hasHalf && '½'}
      </div>
    );
  };

  return (
    <div className="dest-card" id={`dest-card-${destination.id}`}>
      {/* Media & Image Gallery Preview */}
      <div className="dest-card-media" onClick={() => onSelect(destination)}>
        <img
          src={validImages[activeImgIdx]}
          alt={`${name} preview ${activeImgIdx + 1}`}
          loading="lazy"
          className="dest-card-main-img"
        />
        <div className="media-overlay-gradient"></div>

        {/* Gallery Navigation Arrows on Card */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              className="card-gallery-arrow prev"
              onClick={handlePrevImg}
              aria-label="Previous image"
              title="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="card-gallery-arrow next"
              onClick={handleNextImg}
              aria-label="Next image"
              title="Next photo"
            >
              ›
            </button>

            {/* Gallery Indicator Dots */}
            <div className="card-gallery-dots">
              {validImages.map((_, i) => (
                <span
                  key={i}
                  className={`gallery-dot ${i === activeImgIdx ? 'active' : ''}`}
                  onClick={(e) => handleDotClick(e, i)}
                />
              ))}
            </div>

            <div className="card-photo-count">
              📷 {activeImgIdx + 1}/{validImages.length}
            </div>
          </>
        )}

        {/* Top Badges Row */}
        <div className="badge-row-top">
          <div className="rating-pill">
            <span className="star-icon">★</span>
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="review-count">({reviewCount.toLocaleString()})</span>
          </div>

          <div className="badge-group-right">
            {isTrending && <span className="pill-badge trending-badge">🔥 Trending</span>}
            {isUserCreated && <span className="pill-badge user-created-badge">✨ User Created</span>}
            <span className="pill-badge category-badge-glass">{category || 'Travel'}</span>
          </div>
        </div>

        {/* Bottom Media Details */}
        <div className="media-bottom-info">
          <div className="dest-region-row">
            <span className="dest-region-tag">📍 {region}</span>
            {travelFeatures?.weather && (
              <span className="weather-chip-glass">⛅ {travelFeatures.weather.split('•')[0]}</span>
            )}
          </div>
          <h3 className="dest-title">{name}</h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="dest-card-body">
        <div className="dest-header-rating-row">
          <div className="stars-and-sentiment">
            {renderStars(rating)}
            <span className="rating-sentiment">
              {rating >= 4.9 ? 'Exceptional' : rating >= 4.8 ? 'Superb' : 'Top Rated'}
            </span>
          </div>
          {travelFeatures?.bestTimeToVisit && (
            <span className="best-season-badge" title={`Best time: ${travelFeatures.bestTimeToVisit}`}>
              🗓️ {travelFeatures.bestTimeToVisit.split('(')[0].trim()}
            </span>
          )}
        </div>

        <p className="dest-tagline">{tagline}</p>

        {/* Curated Spot Highlights Snippets */}
        <div className="card-spots-showcase">
          {/* Famous Spots */}
          {famousSpots && famousSpots.length > 0 && (
            <div className="spot-preview-row" title={`Famous Spots: ${famousSpots.join(', ')}`}>
              <span className="spot-type-tag famous-tag">🏛️ Famous</span>
              <span className="spot-sample-text">
                <b>{famousSpots[0]}</b>
                {famousSpots.length > 1 && <span className="spot-extra-count"> +{famousSpots.length - 1} more</span>}
              </span>
            </div>
          )}

          {/* Food Spots */}
          {foodSpots && foodSpots.length > 0 && (
            <div className="spot-preview-row" title={`Food Spots: ${foodSpots.join(', ')}`}>
              <span className="spot-type-tag food-tag">🍲 Food</span>
              <span className="spot-sample-text">
                <b>{foodSpots[0].split('(')[0].trim()}</b>
                {foodSpots.length > 1 && <span className="spot-extra-count"> +{foodSpots.length - 1} spots</span>}
              </span>
            </div>
          )}

          {/* Viewpoints */}
          {viewpoints && viewpoints.length > 0 && (
            <div className="spot-preview-row" title={`Viewpoints: ${viewpoints.join(', ')}`}>
              <span className="spot-type-tag view-tag">🌅 View</span>
              <span className="spot-sample-text">
                <b>{viewpoints[0].split('(')[0].trim()}</b>
                {viewpoints.length > 1 && <span className="spot-extra-count"> +{viewpoints.length - 1} views</span>}
              </span>
            </div>
          )}
        </div>

        {/* Stay & Room Quick Info */}
        <div className="stay-preview-box" onClick={() => onSelect(destination)}>
          <div className="hotel-title-row">
            <span className="hotel-icon">🏨</span>
            <span className="hotel-name">{stayDetails?.hotelName || 'Luxury Resort & Spa'}</span>
            {stayDetails?.hotelRating && (
              <span className="hotel-star-chip">★ {stayDetails.hotelRating}</span>
            )}
          </div>

          <div className="stay-meta-sub">
            <span className="stay-type-chip">{stayDetails?.stayType || 'Boutique Stay'}</span>
            <span className="rooms-count-chip">🛏️ {hotelRooms?.length || 1} Rooms Available</span>
          </div>

          {stayDetails?.amenities && stayDetails.amenities.length > 0 && (
            <div className="amenities-micro-list">
              {stayDetails.amenities.slice(0, 3).map((amenity, i) => (
                <span key={i} className="micro-amenity">✓ {amenity}</span>
              ))}
              {stayDetails.amenities.length > 3 && (
                <span className="micro-amenity-more">+{stayDetails.amenities.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer with Price and Buttons */}
        <div className="dest-card-footer">
          <div className="price-tag-wrap">
            <span className="price-label">Starting from</span>
            <div className="price-number">
              ₹{price?.toLocaleString('en-IN')}
              <span className="price-period"> /night</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="btn-details"
              onClick={() => onSelect(destination)}
              title="Inspect hotel rooms, stay policies, food spots, and travel transit features"
            >
              Explore ➔
            </button>
            <button
              type="button"
              className={`btn-add-itinerary ${isAdded ? 'btn-added' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(destination);
              }}
            >
              {isAdded ? '✓ Added' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DestinationCard);
