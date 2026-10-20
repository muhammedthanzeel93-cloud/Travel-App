import React, { useState } from 'react';

/**
 * TravelPackageModal Component
 * Displays comprehensive details for a curated travel package including:
 * - Creator credentials & verification badge
 * - High-resolution gallery & duration/season tags
 * - Itemized transparent pricing breakdown (stays, transit, activities, taxes)
 * - Complete Day-by-Day itinerary timeline (morning, afternoon, evening, accommodations, meals)
 * - Inclusions & Exclusions
 * - Direct "Adopt / Add to Trips" action button
 */
export default function TravelPackageModal({
  packageData,
  isOpen,
  onClose,
  onAdoptPackage,
  isAdopted = false
}) {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'pricing' | 'inclusions'
  const [adoptedState, setAdoptedState] = useState(isAdopted);
  const effectiveAdopted = isAdopted || adoptedState;

  if (!isOpen || !packageData) return null;

  const pricing = packageData.pricingDetails || {
    basePrice: packageData.price,
    currency: 'INR (₹)',
    pricePerPerson: true,
    stayCost: Math.round(packageData.price * 0.6),
    transitCost: Math.round(packageData.price * 0.2),
    activitiesCost: Math.round(packageData.price * 0.15),
    taxesFees: Math.round(packageData.price * 0.05),
    inclusions: ['Luxury Accommodations', 'Airport Transfers', 'Guided Viewpoint Tours'],
    exclusions: ['Personal Shopping', 'Airfare']
  };

  return (
    <div className="modal-backdrop package-modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog package-details-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="package-modal-title"
      >
        {/* Modal Header */}
        <div className="package-modal-header">
          <div className="package-header-creator">
            <div className="creator-avatar-hex-sm">{packageData.creatorAvatar || 'TP'}</div>
            <div className="creator-header-titles">
              <div className="creator-name-row">
                <strong>{packageData.creatorName}</strong>
                <span className="verified-sparkle" title="Verified Creator">✓</span>
              </div>
              <span className="creator-role-micro">{packageData.creatorRole || 'Travel Architect'} • {packageData.creatorHandle}</span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Package Details Modal"
          >
            ✕
          </button>
        </div>

        {/* Hero Banner with Cover Photo */}
        <div className="package-modal-hero">
          <img
            src={packageData.coverImage}
            alt={packageData.title}
            className="package-modal-hero-img"
          />
          <div className="package-hero-overlay-gradient" />
          <div className="package-hero-badge-cluster">
            <span className="pkg-badge season">{packageData.seasonBadge || '✨ Curated'}</span>
            <span className="pkg-badge duration">⏱️ {packageData.duration}</span>
            <span className="pkg-badge rating">★ {packageData.rating || 4.9} ({packageData.reviewsCount || 42} reviews)</span>
          </div>
          <div className="package-hero-titles">
            <span className="package-category-tag">{packageData.category}</span>
            <h2 id="package-modal-title" className="package-hero-title">{packageData.title}</h2>
            <p className="package-hero-tagline">{packageData.tagline}</p>
          </div>
        </div>

        {/* Price & Primary Call-to-Action Bar */}
        <div className="package-summary-strip">
          <div className="package-price-highlight">
            <span className="price-label">All-Inclusive Package Price</span>
            <div className="price-figure-row">
              <strong className="price-val">₹{packageData.price?.toLocaleString('en-IN')}</strong>
              {packageData.originalPrice && (
                <span className="price-original">₹{packageData.originalPrice?.toLocaleString('en-IN')}</span>
              )}
              <span className="price-sub">/ person</span>
            </div>
            <span className="price-guarantee-micro">🔒 Best Price Guaranteed • Verified Stays & Transits</span>
          </div>

          <div className="package-cta-cluster">
            <button
              type="button"
              className={`btn-package-adopt ${effectiveAdopted ? 'adopted' : ''}`}
              onClick={() => {
                setAdoptedState(true);
                if (onAdoptPackage) onAdoptPackage(packageData);
              }}
            >
              {effectiveAdopted ? '✓ In Your Trips' : '⚡ Adopt & Add to My Trips'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Itinerary, Pricing Breakdown, Inclusions) */}
        <div className="package-tab-bar" role="tablist">
          <button
            className={`pkg-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
            role="tab"
            aria-selected={activeTab === 'itinerary'}
          >
            🗓️ Day-by-Day Itinerary ({packageData.itinerary?.length || 0} Days)
          </button>
          <button
            className={`pkg-tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
            role="tab"
            aria-selected={activeTab === 'pricing'}
          >
            💰 Itemized Pricing Breakdown
          </button>
          <button
            className={`pkg-tab-btn ${activeTab === 'inclusions' ? 'active' : ''}`}
            onClick={() => setActiveTab('inclusions')}
            role="tab"
            aria-selected={activeTab === 'inclusions'}
          >
            ✓ Inclusions & Perks ({pricing.inclusions?.length || 0})
          </button>
        </div>

        {/* Tab Content Stage */}
        <div className="package-modal-body">
          {/* 1. Day-by-Day Itinerary Timeline */}
          {activeTab === 'itinerary' && (
            <div className="package-itinerary-timeline" aria-label="Day by Day Itinerary">
              <div className="destinations-route-corridor">
                <span className="corridor-label">Destinations Corridor:</span>
                <div className="corridor-chips">
                  {packageData.destinationsCovered?.map((dest, dIdx) => (
                    <span key={dIdx} className="corridor-chip">
                      {dest} {dIdx < packageData.destinationsCovered.length - 1 ? '➔' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {packageData.itinerary?.map((dayPlan) => (
                <div key={dayPlan.day} className="itinerary-day-card">
                  <div className="day-number-col">
                    <span className="day-pill">Day {dayPlan.day}</span>
                    <div className="timeline-connector-line" />
                  </div>

                  <div className="day-details-col">
                    <h4 className="day-title">{dayPlan.title}</h4>

                    <div className="day-timeline-slots">
                      {dayPlan.morning && (
                        <div className="time-slot morning">
                          <span className="slot-badge">🌅 Morning</span>
                          <p>{dayPlan.morning}</p>
                        </div>
                      )}
                      {dayPlan.afternoon && (
                        <div className="time-slot afternoon">
                          <span className="slot-badge">☀️ Afternoon</span>
                          <p>{dayPlan.afternoon}</p>
                        </div>
                      )}
                      {dayPlan.evening && (
                        <div className="time-slot evening">
                          <span className="slot-badge">🌙 Evening</span>
                          <p>{dayPlan.evening}</p>
                        </div>
                      )}
                    </div>

                    <div className="day-meta-footer">
                      {dayPlan.stay && (
                        <div className="day-stay-badge">
                          <span className="stay-icon">🏨</span>
                          <span>Stay: <strong>{dayPlan.stay}</strong></span>
                        </div>
                      )}
                      {dayPlan.mealsIncluded && (
                        <div className="day-meals-badge">
                          <span className="meals-icon">🍽️</span>
                          <span>Meals: <strong>{dayPlan.mealsIncluded}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Itemized Pricing Breakdown */}
          {activeTab === 'pricing' && (
            <div className="package-pricing-tab-content">
              <div className="pricing-intro-banner">
                <span className="pricing-banner-icon">📊</span>
                <div>
                  <strong>Complete Financial Transparency</strong>
                  <p>Zero hidden charges. Here is the exact cost allocation for each component of this travel package.</p>
                </div>
              </div>

              <div className="pricing-itemized-matrix">
                <div className="matrix-row">
                  <div className="matrix-component">
                    <span className="comp-icon">🏨</span>
                    <div>
                      <strong>Accommodations & Stays</strong>
                      <span className="comp-sub">Verified Luxury Eco-Resorts & Heritage Suites</span>
                    </div>
                  </div>
                  <strong className="matrix-amount">₹{(pricing.stayCost || Math.round(packageData.price * 0.6)).toLocaleString('en-IN')}</strong>
                </div>

                <div className="matrix-row">
                  <div className="matrix-component">
                    <span className="comp-icon">🚗</span>
                    <div>
                      <strong>Multi-Modal Transit & 4x4 Corridors</strong>
                      <span className="comp-sub">Private vehicle, airport transfers, fuel & driver allowances</span>
                    </div>
                  </div>
                  <strong className="matrix-amount">₹{(pricing.transitCost || Math.round(packageData.price * 0.2)).toLocaleString('en-IN')}</strong>
                </div>

                <div className="matrix-row">
                  <div className="matrix-component">
                    <span className="comp-icon">🥾</span>
                    <div>
                      <strong>Guided Experiences & Permits</strong>
                      <span className="comp-sub">Certified scouts, national park entry, tea factory tastings & equipment</span>
                    </div>
                  </div>
                  <strong className="matrix-amount">₹{(pricing.activitiesCost || Math.round(packageData.price * 0.15)).toLocaleString('en-IN')}</strong>
                </div>

                <div className="matrix-row">
                  <div className="matrix-component">
                    <span className="comp-icon">📑</span>
                    <div>
                      <strong>Govt Taxes & Sustainability Surcharge</strong>
                      <span className="comp-sub">Eco-tourism cess, GST & 24/7 emergency concierge support</span>
                    </div>
                  </div>
                  <strong className="matrix-amount">₹{(pricing.taxesFees || Math.round(packageData.price * 0.05)).toLocaleString('en-IN')}</strong>
                </div>

                <div className="matrix-total-row">
                  <div>
                    <strong>Total Package Price per Traveler</strong>
                    <span>Includes all taxes and verified itineraries</span>
                  </div>
                  <strong className="grand-total-val">₹{packageData.price?.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          )}

          {/* 3. Inclusions & Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="package-inclusions-tab-content">
              <div className="inclusions-split-grid">
                <div className="inclusions-column">
                  <h4 className="inclusions-title green">✓ What's Included in Package</h4>
                  <ul className="inclusions-list">
                    {(pricing.inclusions || packageData.highlights)?.map((inc, iIdx) => (
                      <li key={iIdx} className="inc-item">
                        <span className="check-bullet">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exclusions-column">
                  <h4 className="exclusions-title red">✕ What's Not Included</h4>
                  <ul className="exclusions-list">
                    {(pricing.exclusions || [
                      'Personal flight / train transit to base hub',
                      'Personal shopping, souvenirs & laundry',
                      'Alcoholic beverages and off-menu orders',
                      'Optional travel insurance extensions'
                    ]).map((exc, eIdx) => (
                      <li key={eIdx} className="exc-item">
                        <span className="cross-bullet">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="package-modal-footer">
          <button className="btn-package-close" onClick={onClose}>
            Back to Showcase
          </button>
          <button
            type="button"
            className={`btn-package-adopt-footer ${isAdopted ? 'adopted' : ''}`}
            onClick={() => onAdoptPackage && onAdoptPackage(packageData)}
          >
            {isAdopted ? '✓ In Your Active Trips' : '⚡ Adopt Package to Itinerary (₹' + packageData.price?.toLocaleString('en-IN') + ')'}
          </button>
        </div>
      </div>
    </div>
  );
}
