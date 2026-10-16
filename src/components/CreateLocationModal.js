import React, { useState } from 'react';

export default function CreateLocationModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    tagline: '',
    category: 'Hill Station & Nature',
    rating: 4.8,
    reviewCount: 150,
    price: 6000,
    isTrending: false,
    imageUrls: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    famousSpots: 'Scenic Botanical Gardens, Mountain Peak Ridge, Heritage Lake',
    foodSpots: 'Old Town Bistro (Locally sourced specialties), Sunset Hill Cafe (Artisanal Coffee & Bakes)',
    viewpoints: 'Sunset Peak (360° Valley Panorama), Cloud Point Lookout',
    // Stay Details
    hotelName: 'The Grand Vista Alpine Resort & Spa',
    hotelRating: 4.8,
    stayType: 'Boutique Mountain Eco-Lodge',
    checkIn: '14:00',
    checkOut: '11:00',
    locationAddress: 'Pine Valley Heights, Upper Ridge Road',
    cancellationPolicy: 'Free cancellation up to 48 hours prior to check-in',
    stayAmenities: 'Heated Infinity Pool, Mountain View Breakfast, High-Speed Wi-Fi, Nature Trails, Spa & Wellness',
    // Room 1
    room1Name: 'Deluxe Alpine Mountain View Room',
    room1Bed: '1 King Bed',
    room1Capacity: '2 Adults',
    room1Price: 6000,
    room1Amenities: 'Private Balcony, Mountain View, Espresso Maker, Rain Shower',
    // Room 2
    room2Name: 'Executive Starlight Suite',
    room2Bed: '1 King Bed + 1 Daybed',
    room2Capacity: '3 Adults',
    room2Price: 9500,
    room2Amenities: 'Glass Solarium, Fireplace, Jacuzzi Tub, All Meals Included',
    // Travel Features
    bestTimeToVisit: 'October to April (Crisp mountain air and clear panoramic skies)',
    weather: '15°C - 23°C • Cool & Refreshing Mountain Breeze',
    idealStayDuration: '3 - 4 Days',
    nearestAirport: 'Regional Airport — 65 km',
    nearestRailway: 'Mountain Junction Station — 30 km',
    roadAccess: 'Well-paved scenic highland highway with panoramic valley views',
    popularActivities: 'Hiking Alpine Trails, Stargazing, Local Culinary Crawl, Waterfall Trekking',
    travelTags: 'Mountains, User Created, Romantic, Scenic, Hiking'
  });

  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.region.trim()) {
      alert('Please provide at least a Destination Name and Region!');
      return;
    }

    const imagesArray = formData.imageUrls
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean);

    const famousSpotsArray = formData.famousSpots
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const foodSpotsArray = formData.foodSpots
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const viewpointsArray = formData.viewpoints
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const stayAmenitiesArray = formData.stayAmenities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const room1AmenitiesArray = formData.room1Amenities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const room2AmenitiesArray = formData.room2Amenities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const activitiesArray = formData.popularActivities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const tagsArray = formData.travelTags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newDestination = {
      id: `user-dest-${Date.now()}`,
      name: formData.name.trim(),
      region: formData.region.trim(),
      tagline: formData.tagline.trim() || 'A hidden gem handpicked by our travel community',
      category: formData.category,
      rating: parseFloat(formData.rating) || 4.8,
      reviewCount: parseInt(formData.reviewCount, 10) || 50,
      price: parseInt(formData.room1Price, 10) || parseInt(formData.price, 10) || 5000,
      isTrending: Boolean(formData.isTrending),
      isUserCreated: true, // Marked as user-created location
      images: imagesArray.length > 0 ? imagesArray : [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
      ],
      famousSpots: famousSpotsArray.length > 0 ? famousSpotsArray : ['Scenic Main Valley', 'Historic Town Center'],
      foodSpots: foodSpotsArray.length > 0 ? foodSpotsArray : ['Local Cuisine Diner', 'Rooftop Cafe'],
      viewpoints: viewpointsArray.length > 0 ? viewpointsArray : ['Panoramic Hill Summit'],
      stayDetails: {
        hotelName: formData.hotelName || 'Boutique Hotel & Suites',
        hotelRating: parseFloat(formData.hotelRating) || 4.8,
        stayType: formData.stayType || 'Boutique Hotel',
        checkIn: formData.checkIn || '14:00',
        checkOut: formData.checkOut || '11:00',
        locationAddress: formData.locationAddress || 'Main Valley Road',
        cancellationPolicy: formData.cancellationPolicy || 'Free cancellation up to 48 hours prior to check-in',
        amenities: stayAmenitiesArray
      },
      hotelRooms: [
        {
          id: `room-${Date.now()}-1`,
          name: formData.room1Name || 'Deluxe Room',
          bed: formData.room1Bed || '1 King Bed',
          capacity: formData.room1Capacity || '2 Adults',
          size: '400 sq ft',
          pricePerNight: parseInt(formData.room1Price, 10) || 5000,
          amenities: room1AmenitiesArray,
          image: imagesArray[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: `room-${Date.now()}-2`,
          name: formData.room2Name || 'Executive Suite',
          bed: formData.room2Bed || '1 King Bed + 1 Daybed',
          capacity: formData.room2Capacity || '3 Adults',
          size: '600 sq ft',
          pricePerNight: parseInt(formData.room2Price, 10) || 8500,
          amenities: room2AmenitiesArray,
          image: imagesArray[1] || imagesArray[0] || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
        }
      ],
      travelFeatures: {
        bestTimeToVisit: formData.bestTimeToVisit || 'Year-round destination',
        weather: formData.weather || 'Pleasant weather',
        idealStayDuration: formData.idealStayDuration || '3 - 4 Days',
        transportation: {
          nearestAirport: formData.nearestAirport || 'Local Airport',
          nearestRailway: formData.nearestRailway || 'Main Railway Station',
          roadAccess: formData.roadAccess || 'Connected via National Highways'
        },
        popularActivities: activitiesArray,
        travelTags: tagsArray
      }
    };

    onSave(newDestination);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog create-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">✕</button>

        <div className="create-modal-header">
          <div className="create-header-icon">✨</div>
          <div>
            <h2>Add Custom Travel Location</h2>
            <p>Define a new destination complete with star ratings, food & famous spots, hotel rooms, and travel features.</p>
          </div>
        </div>

        {/* Step Tabs */}
        <div className="create-step-tabs">
          <button
            type="button"
            className={`step-tab ${activeStep === 1 ? 'active' : ''}`}
            onClick={() => setActiveStep(1)}
          >
            1. Basic & Spot Highlights
          </button>
          <button
            type="button"
            className={`step-tab ${activeStep === 2 ? 'active' : ''}`}
            onClick={() => setActiveStep(2)}
          >
            2. Hotel & Rooms Structure
          </button>
          <button
            type="button"
            className={`step-tab ${activeStep === 3 ? 'active' : ''}`}
            onClick={() => setActiveStep(3)}
          >
            3. Travel Features & Transit
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          {/* STEP 1: BASICS & SPOTS */}
          {activeStep === 1 && (
            <div className="form-step-content">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Destination Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ooty or Coorg"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Region & Country *</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="e.g. Tamil Nadu, India"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tagline / Essence</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="e.g. Queen of Hill Stations & Pine-Forested Valley"
                />
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="Hill Station & Nature">Hill Station & Nature</option>
                    <option value="Heritage & Royal">Heritage & Royal</option>
                    <option value="Tropical Island & Beach">Tropical Island & Beach</option>
                    <option value="Cultural & Historic">Cultural & Historic</option>
                    <option value="High Altitude & Adventure">High Altitude & Adventure</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Star Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group checkbox-group-inline">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isTrending"
                      checked={formData.isTrending}
                      onChange={handleChange}
                    />
                    <span>Mark as Trending 🔥</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Image URLs (one URL per line for multi-image gallery)</label>
                <textarea
                  rows="3"
                  name="imageUrls"
                  value={formData.imageUrls}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="form-group">
                <label>🏛️ Famous Spots (comma-separated)</label>
                <input
                  type="text"
                  name="famousSpots"
                  value={formData.famousSpots}
                  onChange={handleChange}
                  placeholder="Botanical Garden, Doddabetta Peak, Pykara Falls"
                />
              </div>

              <div className="form-group">
                <label>🍲 Food Spots & Delicacies (comma-separated)</label>
                <input
                  type="text"
                  name="foodSpots"
                  value={formData.foodSpots}
                  onChange={handleChange}
                  placeholder="Earl's Secret (Anglo-Indian bakes), Shinkow's Chinese, Modern Stores (Handmade Chocolates)"
                />
              </div>

              <div className="form-group">
                <label>🌅 Scenic Viewpoints (comma-separated)</label>
                <input
                  type="text"
                  name="viewpoints"
                  value={formData.viewpoints}
                  onChange={handleChange}
                  placeholder="Doddabetta Summit (Telescope house), Needle Rock Viewpoint, Avalanche Lake Overlook"
                />
              </div>
            </div>
          )}

          {/* STEP 2: HOTEL & ROOMS STRUCTURE */}
          {activeStep === 2 && (
            <div className="form-step-content">
              <div className="step-intro-note">
                🏨 Define the primary hotel/resort, stay policies, and room structures.
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Hotel / Resort Name</label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleChange}
                    placeholder="e.g. The Grand Vista Alpine Resort"
                  />
                </div>

                <div className="form-group">
                  <label>Stay Type</label>
                  <input
                    type="text"
                    name="stayType"
                    value={formData.stayType}
                    onChange={handleChange}
                    placeholder="e.g. Luxury Eco-Resort or Boutique Villa"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>Hotel Rating (Stars)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    name="hotelRating"
                    value={formData.hotelRating}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Check-in Time</label>
                  <input
                    type="text"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Check-out Time</label>
                  <input
                    type="text"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location / Address</label>
                <input
                  type="text"
                  name="locationAddress"
                  value={formData.locationAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Stay Amenities (comma-separated)</label>
                <input
                  type="text"
                  name="stayAmenities"
                  value={formData.stayAmenities}
                  onChange={handleChange}
                  placeholder="Heated Pool, Free Breakfast, Wi-Fi, Spa, Nature Walks"
                />
              </div>

              {/* Room 1 */}
              <div className="sub-card-box">
                <h4>Room 1: Base Configuration</h4>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Room Name</label>
                    <input
                      type="text"
                      name="room1Name"
                      value={formData.room1Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price Per Night (₹)</label>
                    <input
                      type="number"
                      name="room1Price"
                      value={formData.room1Price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Bed & Capacity</label>
                    <input
                      type="text"
                      name="room1Bed"
                      value={formData.room1Bed}
                      onChange={handleChange}
                      placeholder="1 King Bed"
                    />
                  </div>
                  <div className="form-group">
                    <label>Room Amenities</label>
                    <input
                      type="text"
                      name="room1Amenities"
                      value={formData.room1Amenities}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Room 2 */}
              <div className="sub-card-box">
                <h4>Room 2: Upgraded Suite Configuration</h4>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Room Name</label>
                    <input
                      type="text"
                      name="room2Name"
                      value={formData.room2Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price Per Night (₹)</label>
                    <input
                      type="number"
                      name="room2Price"
                      value={formData.room2Price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Bed & Capacity</label>
                    <input
                      type="text"
                      name="room2Bed"
                      value={formData.room2Bed}
                      onChange={handleChange}
                      placeholder="1 King Bed + 1 Daybed"
                    />
                  </div>
                  <div className="form-group">
                    <label>Room Amenities</label>
                    <input
                      type="text"
                      name="room2Amenities"
                      value={formData.room2Amenities}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRAVEL FEATURES & TRANSIT */}
          {activeStep === 3 && (
            <div className="form-step-content">
              <div className="step-intro-note">
                ✈️ Travel features: seasonality, weather, connectivity, and popular experiences.
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Best Time to Visit</label>
                  <input
                    type="text"
                    name="bestTimeToVisit"
                    value={formData.bestTimeToVisit}
                    onChange={handleChange}
                    placeholder="e.g. October to April"
                  />
                </div>

                <div className="form-group">
                  <label>Climate / Weather</label>
                  <input
                    type="text"
                    name="weather"
                    value={formData.weather}
                    onChange={handleChange}
                    placeholder="e.g. 15°C - 23°C, Pleasant"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ideal Stay Duration</label>
                <input
                  type="text"
                  name="idealStayDuration"
                  value={formData.idealStayDuration}
                  onChange={handleChange}
                  placeholder="e.g. 3 - 4 Days"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Nearest Airport</label>
                  <input
                    type="text"
                    name="nearestAirport"
                    value={formData.nearestAirport}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nearest Railway</label>
                  <input
                    type="text"
                    name="nearestRailway"
                    value={formData.nearestRailway}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Road Accessibility</label>
                <input
                  type="text"
                  name="roadAccess"
                  value={formData.roadAccess}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>🎯 Popular Activities (comma-separated)</label>
                <input
                  type="text"
                  name="popularActivities"
                  value={formData.popularActivities}
                  onChange={handleChange}
                  placeholder="Hiking, Wildlife Safari, Local Market Walk, Boat Ride"
                />
              </div>

              <div className="form-group">
                <label>🏷️ Travel Tags (comma-separated)</label>
                <input
                  type="text"
                  name="travelTags"
                  value={formData.travelTags}
                  onChange={handleChange}
                  placeholder="Mountains, Adventure, Heritage, Nature"
                />
              </div>
            </div>
          )}

          {/* Form Navigation & Submit */}
          <div className="form-footer-nav">
            <div>
              {activeStep > 1 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  ← Back
                </button>
              )}
            </div>

            <div className="footer-action-right">
              {activeStep < 3 ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setActiveStep(activeStep + 1)}
                >
                  Next: {activeStep === 1 ? 'Hotel & Rooms' : 'Travel Features'} →
                </button>
              ) : (
                <button type="submit" className="btn-primary-green">
                  ✨ Create & Add Location
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
