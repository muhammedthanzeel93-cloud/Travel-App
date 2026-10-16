import React, { useState } from 'react';
import {
  calculateTripBudget,
  formatBudgetSummaryText,
  TRANSPORT_OPTIONS,
  DINING_TIERS,
  ACTIVITIES_TIERS,
  DEFAULT_BUDGET_CONFIG
} from '../utils/budgetCalculator';

export default function ItineraryView({
  itinerary = [],
  onRemoveItem,
  onUpdateNights,
  onExploreMore,
  onOpenShareModal,
  budgetConfig = DEFAULT_BUDGET_CONFIG,
  onUpdateBudgetConfig,
  onOpenBudgetModal,
  onOpenRoutePlanner,
  onOpenAIPlanner
}) {
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copiedBudget, setCopiedBudget] = useState(false);
  const [expandedScheduleIdx, setExpandedScheduleIdx] = useState(null);

  // Compute live budget breakdown across all categories
  const budget = calculateTripBudget(itinerary, budgetConfig);
  const totalNights = budget.totalNights;
  const grandTotal = budget.grandTotal;

  const handleConfigChange = (key, value) => {
    if (onUpdateBudgetConfig) {
      onUpdateBudgetConfig((prev) => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleCopyBudget = () => {
    const text = formatBudgetSummaryText(budget, itinerary);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBudget(true);
      setTimeout(() => setCopiedBudget(false), 2500);
    }
  };

  const handleShare = () => {
    if (onOpenShareModal) {
      onOpenShareModal();
      return;
    }

    const textToCopy = `🎒 My WanderLust Travel Plan:\n` +
      itinerary.map((item, idx) => `${idx + 1}. ${item.destinationName} (${item.nights} nights at ${item.hotelName} - ${item.roomName}): ₹${(item.totalPrice || item.roomPrice * item.nights).toLocaleString('en-IN')}`).join('\n') +
      `\n\nTotal Estimated Trip Budget: ₹${grandTotal.toLocaleString('en-IN')}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    } else {
      alert(textToCopy);
    }
  };

  return (
    <div className="itinerary-wrapper">
      <div className="itinerary-header-bar">
        <div>
          <h2>My Travel Plan Portfolio</h2>
          <p className="itinerary-sub">
            Review your booked stays, calculate multi-category trip costs, and customize your travel budget.
          </p>
        </div>

        {itinerary.length > 0 && (
          <div className="itinerary-header-actions">
            {onOpenAIPlanner && (
              <button
                type="button"
                className="btn-open-ai-planner-itin"
                onClick={() => onOpenAIPlanner()}
                title="Create customized itineraries & select destinations with AI"
              >
                ✨ AI Custom Itinerary
              </button>
            )}
            {onOpenRoutePlanner && (
              <button
                type="button"
                className="btn-open-route-planner-itin"
                onClick={onOpenRoutePlanner}
                title="Filter and plan stays along the route"
              >
                🗺️ Route & Stays
              </button>
            )}
            {onOpenBudgetModal && (
              <button
                type="button"
                className="btn-open-budget-modal"
                onClick={onOpenBudgetModal}
                title="Open Expanded Budget Calculator Modal"
              >
                💰 Budget Calculator
              </button>
            )}
            <button
              type="button"
              className="btn-share"
              onClick={onOpenShareModal ? onOpenShareModal : handleShare}
            >
              {shareSuccess ? '✓ Copied to Clipboard!' : '📤 Share Portfolio'}
            </button>
            <button
              type="button"
              className="btn-print"
              onClick={() => window.print()}
            >
              🖨️ Print
            </button>
          </div>
        )}
      </div>

      {itinerary.length === 0 ? (
        <div className="empty-itinerary-state">
          <div className="empty-icon">🗺️</div>
          <h3>Your travel itinerary is empty</h3>
          <p>Explore our curated destinations, inspect luxury hotel rooms, and add spots to calculate your travel budget.</p>
          
          <div className="empty-itinerary-cta-row">
            <button className="btn-primary" onClick={onExploreMore}>
              Explore Destinations Now
            </button>
            {onOpenAIPlanner && (
              <button
                type="button"
                className="btn-ai-architect-launcher"
                onClick={() => onOpenAIPlanner()}
              >
                ✨ Plan Custom Itinerary with AI
              </button>
            )}
          </div>

          {/* AI Custom Itinerary Inspiration Card */}
          {onOpenAIPlanner && (
            <div className="empty-ai-suggestion-card">
              <div className="empty-ai-card-head">
                <span className="empty-ai-icon">✦</span>
                <h4>Need Inspiration? Let AI Concierge Architect Your Trip</h4>
              </div>
              <p>
                Select your vibe and budget. WanderBot AI will match world-class horizons and generate a day-by-day customized schedule with verified luxury stays.
              </p>
              <div className="empty-ai-chips">
                <button
                  type="button"
                  className="empty-ai-chip"
                  onClick={() => onOpenAIPlanner(null, 'hills-nature')}
                >
                  🌲 3-Day Misty Tea Valley Retreat
                </button>
                <button
                  type="button"
                  className="empty-ai-chip"
                  onClick={() => onOpenAIPlanner(null, 'tropical-beach')}
                >
                  🏖️ 4-Day Tropical Island & Villa
                </button>
                <button
                  type="button"
                  className="empty-ai-chip"
                  onClick={() => onOpenAIPlanner(null, 'heritage-culture')}
                >
                  🏛️ 3-Day Royal Heritage Circuit
                </button>
              </div>
            </div>
          )}

          {onOpenRoutePlanner && (
            <button
              className="btn-secondary"
              onClick={onOpenRoutePlanner}
              style={{ marginTop: '10px' }}
            >
              🗺️ Plan Multi-Day Route & Filter Stays
            </button>
          )}
        </div>
      ) : (
        <div className="itinerary-layout">
          {/* Left Column: List of Destination Stays */}
          <div className="itinerary-cards-col">
            {itinerary.map((item, index) => {
              const itemTotal = item.totalPrice || (item.roomPrice * item.nights) || (item.price * (item.nights || 1));

              return (
                <div key={item.destinationId || index} className="itinerary-item-card">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'}
                    alt={item.destinationName}
                    className="itin-item-img"
                  />

                  <div className="itin-item-body">
                    <div className="itin-item-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span className="itin-step-pill">Stop #{index + 1}</span>
                          {item.aiCustomItinerary && (
                            <span className="itin-ai-custom-badge">
                              ✦ AI Custom Plan ({item.aiCustomItinerary.durationDays || item.nights}D)
                            </span>
                          )}
                          {item.isRouteStay && (
                            <span className="itin-route-stay-badge">
                              🛣️ {item.dayLeg || 'Route Stay'} ({item.distanceMark || 'En-Route'})
                            </span>
                          )}
                        </div>
                        <h3 className="itin-dest-name">{item.destinationName}</h3>
                        <p className="itin-hotel-info">
                          🏨 <b>{item.hotelName || item.hotel}</b> • {item.roomName || 'Deluxe Room'}
                        </p>
                      </div>

                      <button
                        className="btn-remove-itin"
                        onClick={() => onRemoveItem(index)}
                        title="Remove destination from plan"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="itin-details-grid">
                      <div className="itin-metric">
                        <span className="metric-label">Room Rate</span>
                        <span className="metric-value">₹{(item.roomPrice || item.price || 0).toLocaleString('en-IN')} / night</span>
                      </div>

                      <div className="itin-metric">
                        <span className="metric-label">Duration</span>
                        <div className="itin-counter">
                          <button
                            type="button"
                            onClick={() => onUpdateNights(index, Math.max(1, (item.nights || 1) - 1))}
                            className="mini-counter-btn"
                            title="Decrease nights"
                          >-</button>
                          <span className="nights-bold">{item.nights || 1} Nights</span>
                          <button
                            type="button"
                            onClick={() => onUpdateNights(index, (item.nights || 1) + 1)}
                            className="mini-counter-btn"
                            title="Increase nights"
                          >+</button>
                        </div>
                      </div>

                      <div className="itin-metric itin-total-col">
                        <span className="metric-label">Subtotal</span>
                        <span className="metric-total">₹{itemTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* AI Generated Day-by-Day Schedule Accordion */}
                    {item.aiCustomItinerary?.dailyPlan && (
                      <div className="itin-card-ai-schedule-wrap">
                        <button
                          type="button"
                          className="btn-toggle-itin-schedule"
                          onClick={() => setExpandedScheduleIdx(expandedScheduleIdx === index ? null : index)}
                        >
                          {expandedScheduleIdx === index ? '▲ Hide Day Schedule' : '📋 View AI Day-by-Day Schedule'}
                        </button>

                        {expandedScheduleIdx === index && (
                          <div className="itin-daily-schedule-mini">
                            {item.aiCustomItinerary.dailyPlan.map((d) => (
                              <div key={d.dayNumber} className="mini-schedule-day">
                                <strong>{d.title}</strong>
                                <p>• 🌅 {d.morning}</p>
                                <p>• ☀️ {d.afternoon}</p>
                                <p>• 🌙 {d.evening}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Trip Budget Calculator */}
          <div className="itinerary-summary-col">
            <div className="summary-card budget-calculator-card">
              <div className="budget-card-header">
                <div>
                  <h3>💰 Trip Budget Calculator</h3>
                  <p className="budget-card-subtitle">
                    Live cost estimator for <b>{budget.travelers} travelers</b> across <b>{totalNights} nights</b>.
                  </p>
                </div>
                {onOpenBudgetModal && (
                  <button
                    type="button"
                    className="btn-expand-calc"
                    onClick={onOpenBudgetModal}
                    title="Open large calculator modal"
                  >
                    ⛶
                  </button>
                )}
              </div>

              {/* Interactive Calculator Inputs */}
              <div className="card-calc-controls">
                {/* Travelers Count */}
                <div className="calc-param-row">
                  <span className="param-label">👥 Travelers:</span>
                  <div className="mini-traveler-picker">
                    <button
                      type="button"
                      className="btn-mini-step"
                      onClick={() => handleConfigChange('travelers', Math.max(1, budget.travelers - 1))}
                    >-</button>
                    <span className="mini-travelers-num">{budget.travelers} Adult{budget.travelers === 1 ? '' : 's'}</span>
                    <button
                      type="button"
                      className="btn-mini-step"
                      onClick={() => handleConfigChange('travelers', Math.min(10, budget.travelers + 1))}
                    >+</button>
                  </div>
                </div>

                {/* Transportation Mode */}
                <div className="calc-param-row">
                  <span className="param-label">🚗 Transit:</span>
                  <select
                    className="calc-select"
                    value={budgetConfig.transportMode}
                    onChange={(e) => handleConfigChange('transportMode', e.target.value)}
                  >
                    {Object.values(TRANSPORT_OPTIONS).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dining Tier */}
                <div className="calc-param-row">
                  <span className="param-label">🍲 Dining:</span>
                  <select
                    className="calc-select"
                    value={budgetConfig.diningTier}
                    onChange={(e) => handleConfigChange('diningTier', e.target.value)}
                  >
                    {Object.values(DINING_TIERS).map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Activities Tier */}
                <div className="calc-param-row">
                  <span className="param-label">🎟️ Activities:</span>
                  <select
                    className="calc-select"
                    value={budgetConfig.activitiesTier}
                    onChange={(e) => handleConfigChange('activitiesTier', e.target.value)}
                  >
                    {Object.values(ACTIVITIES_TIERS).map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visual Multi-Category Colored Bar */}
              <div className="budget-bar-section">
                <div className="budget-bar-track">
                  {budget.percentages.accommodations > 0 && (
                    <div
                      className="bar-chunk chunk-stays"
                      style={{ width: `${budget.percentages.accommodations}%` }}
                      title={`Stays: ${budget.percentages.accommodations}%`}
                    />
                  )}
                  {budget.percentages.transport > 0 && (
                    <div
                      className="bar-chunk chunk-transport"
                      style={{ width: `${budget.percentages.transport}%` }}
                      title={`Transport: ${budget.percentages.transport}%`}
                    />
                  )}
                  {budget.percentages.food > 0 && (
                    <div
                      className="bar-chunk chunk-food"
                      style={{ width: `${budget.percentages.food}%` }}
                      title={`Food: ${budget.percentages.food}%`}
                    />
                  )}
                  {budget.percentages.activities > 0 && (
                    <div
                      className="bar-chunk chunk-activities"
                      style={{ width: `${budget.percentages.activities}%` }}
                      title={`Activities: ${budget.percentages.activities}%`}
                    />
                  )}
                  {(budget.percentages.tax + budget.percentages.buffer) > 0 && (
                    <div
                      className="bar-chunk chunk-taxes"
                      style={{ width: `${budget.percentages.tax + budget.percentages.buffer}%` }}
                      title={`Taxes & Reserve: ${budget.percentages.tax + budget.percentages.buffer}%`}
                    />
                  )}
                </div>
              </div>

              {/* Itemized Cost Lines */}
              <div className="budget-itemized-list">
                <div className="summary-row">
                  <span>🏨 Stays ({itinerary.length} destinations):</span>
                  <b>₹{budget.accommodationsTotal.toLocaleString('en-IN')}</b>
                </div>

                <div className="summary-row">
                  <span>🚗 Intercity Transit:</span>
                  <b>₹{budget.transportTotal.toLocaleString('en-IN')}</b>
                </div>

                <div className="summary-row">
                  <span>🍲 Meals & Dining:</span>
                  <b>₹{budget.foodTotal.toLocaleString('en-IN')}</b>
                </div>

                <div className="summary-row">
                  <span>🎟️ Sightseeing Allowance:</span>
                  <b>₹{budget.activitiesTotal.toLocaleString('en-IN')}</b>
                </div>

                <div className="summary-row">
                  <span>🏛️ Hospitality Tax (GST 12%):</span>
                  <b>₹{budget.taxTotal.toLocaleString('en-IN')}</b>
                </div>

                <div className="summary-row">
                  <span>🛡️ Contingency Reserve (10%):</span>
                  <b>₹{budget.bufferTotal.toLocaleString('en-IN')}</b>
                </div>
              </div>

              <div className="summary-divider"></div>

              {/* Total Estimated Cost Box */}
              <div className="summary-grand-total budget-highlight-box">
                <div>
                  <span className="total-title">Total Estimated Trip Cost</span>
                  <div className="per-traveler-sub">
                    <b>₹{budget.costPerPerson.toLocaleString('en-IN')}</b> per traveler
                  </div>
                </div>
                <div className="grand-price">₹{grandTotal.toLocaleString('en-IN')}</div>
              </div>

              {/* Booking & Action Buttons */}
              <button
                type="button"
                className="btn-checkout-plan"
                onClick={() => alert(`Ready to travel! Your ${itinerary.length}-destination travel plan is finalized with an estimated budget of ₹${grandTotal.toLocaleString('en-IN')} for ${budget.travelers} travelers.`)}
              >
                Proceed to Book All Stays
              </button>

              <button
                type="button"
                className={`btn-copy-budget-action ${copiedBudget ? 'copied' : ''}`}
                onClick={handleCopyBudget}
                title="Copy full budget calculation text to clipboard"
              >
                {copiedBudget ? '✓ Budget Breakdown Copied!' : '📋 Copy Budget Breakdown'}
              </button>

              <button
                type="button"
                className="btn-share-itinerary-card"
                onClick={onOpenShareModal ? onOpenShareModal : handleShare}
                title="Share itinerary with family or friends via WhatsApp or Facebook"
              >
                💬 Share via WhatsApp / Social
              </button>

              <button
                type="button"
                className="btn-add-more-itin"
                onClick={onExploreMore}
              >
                + Add Another Destination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
