import React, { useState, useEffect, useRef } from 'react';
import {
  generateAIResponse,
  getQuickPrompts,
  generateCustomItinerary,
  findDestinationMatches,
  TRAVEL_VIBES,
  BUDGET_TIERS,
  DURATION_OPTIONS,
  COMPANION_OPTIONS,
  formatCurrency
} from '../utils/aiTravelEngine';

export default function AIAssistantChat({
  isOpen,
  onClose,
  destinations = [],
  itinerary = [],
  onSelectDestination,
  onAddToItinerary,
  onApplyCustomItinerary,
  onNavigateTab,
  initialMode = 'chat',
  initialDestination = null,
  initialVibe = null
}) {
  // Mode: 'chat' (conversational) or 'architect' (custom itinerary & destination selector)
  const [activeMode, setActiveMode] = useState(initialMode || 'chat');

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello! I'm **WanderBot**, your A.I. Travel Concierge ✦. 

I'm loaded with complete details on ${destinations.length} destinations, verified luxury stays, weather patterns, and budget calculations. 

How can I assist your wanderlust today? Ask me to create a customized itinerary or help you select the ideal destination!`,
      timestamp: 'Just now',
      actions: [
        { label: '🔥 Trending Spots', actionType: 'tab', payload: 'trending' },
        { label: '✨ Plan 3-Day Custom Itinerary', actionType: 'custom', payload: 'Plan a 3-Day Custom Itinerary' },
        { label: '🧭 Help Me Select Destination', actionType: 'custom', payload: 'Help me select a destination' },
        { label: '🌲 Best Hill Stations', actionType: 'custom', payload: 'Best hill stations for a cool retreat' },
        { label: '💰 Budget Trip under ₹20k', actionType: 'custom', payload: 'Suggest budget trips under 20k' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // =========================================================================
  // AI ARCHITECT (ITINERARY & DESTINATION SELECTOR) STATE
  // =========================================================================
  const [selectedVibe, setSelectedVibe] = useState(initialVibe || 'hills-nature');
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [selectedBudgetTier, setSelectedBudgetTier] = useState('comfort');
  const [selectedCompanions, setSelectedCompanions] = useState('Couple');
  const [targetDestinationId, setTargetDestinationId] = useState(
    initialDestination ? initialDestination.id : 'auto'
  );

  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [matchedDestinations, setMatchedDestinations] = useState([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [expandedDay, setExpandedDay] = useState(1);

  // Sync mode and preselected destination if passed via props
  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
    if (initialDestination) {
      setTargetDestinationId(initialDestination.id);
    }
    if (initialVibe) {
      setSelectedVibe(initialVibe);
    }
  }, [initialMode, initialDestination, initialVibe]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized && activeMode === 'chat') {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, isMinimized, activeMode]);

  if (!isOpen) return null;

  const quickPrompts = getQuickPrompts(null, itinerary);

  // Generate / refresh AI plan and destination matches
  const handleRunArchitect = () => {
    setIsGeneratingPlan(true);
    setAppliedSuccess(false);

    setTimeout(() => {
      // 1. Compute Destination Matches
      const matches = findDestinationMatches({
        vibe: selectedVibe,
        budgetTier: selectedBudgetTier,
        durationDays: selectedDuration,
        companions: selectedCompanions,
        destinations
      });
      setMatchedDestinations(matches);

      // 2. Select Target Destination
      let destToPlan = null;
      if (targetDestinationId !== 'auto') {
        destToPlan = destinations.find((d) => d.id === targetDestinationId);
      }
      if (!destToPlan && matches.length > 0) {
        destToPlan = matches[0].destination;
      }

      // 3. Generate Custom Itinerary
      if (destToPlan) {
        const plan = generateCustomItinerary({
          destination: destToPlan,
          durationDays: selectedDuration,
          tripVibe: selectedVibe,
          budgetTier: selectedBudgetTier,
          companions: selectedCompanions,
          destinations
        });
        setGeneratedPlan(plan);
        setExpandedDay(1);
      }

      setIsGeneratingPlan(false);
    }, 350);
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMessageId = `user-${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const newMessages = [
      ...messages,
      {
        id: userMessageId,
        sender: 'user',
        text: query,
        timestamp: nowTime
      }
    ];

    setMessages(newMessages);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      const response = generateAIResponse({
        query,
        destinations,
        currentDestination: null,
        itinerary
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: response.actions,
          customItinerary: response.customItinerary,
          destinationMatches: response.destinationMatches
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  // Apply custom itinerary to user's trips
  const handleApplyItinerary = (actionableItem) => {
    if (!actionableItem) return;

    if (onApplyCustomItinerary) {
      onApplyCustomItinerary(actionableItem);
    } else if (onAddToItinerary) {
      onAddToItinerary(actionableItem);
      if (onNavigateTab) onNavigateTab('itinerary');
      onClose();
    }

    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  const handleActionClick = (action) => {
    if (!action) return;

    if (action.actionType === 'apply-custom-itinerary' && action.payload) {
      handleApplyItinerary(action.payload);
    } else if (action.actionType === 'explore' && onSelectDestination && action.payload) {
      onSelectDestination(action.payload);
      onClose();
    } else if (action.actionType === 'plan-itinerary' && action.payload) {
      setTargetDestinationId(action.payload.id);
      setActiveMode('architect');
      // Regenerate with this destination
      const plan = generateCustomItinerary({
        destination: action.payload,
        durationDays: selectedDuration,
        tripVibe: selectedVibe,
        budgetTier: selectedBudgetTier,
        companions: selectedCompanions,
        destinations
      });
      setGeneratedPlan(plan);
    } else if (action.actionType === 'add' && onAddToItinerary && action.payload) {
      const dest = action.payload;
      const room = dest.hotelRooms?.[0];
      const price = room?.pricePerNight || dest.price || 5000;
      onAddToItinerary({
        destinationId: dest.id,
        destinationName: dest.name,
        region: dest.region,
        hotelName: dest.stayDetails?.hotelName || 'Luxury Resort',
        roomName: room?.name || 'Deluxe Room',
        roomPrice: price,
        nights: 3,
        totalPrice: price * 3,
        image: dest.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
        guests: room?.capacity || '2 Adults'
      });
    } else if (action.actionType === 'tab' && onNavigateTab && action.payload) {
      onNavigateTab(action.payload);
      onClose();
    } else if (action.actionType === 'custom' && action.payload) {
      handleSendMessage(action.payload);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-cleared-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset! Ask me to plan a custom itinerary or recommend destinations based on your budget and style.`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Simple Markdown-style formatter for AI messages
  const formatMessageText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return lines.map((line, idx) => {
      let formatted = line;
      const parts = [];
      let lastIdx = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.substring(lastIdx, match.index));
        }
        parts.push(<strong key={`${idx}-${match.index}`}>{match[1]}</strong>);
        lastIdx = match.index + match[0].length;
      }

      if (lastIdx < line.length) {
        parts.push(line.substring(lastIdx));
      }

      const content = parts.length > 0 ? parts : formatted;

      return (
        <span key={idx} className="chat-line">
          {content}
          {idx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className={`ai-assistant-wrapper ${isMinimized ? 'minimized' : ''}`}>
      {/* Minimized Dock Bar */}
      {isMinimized ? (
        <div className="ai-minimized-bar" onClick={() => setIsMinimized(false)}>
          <div className="ai-bot-avatar-sm">✦</div>
          <div className="ai-minimized-info">
            <strong>WanderBot A.I.</strong>
            <span>Click to expand concierge</span>
          </div>
          <button
            type="button"
            className="btn-chat-expand"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            title="Expand chat"
          >
            ▲
          </button>
        </div>
      ) : (
        /* Full Chat Interface */
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-lead">
              <div className="ai-bot-avatar">
                <span>✦</span>
                <span className="online-indicator" title="AI Concierge is online"></span>
              </div>
              <div className="ai-header-titles">
                <div className="ai-name-badge">
                  <h3>WanderBot AI</h3>
                  <span className="ai-tag">Concierge</span>
                </div>
                <p className="ai-subtitle">Custom Itinerary Architect & Destination Matchmaker</p>
              </div>
            </div>

            <div className="ai-header-controls">
              {activeMode === 'chat' && (
                <button
                  type="button"
                  className="ai-ctrl-btn"
                  onClick={handleClearChat}
                  title="Clear conversation"
                >
                  🧹
                </button>
              )}
              <button
                type="button"
                className="ai-ctrl-btn"
                onClick={() => setIsMinimized(true)}
                title="Minimize chat window"
              >
                —
              </button>
              <button
                type="button"
                className="ai-ctrl-btn close-btn"
                onClick={onClose}
                title="Close AI Assistant"
                aria-label="Close AI Assistant"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="ai-mode-tabs-bar">
            <button
              type="button"
              className={`ai-mode-tab ${activeMode === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveMode('chat')}
            >
              💬 AI Concierge Chat
            </button>
            <button
              type="button"
              className={`ai-mode-tab ${activeMode === 'architect' ? 'active' : ''}`}
              onClick={() => setActiveMode('architect')}
            >
              ✨ Itinerary Architect & Destination Matcher
            </button>
          </div>

          {/* Context Knowledge Strip */}
          <div className="ai-knowledge-strip">
            <span>🧠 {destinations.length} destinations indexed</span>
            <span>•</span>
            <span>💼 {itinerary.length} stops in your plan</span>
            {targetDestinationId !== 'auto' && (
              <>
                <span>•</span>
                <span className="active-dest-badge">
                  🎯 {destinations.find((d) => d.id === targetDestinationId)?.name || 'Selected'}
                </span>
              </>
            )}
          </div>

          {/* ================================================================= */}
          {/* VIEW 1: CONVERSATIONAL CHAT MODE */}
          {/* ================================================================= */}
          {activeMode === 'chat' && (
            <>
              {/* Quick Prompts Bar */}
              <div className="ai-prompts-bar">
                {quickPrompts.slice(0, 5).map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    className="ai-prompt-pill"
                    onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Messages Stream */}
              <div className="ai-messages-stream">
                {messages.map((msg) => (
                  <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
                    {msg.sender === 'ai' && (
                      <div className="ai-msg-avatar">✦</div>
                    )}

                    <div className="ai-msg-bubble">
                      <div className="ai-msg-content">
                        {formatMessageText(msg.text)}
                      </div>

                      {/* Custom Itinerary Embedded Card */}
                      {msg.customItinerary && (
                        <div className="ai-embedded-itinerary-card">
                          <div className="embedded-itin-header">
                            <span className="itin-badge">🗓️ AI Generated Itinerary</span>
                            <h4>{msg.customItinerary.title}</h4>
                            <p className="itin-meta">
                              🏨 {msg.customItinerary.selectedRoom.name} at {msg.customItinerary.destination.stayDetails?.hotelName || 'Luxury Resort'}
                            </p>
                          </div>

                          <div className="embedded-itin-budget-row">
                            <span className="budget-tag">
                              Est. Total: {formatCurrency(msg.customItinerary.estimatedBudget.grandTotal)}
                            </span>
                            <span className="duration-tag">
                              {msg.customItinerary.durationDays} Days / {msg.customItinerary.nights} Nights
                            </span>
                          </div>

                          <button
                            type="button"
                            className="btn-embedded-apply"
                            onClick={() => handleApplyItinerary(msg.customItinerary.actionableItem)}
                          >
                            ✦ Apply This Custom Itinerary to Trips
                          </button>
                        </div>
                      )}

                      {/* Destination Matches Embedded Cards */}
                      {msg.destinationMatches && msg.destinationMatches.length > 0 && (
                        <div className="ai-embedded-matches-wrap">
                          <div className="embedded-matches-title">🎯 AI Recommended Horizons:</div>
                          <div className="embedded-matches-grid">
                            {msg.destinationMatches.map((match, mIdx) => (
                              <div key={mIdx} className="embedded-match-card">
                                <div className="embedded-match-head">
                                  <strong>{match.destination.name}</strong>
                                  <span className="match-pill">{match.matchScore}% Match</span>
                                </div>
                                <p className="match-reason-txt">
                                  {match.matchReasons?.[0] || match.destination.tagline}
                                </p>
                                <div className="match-action-btns">
                                  <button
                                    type="button"
                                    className="btn-match-plan"
                                    onClick={() => handleActionClick({
                                      actionType: 'plan-itinerary',
                                      payload: match.destination
                                    })}
                                  >
                                    🗓️ Plan Itinerary
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-match-explore"
                                    onClick={() => handleActionClick({
                                      actionType: 'explore',
                                      payload: match.destination
                                    })}
                                  >
                                    View ➔
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Chips */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="ai-action-chips-wrap">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              className="ai-action-chip"
                              onClick={() => handleActionClick(act)}
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="ai-msg-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="ai-message-row ai">
                    <div className="ai-msg-avatar">✦</div>
                    <div className="ai-msg-bubble typing-bubble">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Box Footer */}
              <form
                className="ai-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  id="ai-assistant-input"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask anything (e.g. 'Plan 3 days in Munnar', 'Budget under ₹20k')..."
                  className="ai-text-input"
                />

                <button
                  type="submit"
                  className="ai-send-btn"
                  disabled={!inputQuery.trim() || isTyping}
                  title="Send message to WanderBot"
                >
                  ➤
                </button>
              </form>
            </>
          )}

          {/* ================================================================= */}
          {/* VIEW 2: ITINERARY ARCHITECT & DESTINATION SELECTOR WIZARD */}
          {/* ================================================================= */}
          {activeMode === 'architect' && (
            <div className="ai-architect-container">
              {/* Preferences Configuration Controls */}
              <div className="architect-controls-panel">
                {/* 1. Target Destination Picker */}
                <div className="architect-form-group">
                  <label className="architect-label">📍 Destination Target:</label>
                  <select
                    className="architect-select"
                    value={targetDestinationId}
                    onChange={(e) => setTargetDestinationId(e.target.value)}
                  >
                    <option value="auto">✨ Auto-Match Best Destination with AI</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.region}) • {d.category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Travel Style & Vibe */}
                <div className="architect-form-group">
                  <label className="architect-label">🌿 Travel Style / Vibe:</label>
                  <div className="architect-chips-row">
                    {TRAVEL_VIBES.map((vibe) => (
                      <button
                        key={vibe.id}
                        type="button"
                        className={`vibe-chip ${selectedVibe === vibe.id ? 'active' : ''}`}
                        onClick={() => setSelectedVibe(vibe.id)}
                      >
                        {vibe.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration & Companions */}
                <div className="architect-form-row">
                  <div className="architect-form-group half">
                    <label className="architect-label">⏱️ Trip Duration:</label>
                    <select
                      className="architect-select"
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(Number(e.target.value))}
                    >
                      {DURATION_OPTIONS.map((d) => (
                        <option key={d.days} value={d.days}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="architect-form-group half">
                    <label className="architect-label">👥 Travelers:</label>
                    <select
                      className="architect-select"
                      value={selectedCompanions}
                      onChange={(e) => setSelectedCompanions(e.target.value)}
                    >
                      {COMPANION_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.icon} {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Budget Tier */}
                <div className="architect-form-group">
                  <label className="architect-label">💰 Accommodation & Budget Tier:</label>
                  <div className="budget-tier-pills">
                    {BUDGET_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        className={`tier-pill ${selectedBudgetTier === tier.id ? 'active' : ''}`}
                        onClick={() => setSelectedBudgetTier(tier.id)}
                      >
                        <strong>{tier.label.split('(')[0]}</strong>
                        <span>{tier.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  type="button"
                  className="btn-generate-ai-plan"
                  onClick={handleRunArchitect}
                  disabled={isGeneratingPlan}
                  aria-label="Generate Custom Itinerary & Destination Matches"
                >
                  {isGeneratingPlan ? '✦ Calculating Neural Travel Matrix...' : '✦ Generate Custom Itinerary & Destination Matches'}
                </button>
              </div>

              {/* Results & Generated Plan Display */}
              <div className="architect-results-panel">
                {/* 1. Destination Match Recommendations */}
                {matchedDestinations.length > 0 && (
                  <div className="architect-matches-section">
                    <h4 className="architect-section-title">
                      🎯 Top Destination Matches for Your Preferences
                    </h4>
                    <div className="matches-cards-carousel">
                      {matchedDestinations.slice(0, 3).map((match, idx) => {
                        const isCurrentTarget = match.destination.id === generatedPlan?.destination?.id;
                        return (
                          <div
                            key={match.destination.id}
                            className={`match-spot-card ${isCurrentTarget ? 'active-target' : ''}`}
                            onClick={() => {
                              setTargetDestinationId(match.destination.id);
                              const plan = generateCustomItinerary({
                                destination: match.destination,
                                durationDays: selectedDuration,
                                tripVibe: selectedVibe,
                                budgetTier: selectedBudgetTier,
                                companions: selectedCompanions,
                                destinations
                              });
                              setGeneratedPlan(plan);
                            }}
                          >
                            <div className="match-card-top">
                              <span className="match-score-pill">
                                🎯 {match.matchScore}% AI Match
                              </span>
                              <span className="match-price">
                                From {formatCurrency(match.destination.price)}/nt
                              </span>
                            </div>
                            <h5 className="match-dest-name">{match.destination.name}</h5>
                            <span className="match-region">{match.destination.region}</span>
                            <ul className="match-reasons-list">
                              {match.matchReasons.slice(0, 2).map((r, rIdx) => (
                                <li key={rIdx}>{r}</li>
                              ))}
                            </ul>
                            <div className="match-card-footer">
                              <button
                                type="button"
                                className="btn-quick-preview"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onSelectDestination) {
                                    onSelectDestination(match.destination);
                                    onClose();
                                  }
                                }}
                              >
                                View Details ➔
                              </button>
                              <span className="switch-plan-hint">
                                {isCurrentTarget ? '✓ Selected for Itinerary' : 'Click to Plan Itinerary'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Customized Itinerary Breakdown */}
                {generatedPlan && (
                  <div className="architect-plan-card">
                    <div className="plan-card-header">
                      <div>
                        <span className="plan-badge">✦ Custom Itinerary Plan</span>
                        <h3 className="plan-title">{generatedPlan.title}</h3>
                        <p className="plan-hotel-desc">
                          🏨 Stay at <strong>{generatedPlan.destination.stayDetails?.hotelName}</strong> • {generatedPlan.selectedRoom.name} ({formatCurrency(generatedPlan.selectedRoom.pricePerNight)}/night)
                        </p>
                      </div>

                      <div className="plan-budget-summary-box">
                        <span className="summary-budget-val">
                          {formatCurrency(generatedPlan.estimatedBudget.grandTotal)}
                        </span>
                        <span className="summary-budget-lbl">
                          Est. Total ({generatedPlan.durationDays} Days / {generatedPlan.nights} Nights)
                        </span>
                      </div>
                    </div>

                    {/* Applied confirmation notification */}
                    {appliedSuccess && (
                      <div className="plan-applied-banner">
                        ✓ Customized Itinerary successfully applied to your Trips portfolio!
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="plan-primary-action-bar">
                      <button
                        type="button"
                        className="btn-apply-plan-main"
                        onClick={() => handleApplyItinerary(generatedPlan.actionableItem)}
                      >
                        ✦ Apply Custom Itinerary to My Trips
                      </button>

                      <button
                        type="button"
                        className="btn-inspect-destination"
                        onClick={() => {
                          if (onSelectDestination) {
                            onSelectDestination(generatedPlan.destination);
                            onClose();
                          }
                        }}
                      >
                        📍 Inspect {generatedPlan.destination.name} Rooms & Spots
                      </button>
                    </div>

                    {/* Day-by-Day Accordion / Timeline */}
                    <div className="daily-schedule-timeline">
                      <h4 className="timeline-heading">📋 Customized Day-by-Day Schedule:</h4>
                      <div className="days-tab-nav">
                        {generatedPlan.dailyPlan.map((d) => (
                          <button
                            key={d.dayNumber}
                            type="button"
                            className={`day-selector-tab ${expandedDay === d.dayNumber ? 'active' : ''}`}
                            onClick={() => setExpandedDay(d.dayNumber)}
                          >
                            Day {d.dayNumber}
                          </button>
                        ))}
                      </div>

                      {generatedPlan.dailyPlan
                        .filter((d) => d.dayNumber === expandedDay)
                        .map((day) => (
                          <div key={day.dayNumber} className="day-expanded-card">
                            <div className="day-card-head">
                              <h5>{day.title}</h5>
                              <span className="day-theme-pill">{day.theme}</span>
                            </div>

                            <div className="day-segments-grid">
                              <div className="day-segment-block">
                                <span className="segment-label">🌅 Morning</span>
                                <p className="segment-text">{day.morning}</p>
                              </div>

                              <div className="day-segment-block">
                                <span className="segment-label">☀️ Afternoon</span>
                                <p className="segment-text">{day.afternoon}</p>
                              </div>

                              <div className="day-segment-block">
                                <span className="segment-label">🌙 Evening & Dinner</span>
                                <p className="segment-text">{day.evening}</p>
                              </div>
                            </div>

                            <div className="day-highlights-strip">
                              <span>🏛️ <strong>Highlight:</strong> {day.spotHighlight}</span>
                              <span>🍲 <strong>Dining:</strong> {day.culinaryHighlight}</span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Budget Breakdown Summary */}
                    <div className="plan-budget-breakdown-card">
                      <h5 className="breakdown-title">Estimated Cost Breakdown</h5>
                      <div className="breakdown-grid">
                        <div className="breakdown-item">
                          <span>🏨 Stay ({generatedPlan.nights} Nights)</span>
                          <strong>{formatCurrency(generatedPlan.estimatedBudget.stayCost)}</strong>
                        </div>
                        <div className="breakdown-item">
                          <span>🍲 Gourmet Dining & Meals</span>
                          <strong>{formatCurrency(generatedPlan.estimatedBudget.estimatedMeals)}</strong>
                        </div>
                        <div className="breakdown-item">
                          <span>🚗 Transit & Sightseeing</span>
                          <strong>{formatCurrency(generatedPlan.estimatedBudget.estimatedTransitActivities)}</strong>
                        </div>
                        <div className="breakdown-item total">
                          <span>💰 Estimated Grand Total</span>
                          <strong>{formatCurrency(generatedPlan.estimatedBudget.grandTotal)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
