import React, { useState, useEffect, useRef } from 'react';
import { generateAIResponse, getQuickPrompts } from '../utils/aiTravelEngine';

export default function DestinationAIChat({
  destination,
  selectedRoom,
  stayNights = 3,
  onAddToItinerary
}) {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatBottomRef = useRef(null);

  // Initialize or reset chat when destination changes
  useEffect(() => {
    if (!destination) return;

    const hotelName = destination.stayDetails?.hotelName || 'Luxury Resort';
    const initialText = `✦ **Hello! I'm WanderBot, your dedicated Concierge for ${destination.name}.**\n\n` +
      `I've analyzed all verified reviews (${destination.rating}★), room suites at *${hotelName}*, and local viewpoints. ` +
      `Here's what I can do for you:\n\n` +
      `• 🗓️ **Generate a tailored 1 to 5-day daily itinerary**\n` +
      `• 🎒 **Provide packing advice based on ${destination.travelFeatures?.weather || 'current weather'}**\n` +
      `• 🌅 **Share secret timing tips for ${destination.viewpoints?.[0]?.split('(')[0] || 'viewpoints'}**\n` +
      `• 🍲 **Guide you to the best regional food spots**\n\n` +
      `Pick a prompt below or type any question!`;

    setMessages([
      {
        id: `dest-welcome-${destination.id}`,
        sender: 'ai',
        text: initialText,
        timestamp: 'Just now'
      }
    ]);
  }, [destination]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!destination) return null;

  const quickPrompts = getQuickPrompts(destination);

  const handleSend = (text) => {
    const query = (text || inputQuery).trim();
    if (!query) return;

    const userMsg = {
      id: `dest-user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse({
        query,
        destinations: [destination],
        currentDestination: destination,
        itinerary: []
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `dest-ai-${Date.now()}`,
          sender: 'ai',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: response.actions
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleCopyText = (text, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  // Format bold and linebreaks
  const renderFormattedText = (raw) => {
    const lines = raw.split('\n');
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
        <span key={idx} className="dest-chat-line">
          {content}
          {idx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="destination-ai-pane">
      {/* Concierge Intro Banner */}
      <div className="dest-ai-banner">
        <div className="dest-ai-avatar">✦</div>
        <div className="dest-ai-banner-content">
          <h4>WanderBot AI Concierge • {destination.name}</h4>
          <p>
            Trained on verified ratings, room pricing, local viewpoints, and seasonal weather patterns for {destination.name}.
          </p>
        </div>
        <button
          type="button"
          className="btn-clear-dest-ai"
          onClick={() => {
            setMessages([
              {
                id: `reset-${Date.now()}`,
                sender: 'ai',
                text: `How else can I assist your planning for ${destination.name}?`,
                timestamp: 'Just now'
              }
            ]);
          }}
          title="Reset conversation"
        >
          🧹 Clear
        </button>
      </div>

      {/* Quick Prompts Row */}
      <div className="dest-ai-prompts-row">
        <span className="dest-prompts-label">Quick Inquiries:</span>
        <div className="dest-prompts-scroll">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              className="dest-prompt-btn"
              onClick={() => handleSend(p.replace(/^[^\s]+\s/, ''))}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="dest-ai-messages-box">
        {messages.map((m, mIdx) => (
          <div key={m.id} className={`dest-ai-msg ${m.sender}`}>
            {m.sender === 'ai' && <div className="msg-icon">✦</div>}
            <div className="msg-bubble">
              <div className="msg-text">{renderFormattedText(m.text)}</div>

              {m.actions && m.actions.length > 0 && (
                <div className="dest-ai-action-chips">
                  {m.actions.map((act, actIdx) => (
                    <button
                      key={actIdx}
                      type="button"
                      className="dest-action-chip"
                      onClick={() => {
                        if (act.actionType === 'apply-custom-itinerary' && onAddToItinerary && act.payload) {
                          onAddToItinerary(act.payload);
                        } else if (act.actionType === 'add' && onAddToItinerary) {
                          onAddToItinerary();
                        }
                      }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              {m.sender === 'ai' && (
                <div className="msg-footer-actions">
                  <button
                    type="button"
                    className="btn-msg-copy"
                    onClick={() => handleCopyText(m.text, mIdx)}
                  >
                    {copiedIndex === mIdx ? '✓ Copied' : '📋 Copy'}
                  </button>

                  {onAddToItinerary && (
                    <button
                      type="button"
                      className="btn-msg-add"
                      onClick={onAddToItinerary}
                    >
                      + Add {destination.name} to Plan
                    </button>
                  )}
                </div>
              )}

              <span className="msg-time">{m.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="dest-ai-msg ai">
            <div className="msg-icon">✦</div>
            <div className="msg-bubble typing-bubble">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <form
        className="dest-ai-input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask WanderBot anything about ${destination.name} (e.g. 'What to wear?', 'Best sunset spot?')...`}
          className="dest-ai-input"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="dest-ai-send"
          title="Send query"
        >
          Ask AI ➤
        </button>
      </form>
    </div>
  );
}
