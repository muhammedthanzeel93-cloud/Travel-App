# ✈️ WanderLust — Monorepo Architecture: AI Travel Platform & Social Explorer

> **An enterprise-grade, monorepo travel operating system strictly separating frontend UI client logic from backend REST API services. Featuring an AI Quantum Travel Concierge, multi-modal transit & route planner, live budget forecasting, and an Instagram-style travel feed & profile ecosystem.**

---

## 🌟 Table of Contents
- [Project Overview & Monorepo Architecture](#-project-overview--monorepo-architecture)
- [Monorepo Directory Structure](#-monorepo-directory-structure)
- [Backend REST API Services (`server/`)](#-backend-rest-api-services-server)
- [Frontend Client Application (`client/`)](#-frontend-client-application-client)
- [Key Features](#-key-features)
  - [🤖 AI Travel Concierge & Neural Pathfinder](#-ai-travel-concierge--neural-pathfinder)
  - [📸 Instagram-Style Profiles, Feed & Stories](#-instagram-style-profiles-feed--stories)
  - [🗺️ Multi-Modal Route Planning & Transit Hub](#️-multi-modal-route-planning--transit-hub)
  - [🏨 Route Hotels & Stay Services Filter](#-route-hotels--stay-services-filter)
  - [📍 En-Route Attractions & Viewpoints](#-en-route-attractions--viewpoints)
  - [💰 Live Dynamic Budget Calculator](#-live-dynamic-budget-calculator)
  - [🌐 Community Explorer Network & Social Sharing](#-community-explorer-network--social-sharing)
  - [🎒 Saved Trips & Itinerary Architect](#-saved-trips--itinerary-architect)
- [Tech Stack](#-tech-stack)
- [Setup & Installation](#-setup--installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Running the Services (Monorepo Commands)](#running-the-services-monorepo-commands)
  - [Running Automated Tests](#running-automated-tests)
  - [Building for Production](#building-for-production)
- [Automated Test Suite](#-automated-test-suite)
- [Design Aesthetics & Responsiveness](#-design-aesthetics--responsiveness)
- [License & Acknowledgments](#-license--acknowledgments)

---

## 🧭 Project Overview & Monorepo Architecture

**WanderLust** is organized as a standard, industry-compliant **monorepo** with strict architectural separation of concerns:

```
                      ┌───────────────────────────────────────┐
                      │          WANDERLUST MONOREPO          │
                      └──────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
     ┌──────────────────────┐                        ┌──────────────────────┐
     │   client/ (Frontend) │                        │   server/ (Backend)  │
     │                      │                        │                      │
     │ • React 19 UI Views  │   HTTP REST API / JSON │ • Express REST API   │
     │ • Instagram Feed/Bio │ ◄────────────────────► │ • Neural AI Engine   │
     │ • Story Highlights   │                        │ • Route Calculations │
     │ • Route Planner UI   │                        │ • Social Feed Engine │
     │ • Budget Forecaster  │                        │ • User Profiles DB   │
     └──────────────────────┘                        └──────────────────────┘
```

* **`client/` (Frontend UI Logic)**: Houses the interactive React client, component hierarchy, design tokens, story carousels, custom modals, responsive CSS stylesheets, and client-side unit/integration tests.
* **`server/` (Backend API Services)**: Houses the Express REST API services, modular route handlers, domain controllers, in-memory data store, error middleware, and backend API integration tests.
* **Root Workspace**: Leverages native npm workspaces (`"workspaces": ["client", "server"]`) to orchestrate dependency resolution, parallel execution, and unified testing from the repository root.

---

## 📂 Monorepo Directory Structure

```text
travel-app/
├── client/                               # Frontend Client UI Application
│   ├── public/
│   │   ├── index.html                    # HTML entry point with metadata and fonts
│   │   ├── manifest.json                 # PWA configuration
│   │   └── service-worker.js             # Client offline caching
│   ├── src/
│   │   ├── components/                   # Modular React UI Components
│   │   │   ├── AIAssistantChat.js         # Global AI assistant dialog & trip planner
│   │   │   ├── BudgetCalculatorModal.js   # Interactive budget calculator & cost breakdown
│   │   │   ├── CreateLocationModal.js     # User-created custom destination modal
│   │   │   ├── DestinationAIChat.js       # Hyper-local destination concierge tab
│   │   │   ├── DestinationCard.js         # Destination preview card with ratings & stays
│   │   │   ├── DestinationModal.js        # Detailed modal: Overview, Reviews, Transit, AI
│   │   │   ├── FuturisticNavBar.js        # Glassmorphic docked navigation bar & budget telemetry
│   │   │   ├── HomeView.js                # Sleek homepage with trending & seasonal spots
│   │   │   ├── ItineraryView.js           # Active trip builder & itinerary planner
│   │   │   ├── ProfileView.js             # Instagram-like profile, stories, post creator, feed
│   │   │   ├── RoutePlannerModal.js       # Multi-modal route planner & hotel filter
│   │   │   └── ShareItineraryModal.js     # Social sharing modal (WhatsApp, LinkedIn, FB)
│   │   ├── data/
│   │   │   └── destinationsData.js       # Client fallback data store & explorer seeds
│   │   ├── services/
│   │   │   └── apiClient.js              # Dedicated API client interfacing with backend API
│   │   ├── utils/
│   │   │   ├── aiTravelEngine.js          # Heuristic AI travel generation engine
│   │   │   ├── budgetCalculator.js        # Itemized expense calculations
│   │   │   └── apiClient.js              # Re-exported API client module
│   │   ├── App.css                       # Complete unified stylesheet with responsive tokens
│   │   ├── App.js                        # Root frontend component
│   │   ├── App.test.js                   # Client test suite (25 test cases)
│   │   ├── index.css                     # Global reset and typography
│   │   ├── index.js                      # React application bootstrap
│   │   └── setupTests.js                 # Jest DOM assertions
│   └── package.json                      # Client dependencies & scripts
│
├── server/                               # Backend API Services Application
│   ├── src/
│   │   ├── controllers/                  # Route Controllers
│   │   │   ├── aiController.js           # AI itinerary generation & chat concierge
│   │   │   ├── budgetController.js       # Itemized budget calculations
│   │   │   ├── destinationsController.js # Curated & custom destinations CRUD
│   │   │   ├── postsController.js        # Social posts, likes, comments, bookmarking
│   │   │   ├── profileController.js      # User profile, story highlights, followers
│   │   │   └── routesController.js       # Multi-modal route planning & hotel filter
│   │   ├── data/
│   │   │   └── serverData.js             # Centralized server database & seed data
│   │   ├── middleware/
│   │   │   └── errorHandler.js           # Centralized error handler & 404 middleware
│   │   ├── routes/                       # Express Route Handlers
│   │   │   ├── aiRoutes.js               # POST /api/ai/itinerary, POST /api/ai/chat
│   │   │   ├── budgetRoutes.js           # POST /api/budget/calculate
│   │   │   ├── destinationsRoutes.js     # GET/POST /api/destinations, /trending
│   │   │   ├── postsRoutes.js            # GET/POST /api/posts, /:id/like, /:id/comments
│   │   │   ├── profileRoutes.js          # GET/PUT /api/profile, /followers, /following
│   │   │   └── routesRoutes.js           # POST /api/routes/plan, /hotels, /enroute-spots
│   │   ├── server.js                     # Main Express server entry point (Port 5000)
│   │   └── server.test.js                # Backend API integration tests (15 test cases)
│   └── package.json                      # Server dependencies & scripts
│
├── scripts/
│   └── start-dev.js                      # Orchestrator running client & server concurrently
├── package.json                          # Root monorepo workspace orchestrator
├── .gitignore                            # Root gitignore for client, server & build artifacts
└── README.md                             # Monorepo architecture & user documentation
```

---

## 📡 Backend REST API Services (`server/`)

The backend server operates on **port 5000** (or `process.env.PORT`) with CORS support and JSON body parsing:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Service health status, uptime, and version telemetry |
| **GET** | `/api/destinations` | List destinations with optional search, season, and tag queries |
| **GET** | `/api/destinations/trending` | Retrieve curated trending and winter destination picks |
| **GET** | `/api/destinations/:id` | Retrieve detailed metadata for a single destination |
| **POST** | `/api/destinations` | Create a new traveler-discovered custom location |
| **POST** | `/api/routes/plan` | Calculate driving, transit, or walking routes with stopovers |
| **GET** | `/api/routes/hotels` | Query en-route hotels with star rating, price, and amenity filters |
| **GET** | `/api/routes/enroute-spots` | Query en-route landmarks, food stops, and viewpoints |
| **POST** | `/api/ai/itinerary` | Generate autonomous multi-day itineraries from preferences |
| **POST** | `/api/ai/chat` | Contextual Q&A travel concierge advice (season, packing, tips) |
| **GET** | `/api/posts` | Retrieve travel feed posts with likes, comments, and locations |
| **POST** | `/api/posts` | Publish a new travel photo post with caption and location |
| **POST** | `/api/posts/:id/like` | Toggle like state and update post like counters |
| **POST** | `/api/posts/:id/comments` | Post a new comment to an existing travel post |
| **POST** | `/api/posts/:id/save` | Toggle post bookmark into saved collections |
| **GET** | `/api/profile` | Retrieve user profile, bio, verified status, and live stats |
| **PUT** | `/api/profile` | Update profile credentials, bio, and travel style |
| **GET** | `/api/profile/story-highlights`| Retrieve horizontal story highlights |
| **GET** | `/api/profile/followers` | List travelers following the user |
| **GET** | `/api/profile/following` | List community explorers followed by the user |
| **POST** | `/api/profile/follow/:id`| Toggle follow status for a community explorer |
| **POST** | `/api/budget/calculate` | Compute itemized cost breakdowns (stays, transit, food, buffer) |

---

## 💻 Frontend Client Application (`client/`)

* **Framework**: React 19.3.1 with functional components and hooks (`useState`, `useMemo`, `useCallback`, `useEffect`).
* **API Client Layer**: Dedicated client in [`client/src/services/apiClient.js`](file:///c:/Users/aysha/travel-app/client/src/services/apiClient.js) abstracts all network requests to the backend with seamless offline fallback.
* **Proxy Configuration**: `client/package.json` includes `"proxy": "http://localhost:5000"` for automatic relative API resolution during development.

---

## ✨ Key Features

### 🤖 AI Travel Concierge & Neural Pathfinder
* **Dual-Mode AI Architecture**:
  * **Global AI Assistant (`WanderBot`)**: Accessible from the persistent header and itinerary view, capable of generating bespoke multi-day itineraries, matching destinations, and offering real-time advice.
  * **Destination-Specific AI Concierge**: Embedded within each destination modal to answer hyper-local questions regarding seasonality, culture, culinary specialties, packing, and hidden gems.
* **Autonomous Itinerary Generation**:
  * Formulates tailored travel plans based on travel styles (*Alpine Expedition*, *Luxury Heritage*, *Tropical Leisure*, *Eco-Adventure*, *Cultural Immersion*), budget tiers, group dynamics, and trip pace.
  * Features a 1-click **"Apply Itinerary"** button that synchronizes AI-generated schedules directly into the user's active trip planner.

### 📸 Instagram-Style Profiles, Feed & Stories
* **Redesigned Traveler Profile Header**:
  * Circular avatar with a vivid Instagram-style gradient story ring (`#f09433` ➔ `#bc1888`), verified checkmark badge (`✓`), and `APEX VOYAGER` tier.
  * Live stats row with accurate counts for **Posts**, **Followers** (`1,240`), **Following** (`2` ➔ `3`), **Destinations Planned**, and **Itinerary Value**.
  * Formatted traveler bio with location tag (`📍 Bangalore, India`), travel philosophy, external link (`wanderlust.travel/aysha_explorer`), and social proof indicators.
  * Interactive **Followers & Following Directories** with real-time mutual follow toggles.
* **Horizontal Story Highlights Row**:
  * Situated prominently at the top of the feed with temporary updates and a `+ New Post` shortcut.
  * Curated destination highlights: *❄️ Ladakh* (Sub-Zero Chadar), *☕ Munnar* (Cloud Beds & Tea), *🏰 Rajasthan* (Royal Golden Hour), *🏖️ Maldives* (Turquoise Reefs), *🏮 Kyoto* (Lantern Trails), and *🎒 Gear* (Alpine Kit).
  * Fullscreen **Story Viewer Lightbox** with auto-timed 5-second progress bar, author avatar, high-res photo with vignette, season badge, caption, view counter, and direct destination discovery CTA.
* **Post Creation System**:
  * Modal with instant **Photo Preset Library** (Munnar, Zanskar, Amer Fort, Maldives, Kyoto, Varkala) and custom photo URL input.
  * Location tag input, caption, and hashtag textarea with real-time preview before publishing.
* **Dual View Travel Feed**:
  * **⊞ 3x3 Photo Grid View**: Classic Instagram profile grid with 1:1 aspect ratio square tiles, hover overlays displaying live like counts (`❤️`), comment counts (`💬`), and location badges.
  * **☰ Stream Feed View**: Full Instagram post cards with author headers, high-resolution media, interactive like heart toggle, inline comment input, comment preview stream, and bookmarking.
  * **Post Detail Lightbox**: Split-screen modal with full photo stage and scrollable comments thread.

### 🗺️ Multi-Modal Route Planning & Transit Hub
* **Multi-Modal Route Engine**: Supports **Driving (Car)**, **Walking (Hiking)**, and **Public Transit (Train / Bus)** with accurate distance, transit duration, and terrain-specific route analytics.
* **Multi-Day Road Trip Breakdown**: Automatically calculates day-by-day segments, driving milestones, and recommended stopovers for extended cross-country journeys.
* **Synchronized Transit Selection**: Route choices instantly reflect across destination cards, modal details, and itinerary schedules.

### 🏨 Route Hotels & Stay Services Filter
* **En-Route Accommodation Discovery**: Evaluates and suggests hand-picked boutique hotels, luxury resorts, and mountain stays directly along chosen transit corridors.
* **Multi-Factor Filtering**:
  * Star rating filter (`4.0+`, `4.5+` Stars).
  * Budget bracket filter (Economy, Moderate, Luxury).
  * Amenity filters: *Free Breakfast*, *High-Speed WiFi*, *Swimming Pool*, *Mountain/Sea View*, *EV Charging*, *Spa & Wellness*.
* **Direct Booking & Route Integration**: Add selected hotels directly to route stops with instant cost updates to the active budget.

### 📍 En-Route Attractions & Viewpoints
* **Curated En-Route Spot Catalog**:
  * **Famous Landmarks**: Historic forts, ancient temples, iconic bridges, and cultural monuments.
  * **Food Spots**: Regional culinary staples, highway dhabas, local roasteries, and authentic bakeries.
  * **Scenic Viewpoints**: High-altitude passes, sunset cliffs, valley panoramas, and waterfall lookouts.
* **Interactive Bookmarking & Filtering**: Filter spots by category, view spot distance from route, and bookmark attractions directly into day plans.

### 💰 Live Dynamic Budget Calculator
* **Itemized Expense Engine**:
  * Real-time calculation across Accommodation, Transit & Fuel, Dining & Sustenance, Activities & Tickets, and Emergency Contingency buffers.
  * Dynamic currency formatting in Indian Rupee (`₹`) with localized formatting (`en-IN`).
* **Header Telemetry**: Budget widget in the top navigation bar updates synchronously as destinations and services are added or removed.
* **Interactive Budget Modal**: Inspect cost breakdown charts, adjust traveler counts, toggle trip styles, and view savings optimizations.

### 🌐 Community Explorer Network & Social Sharing
* **Community Travel Architects**: Connect with verified high-altitude scouts, eco-curators, and cultural historians with mutual follow tracking.
* **Omnichannel Social Sharing**:
  * Share itineraries and traveler passports via **WhatsApp**, **Facebook**, **LinkedIn**, and the **Community Explorer Hub**.
  * Instant 1-click clipboard link generator.

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Monorepo Architecture** | **NPM Workspaces** | Native monorepo workspace orchestration separating `client` and `server` |
| **Frontend UI** | **React 19.3.1** | Component-driven UI with modern functional hooks (`client/src`) |
| **Backend API** | **Node.js & Express 4** | Modular REST API server with zero-dependency CORS (`server/src`) |
| **Styling & Aesthetics** | **Vanilla CSS3** | Custom design system featuring dark mode, glassmorphism, responsive grid/flexbox, keyframe animations, and gradient story rings |
| **State Management** | **React State & LocalStorage** | Real-time state synchronization with persistent browser storage for profile credentials, posts, likes, and comments |
| **Testing & Quality** | **Jest, React Testing Library, Node Test** | 25 client tests (`client/src/App.test.js`) + 15 server tests (`server/src/server.test.js`) = **40 total tests passing** |
| **Media & Imagery** | **Unsplash Curated CDN** | High-resolution photography of global travel destinations and cultural landmarks |

---

## 🚀 Setup & Installation

### Prerequisites
* **Node.js**: `v16.0.0` or higher (Recommended: `v18+` or `v20+`)
* **npm**: `v8.0.0` or higher (comes bundled with Node.js)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/muhammedthanzeel93-cloud/Travel-App.git
   cd Travel-App
   ```

2. **Install Dependencies Across Workspaces**:
   ```bash
   npm install
   ```

---

### Running the Services (Monorepo Commands)

You can run services individually or concurrently using root workspace scripts:

#### 1. Start Both Client & Server Concurrently (Recommended):
```bash
npm run dev
```
* **Frontend Client**: [http://localhost:6345](http://localhost:6345)
* **Backend API Server**: [http://localhost:5000](http://localhost:5000)

#### 2. Start Frontend Client Only:
```bash
npm run start:client
# or: npm start
```

#### 3. Start Backend API Server Only:
```bash
npm run start:server
# or: npm run server
```

---

### Running Automated Tests

WanderLust includes test suites for both frontend and backend:

#### Run All Monorepo Test Suites (Client + Server):
```bash
npm run test:all
```

#### Run Frontend Client Tests (25 Test Cases):
```bash
npm test -- --watchAll=false
# or: npm run test:client -- --watchAll=false
```

#### Run Backend Server Tests (15 Test Cases):
```bash
npm run test:server
```

---

### Building for Production

Compile an optimized production build for the client application:
```bash
npm run build
# or: npm run build:client
```
The output will be placed in `client/build/`.

---

## 🧪 Automated Test Suite

WanderLust features **40 automated tests across client and server**:

### 1. Frontend Client Tests (`client/src/App.test.js` - 25 Passed):
```text
PASS src/App.test.js
  ✓ renders WanderLust header and explore navigation
  ✓ renders destination cards with star ratings and stay details
  ✓ opens destination modal and displays reviews and rating system
  ✓ opens social media sharing modal with WhatsApp and Facebook options from header
  ✓ opens social media share modal from DestinationModal
  ✓ opens global AI assistant chat interface from header button
  ✓ opens AI concierge chat tab in DestinationModal
  ✓ displays live budget in header and opens BudgetCalculatorModal
  ✓ renders budget calculator with live cost breakdown in ItineraryView
  ✓ renders futuristic navigation bar with links to Home, Explore, Trips, and Profile
  ✓ navigates seamlessly between Home, Trips, Profile, and Explore views
  ✓ core data structure supports route planning with walking, car, and public transport options
  ✓ opens RoutePlannerModal from futuristic navigation bar and toggles transit modes
  ✓ supports route planning in DestinationModal and launches full route planner
  ✓ route plan data structure supports multi-day road trips, route hotels, and stay service filters
  ✓ filters and selects hotels and stay services along the route in RoutePlannerModal
  ✓ calculateRoutePlan core data structure returns famousSpots, foodSpots, viewpoints, and enrouteSpots with valid metadata
  ✓ RoutePlannerModal renders en-route spots section with Famous, Food, and Viewpoint tabs and allows filtering and bookmarking
  ✓ DestinationModal Travel & Transit tab displays preview of en-route famous spots, food spots, and viewpoints
  ✓ aiTravelEngine core engine generates customized multi-day itineraries and matches destinations based on user preferences
  ✓ AIAssistantChat supports dual-mode architecture, generates custom itineraries and applies them to active trips
  ✓ ItineraryView and HomeView integrate AI Itinerary Architect launchers
  ✓ renders user profile credentials, allows editing credentials and persists updates
  ✓ renders community explorer network, supports live follow/unfollow and follower directory
  ✓ supports social sharing of traveler passport with LinkedIn and Community Hub publishing

Test Suites: 1 passed, 1 total
Tests:       25 passed, 25 total
```

### 2. Backend Server Tests (`server/src/server.test.js` - 15 Passed):
```text
🧪 Starting WanderLust Backend API Integration Tests...

  ✓ GET /api/health returns status ok and service metadata
  ✓ GET /api/destinations returns curated destinations list
  ✓ GET /api/destinations/trending returns trending destinations
  ✓ POST /api/destinations creates custom user destination
  ✓ POST /api/routes/plan calculates multi-modal itinerary and stops
  ✓ GET /api/routes/hotels filters hotels by rating and amenities
  ✓ POST /api/ai/itinerary generates customized day-by-day plan
  ✓ POST /api/ai/chat returns contextual travel concierge advice
  ✓ GET /api/posts returns Instagram feed posts
  ✓ POST /api/posts publishes new travel photo post
  ✓ POST /api/posts/:id/like toggles post like status
  ✓ GET /api/profile returns user credentials and counters
  ✓ GET /api/profile/story-highlights returns horizontal story highlights
  ✓ POST /api/profile/follow/:id toggles follow of community explorer
  ✓ POST /api/budget/calculate returns itemized cost forecast

========================================
Server Tests Finished: 15 passed, 0 failed.
========================================
```

---

## 🎨 Design Aesthetics & Responsiveness

* **Aesthetic Language**: Modern cyber-luxe & glassmorphic styling utilizing deep midnight palettes (`#090e1a`, `#0f172a`), subtle radial ambient glows, crisp borders (`rgba(255, 255, 255, 0.1)`), and smooth backdrop filters (`blur(12px)`).
* **Instagram Experience**:
  * Story circles featuring multi-stop conic gradients and micro-scale interactions.
  * Square 1:1 image grids with dark hover telemetry overlays.
  * Card feeds with reactive like animations and instant comment appending.
* **Responsive Breakpoints**:
  * **Desktop (`> 1200px`)**: Full multi-column layouts, 3-wide photo grid, and split modal viewers.
  * **Laptop / Tablet (`768px - 1199px`)**: 2-wide photo grid, adaptive navigation dock, and touch-friendly controls.
  * **Mobile (`< 768px`)**: Single-column vertical stream, full-width bottom drawer sheets, and optimized 2x2 stat matrix.

---

## 📄 License & Acknowledgments

* **License**: MIT License — free for personal and commercial exploration.
* **Photography**: High-resolution imagery provided by [Unsplash](https://unsplash.com).
* **Typography**: Clean modern system font stack with high legibility across all platforms.
