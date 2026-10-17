import React from 'react';

/**
 * FuturisticNavBar Component
 * A cutting-edge navigation dock featuring glowing holographic links,
 * glassmorphic translucent backdrop, live trip counters, search inputs,
 * and quick-action launchers for AI, Budget, and Destination Creation.
 *
 * @param {Object} props
 * @param {string} props.activeNav - Current active top-level navigation: 'home' | 'explore' | 'trips' | 'profile'
 * @param {Function} props.onNavChange - Callback when switching navigation tab
 * @param {number} props.itineraryCount - Total items in traveler's itinerary
 * @param {number} props.grandTotalBudget - Grand total estimated budget in INR
 * @param {string} props.origin - Current origin input value
 * @param {Function} props.setOrigin - Callback to update origin
 * @param {string} props.destination - Current destination search query
 * @param {Function} props.setDestination - Callback to update destination
 * @param {Function} props.onOpenCreateModal - Opens custom destination creation modal
 * @param {Function} props.onOpenBudgetModal - Opens budget calculator modal
 * @param {Function} props.onOpenShareModal - Opens social sharing modal
 * @param {Function} props.onOpenAIChat - Opens WanderBot AI Assistant
 */
export default function FuturisticNavBar({
  activeNav,
  onNavChange,
  itineraryCount = 0,
  grandTotalBudget = 0,
  origin,
  setOrigin,
  destination,
  setDestination,
  onOpenCreateModal,
  onOpenBudgetModal,
  onOpenShareModal,
  onOpenAIChat,
  onOpenRoutePlanner,
}) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: '🪐',
      subtitle: 'Nexus',
      badge: null,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: '🧭',
      subtitle: 'Worlds',
      badge: null,
    },
    {
      id: 'trips',
      label: 'Trips',
      icon: '🎒',
      subtitle: 'Itinerary',
      badge: itineraryCount > 0 ? itineraryCount : null,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      subtitle: 'Passport',
      badge: null,
    },
  ];

  return (
    <header className="futuristic-navbar-header" id="futuristic-navbar">
      {/* Ambient Cybernetic Glow Backdrop */}
      <div className="nav-ambient-glow" aria-hidden="true" />

      <div className="futuristic-navbar-container">
        {/* Brand Lockup with Cyberpunk Aesthetic */}
        <div
          className="futuristic-brand-lockup"
          onClick={() => onNavChange('home')}
          role="button"
          tabIndex={0}
          title="Return to Home Nexus"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavChange('home');
          }}
        >
          <div className="brand-logo-hex">
            <span className="hex-inner-gem">✦</span>
            <div className="hex-orbit-ring" />
          </div>
          <div className="brand-titles">
            <div className="brand-main-row">
              <span className="brand-title-neon">WanderLust</span>
              <span className="brand-futuristic-chip">NEO-V2</span>
            </div>
            <span className="brand-tagline-micro">Quantum Travel Architect</span>
          </div>
        </div>

        {/* Core Futuristic Navigation Dock (Home, Explore, Trips, Profile) */}
        <nav className="futuristic-nav-dock" aria-label="Main Navigation">
          <div className="dock-pill-track">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  className={`dock-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onNavChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  title={`Navigate to ${item.label}`}
                >
                  <span className="dock-item-glow" aria-hidden="true" />
                  <span className="dock-icon">{item.icon}</span>
                  <div className="dock-text-group">
                    <span className="dock-label">{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className="dock-item-badge" title={`${item.badge} destinations planned`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="dock-active-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Integrated Route Search Pod */}
        <div className="futuristic-search-pod">
          <div className="pod-input-field">
            <span className="pod-icon">🛫</span>
            <input
              type="text"
              id="origin-input"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="From: Calicut..."
              title="Origin Location"
            />
            {origin && (
              <button
                className="pod-clear-btn"
                onClick={() => setOrigin('')}
                title="Clear origin"
              >
                ✕
              </button>
            )}
          </div>

          <div className="pod-divider-arrow" title="Route vector">⇄</div>

          <div className="pod-input-field">
            <span className="pod-icon">📍</span>
            <input
              type="text"
              id="destination-input"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                // Switch to explore if user starts typing in search pod while on other pages
                if (e.target.value && activeNav !== 'explore') {
                  onNavChange('explore');
                }
              }}
              placeholder="To: Munnar, Beach..."
              title="Destination Search"
            />
            {destination && (
              <button
                className="pod-clear-btn"
                onClick={() => setDestination('')}
                title="Clear destination"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Action Dock Buttons */}
        <div className="futuristic-action-cluster">
          {/* Add Destination Button */}
          <button
            className="btn-create-destination"
            onClick={onOpenCreateModal}
            title="Create a custom destination"
            id="nav-btn-add-location"
          >
            <span className="plus-sign">+</span> Add Location
          </button>

          {/* Quick Plan Button for Itinerary (Direct test and mobile shortcut) */}
          <button
            className={`btn-itinerary-header ${activeNav === 'trips' ? 'active' : ''}`}
            onClick={() => onNavChange('trips')}
            title="Open Travel Itinerary Plan"
            id="nav-btn-plan"
          >
            🎒 Plan
            {itineraryCount > 0 && (
              <span className="header-itin-badge">{itineraryCount}</span>
            )}
          </button>

          {/* Budget Calculator Trigger */}
          <button
            className="btn-budget-header"
            onClick={onOpenBudgetModal}
            title="Launch Quantum Trip Budget Calculator"
            id="nav-btn-budget"
          >
            💰 Budget: ₹{grandTotalBudget.toLocaleString('en-IN')}
          </button>

          {/* Route Planning Multi-Modal Trigger (Walking, Car, Public Transport) */}
          <button
            className="btn-route-header"
            onClick={onOpenRoutePlanner}
            title="Multi-Modal Route Planning (Walking, Car, Public Transport)"
            id="nav-btn-routes"
          >
            🗺️ Routes
          </button>

          {/* Social Share Trigger */}
          <button
            className="btn-share-header"
            onClick={onOpenShareModal}
            title="Share Itinerary on Social Platforms"
            id="nav-btn-share"
          >
            📤 Share
          </button>

          {/* WanderBot AI Assistant */}
          <button
            className="btn-ai-header"
            onClick={onOpenAIChat}
            title="Chat with WanderBot AI Concierge"
            id="nav-btn-ai"
          >
            ✦ Ask AI
          </button>
        </div>
      </div>
    </header>
  );
}
