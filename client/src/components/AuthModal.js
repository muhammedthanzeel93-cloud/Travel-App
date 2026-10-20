import React, { useState, useEffect } from 'react';

/**
 * AuthModal Component
 * Enables multi-user authentication with username and user ID.
 * Features:
 * - Secure login with username or ID and password
 * - Account creation with customizable username, ID, credentials, and travel style
 * - Seamless multi-account switcher with live preview of each user's planned destinations
 * - Demo account one-click quick logins
 */
export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  registeredUsers = [],
  onLogin,
  onRegister,
  onSwitchUser,
  initialTab = 'login' // 'login' | 'register' | 'switch'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register' | 'switch'

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Login form state
  const [loginUsernameOrId, setLoginUsernameOrId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regId, setRegId] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regTravelStyle, setRegTravelStyle] = useState('Global Travel Architect & Explorer');
  const [regLocation, setRegLocation] = useState('Bangalore, India');
  const [regBio, setRegBio] = useState('Explorer passionate about uncharted peaks and sustainable eco-resorts.');
  const [regError, setRegError] = useState('');

  if (!isOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginUsernameOrId.trim()) {
      setLoginError('Please enter your Username or User ID');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your password');
      return;
    }

    const result = onLogin({
      usernameOrId: loginUsernameOrId.trim(),
      password: loginPassword.trim()
    });

    if (result && result.error) {
      setLoginError(result.error);
    } else {
      onClose();
    }
  };

  // Quick Demo Account Login
  const handleQuickDemoLogin = (account) => {
    setLoginError('');
    onSwitchUser(account);
    onClose();
  };

  // Generate a random User ID
  const handleGenerateId = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRegId(`WNDR-2026-${randomSuffix}`);
  };

  // Handle Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    const cleanUsername = regUsername.trim().toLowerCase().replace(/^@/, '').replace(/\s+/g, '_');
    if (!cleanUsername) {
      setRegError('Username is required');
      return;
    }
    if (cleanUsername.length < 3) {
      setRegError('Username must be at least 3 characters');
      return;
    }
    if (!regName.trim()) {
      setRegError('Display name is required');
      return;
    }
    if (!regPassword.trim()) {
      setRegError('Password is required');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match');
      return;
    }

    // Check duplicate username or ID
    const duplicateUser = registeredUsers.find(
      (u) =>
        u.username?.toLowerCase() === cleanUsername ||
        u.id?.toLowerCase() === (regId.trim().toLowerCase() || `user-${cleanUsername}`)
    );
    if (duplicateUser) {
      setRegError(`Username "@${cleanUsername}" or User ID already taken. Please pick another.`);
      return;
    }

    const finalId = regId.trim() || `user-${cleanUsername}`;
    const finalPassportId = regId.trim().startsWith('WNDR-')
      ? regId.trim()
      : `WNDR-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const initials = regName.trim().split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'TR';

    const newUserData = {
      id: finalId,
      username: cleanUsername,
      passportId: finalPassportId,
      name: regName.trim(),
      password: regPassword.trim(),
      tier: 'CIRCUIT PIONEER',
      avatarInitials: initials,
      location: regLocation.trim() || 'Global Explorer',
      travelStyle: regTravelStyle,
      bio: regBio.trim(),
      followersCount: 0,
      followingCount: 0,
      following: [],
      createdAt: new Date().toISOString()
    };

    onRegister(newUserData);
    onClose();
  };

  return (
    <div className="modal-backdrop auth-modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog auth-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-header-lockup">
            <div className="auth-brand-orb">✦</div>
            <div>
              <h3 id="auth-modal-title">WanderLust Traveler Authentication</h3>
              <span className="auth-header-sub">
                Secure User ID & Passport Access • Multi-User Travel Plan Management
              </span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Authentication Modal"
          >
            ✕
          </button>
        </div>

        {/* Current Active User Status Ribbon */}
        {currentUser && (
          <div className="auth-active-ribbon">
            <div className="ribbon-user-left">
              <span className="ribbon-label">Active Session:</span>
              <div className="ribbon-avatar-badge">{currentUser.avatarInitials || 'AR'}</div>
              <strong>{currentUser.name}</strong>
              <span className="ribbon-handle">@{currentUser.username}</span>
              <span className="ribbon-id-pill">ID: {currentUser.passportId || currentUser.id}</span>
            </div>
            <span className="ribbon-tier-pill">✦ {currentUser.tier || 'VOYAGER'}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="auth-tab-bar" role="tablist">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
            role="tab"
            aria-selected={activeTab === 'login'}
          >
            🔑 Log In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            role="tab"
            aria-selected={activeTab === 'register'}
          >
            ✨ Create Account
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'switch' ? 'active' : ''}`}
            onClick={() => setActiveTab('switch')}
            role="tab"
            aria-selected={activeTab === 'switch'}
          >
            👥 Switch Account ({registeredUsers.length})
          </button>
        </div>

        <div className="auth-modal-body">
          {/* =========================================================================
              TAB 1: LOG IN
              ========================================================================= */}
          {activeTab === 'login' && (
            <div className="auth-panel-login">
              {loginError && <div className="auth-error-banner" role="alert">⚠️ {loginError}</div>}

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-username-id">Username or User ID *</label>
                  <input
                    id="login-username-id"
                    type="text"
                    className="form-input"
                    placeholder="e.g. aysha_explorer or WNDR-2026-X79"
                    value={loginUsernameOrId}
                    onChange={(e) => setLoginUsernameOrId(e.target.value)}
                    required
                  />
                  <span className="input-hint-micro">
                    Enter your unique username or alphanumeric passport ID
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password *</label>
                  <input
                    id="login-password"
                    type="password"
                    className="form-input"
                    placeholder="Enter account password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <span className="input-hint-micro">
                    Demo account default password is <code>password123</code>
                  </span>
                </div>

                <div className="auth-form-actions">
                  <button type="submit" className="btn-primary btn-auth-submit" id="btn-login-submit">
                    🔑 Log In to My Travel Nexus
                  </button>
                </div>
              </form>

              {/* Quick Demo Logins Section */}
              <div className="auth-demo-section">
                <span className="demo-section-label">Or Instant 1-Click Demo Login:</span>
                <div className="auth-demo-grid">
                  {registeredUsers.slice(0, 3).map((account) => {
                    const isCurrent = currentUser?.id === account.id;
                    return (
                      <div
                        key={account.id}
                        className={`demo-account-card ${isCurrent ? 'active-demo' : ''}`}
                        onClick={() => handleQuickDemoLogin(account)}
                        role="button"
                        tabIndex={0}
                        title={`Quick login as ${account.name}`}
                      >
                        <div className="demo-avatar-circle">{account.avatarInitials}</div>
                        <div className="demo-card-meta">
                          <strong>{account.name}</strong>
                          <span className="demo-handle">@{account.username}</span>
                          <span className="demo-id">ID: {account.passportId || account.id}</span>
                        </div>
                        <button type="button" className="btn-demo-quick-login">
                          {isCurrent ? '✓ Active' : 'Log In ➔'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: CREATE NEW ACCOUNT (REGISTER)
              ========================================================================= */}
          {activeTab === 'register' && (
            <div className="auth-panel-register">
              {regError && <div className="auth-error-banner" role="alert">⚠️ {regError}</div>}

              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="reg-username">Username Handle *</label>
                    <div className="input-prefix-wrap">
                      <span className="input-prefix">@</span>
                      <input
                        id="reg-username"
                        type="text"
                        className="form-input with-prefix"
                        placeholder="e.g. tarun_voyager"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="label-with-action">
                      <label htmlFor="reg-id">User ID / Passport ID</label>
                      <button
                        type="button"
                        className="btn-text-action"
                        onClick={handleGenerateId}
                        title="Auto-generate alphanumeric Passport ID"
                      >
                        ⚡ Auto-Generate ID
                      </button>
                    </div>
                    <input
                      id="reg-id"
                      type="text"
                      className="form-input"
                      placeholder="e.g. WNDR-2026-T82 or custom ID"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="reg-name">Full Display Name *</label>
                    <input
                      id="reg-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Tarun Varma"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-location">Base Location / City</label>
                    <input
                      id="reg-location"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Shimla / New Delhi, India"
                      value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="reg-password">Password *</label>
                    <input
                      id="reg-password"
                      type="password"
                      className="form-input"
                      placeholder="Choose account password..."
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-confirm-password">Confirm Password *</label>
                    <input
                      id="reg-confirm-password"
                      type="password"
                      className="form-input"
                      placeholder="Re-enter password..."
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-travel-style">Travel Persona & Style</label>
                  <select
                    id="reg-travel-style"
                    className="form-select"
                    value={regTravelStyle}
                    onChange={(e) => setRegTravelStyle(e.target.value)}
                  >
                    <option value="Global Travel Architect & Explorer">Global Travel Architect & Explorer</option>
                    <option value="High-Altitude Glacier & Summit Alpinist">High-Altitude Glacier & Summit Alpinist</option>
                    <option value="Royal Heritage & Haveli Connoisseur">Royal Heritage & Haveli Connoisseur</option>
                    <option value="Eco-Resort & Tea Valley Sanctuary Custodian">Eco-Resort & Tea Valley Sanctuary Custodian</option>
                    <option value="Multi-Modal Transit & Scenic Highway Cruiser">Multi-Modal Transit & Scenic Highway Cruiser</option>
                    <option value="Backpacker & Cultural Discovery Trailblazer">Backpacker & Cultural Discovery Trailblazer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-bio">Explorer Bio / Philosophy</label>
                  <textarea
                    id="reg-bio"
                    rows={2}
                    className="form-textarea"
                    placeholder="Share your travel philosophy, milestones, and horizon goals..."
                    value={regBio}
                    onChange={(e) => setRegBio(e.target.value)}
                  />
                </div>

                <div className="auth-form-actions">
                  <button type="submit" className="btn-primary btn-auth-submit" id="btn-register-submit">
                    ✨ Create Account & Start My Individual Travel Plan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =========================================================================
              TAB 3: MULTI-USER SWITCHER
              ========================================================================= */}
          {activeTab === 'switch' && (
            <div className="auth-panel-switch">
              <div className="switch-banner">
                <span className="switch-icon">👥</span>
                <div>
                  <strong>Manage Individual Travel Portfolios</strong>
                  <p>
                    Switch between explorer accounts instantly. Each user's saved itineraries,
                    pinned favorite places, and credentials remain strictly isolated.
                  </p>
                </div>
              </div>

              <div className="registered-users-list">
                {registeredUsers.map((acc) => {
                  const isCurrent = currentUser?.id === acc.id;
                  return (
                    <div
                      key={acc.id}
                      className={`account-switch-row ${isCurrent ? 'active-account' : ''}`}
                    >
                      <div className="account-row-avatar">{acc.avatarInitials || 'TR'}</div>

                      <div className="account-row-details">
                        <div className="account-name-line">
                          <strong>{acc.name}</strong>
                          <span className="account-handle">@{acc.username}</span>
                          {isCurrent && <span className="active-tag">Active User</span>}
                        </div>
                        <div className="account-meta-line">
                          <span className="meta-id-chip">ID: {acc.passportId || acc.id}</span>
                          <span className="meta-tier-chip">✦ {acc.tier || 'VOYAGER'}</span>
                          <span className="meta-location">📍 {acc.location}</span>
                        </div>
                        <p className="account-style-micro">{acc.travelStyle}</p>
                      </div>

                      <div className="account-row-actions">
                        {isCurrent ? (
                          <span className="current-badge">✓ Active Session</span>
                        ) : (
                          <button
                            type="button"
                            className="btn-switch-account-action"
                            onClick={() => {
                              onSwitchUser(acc);
                              onClose();
                            }}
                          >
                            Switch to Account ➔
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="switch-footer-action">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveTab('register')}
                >
                  + Create Another Traveler Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
