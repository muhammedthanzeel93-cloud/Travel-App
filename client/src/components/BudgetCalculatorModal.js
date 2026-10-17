import React, { useState } from 'react';
import {
  calculateTripBudget,
  formatBudgetSummaryText,
  TRANSPORT_OPTIONS,
  DINING_TIERS,
  ACTIVITIES_TIERS,
  DEFAULT_BUDGET_CONFIG
} from '../utils/budgetCalculator';

export default function BudgetCalculatorModal({
  isOpen,
  onClose,
  itinerary = [],
  budgetConfig = DEFAULT_BUDGET_CONFIG,
  onUpdateBudgetConfig,
  onNavigateToItinerary
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const budget = calculateTripBudget(itinerary, budgetConfig);

  const handleConfigChange = (key, value) => {
    if (onUpdateBudgetConfig) {
      onUpdateBudgetConfig((prev) => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleCopySummary = () => {
    const text = formatBudgetSummaryText(budget, itinerary);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    if (onUpdateBudgetConfig) {
      onUpdateBudgetConfig(DEFAULT_BUDGET_CONFIG);
    }
  };

  return (
    <div className="modal-backdrop budget-modal-backdrop" onClick={onClose}>
      <div className="modal-dialog budget-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close Budget Calculator">✕</button>

        {/* Modal Header */}
        <div className="budget-modal-header">
          <div className="budget-header-icon">💰</div>
          <div>
            <h3>Trip Budget Calculator</h3>
            <p>Calculate and simulate total estimated travel costs across stays, transport, food, activities, and taxes.</p>
          </div>
        </div>

        {/* Grand Total Hero Scorecard */}
        <div className="budget-hero-scorecard">
          <div className="scorecard-main">
            <span className="scorecard-label">Total Estimated Trip Cost</span>
            <div className="scorecard-grand-total">
              ₹{budget.grandTotal.toLocaleString('en-IN')}
            </div>
            <div className="scorecard-sub-metrics">
              <span>👤 <b>₹{budget.costPerPerson.toLocaleString('en-IN')}</b> / traveler</span>
              <span>•</span>
              <span>⏳ <b>₹{budget.costPerDay.toLocaleString('en-IN')}</b> / day</span>
              <span>•</span>
              <span>📍 {budget.totalStops} Stop{budget.totalStops === 1 ? '' : 's'}</span>
            </div>
          </div>

          <div className="scorecard-actions">
            <button
              type="button"
              className={`btn-budget-copy ${copied ? 'copied' : ''}`}
              onClick={handleCopySummary}
              title="Copy formatted budget breakdown to clipboard"
            >
              {copied ? '✓ Copied' : '📋 Copy Breakdown'}
            </button>
            <button
              type="button"
              className="btn-budget-reset"
              onClick={handleReset}
              title="Reset parameters to standard defaults"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Visual Category Breakdown Bar */}
        <div className="budget-visual-bar-wrap">
          <div className="budget-progress-bar">
            {budget.percentages.accommodations > 0 && (
              <div
                className="progress-slice slice-hotel"
                style={{ width: `${budget.percentages.accommodations}%` }}
                title={`Stays: ${budget.percentages.accommodations}%`}
              />
            )}
            {budget.percentages.transport > 0 && (
              <div
                className="progress-slice slice-transport"
                style={{ width: `${budget.percentages.transport}%` }}
                title={`Transport: ${budget.percentages.transport}%`}
              />
            )}
            {budget.percentages.food > 0 && (
              <div
                className="progress-slice slice-food"
                style={{ width: `${budget.percentages.food}%` }}
                title={`Dining: ${budget.percentages.food}%`}
              />
            )}
            {budget.percentages.activities > 0 && (
              <div
                className="progress-slice slice-activities"
                style={{ width: `${budget.percentages.activities}%` }}
                title={`Activities: ${budget.percentages.activities}%`}
              />
            )}
            {(budget.percentages.tax + budget.percentages.buffer) > 0 && (
              <div
                className="progress-slice slice-tax"
                style={{ width: `${budget.percentages.tax + budget.percentages.buffer}%` }}
                title={`Tax & Reserve: ${budget.percentages.tax + budget.percentages.buffer}%`}
              />
            )}
          </div>

          <div className="budget-legend-row">
            <span className="legend-item"><span className="legend-dot dot-hotel"></span> Stays ({budget.percentages.accommodations}%)</span>
            <span className="legend-item"><span className="legend-dot dot-transport"></span> Transport ({budget.percentages.transport}%)</span>
            <span className="legend-item"><span className="legend-dot dot-food"></span> Food ({budget.percentages.food}%)</span>
            <span className="legend-item"><span className="legend-dot dot-activities"></span> Activities ({budget.percentages.activities}%)</span>
            <span className="legend-item"><span className="legend-dot dot-tax"></span> Tax & Buffer ({budget.percentages.tax + budget.percentages.buffer}%)</span>
          </div>
        </div>

        {/* Interactive Controls & Parameters Form */}
        <div className="budget-controls-grid">
          {/* Travelers Count */}
          <div className="budget-ctrl-group">
            <label className="ctrl-label">👥 Number of Travelers</label>
            <div className="budget-traveler-counter">
              <button
                type="button"
                className="btn-counter-calc"
                onClick={() => handleConfigChange('travelers', Math.max(1, budget.travelers - 1))}
              >
                -
              </button>
              <span className="calc-counter-value">{budget.travelers} Adult{budget.travelers === 1 ? '' : 's'}</span>
              <button
                type="button"
                className="btn-counter-calc"
                onClick={() => handleConfigChange('travelers', Math.min(12, budget.travelers + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Transportation Mode */}
          <div className="budget-ctrl-group">
            <label className="ctrl-label">🚗 Inter-City Transportation</label>
            <select
              className="budget-select-input"
              value={budgetConfig.transportMode}
              onChange={(e) => handleConfigChange('transportMode', e.target.value)}
            >
              {Object.values(TRANSPORT_OPTIONS).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} — {opt.isFlatVehicle ? `₹${opt.ratePerStop}/stop` : `₹${opt.ratePerTravelerPerStop}/person/stop`}
                </option>
              ))}
            </select>
          </div>

          {/* Dining Tier */}
          <div className="budget-ctrl-group">
            <label className="ctrl-label">🍲 Daily Dining Allowance</label>
            <select
              className="budget-select-input"
              value={budgetConfig.diningTier}
              onChange={(e) => handleConfigChange('diningTier', e.target.value)}
            >
              {Object.values(DINING_TIERS).map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.label} — ₹{tier.ratePerDayPerTraveler}/day/person
                </option>
              ))}
            </select>
          </div>

          {/* Activities Tier */}
          <div className="budget-ctrl-group">
            <label className="ctrl-label">🎟️ Sightseeing & Excursions</label>
            <select
              className="budget-select-input"
              value={budgetConfig.activitiesTier}
              onChange={(e) => handleConfigChange('activitiesTier', e.target.value)}
            >
              {Object.values(ACTIVITIES_TIERS).map((act) => (
                <option key={act.id} value={act.id}>
                  {act.label} — ₹{act.ratePerDayPerTraveler}/day/person
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Toggles: Tax & Buffer */}
        <div className="budget-toggles-bar">
          <label className="budget-checkbox-label">
            <input
              type="checkbox"
              checked={budgetConfig.includeTax}
              onChange={(e) => handleConfigChange('includeTax', e.target.checked)}
            />
            <span>Include Hospitality Tax (GST 12% on stays)</span>
          </label>

          <label className="budget-checkbox-label">
            <input
              type="checkbox"
              checked={Number(budgetConfig.bufferPercent) > 0}
              onChange={(e) => handleConfigChange('bufferPercent', e.target.checked ? 10 : 0)}
            />
            <span>10% Emergency Contingency Buffer</span>
          </label>
        </div>

        {/* Itemized Line Items Breakdown */}
        <div className="budget-line-items-table">
          <h4>Itemized Cost Breakdown ({budget.totalNights} Nights • {budget.travelers} Travelers)</h4>
          
          <div className="budget-line-row">
            <span>🏨 Stays & Hotel Accommodations ({itinerary.length} destinations)</span>
            <strong>₹{budget.accommodationsTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-line-row">
            <span>🚗 Intercity & Local Transportation ({TRANSPORT_OPTIONS[budgetConfig.transportMode]?.label})</span>
            <strong>₹{budget.transportTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-line-row">
            <span>🍲 Food & Meals ({DINING_TIERS[budgetConfig.diningTier]?.label})</span>
            <strong>₹{budget.foodTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-line-row">
            <span>🎟️ Sightseeing & Activities ({ACTIVITIES_TIERS[budgetConfig.activitiesTier]?.label})</span>
            <strong>₹{budget.activitiesTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-line-row">
            <span>🏛️ Hospitality Tax (GST 12%)</span>
            <strong>₹{budget.taxTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-line-row">
            <span>🛡️ Emergency Contingency Reserve ({budgetConfig.bufferPercent}%)</span>
            <strong>₹{budget.bufferTotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="budget-total-divider"></div>

          <div className="budget-grand-row">
            <span>Total Estimated Trip Budget</span>
            <span className="grand-highlight">₹{budget.grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="budget-modal-footer">
          {onNavigateToItinerary && (
            <button
              type="button"
              className="btn-view-itinerary-calc"
              onClick={() => {
                onNavigateToItinerary();
                onClose();
              }}
            >
              🎒 View Full Itinerary Portfolio
            </button>
          )}

          <button
            type="button"
            className="btn-done-calc"
            onClick={onClose}
          >
            ✓ Done
          </button>
        </div>
      </div>
    </div>
  );
}
