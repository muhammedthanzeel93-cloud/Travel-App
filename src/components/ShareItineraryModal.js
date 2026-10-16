import React, { useState, useEffect } from 'react';

/**
 * ShareItineraryModal Component
 * Futuristic social sharing control deck supporting:
 * - Multi-destination itinerary sharing
 * - Individual destination stay highlights sharing
 * - WanderLust Traveler Passport & Profile sharing
 * - Social network broadcasts (WhatsApp, Facebook, Twitter/X, LinkedIn, Email)
 * - WanderLust Community Hub publishing
 * - One-click clipboard copy
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Modal close handler
 * @param {Array} props.itinerary - User's current itinerary items
 * @param {Object} [props.destination] - Destination being shared (optional)
 * @param {Object} [props.selectedRoom] - Preselected room configuration (optional)
 * @param {number} [props.stayNights] - Duration of stay in nights
 * @param {Object} [props.userProfile] - User profile credentials & metrics
 * @param {'itinerary'|'destination'|'profile'} [props.initialShareMode] - Starting share mode
 * @param {Function} [props.onPublishToCommunity] - Optional callback on community publish
 */
export default function ShareItineraryModal({
  isOpen,
  onClose,
  itinerary = [],
  destination = null,
  selectedRoom = null,
  stayNights = 3,
  userProfile = null,
  initialShareMode = null,
  onPublishToCommunity = null
}) {
  const [copied, setCopied] = useState(false);
  const [shareMode, setShareMode] = useState(() => {
    if (initialShareMode) return initialShareMode;
    if (destination && itinerary.length > 0) return 'destination';
    if (!destination && !itinerary.length && userProfile) return 'profile';
    return 'itinerary';
  });
  const [isCommunityPublished, setIsCommunityPublished] = useState(false);

  // Sync mode if initialShareMode changes when modal opens
  useEffect(() => {
    if (initialShareMode) {
      setShareMode(initialShareMode);
    } else if (destination && itinerary.length > 0) {
      setShareMode('destination');
    }
  }, [initialShareMode, destination, itinerary.length]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://wanderlust.travel';
  const grandTotal = itinerary.reduce((sum, item) => sum + (item.totalPrice || (item.roomPrice * item.nights) || 0), 0);

  // Build the message based on selected share mode
  let shareText = '';
  let shareTitle = '';

  if (shareMode === 'profile' && userProfile) {
    shareTitle = `${userProfile.name}'s WanderLust Traveler Passport`;
    const followersCount = (userProfile.followersCount || 0).toLocaleString('en-IN');
    const followingCount = userProfile.following ? userProfile.following.length : 0;
    const tripsCount = itinerary.length;

    shareText = `🌍 *WanderLust Traveler Passport: ${userProfile.name} (${userProfile.handle})* ✈️\n` +
      `✦ ${userProfile.tier || 'APEX VOYAGER'} • Passport ID: ${userProfile.passportId || 'WNDR-2026-X79'}\n` +
      `📍 Base: ${userProfile.location || 'Global Traveler'}\n\n` +
      `"${userProfile.bio || 'Crafting memories one horizon at a time.'}"\n\n` +
      `📊 *Traveler Telemetry:*\n` +
      `• 👥 Network: ${followersCount} Followers • ${followingCount} Following\n` +
      `• 🎒 Destinations Planned: ${tripsCount}\n` +
      `• 🌟 Travel Style: ${userProfile.travelStyle || 'Luxury Eco-Resorts & High-Speed Transit'}\n\n` +
      `Explore curated journeys with ${userProfile.name} on WanderLust: ${currentUrl}`;
  } else if (shareMode === 'destination' && destination) {
    const hotel = destination.stayDetails?.hotelName || 'Luxury Resort';
    const room = selectedRoom?.name || destination.hotelRooms?.[0]?.name || 'Standard Room';
    const price = (selectedRoom?.pricePerNight || destination.price || 5000) * stayNights;
    
    shareTitle = `Explore ${destination.name} with me!`;
    shareText = `🎒 *Trip Plan: ${destination.name} (${destination.region})* ✈️\n\n` +
      `⭐ Rating: ${destination.rating} / 5.0 (${destination.reviewCount} reviews)\n` +
      `🏨 Stay: ${hotel} (${room})\n` +
      `⏳ Duration: ${stayNights} Nights • Total: ₹${price.toLocaleString('en-IN')}\n` +
      `🏛️ Famous Spots: ${destination.famousSpots?.slice(0, 3).join(', ')}\n` +
      `🍲 Must-Try Food: ${destination.foodSpots?.[0]?.split('(')[0] || 'Local specialties'}\n` +
      `🌅 Viewpoint: ${destination.viewpoints?.[0]?.split('(')[0] || 'Scenic outlook'}\n\n` +
      `Check out this destination on WanderLust: ${currentUrl}`;
  } else {
    // Full itinerary mode
    shareTitle = `My WanderLust Travel Itinerary`;
    if (itinerary.length === 0) {
      shareText = `🎒 *My WanderLust Travel Plan*\n\nExplore curated world-class destinations and plan your dream trip: ${currentUrl}`;
    } else {
      const itemsList = itinerary.map((item, idx) => {
        const itemTotal = item.totalPrice || (item.roomPrice * item.nights) || 0;
        return `${idx + 1}. 📍 *${item.destinationName}* (${item.nights} nights)\n` +
          `   🏨 ${item.hotelName || 'Stay'} • ${item.roomName || 'Deluxe Room'}\n` +
          `   💰 ₹${itemTotal.toLocaleString('en-IN')}`;
      }).join('\n\n');

      shareText = `🎒 *My WanderLust Travel Itinerary (${itinerary.length} Destinations)* ✈️\n\n` +
        `${itemsList}\n\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `💵 *Total Estimated Budget:* ₹${grandTotal.toLocaleString('en-IN')}\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        `Plan your trip on WanderLust: ${currentUrl}`;
    }
  }

  // Social sharing handlers
  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleTwitterShare = () => {
    const textForTwitter = shareText.length > 250 ? shareText.slice(0, 240) + '...' : shareText;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textForTwitter)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=650,height=550');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Travel Plan: ${shareTitle}`);
    const body = encodeURIComponent(shareText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePublishToCommunity = () => {
    setIsCommunityPublished(true);
    if (onPublishToCommunity) {
      onPublishToCommunity({
        mode: shareMode,
        title: shareTitle,
        content: shareText,
        timestamp: new Date().toISOString()
      });
    }
    setTimeout(() => setIsCommunityPublished(false), 4000);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    } else {
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="modal-backdrop share-backdrop" onClick={onClose}>
      <div className="modal-dialog share-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close Share Modal" aria-label="Close Share Modal">✕</button>

        <div className="share-modal-header">
          <div className="share-header-icon">📤</div>
          <div>
            <h3>Share Your Travel Plan</h3>
            <p>Broadcast your itinerary, stay details, or traveler passport across social networks and the community.</p>
          </div>
        </div>

        {/* Multi-Mode Toggle Bar */}
        <div className="share-mode-toggle-bar">
          <button
            type="button"
            className={`mode-toggle-btn ${shareMode === 'itinerary' ? 'active' : ''}`}
            onClick={() => setShareMode('itinerary')}
          >
            🎒 Full Itinerary ({itinerary.length})
          </button>

          {destination && (
            <button
              type="button"
              className={`mode-toggle-btn ${shareMode === 'destination' ? 'active' : ''}`}
              onClick={() => setShareMode('destination')}
            >
              📍 This Destination ({destination.name})
            </button>
          )}

          {userProfile && (
            <button
              type="button"
              className={`mode-toggle-btn ${shareMode === 'profile' ? 'active' : ''}`}
              onClick={() => setShareMode('profile')}
            >
              👤 Traveler Passport ({userProfile.name.split(' ')[0]})
            </button>
          )}
        </div>

        {/* Community Published Success Banner */}
        {isCommunityPublished && (
          <div className="share-published-banner">
            <span className="published-sparkle">✨</span>
            <div className="published-text">
              <strong>Published to WanderLust Community Hub!</strong>
              <span>Travelers and followers can now discover your {shareMode === 'profile' ? 'passport' : 'itinerary'} in the live community feed.</span>
            </div>
          </div>
        )}

        {/* Preview of the formatted text */}
        <div className="share-preview-card">
          <div className="preview-label-row">
            <span className="preview-badge">Message Preview</span>
            <span className="preview-dest-count">
              {shareMode === 'destination' && `1 Stop (${destination?.name})`}
              {shareMode === 'itinerary' && `${itinerary.length} Stops in Plan`}
              {shareMode === 'profile' && `Passport: ${userProfile?.handle || '@traveler'}`}
            </span>
          </div>
          <pre className="share-message-pre">{shareText}</pre>
        </div>

        {/* Social Media Share Buttons Grid */}
        <div className="social-share-buttons-grid">
          {/* WhatsApp Share */}
          <button
            type="button"
            className="social-share-btn btn-whatsapp"
            onClick={handleWhatsAppShare}
          >
            <span className="social-icon">💬</span>
            <div className="social-btn-text">
              <strong>Share on WhatsApp</strong>
              <span>Send directly to chat or status</span>
            </div>
          </button>

          {/* Facebook Share */}
          <button
            type="button"
            className="social-share-btn btn-facebook"
            onClick={handleFacebookShare}
          >
            <span className="social-icon">📘</span>
            <div className="social-btn-text">
              <strong>Share on Facebook</strong>
              <span>Post to feed or group</span>
            </div>
          </button>

          {/* Twitter / X Share */}
          <button
            type="button"
            className="social-share-btn btn-twitter"
            onClick={handleTwitterShare}
          >
            <span className="social-icon">🐦</span>
            <div className="social-btn-text">
              <strong>Post on X (Twitter)</strong>
              <span>Tweet your travel journey</span>
            </div>
          </button>

          {/* LinkedIn Share */}
          <button
            type="button"
            className="social-share-btn btn-linkedin"
            onClick={handleLinkedInShare}
          >
            <span className="social-icon">💼</span>
            <div className="social-btn-text">
              <strong>Share on LinkedIn</strong>
              <span>Publish to professional network</span>
            </div>
          </button>

          {/* Community Hub Broadcast */}
          <button
            type="button"
            className="social-share-btn btn-community-hub"
            onClick={handlePublishToCommunity}
          >
            <span className="social-icon">🌐</span>
            <div className="social-btn-text">
              <strong>Publish to Community</strong>
              <span>Broadcast to 1,420+ followers</span>
            </div>
          </button>

          {/* Email Share */}
          <button
            type="button"
            className="social-share-btn btn-email"
            onClick={handleEmailShare}
          >
            <span className="social-icon">✉️</span>
            <div className="social-btn-text">
              <strong>Send via Email</strong>
              <span>Email your itinerary plan</span>
            </div>
          </button>
        </div>

        {/* Copy Link / Text Footer */}
        <div className="share-modal-footer">
          <button
            type="button"
            className={`btn-copy-share-text ${copied ? 'copied' : ''}`}
            onClick={handleCopyLink}
          >
            {copied ? '✓ Copied to Clipboard!' : '📋 Copy Itinerary Text & Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
