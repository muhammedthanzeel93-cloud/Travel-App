import React, { useState } from 'react';

const HIGHLIGHT_TAG_PRESETS = [
  '🌅 Cloud Beds & Sunrise Mist',
  '❄️ Sub-Zero Glacier Pass',
  '🏰 Royal Forts & Golden Hour',
  '🏖️ Turquoise Lagoons & Reefs',
  '🍵 Heritage Food & Spice Trails',
  '🌲 Alpine Pine Forests & Solitude',
  '🥾 High-Altitude Ridge Treks'
];

export default function PinDestinationModal({
  isOpen,
  onClose,
  destinations = [],
  onPinDestination,
  pinnedIds = []
}) {
  const [selectedDestId, setSelectedDestId] = useState(
    destinations.find((d) => !pinnedIds.includes(d.id))?.id || destinations[0]?.id || ''
  );
  const [recommendationNote, setRecommendationNote] = useState('');
  const [highlightTag, setHighlightTag] = useState(HIGHLIGHT_TAG_PRESETS[0]);
  const [recommendedSeason, setRecommendedSeason] = useState('Winter (Nov - Feb)');
  const [customSpot, setCustomSpot] = useState('');

  if (!isOpen) return null;

  const selectedDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDest) return;

    const spots = selectedDest.viewpoints?.slice(0, 2) || selectedDest.famousSpots?.slice(0, 2) || ['Scenic Viewpoints'];
    if (customSpot.trim()) {
      spots.unshift(customSpot.trim());
    }

    const pinnedItem = {
      id: `fav-${selectedDest.id}`,
      destinationId: selectedDest.id,
      name: selectedDest.name,
      region: selectedDest.region,
      category: selectedDest.category,
      rating: selectedDest.rating || 4.8,
      image: selectedDest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
      recommendationNote: (recommendationNote || `One of my highest recommended destinations! The scenery and stays in ${selectedDest.name} are extraordinary.`).trim(),
      highlightTag: highlightTag.trim(),
      recommendedSeason: recommendedSeason.trim(),
      pinnedAt: 'Pinned by Traveler',
      mustVisitSpots: spots
    };

    onPinDestination(pinnedItem);
    onClose();
  };

  return (
    <div className="modal-backdrop pin-destination-backdrop" onClick={onClose}>
      <div
        className="modal-dialog pin-destination-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-modal-title"
      >
        <div className="pin-modal-header">
          <div>
            <h3 id="pin-modal-title">📌 Pin Favorite Destination to Profile</h3>
            <span className="pin-modal-sub">
              Curate and showcase your top-recommended horizons, viewpoints, and insider tips on your traveler passport.
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="pin-destination-form">
          {/* Destination Selector */}
          <div className="form-group">
            <label>Select Destination to Pin *</label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="form-select pin-dest-select"
              required
            >
              {destinations.map((dest) => {
                const isAlreadyPinned = pinnedIds.includes(dest.id);
                return (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} ({dest.region}) {isAlreadyPinned ? '• [Already Pinned]' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Live Preview Card */}
          {selectedDest && (
            <div className="pin-preview-card">
              <img
                src={selectedDest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80'}
                alt={selectedDest.name}
                className="pin-preview-img"
              />
              <div className="pin-preview-meta">
                <span className="pin-preview-category">{selectedDest.category}</span>
                <h4 className="pin-preview-name">{selectedDest.name}</h4>
                <span className="pin-preview-region">📍 {selectedDest.region} • ★ {selectedDest.rating || 4.8}</span>
              </div>
            </div>
          )}

          {/* User's Recommendation Note */}
          <div className="form-group">
            <label>Personal Recommendation Tip / Insider Advice *</label>
            <textarea
              rows={3}
              placeholder="What makes this destination unforgettable to you? (e.g. Waking up at 5:30 AM to see the sea of clouds from Lockhart Gap is unbeatable! Sip cardamom tea at Top Station...)"
              value={recommendationNote}
              onChange={(e) => setRecommendationNote(e.target.value)}
              className="form-textarea"
              required
            />
          </div>

          {/* Highlight Tag & Recommended Season */}
          <div className="form-grid-2">
            <div className="form-group">
              <label>Highlight Tag Preset</label>
              <select
                value={highlightTag}
                onChange={(e) => setHighlightTag(e.target.value)}
                className="form-select"
              >
                {HIGHLIGHT_TAG_PRESETS.map((tag, tIdx) => (
                  <option key={tIdx} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Recommended Season</label>
              <select
                value={recommendedSeason}
                onChange={(e) => setRecommendedSeason(e.target.value)}
                className="form-select"
              >
                <option value="Winter (Nov - Feb)">Winter (Nov - Feb)</option>
                <option value="Monsoon Mist (Jul - Sep)">Monsoon Mist (Jul - Sep)</option>
                <option value="Spring Blooms (Mar - May)">Spring Blooms (Mar - May)</option>
                <option value="All-Year Round">All-Year Round</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Must-Visit Spot / Secret Tip (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Secret sunset point behind Lockhart tea factory"
              value={customSpot}
              onChange={(e) => setCustomSpot(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="pin-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary btn-pin-submit">
              📌 Pin to Profile Highlights
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
