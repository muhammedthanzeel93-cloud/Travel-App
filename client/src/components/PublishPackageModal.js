import React, { useState } from 'react';

const COVER_PRESETS = [
  {
    label: '🌲 Misty Hill Valleys',
    url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    category: 'Winter Hill Station'
  },
  {
    label: '❄️ Glacier Snow Pass',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'High Altitude & Snow'
  },
  {
    label: '🏰 Royal Heritage Fort',
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    category: 'Heritage & Palaces'
  },
  {
    label: '🏖️ Turquoise Coral Lagoon',
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    category: 'Tropical & Coastal'
  },
  {
    label: '🏮 Historic Stone Alleys',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    category: 'Cultural Trails'
  }
];

export default function PublishPackageModal({
  isOpen,
  onClose,
  onPublishPackage,
  userProfile = {}
}) {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('Winter Hill Station');
  const [duration, setDuration] = useState('4 Days / 3 Nights');
  const [price, setPrice] = useState('18500');
  const [destinationsCovered, setDestinationsCovered] = useState('Munnar, Lockhart Gap, Top Station');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0].url);
  const [selectedPreset, setSelectedPreset] = useState(0);

  // Inclusions input
  const [inclusionsText, setInclusionsText] = useState('Curated Heritage Eco-Resort, Private 4x4 Transit, Guided Sunrise Trek, Daily Breakfast');

  // Day-by-Day Itinerary builder
  const [itineraryDays, setItineraryDays] = useState([
    {
      day: 1,
      title: 'Arrival & Scenic Mountain Gateway',
      morning: 'Airport / Rail pickup and scenic drive through tea gardens.',
      afternoon: 'Check-in to resort and afternoon tea overlooking misty valleys.',
      evening: 'Sunset viewpoint walk and regional welcome dinner.',
      stay: 'Featured Heritage Eco-Resort',
      mealsIncluded: 'Dinner'
    },
    {
      day: 2,
      title: 'Sunrise Panorama & Local Explorations',
      morning: 'Early morning excursion for panoramic cloud sunrise.',
      afternoon: 'Guided cultural heritage tour and tea factory tasting.',
      evening: 'Campfire gathering and stargazing.',
      stay: 'Featured Heritage Eco-Resort',
      mealsIncluded: 'Breakfast & Dinner'
    },
    {
      day: 3,
      title: 'Viewpoints, Waterfalls & Departure Corridor',
      morning: 'Morning walk to waterfall cascade and souvenir shopping.',
      afternoon: 'Scenic transfer return to transit hub.',
      evening: 'Expedition concludes.',
      stay: 'None (Departure)',
      mealsIncluded: 'Breakfast'
    }
  ]);

  if (!isOpen) return null;

  const handleAddDay = () => {
    const nextDayNum = itineraryDays.length + 1;
    setItineraryDays([
      ...itineraryDays,
      {
        day: nextDayNum,
        title: `Day ${nextDayNum} Exploration`,
        morning: 'Morning guided activity and breakfast.',
        afternoon: 'Local sightseeing and leisure.',
        evening: 'Dinner and relaxation.',
        stay: 'Featured Curated Stay',
        mealsIncluded: 'Breakfast'
      }
    ]);
  };

  const handleRemoveDay = (dayNum) => {
    if (itineraryDays.length <= 1) return;
    const filtered = itineraryDays.filter((d) => d.day !== dayNum);
    // re-index
    const reindexed = filtered.map((d, idx) => ({ ...d, day: idx + 1 }));
    setItineraryDays(reindexed);
  };

  const handleUpdateDayField = (dayIndex, field, value) => {
    const copy = [...itineraryDays];
    copy[dayIndex][field] = value;
    setItineraryDays(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const parsedPrice = parseInt(price, 10) || 15000;
    const destinationsArray = destinationsCovered.split(',').map((s) => s.trim()).filter(Boolean);
    const inclusionsArray = inclusionsText.split(',').map((s) => s.trim()).filter(Boolean);

    const newPackage = {
      id: `pkg-${Date.now()}`,
      title: title.trim(),
      tagline: (tagline || 'Curated community travel package with verified stays & routes').trim(),
      creatorId: userProfile.id || 'user-aysha',
      creatorName: userProfile.name || 'Aysha Rayan',
      creatorHandle: userProfile.handle || '@aysha_explorer',
      creatorAvatar: userProfile.avatarInitials || 'AR',
      creatorRole: 'Community Travel Architect',
      category: category.trim(),
      seasonBadge: '✨ Community Curated',
      duration: duration.trim(),
      daysCount: itineraryDays.length,
      nightsCount: Math.max(1, itineraryDays.length - 1),
      price: parsedPrice,
      originalPrice: Math.round(parsedPrice * 1.2),
      pricingDetails: {
        basePrice: parsedPrice,
        currency: 'INR (₹)',
        pricePerPerson: true,
        stayCost: Math.round(parsedPrice * 0.6),
        transitCost: Math.round(parsedPrice * 0.2),
        activitiesCost: Math.round(parsedPrice * 0.15),
        taxesFees: Math.round(parsedPrice * 0.05),
        inclusions: inclusionsArray.length > 0 ? inclusionsArray : ['Verified stays', 'Scenic transport', 'Viewpoint tickets'],
        exclusions: ['Personal flights / railway transit', 'Personal shopping']
      },
      destinationsCovered: destinationsArray.length > 0 ? destinationsArray : ['Scenic Mountain Gateway'],
      primaryDestinationId: 'custom-package',
      coverImage: coverImage,
      rating: 5.0,
      reviewsCount: 1,
      bookingsCount: 1,
      tags: ['Community Published', 'Verified Itinerary', category],
      highlights: [
        `Complete ${itineraryDays.length}-Day curated itinerary schedule`,
        `Includes accommodations and private transport`,
        `Curated by ${userProfile.name || 'Aysha Rayan'}`
      ],
      itinerary: itineraryDays,
      publishedAt: 'Just now'
    };

    onPublishPackage(newPackage);
    onClose();
  };

  return (
    <div className="modal-backdrop publish-package-backdrop" onClick={onClose}>
      <div
        className="modal-dialog publish-package-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-package-modal-title"
      >
        <div className="publish-modal-header">
          <div>
            <h3 id="publish-package-modal-title">Publish Travel Package</h3>
            <span className="publish-modal-sub">
              Share a complete travel itinerary with transparent pricing, day-by-day plans, and stays with the WanderLust community.
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="publish-package-form">
          {/* Cover Photo Selection & Preview */}
          <div className="publish-form-section">
            <label className="section-label">1. Cover Photo & Visual Atmosphere</label>
            <div className="publish-cover-preview">
              <img src={coverImage} alt="Cover preview" className="publish-preview-img" />
              <div className="cover-preset-chips">
                <span className="preset-hint">Preset Destinations:</span>
                {COVER_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`preset-btn ${selectedPreset === idx ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedPreset(idx);
                      setCoverImage(preset.url);
                      setCategory(preset.category);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group custom-url-group">
              <input
                type="url"
                placeholder="Or paste custom image URL..."
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Package Core Info */}
          <div className="publish-form-section">
            <label className="section-label">2. Package Details & Pricing</label>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Package Title *</label>
                <input
                  type="text"
                  placeholder="e.g. 4-Day Western Ghats Mist & High-Altitude Tea Trail"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>All-Inclusive Price (INR ₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 18500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={1000}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tagline / Brief Overview</label>
              <input
                type="text"
                placeholder="e.g. High-altitude cloud valleys, sunrise peaks & luxury heritage eco-bungalows"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 4 Days / 3 Nights"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Winter Hill Station">Winter Hill Station</option>
                  <option value="High Altitude & Snow">High Altitude & Snow</option>
                  <option value="Heritage & Palaces">Heritage & Palaces</option>
                  <option value="Tropical & Coastal">Tropical & Coastal</option>
                  <option value="Adventure & Trekking">Adventure & Trekking</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Destinations Covered (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. Munnar, Lockhart Gap, Top Station, Anamudi Peak"
                value={destinationsCovered}
                onChange={(e) => setDestinationsCovered(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Inclusions & Perks (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. 3 Nights Heritage Eco-Resort, Private 4x4, Guided Treks, Daily Breakfast"
                value={inclusionsText}
                onChange={(e) => setInclusionsText(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Day-by-Day Itinerary Builder */}
          <div className="publish-form-section">
            <div className="itinerary-builder-header">
              <label className="section-label">3. Day-by-Day Itinerary Schedule ({itineraryDays.length} Days)</label>
              <button
                type="button"
                className="btn-add-day-pill"
                onClick={handleAddDay}
              >
                + Add Day {itineraryDays.length + 1}
              </button>
            </div>

            <div className="itinerary-days-builder-list">
              {itineraryDays.map((d, dIdx) => (
                <div key={d.day} className="builder-day-card">
                  <div className="builder-day-header">
                    <span className="builder-day-badge">Day {d.day}</span>
                    <input
                      type="text"
                      className="builder-day-title-input"
                      value={d.title}
                      onChange={(e) => handleUpdateDayField(dIdx, 'title', e.target.value)}
                      placeholder={`Title for Day ${d.day}`}
                    />
                    {itineraryDays.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-day"
                        onClick={() => handleRemoveDay(d.day)}
                        title="Remove Day"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="builder-day-body">
                    <div className="form-group">
                      <label className="slot-mini-label">🌅 Morning Schedule</label>
                      <input
                        type="text"
                        value={d.morning}
                        onChange={(e) => handleUpdateDayField(dIdx, 'morning', e.target.value)}
                        placeholder="Morning activity..."
                        className="form-input slot-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="slot-mini-label">☀️ Afternoon Schedule</label>
                      <input
                        type="text"
                        value={d.afternoon}
                        onChange={(e) => handleUpdateDayField(dIdx, 'afternoon', e.target.value)}
                        placeholder="Afternoon activity..."
                        className="form-input slot-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="slot-mini-label">🌙 Evening Schedule</label>
                      <input
                        type="text"
                        value={d.evening}
                        onChange={(e) => handleUpdateDayField(dIdx, 'evening', e.target.value)}
                        placeholder="Evening activity..."
                        className="form-input slot-input"
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="slot-mini-label">🏨 Accommodation / Stay</label>
                        <input
                          type="text"
                          value={d.stay}
                          onChange={(e) => handleUpdateDayField(dIdx, 'stay', e.target.value)}
                          placeholder="e.g. Tea County Heritage Eco-Resort"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="slot-mini-label">🍽️ Meals Included</label>
                        <input
                          type="text"
                          value={d.mealsIncluded}
                          onChange={(e) => handleUpdateDayField(dIdx, 'mealsIncluded', e.target.value)}
                          placeholder="e.g. Breakfast & Dinner"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="publish-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary btn-publish-package-submit">
              ✨ Publish Travel Package to Showcase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
