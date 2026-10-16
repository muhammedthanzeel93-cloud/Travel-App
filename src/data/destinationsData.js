/**
 * Destination & Hospitality Data Definitions and Default Collections
 * 
 * Defines the complete structure for travel destinations including:
 * - Star ratings, review counts, and verified traveler reviews
 * - Multi-image lists
 * - Famous spots, food spots, viewpoints
 * - Trending indicators and user-created indicators
 * - Comprehensive stay details and hotel room configurations
 * - In-depth travel features (weather, season, transit, tags, activities)
 */

export const INITIAL_DESTINATIONS = [
  {
    id: 'munnar-kerala',
    name: 'Munnar',
    region: 'Kerala, India',
    tagline: 'Kashmir of South India & Rolling Emerald Tea Plantations',
    category: 'Hill Station & Nature',
    rating: 4.8,
    reviewCount: 1940,
    price: 5200, // Starting price per night
    isTrending: true,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'KDHP Tea Museum & Factory',
      'Anamudi Peak (Highest peak in South India)',
      'Eravikulam National Park (Nilgiri Tahr habitat)',
      'Mattupetty Dam & Lake',
      'Attukal Waterfalls Cascade'
    ],
    foodSpots: [
      'Rapsy Restaurant (Legendary Malabar Parotta & Beef/Chicken Roast)',
      'Saravana Bhavan (Crispy Ghee Podi Roast & Filter Kaapi)',
      'ClayHut A Village (Authentic Claypot Malabar Fish Curry)',
      'Tea Tales Cafe (Artisanal Spiced Teas & Fresh Pastries)',
      'Munnar 1930 (Traditional Kerala Banana Leaf Sadhya)'
    ],
    viewpoints: [
      'Top Station (360° Panoramic Cloud Bed over Western Ghats)',
      'Pothamedu Viewpoint (Dramatic Sunset Valley Views)',
      'Echo Point (Natural Mountain Resonance Point by the Lake)',
      'Lockhart Gap (Serene Mist-Covered Slopes & Tea Valleys)'
    ],
    stayDetails: {
      hotelName: 'Tea County Heritage Resort & Spa',
      hotelRating: 4.7,
      stayType: 'Luxury Hillside Eco-Resort',
      checkIn: '14:00',
      checkOut: '11:00',
      locationAddress: 'Bison Valley Road, Pothamedu Hills, Munnar',
      cancellationPolicy: 'Free cancellation up to 48 hours prior to check-in',
      amenities: [
        'Heated Infinity Pool with Tea Garden View',
        'Ayurvedic Rejuvenation Spa',
        'Complimentary Plantation Buffet Breakfast',
        'Guided Morning Tea Trail & Bird Watching',
        'High-Speed Wi-Fi & Fireplace Lounge',
        'Campfire & Live Acoustic Evening Sessions'
      ]
    },
    hotelRooms: [
      {
        id: 'tc-deluxe',
        name: 'Deluxe Valley View Room',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '380 sq ft',
        pricePerNight: 5200,
        amenities: ['Private Balcony', 'Tea Garden Views', 'Rain Shower', 'Espresso Maker'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tc-suite',
        name: 'Executive Tea Planter Suite',
        bed: '1 King Bed + 1 Sofa Bed',
        capacity: '3 Adults',
        size: '560 sq ft',
        pricePerNight: 8400,
        amenities: ['Wraparound Balcony', 'Fireplace', 'Jacuzzi Tub', 'Butler Service', 'Complimentary High Tea'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tc-villa',
        name: 'Misty Peak Private Chalet',
        bed: '2 King Beds',
        capacity: '4 Adults',
        size: '850 sq ft',
        pricePerNight: 13500,
        amenities: ['Private Heated Plunge Pool', 'Personal Chef on Request', 'Panoramic Glass Walls', 'Star Gazing Deck'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'September to March (Pleasant, misty & blooming Neelakurinji)',
      weather: '14°C - 24°C • Cool, Crisp & Misty Mountain Air',
      idealStayDuration: '3 - 4 Days',
      transportation: {
        nearestAirport: 'Cochin International Airport (COK) — 108 km (approx. 3.5 hrs drive)',
        nearestRailway: 'Aluva Railway Station (AWY) — 105 km',
        roadAccess: 'Picturesque drive on NH85 with waterfall pitstops and hairpin curves'
      },
      popularActivities: [
        'Tea Plucking & Factory Tasting Workshop',
        'Sunrise Trek to Kolukkumalai (World’s highest tea plantation)',
        'Bamboo Rafting & Speed Boating at Mattupetty Lake',
        'Wild Elephant Safari in Eravikulam'
      ],
      travelTags: ['Nature & Wildlife', 'Misty Hills', 'Tea Plantations', 'Romantic Getaway', 'Trekking']
    },
    reviews: [
      {
        id: 'rev-m1',
        author: 'Ananya Deshmukh',
        rating: 5,
        date: 'Oct 12, 2026',
        travelerType: 'Couple',
        title: 'Heavenly misty mornings & exceptional resort!',
        comment: 'Our stay at Tea County Heritage Resort was pure bliss. The staff arranged a private tea plantation walk at dawn that was the highlight of our trip. The Malabar Parotta at Rapsy was incredible, and Top Station views took our breath away.',
        helpfulCount: 38,
        verifiedStay: true
      },
      {
        id: 'rev-m2',
        author: 'Rohan Mehra',
        rating: 5,
        date: 'Sep 28, 2026',
        travelerType: 'Family',
        title: 'Top Station views are genuinely breathtaking',
        comment: 'Traveling with kids was so smooth. The kids loved the tea factory museum tour, and we had an exhilarating boat ride on Mattupetty Dam. Weather was misty and pleasant.',
        helpfulCount: 21,
        verifiedStay: true
      },
      {
        id: 'rev-m3',
        author: 'Elena Rostova',
        rating: 4,
        date: 'Aug 19, 2026',
        travelerType: 'Solo Explorer',
        title: 'Great hiking and peaceful atmosphere',
        comment: 'The Eravikulam National Park hike was fantastic. Spotted the endangered Nilgiri Tahr! A bit crowded near Echo point, but Lockhart Gap was super peaceful.',
        helpfulCount: 14,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'hyderabad-india',
    name: 'Hyderabad',
    region: 'Telangana, India',
    tagline: 'City of Pearls, Royal Nizami Palaces & World-Famous Dum Biryani',
    category: 'Heritage & Royal',
    rating: 4.7,
    reviewCount: 2450,
    price: 7500,
    isTrending: true,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'Charminar & Laad Bazaar (Lacquer Bangles & Pearls)',
      'Golkonda Fort & Whispering Acoustic Gallery',
      'Taj Falaknuma Palace (Mirror of the Sky)',
      'Qutb Shahi Tombs Heritage Park',
      'Hussain Sagar Lake & Monolithic Buddha Statue',
      'Salar Jung Museum (Global Antique Treasures)'
    ],
    foodSpots: [
      'Paradise Food Court (Authentic Hyderabadi Mutton Dum Biryani)',
      'Hotel Shadab (Rich Haleem, Bheja Fry & Irani Chai)',
      'Chutneys (Steam Dosa, Guntur Idlis & 6 signature chutneys)',
      'Nimrah Cafe & Bakery (Hot Osmania Biscuits with Cutting Chai)',
      'Shah Ghouse Special (Midnight Biryani & Nihari)'
    ],
    viewpoints: [
      'Golkonda Fort Bala Hissar (Stunning 360° city skyline overlook)',
      'Tank Bund Lake Promenade at Twilight',
      'Moula Ali Dargah Hill Top (Panoramic Sunset Vista)',
      'Durgam Cheruvu Cable-Stayed Bridge Observation Deck'
    ],
    stayDetails: {
      hotelName: 'Taj Falaknuma Palace',
      hotelRating: 5.0,
      stayType: 'Royal Heritage Palace Hotel',
      checkIn: '14:00',
      checkOut: '12:00',
      locationAddress: 'Engine Bowli, Fatima Nagar, Falaknuma, Hyderabad',
      cancellationPolicy: 'Free cancellation up to 72 hours prior to arrival',
      amenities: [
        'Horse-drawn Regal Carriage Arrival Experience',
        'Jiva Imperial Wellness Spa with Traditional Therapies',
        '101-Seater Grand Nizam Dining Table Dining Tours',
        'Outdoor Marble Swimming Pool & Croquet Lawns',
        'Curated Palace Historian Guided Walking Tour'
      ]
    },
    hotelRooms: [
      {
        id: 'tf-palace-room',
        name: 'Palace Heritage Room',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '420 sq ft',
        pricePerNight: 24500,
        amenities: ['Period Furniture', 'City Skyline View', 'Marble Bath', 'Forest Essentials Bath Amenities'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tf-historical-suite',
        name: 'Historical Royal Suite',
        bed: '1 Four-Poster King Bed',
        capacity: '2 Adults',
        size: '720 sq ft',
        pricePerNight: 48000,
        amenities: ['Original Belgian Chandelier', 'Separate Drawing Room', 'Personal Butler', 'High Tea in Jade Room'],
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'tf-nizam-suite',
        name: 'The Grand Nizam Presidential Suite',
        bed: '1 Royal Master Bed',
        capacity: '3 Adults',
        size: '1200 sq ft',
        pricePerNight: 98000,
        amenities: ['Private Heated Swimming Pool', 'Custom Dining Room', 'Rolls Royce Chauffeur Transfer', 'Private Jacuzzi'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'October to March (Pleasant dry winter evenings)',
      weather: '18°C - 30°C • Mild & Sunny',
      idealStayDuration: '2 - 3 Days',
      transportation: {
        nearestAirport: 'Rajiv Gandhi International Airport (HYD) — 20 km (approx. 25 min via PVNR expressway)',
        nearestRailway: 'Secunderabad / Hyderabad Deccan Station — 8 km',
        roadAccess: 'Excellent connectivity via Outer Ring Road (ORR) and national expressways'
      },
      popularActivities: [
        'Evening Golkonda Fort Sound & Light Spectacle',
        'Old City Midnight Heritage & Street Food Crawl',
        'Shopping for Authentic Basra Pearls & Zari Sarees',
        'Speedboat Cruise to Buddha Statue at Hussain Sagar'
      ],
      travelTags: ['Heritage & Palaces', 'Culinary Capital', 'Pearls & Culture', 'Historical Forts']
    },
    reviews: [
      {
        id: 'rev-h1',
        author: 'Dr. Sameer Siddiqui',
        rating: 5,
        date: 'Oct 10, 2026',
        travelerType: 'Family',
        title: 'Living like a Nizam at Falaknuma!',
        comment: 'The horse-drawn carriage arrival at Taj Falaknuma Palace set the stage for an unforgettable stay. Midnight Biryani at Hotel Shadab is non-negotiable for foodies.',
        helpfulCount: 45,
        verifiedStay: true
      },
      {
        id: 'rev-h2',
        author: 'Kavita Pillai',
        rating: 5,
        date: 'Sep 15, 2026',
        travelerType: 'Couple',
        title: 'Incredible heritage and unbeatable biryani',
        comment: 'Golkonda Fort acoustic whisper gallery amazed us. The sound and light show is world-class. Loved the pearl shopping near Charminar.',
        helpfulCount: 19,
        verifiedStay: true
      },
      {
        id: 'rev-h3',
        author: 'Marcus Vance',
        rating: 4,
        date: 'Jul 24, 2026',
        travelerType: 'Solo Explorer',
        title: 'Rich history and spicy culinary scene',
        comment: 'Chutneys with Guntur idlis was a flavor bomb. Tank Bund breeze at dusk with the Buddha statue illuminated was truly memorable.',
        helpfulCount: 11,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'maldives-atoll',
    name: 'Maldives',
    region: 'South Ari Atoll',
    tagline: 'Crystal Turquoise Lagoons, Overwater Luxury & Coral Reef Paradises',
    category: 'Tropical Island & Beach',
    rating: 4.9,
    reviewCount: 3120,
    price: 15000,
    isTrending: true,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'South Ari Marine Protected Whale Shark Sanctuary',
      'Banana Reef (Pioneering dive site with dramatic overhangs)',
      'Maafushi Sandbank (Pristine isolated white sandbar)',
      'Manta Point Cleaning Station',
      'Male Atoll Grand Friday Mosque & Local Fish Market'
    ],
    foodSpots: [
      'Ithaa Undersea Restaurant (5 meters beneath sea surface dining)',
      'Vihamanaa (Multi-cuisine oceanfront buffet with live grill)',
      'Thila Seafood Grill (Fresh lobster & reef fish right on the reef edge)',
      'Kandu Bar (Overwater sunset cocktails with live island music)',
      'Al Qasr (Authentic Arabian mezze & tagines by the lagoon)'
    ],
    viewpoints: [
      'Overwater Sunset Pier Boardwalk (Unobstructed Indian Ocean horizon)',
      'Seaplane Aerial Atoll Flyover (Iconic ring-shaped coral reefs)',
      'Bioluminescent Sand Beach (Glowing blue night tides)',
      'Sandbank Isolated 360° Turquoise Horizon'
    ],
    stayDetails: {
      hotelName: 'Kurumba Maldives & Private Atoll Retreat',
      hotelRating: 4.9,
      stayType: 'Luxury Private Island Resort',
      checkIn: '15:00',
      checkOut: '12:00',
      locationAddress: 'Vihamanaafushi, North Malé Atoll, Maldives',
      cancellationPolicy: 'Free cancellation up to 14 days before arrival date',
      amenities: [
        'House Coral Reef Snorkeling just steps from the beach',
        'Veli Spa with Island Herbal Coconut Treatments',
        '8 Gourmet Specialty Restaurants & 3 Overwater Bars',
        'Complimentary 10-Minute Speedboat Airport Transfers',
        'PADI 5-Star Dive Centre & Marine Biology Lab'
      ]
    },
    hotelRooms: [
      {
        id: 'km-beach-bungalow',
        name: 'Deluxe Beachfront Bungalow',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '540 sq ft',
        pricePerNight: 15000,
        amenities: ['Direct Beach Access', 'Open-Air Garden Bathroom', 'Private Veranda', 'Snorkeling Gear'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'km-ocean-villa',
        name: 'Overwater Sunrise Villa',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '780 sq ft',
        pricePerNight: 28500,
        amenities: ['Glass Floor Ocean Viewing Panel', 'Private Sundeck with Ocean Stairs', 'Jacuzzi', 'Breakfast by Canoe'],
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'km-pool-villa',
        name: 'Royal Overwater Sunset Pool Residence',
        bed: '2 King Beds',
        capacity: '4 Adults',
        size: '1450 sq ft',
        pricePerNight: 55000,
        amenities: ['Infinity Edge Horizon Plunge Pool', 'Personal Butler & Sommelier', 'Catamaran Yacht Charter Included'],
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'November to April (Dry northeast monsoon with calm turquoise seas)',
      weather: '27°C - 31°C • Warm Tropical Sunshine & Sea Breeze',
      idealStayDuration: '4 - 6 Days',
      transportation: {
        nearestAirport: 'Velana International Airport (MLE) — 5 km (10-minute luxury speedboat transfer)',
        nearestRailway: 'N/A (Island Nation)',
        roadAccess: 'Inter-island speedboat and scenic twin-otter seaplanes'
      },
      popularActivities: [
        'Swimming with Gentle Giant Whale Sharks',
        'Sunset Dolphin Watching Cruise with Champagne',
        'Guided Night Snorkeling with Bioluminescent Plankton',
        'Private Deserted Sandbank Champagne Picnic'
      ],
      travelTags: ['Overwater Villas', 'Coral Reefs', 'Honeymoon Heaven', 'Scuba Diving', 'Luxury Beach']
    },
    reviews: [
      {
        id: 'rev-mal1',
        author: 'Sophia Chen',
        rating: 5,
        date: 'Oct 14, 2026',
        travelerType: 'Couple',
        title: 'Overwater sunrise villa was a dream come true',
        comment: 'Stepping straight from our bedroom deck into turquoise water with baby reef sharks swimming by was surreal. Dining at Ithaa Undersea was a once-in-a-lifetime experience!',
        helpfulCount: 62,
        verifiedStay: true
      },
      {
        id: 'rev-mal2',
        author: 'Liam & Emma Wright',
        rating: 5,
        date: 'Sep 02, 2026',
        travelerType: 'Couple',
        title: 'Unmatched luxury and snorkeling',
        comment: 'The house reef is so vibrant. Kurumba Maldives took exceptional care of every detail. The private sandbank sunset champagne dinner is worth every penny.',
        helpfulCount: 39,
        verifiedStay: true
      },
      {
        id: 'rev-mal3',
        author: 'Nikhil Varma',
        rating: 5,
        date: 'Aug 11, 2026',
        travelerType: 'Adventure',
        title: 'Swam with gentle giant whale sharks!',
        comment: 'South Ari marine reserve is unmatched. Crystal clear 30m visibility. Service and catamaran tours were top-tier.',
        helpfulCount: 27,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'jaipur-rajasthan',
    name: 'Jaipur',
    region: 'Rajasthan, India',
    tagline: 'The Pink City of Maharajas, Majestic Hill Forts & Regal Splendor',
    category: 'Heritage & Royal',
    rating: 4.8,
    reviewCount: 2810,
    price: 8500,
    isTrending: false,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010e4210d65?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'Hawa Mahal (Iconic 953-window Palace of Winds)',
      'Amer Fort & Mirror Palace (Sheesh Mahal)',
      'City Palace Jaipur & Chandra Mahal Museum',
      'Jantar Mantar (UNESCO Astronomical Marvel)',
      'Nahargarh Fort overlooking the Pink City'
    ],
    foodSpots: [
      'LMB - Laxmi Mishtan Bhandar (Famous Paneer Ghewar & Pyaz Kachori)',
      '1135 AD inside Amer Fort (Royal Rajputana Dining & Silver Cutlery)',
      'Tapri Central (Rooftop Masala Chai with views of Central Park)',
      'Handi Restaurant (Famous Junglee Maas & Handi Meat)',
      'Rawat Mishthan Bhandar (Crispy Mawa Kachori)'
    ],
    viewpoints: [
      'Nahargarh Fort Padao Sunset Point (Spectacular illuminated city grid)',
      'Wind View Cafe Terrace (Direct eye-level view of Hawa Mahal)',
      'Jaigarh Fort Watchtower (Panoramic Aravalli Mountain ridge)',
      'Charan Mandir Scenic Overlook'
    ],
    stayDetails: {
      hotelName: 'Rambagh Palace (The Jewel of Jaipur)',
      hotelRating: 5.0,
      stayType: 'Palace Heritage Resort & Gardens',
      checkIn: '14:00',
      checkOut: '12:00',
      locationAddress: 'Bhawani Singh Road, Rambagh, Jaipur',
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
      amenities: [
        '47 Acres of Ornamental Mughal & Peacocks Gardens',
        'Jiva Grande Heritage Spa with Rose Petal Tubs',
        'Indoor Heated Marble Pool & Steam Pavilion',
        'Vintage Car Airport Transfers with Chauffeur',
        'Royal Polo Bar & Afternoon Tea on Verandah'
      ]
    },
    hotelRooms: [
      {
        id: 'rp-palace-room',
        name: 'Palace Garden Room',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '500 sq ft',
        pricePerNight: 28000,
        amenities: ['Garden View', 'Artisanal Marble Work', 'Complimentary Palace Tour', 'Handcrafted Silk Robes'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'rp-royal-suite',
        name: 'Historical Maharani Suite',
        bed: '1 Grand Canopy Bed',
        capacity: '2 Adults',
        size: '950 sq ft',
        pricePerNight: 58000,
        amenities: ['Private Dining Loggia', 'Deep Soaking Marble Tub', 'Dedicated Butler', 'Evening Folk Performance Access'],
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'October to March (Warm golden sun & cool festive nights)',
      weather: '15°C - 27°C • Sunny & Dry',
      idealStayDuration: '3 - 4 Days',
      transportation: {
        nearestAirport: 'Jaipur International Airport (JAI) — 11 km',
        nearestRailway: 'Jaipur Junction Railway Station — 4 km',
        roadAccess: 'Seamless 4-hour drive from New Delhi via Delhi-Mumbai Expressway'
      },
      popularActivities: [
        'Sunrise Hot Air Balloon Flight over Aravalli Forts',
        'Block Printing & Blue Pottery Workshop in Sanganer',
        'Shopping for Gemstones in Johari Bazaar',
        'Evening Light & Sound Show at Amer Fort'
      ],
      travelTags: ['Royal Palaces', 'UNESCO Heritage', 'Arts & Crafts', 'Desert Royalty', 'Fine Dining']
    },
    reviews: [
      {
        id: 'rev-j1',
        author: 'Pooja Kashyap',
        rating: 5,
        date: 'Oct 05, 2026',
        travelerType: 'Couple',
        title: 'Royal grandeur and mouthwatering Ghewar',
        comment: 'Rambagh Palace gardens with peacocks roaming around was ethereal. 1135 AD inside Amer Fort felt like dining with Rajput royalty.',
        helpfulCount: 34,
        verifiedStay: true
      },
      {
        id: 'rev-j2',
        author: 'David Miller',
        rating: 5,
        date: 'Sep 18, 2026',
        travelerType: 'Family',
        title: 'Hot air balloon ride over Aravalli hills!',
        comment: 'Floating over Amer Fort at sunrise was the peak of our India tour. Nahargarh sunset view overlooking the Pink City is stunning.',
        helpfulCount: 23,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    region: 'Kansai, Japan',
    tagline: 'Ancient Imperial Temples, Serene Bamboo Groves & Zen Gardens',
    category: 'Cultural & Historic',
    rating: 4.9,
    reviewCount: 4210,
    price: 18000,
    isTrending: true,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'Fushimi Inari-Taisha (10,000 Vermilion Torii Gates Path)',
      'Arashiyama Bamboo Forest & Sagano Romantic Train',
      'Kinkaku-ji (The Golden Pavilion reflected in Kyoko-chi Lake)',
      'Kiyomizu-dera Wooden Stage & Otowa Waterfall',
      'Gion District (Historic Geisha & Chaya streets)'
    ],
    foodSpots: [
      'Nishiki Market (400-year-old food market with octopus skewers & mochi)',
      'Gion Karyo (Refined 9-course seasonal Kaiseki dining)',
      'Menbaka Fire Ramen (Dramatic blazing fire ramen experience)',
      'Tsujiri Gion Main Store (Artisanal Uji Matcha Parfaits)',
      'Chao Chao Gyoza (Award-winning pan-fried crispy gyozas)'
    ],
    viewpoints: [
      'Kiyomizu-dera Veranda (Iconic panorama over Kyoto city & cherry blossoms)',
      'Mount Inari Yotsutsuji Overlook (Stunning twilight view of southern Kyoto)',
      'Arashiyama Iwatayama Monkey Park Lookout',
      'Shogunzuka Seiryuden Glass Teahouse Overlook'
    ],
    stayDetails: {
      hotelName: 'Hoshinoya Kyoto Traditional Riverside Ryokan',
      hotelRating: 4.9,
      stayType: 'Luxury Waterside Traditional Ryokan',
      checkIn: '15:00',
      checkOut: '12:00',
      locationAddress: 'Arashiyama, Ukyo-ku, Kyoto',
      cancellationPolicy: 'Free cancellation up to 7 days before check-in',
      amenities: [
        'Private Wooden Riverboat Arrival along Oi River',
        'Seasonal Multi-Course Michelin-Caliber Kaiseki Meals',
        'Authentic Tatami Mat Suites with Hinoki Cypress Bathtubs',
        'Morning Zen Meditation Session at Ancient Temple',
        'Private Ceremonial Matcha Preparation Service'
      ]
    },
    hotelRooms: [
      {
        id: 'hk-river-pavilion',
        name: 'Mizunami River Pavilion Room',
        bed: '2 Traditional Japanese Futons / Twin Beds',
        capacity: '2 Adults',
        size: '520 sq ft',
        pricePerNight: 28000,
        amenities: ['Cedar Wood Bath', 'Oi River Views', 'Yukata Robes', 'Handcrafted Green Tea Set'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'hk-tsukihashi',
        name: 'Tsukihashi Grand Riverside Suite',
        bed: '1 King Bed + Living Area',
        capacity: '3 Adults',
        size: '880 sq ft',
        pricePerNight: 49500,
        amenities: ['Panoramic River & Maple Tree Views', 'Cypress Deep Soak Tub', 'Private Tea Pavilion'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'March - May (Sakura Cherry Blossoms) & October - November (Vibrant Autumn Foliage)',
      weather: '12°C - 22°C • Crisp, Fresh & Serene',
      idealStayDuration: '4 - 5 Days',
      transportation: {
        nearestAirport: 'Kansai International Airport (KIX) — 75 min by JR Haruka Express',
        nearestRailway: 'Kyoto Shinkansen Station — Direct bullet train to Tokyo in 2h 15m',
        roadAccess: 'Seamless subway & historic tram system with IC cards'
      },
      popularActivities: [
        'Kimono Dressing & Authentic Tea Ceremony in Gion',
        'Early Morning Crowd-Free Torii Walk at Fushimi Inari',
        'Sagano Scenic Railway & Hozugawa River Boat Rapids',
        'Zazen Zen Meditation with Buddhist Monks'
      ],
      travelTags: ['Ancient Temples', 'Zen Gardens', 'Kaiseki Gastronomy', 'Cherry Blossoms', 'UNESCO Heritage']
    },
    reviews: [
      {
        id: 'rev-k1',
        author: 'Kenji & Sarah',
        rating: 5,
        date: 'Oct 11, 2026',
        travelerType: 'Couple',
        title: 'Serene temple Zen and riverboat arrival',
        comment: 'Arriving by private wooden boat to Hoshinoya Kyoto along the misty Oi River set an enchanting mood. The early morning Fushimi Inari walk was meditative.',
        helpfulCount: 57,
        verifiedStay: true
      },
      {
        id: 'rev-k2',
        author: 'Maya Lin',
        rating: 5,
        date: 'Sep 29, 2026',
        travelerType: 'Solo Explorer',
        title: 'Kaiseki gastronomy and bamboo grove magic',
        comment: 'Nishiki Market had the freshest street food, and the Hinoki cypress tub in our room smelled amazing. Truly an imperial cultural treasure.',
        helpfulCount: 31,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    region: 'Cyclades, Greece',
    tagline: 'Cobblestone Caldera Cliffs, Cobalt Blue Domes & World-Famous Sunsets',
    category: 'Coastal & Islands',
    rating: 4.9,
    reviewCount: 3650,
    price: 16500,
    isTrending: true,
    isUserCreated: false,
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'Oia Caldera Walk & Famous 3 Blue Domes',
      'Akrotiri Prehistoric Bronze Age Ruins',
      'Red Beach & White Beach Volcanic Shores',
      'Fira to Oia Scenic Cliffside Walking Trail',
      'Ammoudi Bay Fishing Harbor'
    ],
    foodSpots: [
      'Metaxí Mas (Authentic Cretan & Cycladic baked lamb & fava beans)',
      'Dimitris Ammoudi Taverna (Freshly grilled octopus caught daily at the dock)',
      'Sunset by Paraskevas (Famous lobster pasta right by the water)',
      'Karma Greek Restaurant Oia (Tranquil courtyard with homemade moussaka)',
      'Santo Wines Restaurant (Assyrtiko wine flights with sunset pairings)'
    ],
    viewpoints: [
      'Oia Byzantine Castle Ruins (The quintessential Greek sunset viewpoint)',
      'Skaros Rock Imerovigli (Dramatic volcanic promontory into the Aegean)',
      'Santo Wines Cliff Terrace (High vantage overlooking the entire Caldera)',
      'Profitis Ilias Monastery Peak (Highest geographic point in Santorini)'
    ],
    stayDetails: {
      hotelName: 'Canaves Oia Caldera Suites & Cave Spa',
      hotelRating: 4.9,
      stayType: 'Luxury Cliffside Cave Resort',
      checkIn: '15:00',
      checkOut: '11:00',
      locationAddress: 'Main Street Oia, Santorini, Cyclades, Greece',
      cancellationPolicy: 'Free cancellation up to 10 days before check-in',
      amenities: [
        'Private Caldera-Facing Cave Infinity Plunge Pools',
        'Volcanic Wine Cellar with Private Sommelier Tastings',
        'Daily Champagne Breakfast served on Private Veranda',
        'Private Luxury Catamaran Sunset Charters',
        'Subterranean Cave Wellness Spa'
      ]
    },
    hotelRooms: [
      {
        id: 'co-classic-cave',
        name: 'Classic Whitewashed Cave Suite',
        bed: '1 Queen Bed',
        capacity: '2 Adults',
        size: '420 sq ft',
        pricePerNight: 26000,
        amenities: ['Caldera Views', 'Rain Cave Shower', 'Champagne Breakfast', 'Nespresso Bar'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'co-infinity-suite',
        name: 'Honeymoon Infinity Pool Suite',
        bed: '1 King Bed',
        capacity: '2 Adults',
        size: '650 sq ft',
        pricePerNight: 48000,
        amenities: ['Private Infinity Plunge Pool', 'Panoramic Sunset Veranda', 'Indoor Jacuzzi', 'VIP Concierge'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'May to October (Sunny skies, warm Aegean waters and lively evenings)',
      weather: '22°C - 30°C • Sunny with Refreshing Meltemi Sea Breeze',
      idealStayDuration: '3 - 5 Days',
      transportation: {
        nearestAirport: 'Santorini Thira Airport (JTR) — 16 km (20 min transfer)',
        nearestRailway: 'N/A (Island)',
        roadAccess: 'High-speed ferries from Athens (Piraeus) or inter-island transfers'
      },
      popularActivities: [
        'Luxury Catamaran Sunset Cruise with Snorkeling at Hot Springs',
        'Volcanic Winery Tours with Assyrtiko Wine Tastings',
        'Cliffside Hike from Fira to Oia along the Crater Rim',
        'Seafood Dinner and Swimming at Ammoudi Bay'
      ],
      travelTags: ['Caldera Sunsets', 'Blue Domes', 'Greek Islands', 'Romantic Honeymoon', 'Wine Tasting']
    },
    reviews: [
      {
        id: 'rev-s1',
        author: 'Chloe Dupont',
        rating: 5,
        date: 'Oct 09, 2026',
        travelerType: 'Couple',
        title: 'Caldera sunset from our cave plunge pool!',
        comment: 'Canaves Oia exceeded all expectations. Breakfast on the private veranda watching the Aegean sea was paradise. Dimitris Ammoudi fresh octopus is the best in the world.',
        helpfulCount: 48,
        verifiedStay: true
      },
      {
        id: 'rev-s2',
        author: 'George Papandreou',
        rating: 5,
        date: 'Aug 30, 2026',
        travelerType: 'Friends Trip',
        title: 'Volcanic catamaran sailing and Assyrtiko wine',
        comment: 'Santo Wines cliffside terrace sunset is legendary. The caldera hike between Fira and Oia offers postcard views at every single bend.',
        helpfulCount: 26,
        verifiedStay: true
      }
    ]
  },
  {
    id: 'zanskar-valley-ladakh',
    name: 'Zanskar Valley',
    region: 'Ladakh, India',
    tagline: 'Untamed Himalayan Wonder of Ancient Cliff Monasteries & Glacial Rivers',
    category: 'High Altitude & Adventure',
    rating: 4.8,
    reviewCount: 480,
    price: 4500,
    isTrending: false,
    isUserCreated: true,
    images: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    famousSpots: [
      'Phugtal Monastery (Gravity-defying cliffside gompa built around a holy cave)',
      'Drang-Drung Glacier (Magnificent winding river of ice)',
      'Karsha Monastery (Largest Gelugpa monastery in Zanskar)',
      'Stongdey Monastery & Nunnery',
      'Padum Ancient Royal Capital'
    ],
    foodSpots: [
      'Norling Cafe Padum (Steaming Tibetan Thukpa, Tingmo bread & yak butter tea)',
      'Padum Garden Dhaba (Fresh vegetable momos & handmade noodles)',
      'Zanskar Heritage Homestay Kitchen (Apricot jam & fresh flatbread)',
      'Mountain Pass Tea Stall (Hot ginger lemon honey tea with altitude views)'
    ],
    viewpoints: [
      'Pensi La Pass Summit (Unrivaled view of Drang-Drung glacier & twin lakes)',
      'Padum Fortress Hill (Sweeping valley floor & river confluence)',
      'Karsha Monastery Cliff Overhang (Panoramic valley sunset)',
      'Darcha-Padum High Pass Lookout'
    ],
    stayDetails: {
      hotelName: 'Zanskar Eco-Himalayan Dome & Heritage Lodge',
      hotelRating: 4.7,
      stayType: 'Eco-Luxury High Altitude Camp & Lodge',
      checkIn: '13:00',
      checkOut: '10:00',
      locationAddress: 'Padum Valley Center, Zanskar, Ladakh',
      cancellationPolicy: 'Free cancellation up to 5 days before check-in',
      amenities: [
        'Heated Traditional Himalayan Bukhari Wood Stove',
        'Stargazing Telescope for Crystal Bortle-1 Dark Skies',
        'Solar-Powered Hot Water & Oxygen Cylinders on Standby',
        'Locally Sourced Organic Farm-to-Table Ladakhi Meals',
        'Local Native Zanskari Guide for Monastery Hikes'
      ]
    },
    hotelRooms: [
      {
        id: 'zh-glacier-dome',
        name: 'Stargazer Glamping Geodesic Dome',
        bed: '1 King Bed with Thermal Blankets',
        capacity: '2 Adults',
        size: '360 sq ft',
        pricePerNight: 5500,
        amenities: ['Transparent Panoramic Stargazing Ceiling', 'Heated Bedding', 'Private Ensuite Bath', 'Morning Butter Tea'],
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'zh-heritage-suite',
        name: 'Traditional Carved Wood Suite',
        bed: '2 Queen Beds',
        capacity: '4 Adults',
        size: '520 sq ft',
        pricePerNight: 7800,
        amenities: ['Hand-Carved Cedar Furniture', 'Bukhari Fireplace', 'Monastery Views', 'Himalayan Herbal Teas'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    travelFeatures: {
      bestTimeToVisit: 'June to September (Pleasant weather and clear mountain passes)',
      weather: '8°C - 20°C • Crisp, Pristine Mountain Air & Clear Skies',
      idealStayDuration: '4 - 6 Days',
      transportation: {
        nearestAirport: 'Kushok Bakula Rimpochee Airport (IXL), Leh — 220 km scenic drive via Shinku La / Kargil',
        nearestRailway: 'Jammu Tawi — 480 km',
        roadAccess: 'High clearance 4x4 SUV recommended through dramatic trans-Himalayan gorges'
      },
      popularActivities: [
        'Monastery Trekking to Cave-Dwelling Phugtal Gompa',
        'World-Class Stargazing with Milky Way Views',
        'Rafting on the Wild Zanskar River Rapids',
        'Attending Morning Puja Chanting with Tibetan Monks'
      ],
      travelTags: ['Trans-Himalaya', 'Remote Adventure', 'Ancient Monasteries', 'Stargazing', 'Glaciers']
    },
    reviews: [
      {
        id: 'rev-z1',
        author: 'Tenzin Norbu',
        rating: 5,
        date: 'Sep 21, 2026',
        travelerType: 'Adventure',
        title: 'Raw, untamed Himalayan majesty & Bortle 1 skies!',
        comment: 'Phugtal Gompa cliff monastery is a spiritual marvel. Stargazing through the dome ceiling with the Milky Way burning bright overhead was life-changing. Traditional Bukhari kept us cozy.',
        helpfulCount: 42,
        verifiedStay: true
      },
      {
        id: 'rev-z2',
        author: 'Arjun Singhania',
        rating: 5,
        date: 'Aug 14, 2026',
        travelerType: 'Solo Explorer',
        title: 'Drang-Drung glacier view at Pensi La is humbling',
        comment: 'Padum local food at Norling Cafe (piping hot thukpa and butter tea) was comforting after long mountain passes. Outstanding high altitude gem!',
        helpfulCount: 18,
        verifiedStay: true
      }
    ]
  }
];

export const INITIAL_ITINERARY = [
  {
    destinationId: 'munnar-kerala',
    destinationName: 'Munnar',
    hotelName: 'Tea County Heritage Resort & Spa',
    roomName: 'Deluxe Valley View Room',
    pricePerNight: 5200,
    nights: 3,
    totalPrice: 15600,
    checkInDate: '2026-11-10',
    checkOutDate: '2026-11-13',
    guests: '2 Adults',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
  }
];

/**
 * ============================================================================
 * ROUTE PLANNING & TRANSIT DATA STRUCTURE SPECIFICATION
 * ============================================================================
 * 
 * Supports route engineering between any start (origin) and destination with:
 * - Walking & Trekking trails (distance, duration, calories, elevation, steps)
 * - Car & Road Driving (distance, duration, fuel/toll estimate, EV chargers, steps)
 * - Public Transport (bus, train, schedules, ticket pricing, transfers, steps)
 * 
 * @typedef {'walking' | 'car' | 'public_transport'} TransitMode
 * 
 * @typedef {Object} RouteStep
 * @property {number} stepNumber - Sequential 1-based maneuver step
 * @property {string} instruction - Navigation instruction
 * @property {string} distance - Leg distance (e.g. "45 km" or "800 m")
 * @property {string} duration - Estimated segment time (e.g. "45 mins")
 * @property {string} mode - Sub-mode ('walk' | 'car' | 'bus' | 'train')
 * @property {string} icon - Visual icon indicator ("🚶", "🚗", "🚌", "🚆")
 * @property {string} [landmark] - Significant landmark or waypoint along this leg
 * 
 * @typedef {Object} TransitOption
 * @property {TransitMode} mode - Transit mode key ('walking' | 'car' | 'public_transport')
 * @property {string} label - Human-readable mode title
 * @property {string} icon - Visual icon ("🚶", "🚗", "🚌")
 * @property {number} durationMinutes - Total duration in minutes
 * @property {string} durationFormatted - Display duration string (e.g. "3 hrs 45 mins")
 * @property {number} distanceKm - Route distance in kilometers
 * @property {number} estimatedCost - Estimated traveler cost in local currency (INR ₹)
 * @property {string} costBreakdown - Itemized cost summary
 * @property {string} routeName - Main highway / scenic route descriptor
 * @property {string} difficulty - Route difficulty / effort level ('Easy' | 'Moderate' | 'Strenuous')
 * @property {number} scenicRating - Scenic vista rating (out of 10)
 * @property {number} carbonKg - Estimated carbon footprint in kg CO2
 * @property {boolean} isEcoFriendly - Whether this is an eco-friendly option
 * @property {string[]} highlights - Key stops or sights along this transit option
 * @property {RouteStep[]} steps - Turn-by-turn navigation maneuvers
 * @property {string} [scheduleOrFrequency] - Public transit departure frequency
 * @property {number} [transfers] - Number of public transit transfers
 * @property {number} [caloriesBurned] - Estimated walking calories burned
 * @property {number} [elevationGainM] - Elevation gain in meters
 * 
 * @typedef {Object} RouteWaypoint
 * @property {string} name - Waypoint / stop name
 * @property {string} type - 'scenic' | 'food' | 'rest' | 'charging' | 'transit_hub'
 * @property {string} distanceMark - Kilometer distance from start
 * @property {string} description - Brief guide to this waypoint
 * 
 * @typedef {Object} EnrouteSpot
 * @property {string} id - Unique identifier for the spot
 * @property {string} name - Spot name
 * @property {'famous'|'food'|'viewpoint'} category - Spot category
 * @property {string} categoryLabel - Human-readable label
 * @property {string} icon - Category icon (🏛️, 🍛, 🌅)
 * @property {number} distanceMarkKm - Distance from origin in km
 * @property {string} distanceMarkFormatted - Formatted distance string (e.g., '84 km from start')
 * @property {string} locationName - Specific town or corridor location
 * @property {string} description - Detailed description of the spot
 * @property {string} [specialty] - Signature dish, historic feature, or vista angle
 * @property {string} [bestTimeToVisit] - Recommended time of day to stop
 * @property {string} [estimatedTime] - Recommended stop duration
 * @property {number} [rating] - Traveler rating (1 - 5)
 * @property {string} [image] - Photo preview URL
 * @property {string[]} [tags] - Feature badges / keywords
 * 
 * @typedef {Object} RoutePlan
 * @property {string} id - Unique route ID
 * @property {string} startLocation - Starting location name (origin)
 * @property {string} destinationId - Target destination ID
 * @property {string} destinationName - Target destination display name
 * @property {number} primaryDistanceKm - Driving distance in kilometers
 * @property {string} recommendedMode - Optimal mode ('car' | 'public_transport' | 'walking')
 * @property {string} bestTimeToDepart - Recommended departure window
 * @property {string} elevationProfile - Elevation summary
 * @property {RouteWaypoint[]} waypoints - Intermediate scenic and refreshment waypoints
 * @property {Object.<TransitMode, TransitOption>} transitOptions - Mode-specific transit routes
 * @property {EnrouteSpot[]} enrouteSpots - Complete ordered list of spots along the route
 * @property {EnrouteSpot[]} famousSpots - Enroute famous landmarks and heritage spots
 * @property {EnrouteSpot[]} foodSpots - Enroute dining, cafes, and highway eateries
 * @property {EnrouteSpot[]} viewpoints - Enroute scenic overlooks and viewpoints
 * ============================================================================
 */

export const TRANSIT_MODES = {
  WALKING: 'walking',
  CAR: 'car',
  PUBLIC_TRANSPORT: 'public_transport'
};

export const TRANSIT_MODE_CONFIG = {
  [TRANSIT_MODES.WALKING]: {
    id: 'walking',
    label: 'Walking & Trekking',
    icon: '🚶',
    tagline: 'Scenic walking trail, zero carbon emissions & health benefits',
    color: '#10b981',
    ecoBadge: 'Zero Emissions 🌱',
    avgSpeedKmH: 4.5,
    caloriesPerKm: 65,
    carbonPerKm: 0,
    costPerKm: 0
  },
  [TRANSIT_MODES.CAR]: {
    id: 'car',
    label: 'Car / Driving',
    icon: '🚗',
    tagline: 'Private car, taxi or rental with door-to-door flexibility',
    color: '#0284c7',
    ecoBadge: 'Fastest Door-to-Door ⚡',
    avgSpeedKmH: 55,
    caloriesPerKm: 0,
    carbonPerKm: 0.13,
    costPerKm: 8.5
  },
  [TRANSIT_MODES.PUBLIC_TRANSPORT]: {
    id: 'public_transport',
    label: 'Public Transport',
    icon: '🚌',
    tagline: 'State Express Buses, Vande Bharat Trains & regional shuttles',
    color: '#8b5cf6',
    ecoBadge: 'Eco & Budget Friendly 🌿',
    avgSpeedKmH: 45,
    caloriesPerKm: 12,
    carbonPerKm: 0.038,
    costPerKm: 2.2
  }
};

/**
 * Filterable Spot Categories Along the Planned Route
 */
export const ENROUTE_SPOT_CATEGORIES = {
  ALL: { id: 'all', label: 'All Enroute Spots', icon: '🌟' },
  FAMOUS: { id: 'famous', label: 'Famous Spots', icon: '🏛️' },
  FOOD: { id: 'food', label: 'Food & Dining', icon: '🍛' },
  VIEWPOINT: { id: 'viewpoint', label: 'Scenic Viewpoints', icon: '🌅' }
};

/**
 * Route Stay Categories for Multi-Day Corridor Lodging
 */
export const ROUTE_STAY_CATEGORIES = {
  ALL: { id: 'all', label: 'All Stay Types', icon: '🏨' },
  LUXURY: { id: 'luxury', label: 'Resorts & Luxury Stays', icon: '👑' },
  BOUTIQUE: { id: 'boutique', label: 'Boutique & Heritage Homestays', icon: '🏡' },
  HIGHWAY: { id: 'highway', label: 'Highway & Transit Hotels', icon: '🛣️' },
  ECO_NATURE: { id: 'eco', label: 'Eco Lodges & Glamping', icon: '🏕️' },
  BUDGET: { id: 'budget', label: 'Budget Express Inns', icon: '🏷️' }
};

/**
 * Filterable Stay Services & Amenities along the Route
 */
export const STAY_SERVICES = {
  EV_CHARGING: { id: 'ev_charging', label: 'EV Fast Charging', icon: '⚡' },
  FREE_BREAKFAST: { id: 'free_breakfast', label: 'Free Breakfast', icon: '☕' },
  SWIMMING_POOL: { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
  SPA_WELLNESS: { id: 'spa', label: 'Ayurveda & Spa', icon: '💆' },
  CHECKIN_24H: { id: 'checkin_24h', label: '24/7 Front Desk', icon: '🕒' },
  SECURE_PARKING: { id: 'parking', label: 'Secure Highway Parking', icon: '🅿️' },
  SCENIC_VIEW: { id: 'view', label: 'Valley & Mountain View', icon: '🏞️' },
  PET_FRIENDLY: { id: 'pet_friendly', label: 'Pet Friendly', icon: '🐾' },
  HIGH_SPEED_WIFI: { id: 'wifi', label: 'High-Speed Wi-Fi', icon: '📶' },
  RESTAURANT: { id: 'restaurant', label: 'Multi-Cuisine Dining', icon: '🍽️' },
  FREE_CANCELLATION: { id: 'cancellation', label: 'Free Cancellation', icon: '🛡️' }
};

/**
 * Price Range Tiers for Route Lodging
 */
export const PRICE_TIERS = {
  ALL: { id: 'all', label: 'All Rates' },
  BUDGET: { id: 'budget', label: 'Under ₹3,500', max: 3500 },
  MID: { id: 'mid', label: '₹3,500 - ₹7,000', min: 3500, max: 7000 },
  LUXURY: { id: 'luxury', label: '₹7,000+', min: 7000 }
};

/**
 * Curated Pre-Configured Route Plans for Popular Travel Corridors
 */
export const SAMPLE_ROUTE_PLANS = {
  'calicut-munnar': {
    id: 'route-calicut-munnar',
    startLocation: 'Calicut (Kozhikode)',
    destinationId: 'munnar-kerala',
    destinationName: 'Munnar',
    primaryDistanceKm: 215,
    recommendedMode: 'car',
    bestTimeToDepart: '05:30 AM - 07:00 AM (optimal misty ghat views)',
    elevationProfile: 'Ascending from sea level (1 m) to Western Ghats crest (1,532 m)',
    waypoints: [
      { name: 'Kottakkal Heritage Town', type: 'rest', distanceMark: '42 km', description: 'Famous Ayurveda hub with traditional tea stops.' },
      { name: 'Perinthalmanna Food Junction', type: 'food', distanceMark: '72 km', description: 'Top breakfast spot for Malabar ghee roast & filter coffee.' },
      { name: 'Kothamangalam Gateway', type: 'transit_hub', distanceMark: '148 km', description: 'Foot of the high ranges; last major town before Ghat ascent.' },
      { name: 'Cheeyappara Waterfalls Overlook', type: 'scenic', distanceMark: '178 km', description: 'Spectacular 7-tier roadside waterfall cascade.' },
      { name: 'Valara River Gorge', type: 'scenic', distanceMark: '188 km', description: 'Dense virgin rainforest canopy viewpoint.' },
      { name: 'Lockhart Gap Overlook', type: 'scenic', distanceMark: '208 km', description: 'Misty tea valley panoramic vista.' }
    ],
    transitOptions: {
      walking: {
        mode: 'walking',
        label: 'Walking & Trekking',
        icon: '🚶',
        durationMinutes: 440, // Local Tea Trail circuit: ~7 hrs / expedition
        durationFormatted: '7 hrs 20 mins (Scenic Tea Country Circuit) / Multi-Day Trail',
        distanceKm: 28,
        estimatedCost: 0,
        costBreakdown: 'Free / Public nature paths & tea plantation trails',
        routeName: 'Western Ghats Foothills & Anamudi Tea Trekking Corridor',
        difficulty: 'Moderate to Challenging',
        scenicRating: 9.8,
        carbonKg: 0,
        isEcoFriendly: true,
        caloriesBurned: 1820,
        elevationGainM: 840,
        highlights: [
          'Dense emerald tea plantation footpaths',
          'Cool misty morning canopy with Nilgiri birds',
          'Fresh mountain stream crossings',
          'Top Station panoramic cloud ridge'
        ],
        steps: [
          { stepNumber: 1, instruction: 'Depart from Munnar Town bridge along Old Munnar Road', distance: '3.2 km', duration: '45 mins', mode: 'walk', icon: '🚶', landmark: 'Headworks Dam' },
          { stepNumber: 2, instruction: 'Enter KDHP tea estate bridle path ascending towards Pothamedu', distance: '6.5 km', duration: '1 hr 40 mins', mode: 'walk', icon: '🚶', landmark: 'Pothamedu Tea Factory' },
          { stepNumber: 3, instruction: 'Follow scenic ridge trail overlooking Attukal Waterfalls canyon', distance: '8.1 km', duration: '2 hrs 10 mins', mode: 'walk', icon: '🚶', landmark: 'Attukal Gorge' },
          { stepNumber: 4, instruction: 'Traverse Lockhart pine forest canopy to Tea County Resort', distance: '10.2 km', duration: '2 hrs 45 mins', mode: 'walk', icon: '🚶', landmark: 'Lockhart Gap' }
        ]
      },
      car: {
        mode: 'car',
        label: 'Car / Driving',
        icon: '🚗',
        durationMinutes: 320,
        durationFormatted: '5 hrs 20 mins',
        distanceKm: 215,
        estimatedCost: 2150,
        costBreakdown: 'Estimated Fuel: ~₹1,900 + Highway Tolls: ~₹250',
        routeName: 'NH 66 & NH 85 Kochi-Dhanushkodi Gap Road Highway',
        difficulty: 'Easy on plains, scenic mountain hairpins on ascent',
        scenicRating: 9.5,
        carbonKg: 28.5,
        isEcoFriendly: false,
        highlights: [
          'Smooth 4-lane highway cruising until Kothamangalam',
          'Newly paved scenic Gap Road with cloud viewpoints',
          'Roadside waterfalls at Cheeyappara and Valara',
          'Multiple EV fast chargers along NH 85'
        ],
        steps: [
          { stepNumber: 1, instruction: 'Head south on NH 66 from Calicut towards Edappal / Angamaly', distance: '98 km', duration: '2 hrs 10 mins', mode: 'car', icon: '🚗', landmark: 'Edappal Junction' },
          { stepNumber: 2, instruction: 'Turn east onto MC Road (SH 1) towards Perumbavoor & Kothamangalam', distance: '45 km', duration: '55 mins', mode: 'car', icon: '🚗', landmark: 'Perumbavoor Roundabout' },
          { stepNumber: 3, instruction: 'Join NH 85 (Gap Road) and begin gentle mountain ghat ascent', distance: '48 km', duration: '1 hr 15 mins', mode: 'car', icon: '🚗', landmark: 'Cheeyappara Falls' },
          { stepNumber: 4, instruction: 'Climb through tea plantation curves into Munnar central valley', distance: '24 km', duration: '1 hr 00 mins', mode: 'car', icon: '🚗', landmark: 'Tea County Resort' }
        ]
      },
      public_transport: {
        mode: 'public_transport',
        label: 'Public Transport (Bus / Train)',
        icon: '🚌',
        durationMinutes: 400,
        durationFormatted: '6 hrs 40 mins',
        distanceKm: 228,
        estimatedCost: 420,
        costBreakdown: 'KSRTC Super Fast / Low-Floor AC: ₹420 / passenger',
        routeName: 'KSRTC Interstate Express & High-Range Mountain Shuttle',
        difficulty: 'Relaxed & comfortable (reclining seats available)',
        scenicRating: 9.2,
        carbonKg: 8.7,
        isEcoFriendly: true,
        transfers: 1,
        scheduleOrFrequency: 'Direct buses every 45 mins from Calicut KSRTC Terminal',
        highlights: [
          'Affordable panoramic mountain views without driving stress',
          'Large tinted picture windows ideal for valley photography',
          'Scenic food break at Kothamangalam depot',
          'Drops off right in heart of Munnar hill station'
        ],
        steps: [
          { stepNumber: 1, instruction: 'Board KSRTC Super Fast or Minnal Express from Calicut KSRTC Bus Stand', distance: '150 km', duration: '3 hrs 45 mins', mode: 'bus', icon: '🚌', landmark: 'KSRTC Calicut Stand' },
          { stepNumber: 2, instruction: 'Transit switch at Kothamangalam / Aluva Bus Depot', distance: '2 km', duration: '25 mins', mode: 'bus', icon: '🔄', landmark: 'Kothamangalam Depot' },
          { stepNumber: 3, instruction: 'Board High-Range Munnar Express climbing NH 85 tea corridor', distance: '74 km', duration: '2 hrs 20 mins', mode: 'bus', icon: '🚌', landmark: 'Adimali Station' },
          { stepNumber: 4, instruction: 'Arrive at Munnar Central Bus Stand, 800m walk to central hotels', distance: '2 km', duration: '10 mins', mode: 'walk', icon: '🚶', landmark: 'Munnar Town Stand' }
        ]
      }
    },
    multiDayPlan: {
      isMultiDay: true,
      recommendedDays: 2,
      dayLegs: [
        {
          dayNumber: 1,
          title: 'Day 1: Calicut to Foothills & Spice Gateway',
          distanceKm: 120,
          targetHalt: 'Perinthalmanna / Kothamangalam Gateway',
          recommendedStayId: 'hotel-perinthalmanna-transit',
          description: 'Smooth highway cruising with afternoon Ayurvedic wellness or food halts. Settle into your en-route hotel and recharge.'
        },
        {
          dayNumber: 2,
          title: 'Day 2: Western Ghats Mountain Ascent & Arrival',
          distanceKm: 95,
          targetHalt: 'Munnar High Altitude Valley',
          recommendedStayId: 'hotel-munnar-tea-county',
          description: 'Ascend through 7-tier Cheeyappara waterfalls, panoramic tea estates, and arrive at Munnar luxury resort base.'
        }
      ]
    },
    routeHotels: [
      {
        id: 'hotel-calicut-kottakkal',
        name: 'Arya Vaidya Heritage Wellness Resort & Spa',
        category: 'boutique',
        locationName: 'Kottakkal Heritage Town (42 km mark)',
        distanceMarkKm: 42,
        distanceMarkFormatted: '42 km from Origin',
        detour: '0.4 km detour off NH 66',
        dayNumber: 1,
        stopType: 'midway_stop',
        stopBadge: 'Day 1 Ayurvedic Halt',
        rating: 4.8,
        reviewCount: 320,
        pricePerNight: 4200,
        priceTier: 'mid',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tagline: 'Traditional Kerala architecture, authentic herbal spa, and tranquil spice garden cottages.',
        services: ['spa', 'free_breakfast', 'parking', 'wifi', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-kottakkal-1', name: 'Nalukettu Garden Suite', price: 4200, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Courtyard View', 'Herbal Tea Bar', 'Free Breakfast'] },
          { id: 'rm-kottakkal-2', name: 'Royal Heritage Villa', price: 6500, capacity: '3 Adults', bed: '1 King + 1 Single', amenities: ['Private Veranda', 'Herbal Steam Bath', 'Balcony'] }
        ]
      },
      {
        id: 'hotel-perinthalmanna-transit',
        name: 'The Grand Malabar Highway Transit Suites',
        category: 'highway',
        locationName: 'Perinthalmanna Bypass Junction (72 km mark)',
        distanceMarkKm: 72,
        distanceMarkFormatted: '72 km from Origin',
        detour: 'Direct highway frontage (0 km)',
        dayNumber: 1,
        stopType: 'overnight_hub',
        stopBadge: 'Day 1 Prime Overnight Hub',
        rating: 4.6,
        reviewCount: 450,
        pricePerNight: 2800,
        priceTier: 'budget',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tagline: 'Convenient road-trip pitstop featuring 50kW EV DC fast chargers and 24/7 restaurant.',
        services: ['ev_charging', 'checkin_24h', 'free_breakfast', 'parking', 'wifi', 'restaurant'],
        rooms: [
          { id: 'rm-perin-1', name: 'Highway Executive Room', price: 2800, capacity: '2 Adults', bed: '1 Queen Bed', amenities: ['Soundproof Windows', 'EV Charging Access', 'Fast Wi-Fi'] },
          { id: 'rm-perin-2', name: 'Family Roadtrip Suite', price: 3900, capacity: '4 Adults', bed: '2 Queen Beds', amenities: ['Express Check-in', 'Buffet Breakfast', 'Valet Parking'] }
        ]
      },
      {
        id: 'hotel-kothamangalam-resort',
        name: 'Whispering Palms Foothills Eco Resort',
        category: 'eco',
        locationName: 'Kothamangalam High-Range Base (148 km mark)',
        distanceMarkKm: 148,
        distanceMarkFormatted: '148 km from Origin',
        detour: '1.2 km off NH 85',
        dayNumber: 1,
        stopType: 'scenic_halt',
        stopBadge: 'Gateway Mountain Base',
        rating: 4.9,
        reviewCount: 280,
        pricePerNight: 5800,
        priceTier: 'mid',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tagline: 'Nestled between cardamom plantations and river streams at the foot of the High Ranges.',
        services: ['pool', 'spa', 'view', 'free_breakfast', 'ev_charging', 'parking', 'restaurant'],
        rooms: [
          { id: 'rm-kotha-1', name: 'Riverfront Plantation Cottage', price: 5800, capacity: '2 Adults', bed: '1 King Bed', amenities: ['River View Deck', 'Infinity Pool', 'Complimentary Breakfast'] },
          { id: 'rm-kotha-2', name: 'Luxury Glamping Treehouse', price: 8200, capacity: '2 Adults', bed: '1 King Canopy Bed', amenities: ['Canopy Panoramic View', 'Private Jacuzzi', 'Bonfire Dinner'] }
        ]
      },
      {
        id: 'hotel-adimali-valley',
        name: 'Misty Waterfall View Lodge & Cabins',
        category: 'budget',
        locationName: 'Cheeyappara - Valara Overlook (180 km mark)',
        distanceMarkKm: 180,
        distanceMarkFormatted: '180 km from Origin',
        detour: '0.2 km from waterfalls',
        dayNumber: 2,
        stopType: 'scenic_halt',
        stopBadge: 'Day 2 Waterfalls Pitstop',
        rating: 4.5,
        reviewCount: 195,
        pricePerNight: 2400,
        priceTier: 'budget',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tagline: 'Unmatched sunrise views over Cheeyappara waterfalls with cool mountain breezes.',
        services: ['view', 'free_breakfast', 'parking', 'wifi', 'restaurant', 'pet_friendly'],
        rooms: [
          { id: 'rm-adim-1', name: 'Cascade Panorama Room', price: 2400, capacity: '2 Adults', bed: '1 Queen Bed', amenities: ['Waterfall View Window', 'Tea/Coffee Maker', 'Hot Water 24/7'] },
          { id: 'rm-adim-2', name: 'Mountain Balcony Cottage', price: 3200, capacity: '3 Adults', bed: '1 King + 1 Futon', amenities: ['Private Mountain Balcony', 'Local Spices Gift', 'Breakfast'] }
        ]
      },
      {
        id: 'hotel-munnar-tea-county',
        name: 'Tea County Heritage Hilltop Resort & Spa',
        category: 'luxury',
        locationName: 'Munnar High Ranges Core (215 km mark)',
        distanceMarkKm: 215,
        distanceMarkFormatted: '215 km (Destination Core)',
        detour: 'Destination Center',
        dayNumber: 2,
        stopType: 'destination_gateway',
        stopBadge: 'Day 2 Grand Destination Finale',
        rating: 4.9,
        reviewCount: 890,
        pricePerNight: 7500,
        priceTier: 'luxury',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        tagline: '5-star hill station sanctuary surrounded by rolling tea gardens and cloud-kissed peaks.',
        services: ['spa', 'pool', 'view', 'ev_charging', 'free_breakfast', 'parking', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-munnar-1', name: 'Valley View Deluxe Room', price: 7500, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Private Valley Balcony', 'Heated Bathroom', 'Buffet Breakfast'] },
          { id: 'rm-munnar-2', name: 'Presidential Tea Garden Suite', price: 12500, capacity: '2 Adults + 2 Kids', bed: '1 Emperor Bed + Sofa Bed', amenities: ['Fireplace', 'Panoramic Glass Wall', 'Butler Service', 'Spa Pass'] }
        ]
      }
    ],
    famousSpots: [
      {
        id: 'spot-cm-kottakkal-ayurveda',
        name: 'Arya Vaidya Sala Heritage Herbarium & Campus',
        category: 'famous',
        categoryLabel: 'Famous Heritage & Wellness Landmark',
        icon: '🏛️',
        distanceMarkKm: 42,
        distanceMarkFormatted: '42 km from Calicut',
        locationName: 'Kottakkal Heritage Center, Malappuram',
        description: 'World-renowned Ayurvedic medical institution founded in 1902 with historic herbal museum and medicinal botanical gardens.',
        specialty: 'Historic 120-year-old botanical herbarium & museum',
        bestTimeToVisit: 'Morning 9:00 AM - 12:00 PM',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Ayurveda', 'Heritage', 'Museum', 'Botanical Gardens']
      },
      {
        id: 'spot-cm-kodikuthimala',
        name: 'Kodikuthimala Hilltop Watchtower & Pine Forest',
        category: 'famous',
        categoryLabel: 'Famous Hilltop Landmark',
        icon: '🏰',
        distanceMarkKm: 74,
        distanceMarkFormatted: '74 km from Calicut',
        locationName: 'Perinthalmanna High Ridge',
        description: 'Known as the "Ooty of Malappuram", featuring a British-era hilltop watchtower, cool mountain breezes, and pine woods.',
        specialty: 'Colonial watchtower with sweeping valley views',
        bestTimeToVisit: 'Morning 8:00 AM - 10:30 AM',
        estimatedTime: '1 hour',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Watchtower', 'Pine Forest', 'Trekking', 'Historic']
      },
      {
        id: 'spot-cm-bhoothathankettu',
        name: 'Bhoothathankettu Mythological Granite Dam & Forest Reserve',
        category: 'famous',
        categoryLabel: 'Famous Nature & Engineering Landmark',
        icon: '🌊',
        distanceMarkKm: 146,
        distanceMarkFormatted: '146 km from Calicut',
        locationName: 'Kothamangalam Periyar Gateway',
        description: 'Scenic natural dam built of unshaped stones with mythological folklore, Periyar river reservoir cruises, and dense teak forests.',
        specialty: 'Granite stone dam barrier & Periyar river boating',
        bestTimeToVisit: 'Afternoon 2:00 PM - 4:00 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Boating', 'River', 'Forest', 'Mythology']
      },
      {
        id: 'spot-cm-cheeyappara-falls',
        name: 'Cheeyappara Cascading Waterfalls',
        category: 'famous',
        categoryLabel: 'Famous Roadside Natural Wonder',
        icon: '🌊',
        distanceMarkKm: 178,
        distanceMarkFormatted: '178 km from Calicut',
        locationName: 'NH 85 Kochi-Munnar Gap Road',
        description: 'Majestic 7-tiered waterfall cascade plunging down rocky mountain terraces right next to the highway ghat.',
        specialty: '7-tiered roadside waterfall cascade',
        bestTimeToVisit: 'Morning 8:30 AM - 11:30 AM (rainbow mist)',
        estimatedTime: '30 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Photography', 'Western Ghats', 'Free Access']
      }
    ],
    foodSpots: [
      {
        id: 'food-cm-paragon-express',
        name: 'Paragon Express & Calicut Ghee Roast Corner',
        category: 'food',
        categoryLabel: 'Highway Dining & Malabar Cafe',
        icon: '🍛',
        distanceMarkKm: 12,
        distanceMarkFormatted: '12 km from Calicut',
        locationName: 'Ramanattukara Highway Junction, NH 66',
        description: 'Legendary Malabar culinary stop famous for flaky coin parottas, slow-cooked chicken roast, and authentic dum biryani.',
        specialty: 'Malabar Parotta, Ghee Roast & Sulaimani Tea',
        bestTimeToVisit: 'Breakfast (7:30 - 10:30 AM) or Lunch (12:30 - 3:00 PM)',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Malabar Cuisine', 'Biryani', 'Sulaimani', 'AC Dining']
      },
      {
        id: 'food-cm-malabar-spicegate',
        name: 'Malabar Spiceland & Heritage Coffee Haven',
        category: 'food',
        categoryLabel: 'Heritage Roadside Coffee & Bakery',
        icon: '☕',
        distanceMarkKm: 72,
        distanceMarkFormatted: '72 km from Calicut',
        locationName: 'Perinthalmanna Bypass Plaza',
        description: 'Freshly roasted Wayanad Arabica filter coffee, hot banana fritters (pazham pori) with beef roast, and traditional snacks.',
        specialty: 'Fresh Malabar Filter Coffee & Pazham Pori',
        bestTimeToVisit: 'Coffee Break 10:00 AM - 11:30 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Coffee', 'Snacks', 'Kerala Bakery', 'Restrooms']
      },
      {
        id: 'food-cm-muvattupuzha-karimeen',
        name: 'Muvattupuzha Karimeen & Malabar Sadhya Mess',
        category: 'food',
        categoryLabel: 'Authentic Kerala Dining',
        icon: '🐟',
        distanceMarkKm: 138,
        distanceMarkFormatted: '138 km from Calicut',
        locationName: 'Muvattupuzha River Road',
        description: 'Authentic claypot pearl spot fish curry (karimeen pollichathu), tapioca with spicy fish gravy, and traditional banana leaf sadhya.',
        specialty: 'Karimeen Pollichathu & Traditional Sadhya',
        bestTimeToVisit: 'Lunch 12:30 PM - 2:30 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Seafood', 'Banana Leaf', 'Traditional', 'Local Spices']
      },
      {
        id: 'food-cm-adimali-farmhouse',
        name: 'Adimali Farmhouse Spiced Tea & Organic Honey Stop',
        category: 'food',
        categoryLabel: 'Highland Farm Cafe',
        icon: '🫖',
        distanceMarkKm: 192,
        distanceMarkFormatted: '192 km from Calicut',
        locationName: 'Adimali Mountain Ascent',
        description: 'Freshly brewed mountain cardamom tea, freshly sliced hot banana chips fried in pure coconut oil, and wild forest honey tasting.',
        specialty: 'Cardamom Tea, Hot Banana Chips & Wild Honey',
        bestTimeToVisit: 'Afternoon 3:30 PM - 5:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Cardamom Tea', 'Spices', 'Organic Honey', 'Fresh Chips']
      }
    ],
    viewpoints: [
      {
        id: 'vp-cm-kottakkal-ridge',
        name: 'Kottakkal Hilltop Horizon Overlook',
        category: 'viewpoint',
        categoryLabel: 'Scenic Valley Viewpoint',
        icon: '🌅',
        distanceMarkKm: 45,
        distanceMarkFormatted: '45 km from Calicut',
        locationName: 'Kottakkal Scenic Bypass',
        description: 'Elevated roadside vantage looking out over undulating Malabar coconut palm valleys and distant Western Ghat foothills.',
        specialty: 'Emerald coconut forest panorama',
        bestTimeToVisit: 'Morning 7:30 AM - 9:00 AM',
        estimatedTime: '15 mins',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Valley', 'Coconut Groves', 'Morning Mist']
      },
      {
        id: 'vp-cm-neriamangalam-bridge',
        name: 'Neriamangalam River Bridge & Rainforest Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'River Gorge Viewpoint',
        icon: '🌉',
        distanceMarkKm: 152,
        distanceMarkFormatted: '152 km from Calicut',
        locationName: 'Neriamangalam Arch Bridge, Periyar River',
        description: 'Known as "The Gateway to High Ranges", the heritage arch bridge provides dramatic vistas of the swollen Periyar river and virgin forest.',
        specialty: 'Periyar river gorge & rainforest canopy',
        bestTimeToVisit: 'Midday 1:30 PM - 3:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['River Gorge', 'Arch Bridge', 'Rainforest', 'Gateway']
      },
      {
        id: 'vp-cm-valara-gorge',
        name: 'Valara River Gorge & Canopy Lookout',
        category: 'viewpoint',
        categoryLabel: 'Dramatic Canyon Viewpoint',
        icon: '🌄',
        distanceMarkKm: 188,
        distanceMarkFormatted: '188 km from Calicut',
        locationName: 'NH 85 Valara Overlook',
        description: 'A breathtaking gorge look-down point where deep valleys meet roaring mountain cascades surrounded by virgin jungle canopy.',
        specialty: 'Deep rainforest gorge with waterfall mist',
        bestTimeToVisit: 'Afternoon 3:00 PM - 4:30 PM',
        estimatedTime: '20 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Gorge', 'Waterfalls', 'Western Ghats', 'Lush Forest']
      },
      {
        id: 'vp-cm-lockhart-gap',
        name: 'Lockhart Gap Panoramic Cloud Vista',
        category: 'viewpoint',
        categoryLabel: 'Scenic Mountain Cloud Viewpoint',
        icon: '🌅',
        distanceMarkKm: 208,
        distanceMarkFormatted: '208 km from Calicut',
        locationName: 'NH 85 Lockhart Gap Saddle',
        description: 'Dramatic high-altitude mountain pass looking into misty valleys, rolling tea plantations, and cloud beds.',
        specialty: '360° cloud blanket over Lockhart tea valleys',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 6:00 PM (Golden Hour)',
        estimatedTime: '30 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Cloud Bed', 'Tea Estates', 'Sunset View', 'Ghat Highway']
      }
    ],
    enrouteSpots: [
      {
        id: 'food-cm-paragon-express',
        name: 'Paragon Express & Calicut Ghee Roast Corner',
        category: 'food',
        categoryLabel: 'Highway Dining & Malabar Cafe',
        icon: '🍛',
        distanceMarkKm: 12,
        distanceMarkFormatted: '12 km from Calicut',
        locationName: 'Ramanattukara Highway Junction, NH 66',
        description: 'Legendary Malabar culinary stop famous for flaky coin parottas, slow-cooked chicken roast, and authentic dum biryani.',
        specialty: 'Malabar Parotta, Ghee Roast & Sulaimani Tea',
        bestTimeToVisit: 'Breakfast (7:30 - 10:30 AM) or Lunch (12:30 - 3:00 PM)',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Malabar Cuisine', 'Biryani', 'Sulaimani', 'AC Dining']
      },
      {
        id: 'spot-cm-kottakkal-ayurveda',
        name: 'Arya Vaidya Sala Heritage Herbarium & Campus',
        category: 'famous',
        categoryLabel: 'Famous Heritage & Wellness Landmark',
        icon: '🏛️',
        distanceMarkKm: 42,
        distanceMarkFormatted: '42 km from Calicut',
        locationName: 'Kottakkal Heritage Center, Malappuram',
        description: 'World-renowned Ayurvedic medical institution founded in 1902 with historic herbal museum and medicinal botanical gardens.',
        specialty: 'Historic 120-year-old botanical herbarium & museum',
        bestTimeToVisit: 'Morning 9:00 AM - 12:00 PM',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Ayurveda', 'Heritage', 'Museum', 'Botanical Gardens']
      },
      {
        id: 'vp-cm-kottakkal-ridge',
        name: 'Kottakkal Hilltop Horizon Overlook',
        category: 'viewpoint',
        categoryLabel: 'Scenic Valley Viewpoint',
        icon: '🌅',
        distanceMarkKm: 45,
        distanceMarkFormatted: '45 km from Calicut',
        locationName: 'Kottakkal Scenic Bypass',
        description: 'Elevated roadside vantage looking out over undulating Malabar coconut palm valleys and distant Western Ghat foothills.',
        specialty: 'Emerald coconut forest panorama',
        bestTimeToVisit: 'Morning 7:30 AM - 9:00 AM',
        estimatedTime: '15 mins',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Valley', 'Coconut Groves', 'Morning Mist']
      },
      {
        id: 'food-cm-malabar-spicegate',
        name: 'Malabar Spiceland & Heritage Coffee Haven',
        category: 'food',
        categoryLabel: 'Heritage Roadside Coffee & Bakery',
        icon: '☕',
        distanceMarkKm: 72,
        distanceMarkFormatted: '72 km from Calicut',
        locationName: 'Perinthalmanna Bypass Plaza',
        description: 'Freshly roasted Wayanad Arabica filter coffee, hot banana fritters (pazham pori) with beef roast, and traditional snacks.',
        specialty: 'Fresh Malabar Filter Coffee & Pazham Pori',
        bestTimeToVisit: 'Coffee Break 10:00 AM - 11:30 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Coffee', 'Snacks', 'Kerala Bakery', 'Restrooms']
      },
      {
        id: 'spot-cm-kodikuthimala',
        name: 'Kodikuthimala Hilltop Watchtower & Pine Forest',
        category: 'famous',
        categoryLabel: 'Famous Hilltop Landmark',
        icon: '🏰',
        distanceMarkKm: 74,
        distanceMarkFormatted: '74 km from Calicut',
        locationName: 'Perinthalmanna High Ridge',
        description: 'Known as the "Ooty of Malappuram", featuring a British-era hilltop watchtower, cool mountain breezes, and pine woods.',
        specialty: 'Colonial watchtower with sweeping valley views',
        bestTimeToVisit: 'Morning 8:00 AM - 10:30 AM',
        estimatedTime: '1 hour',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Watchtower', 'Pine Forest', 'Trekking', 'Historic']
      },
      {
        id: 'food-cm-muvattupuzha-karimeen',
        name: 'Muvattupuzha Karimeen & Malabar Sadhya Mess',
        category: 'food',
        categoryLabel: 'Authentic Kerala Dining',
        icon: '🐟',
        distanceMarkKm: 138,
        distanceMarkFormatted: '138 km from Calicut',
        locationName: 'Muvattupuzha River Road',
        description: 'Authentic claypot pearl spot fish curry (karimeen pollichathu), tapioca with spicy fish gravy, and traditional banana leaf sadhya.',
        specialty: 'Karimeen Pollichathu & Traditional Sadhya',
        bestTimeToVisit: 'Lunch 12:30 PM - 2:30 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Seafood', 'Banana Leaf', 'Traditional', 'Local Spices']
      },
      {
        id: 'spot-cm-bhoothathankettu',
        name: 'Bhoothathankettu Mythological Granite Dam & Forest Reserve',
        category: 'famous',
        categoryLabel: 'Famous Nature & Engineering Landmark',
        icon: '🌊',
        distanceMarkKm: 146,
        distanceMarkFormatted: '146 km from Calicut',
        locationName: 'Kothamangalam Periyar Gateway',
        description: 'Scenic natural dam built of unshaped stones with mythological folklore, Periyar river reservoir cruises, and dense teak forests.',
        specialty: 'Granite stone dam barrier & Periyar river boating',
        bestTimeToVisit: 'Afternoon 2:00 PM - 4:00 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Boating', 'River', 'Forest', 'Mythology']
      },
      {
        id: 'vp-cm-neriamangalam-bridge',
        name: 'Neriamangalam River Bridge & Rainforest Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'River Gorge Viewpoint',
        icon: '🌉',
        distanceMarkKm: 152,
        distanceMarkFormatted: '152 km from Calicut',
        locationName: 'Neriamangalam Arch Bridge, Periyar River',
        description: 'Known as "The Gateway to High Ranges", the heritage arch bridge provides dramatic vistas of the swollen Periyar river and virgin forest.',
        specialty: 'Periyar river gorge & rainforest canopy',
        bestTimeToVisit: 'Midday 1:30 PM - 3:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['River Gorge', 'Arch Bridge', 'Rainforest', 'Gateway']
      },
      {
        id: 'spot-cm-cheeyappara-falls',
        name: 'Cheeyappara Cascading Waterfalls',
        category: 'famous',
        categoryLabel: 'Famous Roadside Natural Wonder',
        icon: '🌊',
        distanceMarkKm: 178,
        distanceMarkFormatted: '178 km from Calicut',
        locationName: 'NH 85 Kochi-Munnar Gap Road',
        description: 'Majestic 7-tiered waterfall cascade plunging down rocky mountain terraces right next to the highway ghat.',
        specialty: '7-tiered roadside waterfall cascade',
        bestTimeToVisit: 'Morning 8:30 AM - 11:30 AM (rainbow mist)',
        estimatedTime: '30 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Photography', 'Western Ghats', 'Free Access']
      },
      {
        id: 'vp-cm-valara-gorge',
        name: 'Valara River Gorge & Canopy Lookout',
        category: 'viewpoint',
        categoryLabel: 'Dramatic Canyon Viewpoint',
        icon: '🌄',
        distanceMarkKm: 188,
        distanceMarkFormatted: '188 km from Calicut',
        locationName: 'NH 85 Valara Overlook',
        description: 'A breathtaking gorge look-down point where deep valleys meet roaring mountain cascades surrounded by virgin jungle canopy.',
        specialty: 'Deep rainforest gorge with waterfall mist',
        bestTimeToVisit: 'Afternoon 3:00 PM - 4:30 PM',
        estimatedTime: '20 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Gorge', 'Waterfalls', 'Western Ghats', 'Lush Forest']
      },
      {
        id: 'food-cm-adimali-farmhouse',
        name: 'Adimali Farmhouse Spiced Tea & Organic Honey Stop',
        category: 'food',
        categoryLabel: 'Highland Farm Cafe',
        icon: '🫖',
        distanceMarkKm: 192,
        distanceMarkFormatted: '192 km from Calicut',
        locationName: 'Adimali Mountain Ascent',
        description: 'Freshly brewed mountain cardamom tea, freshly sliced hot banana chips fried in pure coconut oil, and wild forest honey tasting.',
        specialty: 'Cardamom Tea, Hot Banana Chips & Wild Honey',
        bestTimeToVisit: 'Afternoon 3:30 PM - 5:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Cardamom Tea', 'Spices', 'Organic Honey', 'Fresh Chips']
      },
      {
        id: 'vp-cm-lockhart-gap',
        name: 'Lockhart Gap Panoramic Cloud Vista',
        category: 'viewpoint',
        categoryLabel: 'Scenic Mountain Cloud Viewpoint',
        icon: '🌅',
        distanceMarkKm: 208,
        distanceMarkFormatted: '208 km from Calicut',
        locationName: 'NH 85 Lockhart Gap Saddle',
        description: 'Dramatic high-altitude mountain pass looking into misty valleys, rolling tea plantations, and cloud beds.',
        specialty: '360° cloud blanket over Lockhart tea valleys',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 6:00 PM (Golden Hour)',
        estimatedTime: '30 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Cloud Bed', 'Tea Estates', 'Sunset View', 'Ghat Highway']
      }
    ]
  },

  'kochi-munnar': {
    id: 'route-kochi-munnar',
    startLocation: 'Kochi (Cochin)',
    destinationId: 'munnar-kerala',
    destinationName: 'Munnar',
    primaryDistanceKm: 126,
    recommendedMode: 'car',
    bestTimeToDepart: '06:00 AM - 08:00 AM (bypass city traffic)',
    elevationProfile: 'Ascent from coastal sea level to 1,532m mist ridge',
    waypoints: [
      { name: 'Kothamangalam River Bank', type: 'rest', distanceMark: '52 km', description: 'Scenic gateway with traditional breakfast joints.' },
      { name: 'Cheeyappara Waterfalls', type: 'scenic', distanceMark: '84 km', description: 'Famous 7-tier cascade flowing directly by the road.' },
      { name: 'Valara Viewpoint', type: 'scenic', distanceMark: '92 km', description: 'Dense tropical forest panorama.' },
      { name: 'Adimali Spice Hub', type: 'food', distanceMark: '104 km', description: 'Organic cardamom, cinnamon, and fresh fruit stops.' }
    ],
    transitOptions: {
      walking: {
        mode: 'walking',
        label: 'Walking & Trekking',
        icon: '🚶',
        durationMinutes: 310,
        durationFormatted: '5 hrs 10 mins (Local High-Range Trek)',
        distanceKm: 21,
        estimatedCost: 0,
        costBreakdown: 'Free / Forest & Tea Trails',
        routeName: 'Neriamangalam to Munnar Scenic Foothill Walk',
        difficulty: 'Challenging Trail',
        scenicRating: 9.7,
        carbonKg: 0,
        isEcoFriendly: true,
        caloriesBurned: 1360,
        elevationGainM: 920,
        highlights: ['Ancient spice trade trails', 'Periyar river tributary views', 'Tea estate slopes'],
        steps: [
          { stepNumber: 1, instruction: 'Walk along Neriamangalam Forest Trail crossing Ranikallu stone marker', distance: '6.5 km', duration: '1 hr 35 mins', mode: 'walk', icon: '🚶', landmark: 'Neriamangalam Bridge' },
          { stepNumber: 2, instruction: 'Ascend through spice groves towards Cheeyappara falls valley', distance: '7.8 km', duration: '1 hr 55 mins', mode: 'walk', icon: '🚶', landmark: 'Cheeyappara Base' },
          { stepNumber: 3, instruction: 'Follow scenic tea terrace paths into Munnar valley', distance: '6.7 km', duration: '1 hr 40 mins', mode: 'walk', icon: '🚶', landmark: 'Pothamedu Ridge' }
        ]
      },
      car: {
        mode: 'car',
        label: 'Car / Driving',
        icon: '🚗',
        durationMinutes: 210,
        durationFormatted: '3 hrs 30 mins',
        distanceKm: 126,
        estimatedCost: 1250,
        costBreakdown: 'Estimated Fuel: ~₹1,100 + Tolls: ~₹150',
        routeName: 'NH 85 Kochi-Dhanushkodi Highway',
        difficulty: 'Smooth drive with panoramic hill curves',
        scenicRating: 9.6,
        carbonKg: 16.5,
        isEcoFriendly: false,
        highlights: ['Fastest transit to Munnar', 'Spectacular roadside cascades', 'EV fast chargers at Kothamangalam & Adimali'],
        steps: [
          { stepNumber: 1, instruction: 'Exit Kochi / Ernakulam east on NH 85 via Muvattupuzha', distance: '48 km', duration: '1 hr 10 mins', mode: 'car', icon: '🚗', landmark: 'Muvattupuzha Bridge' },
          { stepNumber: 2, instruction: 'Pass Kothamangalam into Neriamangalam mountain gateway', distance: '28 km', duration: '40 mins', mode: 'car', icon: '🚗', landmark: 'Neriamangalam Arch' },
          { stepNumber: 3, instruction: 'Ascend NH 85 past Cheeyappara & Valara Waterfalls', distance: '36 km', duration: '1 hr 05 mins', mode: 'car', icon: '🚗', landmark: 'Cheeyappara Falls' },
          { stepNumber: 4, instruction: 'Enter Munnar tea valley reaching your hotel resort', distance: '14 km', duration: '35 mins', mode: 'car', icon: '🚗', landmark: 'Munnar Town Center' }
        ]
      },
      public_transport: {
        mode: 'public_transport',
        label: 'Public Transport (Bus)',
        icon: '🚌',
        durationMinutes: 260,
        durationFormatted: '4 hrs 20 mins',
        distanceKm: 130,
        estimatedCost: 240,
        costBreakdown: 'KSRTC Fast Passenger / Super Deluxe: ₹240 / person',
        routeName: 'Direct KSRTC High-Range Express',
        difficulty: 'Effortless & frequent',
        scenicRating: 9.3,
        carbonKg: 4.9,
        isEcoFriendly: true,
        transfers: 0,
        scheduleOrFrequency: 'Direct buses every 30 minutes from Ernakulam KSRTC Stand',
        highlights: ['Direct zero-transfer connection', 'Wide panoramic windows', 'Budget-friendly travel'],
        steps: [
          { stepNumber: 1, instruction: 'Board direct Munnar-bound KSRTC bus from Ernakulam KSRTC Terminal', distance: '128 km', duration: '4 hrs 10 mins', mode: 'bus', icon: '🚌', landmark: 'Ernakulam KSRTC Stand' },
          { stepNumber: 2, instruction: 'Alight at Munnar Central Bus Stand, 5 mins auto/cab to hotel', distance: '2 km', duration: '10 mins', mode: 'car', icon: '🚕', landmark: 'Munnar Bus Stand' }
        ]
      }
    },
    multiDayPlan: {
      isMultiDay: true,
      recommendedDays: 2,
      dayLegs: [
        {
          dayNumber: 1,
          title: 'Day 1: Kochi Coastal Plains to Neriamangalam Gateway',
          distanceKm: 65,
          targetHalt: 'Neriamangalam / Kothamangalam Riverbank',
          recommendedStayId: 'hotel-kochi-neriamangalam',
          description: 'Pass rubber plantations and ancient spice bridges. Stop for evening rainforest walks and river bathing.'
        },
        {
          dayNumber: 2,
          title: 'Day 2: Gap Road Mountain Climb & Munnar Valley',
          distanceKm: 61,
          targetHalt: 'Munnar Tea Country Core',
          recommendedStayId: 'hotel-kochi-munnar-luxury',
          description: 'Ascend the newly widened Gap Road past Valara & Cheeyappara waterfalls straight into tea estates.'
        }
      ]
    },
    routeHotels: [
      {
        id: 'hotel-kochi-neriamangalam',
        name: 'Neriamangalam Riverbank Nature Retreat',
        category: 'eco',
        locationName: 'Neriamangalam Forest Arch (52 km mark)',
        distanceMarkKm: 52,
        distanceMarkFormatted: '52 km from Kochi',
        detour: '0.6 km off NH 85',
        dayNumber: 1,
        stopType: 'midway_stop',
        stopBadge: 'Day 1 Rainforest Riverfront',
        rating: 4.7,
        reviewCount: 210,
        pricePerNight: 3900,
        priceTier: 'mid',
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tagline: 'Forest edge boutique retreat with river kayaking access and traditional Kerala dining.',
        services: ['view', 'free_breakfast', 'parking', 'wifi', 'restaurant', 'pet_friendly'],
        rooms: [
          { id: 'rm-neri-1', name: 'River View Deluxe Chalet', price: 3900, capacity: '2 Adults', bed: '1 King Bed', amenities: ['River Balcony', 'Breakfast Included', 'Kayaking Access'] },
          { id: 'rm-neri-2', name: 'Family Nature Suite', price: 5400, capacity: '4 Adults', bed: '2 Queen Beds', amenities: ['Veranda', 'Forest View', 'Complimentary High Tea'] }
        ]
      },
      {
        id: 'hotel-kochi-adimali-transit',
        name: 'High-Range Highway Transit Inn & EV Station',
        category: 'highway',
        locationName: 'Adimali Spice Town (104 km mark)',
        distanceMarkKm: 104,
        distanceMarkFormatted: '104 km from Kochi',
        detour: 'Directly on NH 85 Corridor',
        dayNumber: 1,
        stopType: 'overnight_hub',
        stopBadge: 'Day 1 Highland Transit Hub',
        rating: 4.5,
        reviewCount: 310,
        pricePerNight: 2600,
        priceTier: 'budget',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tagline: 'Speedy 24/7 check-in with 60kW DC EV fast chargers, cardamom garden spice shop, and valley views.',
        services: ['ev_charging', 'checkin_24h', 'free_breakfast', 'parking', 'wifi'],
        rooms: [
          { id: 'rm-adimtrans-1', name: 'Comfort Double Room', price: 2600, capacity: '2 Adults', bed: '1 Queen Bed', amenities: ['Fast Wi-Fi', 'Hot Shower', 'Complimentary Breakfast'] },
          { id: 'rm-adimtrans-2', name: 'Executive Spice Suite', price: 3600, capacity: '3 Adults', bed: '1 King + 1 Rollaway', amenities: ['Valley View', 'Mini Bar', 'EV Charging Voucher'] }
        ]
      },
      {
        id: 'hotel-kochi-munnar-luxury',
        name: 'Scenic Cloud Mist Resort & Spa',
        category: 'luxury',
        locationName: 'Munnar Gap Road Valley (126 km mark)',
        distanceMarkKm: 126,
        distanceMarkFormatted: '126 km (Destination Hub)',
        detour: '0.8 km off Gap Road',
        dayNumber: 2,
        stopType: 'destination_gateway',
        stopBadge: 'Day 2 Destination Luxury Stay',
        rating: 4.9,
        reviewCount: 780,
        pricePerNight: 7900,
        priceTier: 'luxury',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tagline: 'Infinity cliffside pool overlooking Lockhart Gap tea estate ridges and misty peaks.',
        services: ['pool', 'spa', 'view', 'ev_charging', 'free_breakfast', 'parking', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-cloud-1', name: 'Misty Valley Suite', price: 7900, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Infinity Pool View', 'Balcony', 'Breakfast Buffet'] },
          { id: 'rm-cloud-2', name: 'Private Pool Villa', price: 14000, capacity: '2 Adults + 1 Child', bed: '1 Super King Bed', amenities: ['Private Heated Plunge Pool', 'Personal Butler', 'Champagne Breakfast'] }
        ]
      }
    ],
    famousSpots: [
      {
        id: 'spot-km-areekkal-falls',
        name: 'Areekkal Waterfalls & Rubber Plantation Forest',
        category: 'famous',
        categoryLabel: 'Famous Natural Cascade',
        icon: '🌊',
        distanceMarkKm: 35,
        distanceMarkFormatted: '35 km from Kochi',
        locationName: 'Piravom-Muvattupuzha Ridge',
        description: 'Serene forest waterfall cascading over jagged granite ledges surrounded by lush rubber plantations.',
        specialty: 'Secluded multi-step waterfall amidst rubber estates',
        bestTimeToVisit: 'Morning 8:30 AM - 10:30 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Rubber Estate', 'Nature Walk']
      },
      {
        id: 'spot-km-ranikallu-stone',
        name: 'Ranikallu Historic Royal Milestone',
        category: 'famous',
        categoryLabel: 'Historic Royal Heritage',
        icon: '🏛️',
        distanceMarkKm: 68,
        distanceMarkFormatted: '68 km from Kochi',
        locationName: 'Neriamangalam Heritage Pass',
        description: 'Heritage stone milestone laid during the Travancore Royal Regency marking the opening of the High-Range mountain pass in 1878.',
        specialty: 'Historic Travancore royal stone monument',
        bestTimeToVisit: 'Midday 11:00 AM - 1:00 PM',
        estimatedTime: '20 mins',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['History', 'Heritage', 'Travancore Dynasty', 'Pass Marker']
      },
      {
        id: 'spot-km-cheeyappara-falls',
        name: 'Cheeyappara Waterfalls Cascade',
        category: 'famous',
        categoryLabel: 'Famous Natural Wonder',
        icon: '🌊',
        distanceMarkKm: 84,
        distanceMarkFormatted: '84 km from Kochi',
        locationName: 'NH 85 Mountain Ghat',
        description: 'The premier roadside wonder of Kerala where 7 terraces of foaming mountain water tumble directly adjacent to the road.',
        specialty: 'Spectacular 7-step cascade with road-side spray',
        bestTimeToVisit: 'Morning 9:00 AM - 11:30 AM',
        estimatedTime: '35 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Photography', 'Western Ghats', 'Iconic']
      },
      {
        id: 'spot-km-valara-falls',
        name: 'Valara Waterfalls & Rainforest Sanctuary',
        category: 'famous',
        categoryLabel: 'Famous Ecological Landmark',
        icon: '🌲',
        distanceMarkKm: 92,
        distanceMarkFormatted: '92 km from Kochi',
        locationName: 'NH 85 Valara Valley',
        description: 'Dense virgin Western Ghats rainforest surrounding a series of dramatic river falls, renowned for native birdlife and lush canopies.',
        specialty: 'Dense tropical forest and deep river waterfall',
        bestTimeToVisit: 'Afternoon 2:00 PM - 3:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Rainforest', 'River Falls', 'Bird Watching']
      }
    ],
    foodSpots: [
      {
        id: 'food-km-kalyan-toddy',
        name: 'Kalyan Naadan Food Shack & Duck Roast Hub',
        category: 'food',
        categoryLabel: 'Authentic Naadan Highway Cuisine',
        icon: '🍗',
        distanceMarkKm: 42,
        distanceMarkFormatted: '42 km from Kochi',
        locationName: 'Muvattupuzha Bypass Corridor',
        description: 'Legendary highway pitstop famous for pepper-fried duck roast, steamed tapioca with fiery bird-eye chili dip, and appams.',
        specialty: 'Spicy Duck Roast, Tapioca & Appams',
        bestTimeToVisit: 'Lunch 12:30 PM - 2:30 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Naadan Food', 'Duck Roast', 'Kerala Spices', 'Popular Pitstop']
      },
      {
        id: 'food-km-hotel-aryaas',
        name: 'Hotel Aryaas High-Range Gateway',
        category: 'food',
        categoryLabel: 'Vegetarian Highway Rest Stop',
        icon: '☕',
        distanceMarkKm: 64,
        distanceMarkFormatted: '64 km from Kochi',
        locationName: 'Kothamangalam Gateway Junction',
        description: 'Spacious highway food stop serving crisp ghee roast paper dosas, piping hot vegetable sambar, coconut chutneys, and filter coffee.',
        specialty: 'Crispy Ghee Roast Dosa & Kumbakonam Filter Coffee',
        bestTimeToVisit: 'Breakfast 7:30 AM - 10:00 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Pure Veg', 'Dosa', 'Filter Coffee', 'Clean Restrooms']
      },
      {
        id: 'food-km-adimali-honey',
        name: 'Adimali Organic Cardamom Cafe & Forest Honey',
        category: 'food',
        categoryLabel: 'Mountain Spice Cafe',
        icon: '🫖',
        distanceMarkKm: 104,
        distanceMarkFormatted: '104 km from Kochi',
        locationName: 'Adimali Spice Bazaar',
        description: 'Charming roadside stall where mountain cardamom tea is brewed fresh alongside coconut-oil fried banana chips and wild honey.',
        specialty: 'Fresh Cardamom Spiced Tea & Hot Banana Chips',
        bestTimeToVisit: 'Tea Time 3:30 PM - 5:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Cardamom Tea', 'Banana Chips', 'Wild Honey', 'Farm Fresh']
      },
      {
        id: 'food-km-pothamedu-dhaba',
        name: 'Pothamedu Mountain View Tea & Snacks',
        category: 'food',
        categoryLabel: 'Scenic Ridge Teahouse',
        icon: '☕',
        distanceMarkKm: 122,
        distanceMarkFormatted: '122 km from Kochi',
        locationName: 'Pothamedu Ridge Curve',
        description: 'Cliffside open teahouse serving hot ginger lemon tea, vegetable pakoras, and freshly toasted bread omelettes with valley vistas.',
        specialty: 'Ginger Lemon Honey Tea & Hot Pakoras',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 6:00 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Tea With View', 'Pakoras', 'Sunset Cafe', 'Munnar Approach']
      }
    ],
    viewpoints: [
      {
        id: 'vp-km-neriamangalam-bridge',
        name: 'Neriamangalam Periyar Arch Bridge Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'River Gorge Overlook',
        icon: '🌉',
        distanceMarkKm: 65,
        distanceMarkFormatted: '65 km from Kochi',
        locationName: 'Neriamangalam Bridge',
        description: '1935 heritage arch bridge over the rocky Periyar river gorge with sweeping views of the river rapids and evergreen foothills.',
        specialty: 'Rapid river currents and dense forest threshold',
        bestTimeToVisit: 'Morning 9:30 AM - 11:00 AM',
        estimatedTime: '20 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Arch Bridge', 'River Gorge', 'Gateway', 'Photo Point']
      },
      {
        id: 'vp-km-cheeyappara-rock',
        name: 'Cheeyappara Rock Spray Vantage Platform',
        category: 'viewpoint',
        categoryLabel: 'Waterfall Spray Overlook',
        icon: '🌊',
        distanceMarkKm: 85,
        distanceMarkFormatted: '85 km from Kochi',
        locationName: 'NH 85 Waterfall Platform',
        description: 'Elevated stone observation platform directly opposite Cheeyappara falls offering refreshing cooling spray and rainbow photography.',
        specialty: 'Direct view of cascading water spray and green moss cliffs',
        bestTimeToVisit: 'Morning 10:00 AM - 12:00 PM',
        estimatedTime: '20 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Rainbow Spray', 'Waterfall View', 'Selfie Spot']
      },
      {
        id: 'vp-km-valara-gorge',
        name: 'Valara Misty Gorge Overlook',
        category: 'viewpoint',
        categoryLabel: 'Jungle Canyon Viewpoint',
        icon: '🌄',
        distanceMarkKm: 93,
        distanceMarkFormatted: '93 km from Kochi',
        locationName: 'NH 85 Valara Gorge',
        description: 'A deep valley overlook revealing layers of mountain folds, wild bamboos, and untamed stream beds carving through the Western Ghats.',
        specialty: 'Wild rainforest valley and dramatic canyon depth',
        bestTimeToVisit: 'Afternoon 2:30 PM - 4:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Canyon', 'Wild Bamboo', 'Mountain Slopes']
      },
      {
        id: 'vp-km-pothamedu-ridge',
        name: 'Pothamedu Ridge Cloud Bed & Sunset Crest',
        category: 'viewpoint',
        categoryLabel: 'Premier Sunset Viewpoint',
        icon: '🌅',
        distanceMarkKm: 124,
        distanceMarkFormatted: '124 km from Kochi',
        locationName: 'Pothamedu Viewpoint Ridge',
        description: 'Legendary panoramic vantage point looking down into the Muthirapuzha river and the wide sea of tea plantations draped in mist.',
        specialty: 'Sunset cloud beds over rolling green tea plantations',
        bestTimeToVisit: 'Sunset 5:00 PM - 6:30 PM',
        estimatedTime: '40 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Sunset Crest', 'Tea Gardens', 'Panoramic Valley', 'Cloud Bed']
      }
    ],
    enrouteSpots: [
      {
        id: 'spot-km-areekkal-falls',
        name: 'Areekkal Waterfalls & Rubber Plantation Forest',
        category: 'famous',
        categoryLabel: 'Famous Natural Cascade',
        icon: '🌊',
        distanceMarkKm: 35,
        distanceMarkFormatted: '35 km from Kochi',
        locationName: 'Piravom-Muvattupuzha Ridge',
        description: 'Serene forest waterfall cascading over jagged granite ledges surrounded by lush rubber plantations.',
        specialty: 'Secluded multi-step waterfall amidst rubber estates',
        bestTimeToVisit: 'Morning 8:30 AM - 10:30 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Rubber Estate', 'Nature Walk']
      },
      {
        id: 'food-km-kalyan-toddy',
        name: 'Kalyan Naadan Food Shack & Duck Roast Hub',
        category: 'food',
        categoryLabel: 'Authentic Naadan Highway Cuisine',
        icon: '🍗',
        distanceMarkKm: 42,
        distanceMarkFormatted: '42 km from Kochi',
        locationName: 'Muvattupuzha Bypass Corridor',
        description: 'Legendary highway pitstop famous for pepper-fried duck roast, steamed tapioca with fiery bird-eye chili dip, and appams.',
        specialty: 'Spicy Duck Roast, Tapioca & Appams',
        bestTimeToVisit: 'Lunch 12:30 PM - 2:30 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Naadan Food', 'Duck Roast', 'Kerala Spices', 'Popular Pitstop']
      },
      {
        id: 'food-km-hotel-aryaas',
        name: 'Hotel Aryaas High-Range Gateway',
        category: 'food',
        categoryLabel: 'Vegetarian Highway Rest Stop',
        icon: '☕',
        distanceMarkKm: 64,
        distanceMarkFormatted: '64 km from Kochi',
        locationName: 'Kothamangalam Gateway Junction',
        description: 'Spacious highway food stop serving crisp ghee roast paper dosas, piping hot vegetable sambar, coconut chutneys, and filter coffee.',
        specialty: 'Crispy Ghee Roast Dosa & Kumbakonam Filter Coffee',
        bestTimeToVisit: 'Breakfast 7:30 AM - 10:00 AM',
        estimatedTime: '30 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Pure Veg', 'Dosa', 'Filter Coffee', 'Clean Restrooms']
      },
      {
        id: 'vp-km-neriamangalam-bridge',
        name: 'Neriamangalam Periyar Arch Bridge Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'River Gorge Overlook',
        icon: '🌉',
        distanceMarkKm: 65,
        distanceMarkFormatted: '65 km from Kochi',
        locationName: 'Neriamangalam Bridge',
        description: '1935 heritage arch bridge over the rocky Periyar river gorge with sweeping views of the river rapids and evergreen foothills.',
        specialty: 'Rapid river currents and dense forest threshold',
        bestTimeToVisit: 'Morning 9:30 AM - 11:00 AM',
        estimatedTime: '20 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Arch Bridge', 'River Gorge', 'Gateway', 'Photo Point']
      },
      {
        id: 'spot-km-ranikallu-stone',
        name: 'Ranikallu Historic Royal Milestone',
        category: 'famous',
        categoryLabel: 'Historic Royal Heritage',
        icon: '🏛️',
        distanceMarkKm: 68,
        distanceMarkFormatted: '68 km from Kochi',
        locationName: 'Neriamangalam Heritage Pass',
        description: 'Heritage stone milestone laid during the Travancore Royal Regency marking the opening of the High-Range mountain pass in 1878.',
        specialty: 'Historic Travancore royal stone monument',
        bestTimeToVisit: 'Midday 11:00 AM - 1:00 PM',
        estimatedTime: '20 mins',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['History', 'Heritage', 'Travancore Dynasty', 'Pass Marker']
      },
      {
        id: 'spot-km-cheeyappara-falls',
        name: 'Cheeyappara Waterfalls Cascade',
        category: 'famous',
        categoryLabel: 'Famous Natural Wonder',
        icon: '🌊',
        distanceMarkKm: 84,
        distanceMarkFormatted: '84 km from Kochi',
        locationName: 'NH 85 Mountain Ghat',
        description: 'The premier roadside wonder of Kerala where 7 terraces of foaming mountain water tumble directly adjacent to the road.',
        specialty: 'Spectacular 7-step cascade with road-side spray',
        bestTimeToVisit: 'Morning 9:00 AM - 11:30 AM',
        estimatedTime: '35 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Waterfall', 'Photography', 'Western Ghats', 'Iconic']
      },
      {
        id: 'vp-km-cheeyappara-rock',
        name: 'Cheeyappara Rock Spray Vantage Platform',
        category: 'viewpoint',
        categoryLabel: 'Waterfall Spray Overlook',
        icon: '🌊',
        distanceMarkKm: 85,
        distanceMarkFormatted: '85 km from Kochi',
        locationName: 'NH 85 Waterfall Platform',
        description: 'Elevated stone observation platform directly opposite Cheeyappara falls offering refreshing cooling spray and rainbow photography.',
        specialty: 'Direct view of cascading water spray and green moss cliffs',
        bestTimeToVisit: 'Morning 10:00 AM - 12:00 PM',
        estimatedTime: '20 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Rainbow Spray', 'Waterfall View', 'Selfie Spot']
      },
      {
        id: 'spot-km-valara-falls',
        name: 'Valara Waterfalls & Rainforest Sanctuary',
        category: 'famous',
        categoryLabel: 'Famous Ecological Landmark',
        icon: '🌲',
        distanceMarkKm: 92,
        distanceMarkFormatted: '92 km from Kochi',
        locationName: 'NH 85 Valara Valley',
        description: 'Dense virgin Western Ghats rainforest surrounding a series of dramatic river falls, renowned for native birdlife and lush canopies.',
        specialty: 'Dense tropical forest and deep river waterfall',
        bestTimeToVisit: 'Afternoon 2:00 PM - 3:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Rainforest', 'River Falls', 'Bird Watching']
      },
      {
        id: 'vp-km-valara-gorge',
        name: 'Valara Misty Gorge Overlook',
        category: 'viewpoint',
        categoryLabel: 'Jungle Canyon Viewpoint',
        icon: '🌄',
        distanceMarkKm: 93,
        distanceMarkFormatted: '93 km from Kochi',
        locationName: 'NH 85 Valara Gorge',
        description: 'A deep valley overlook revealing layers of mountain folds, wild bamboos, and untamed stream beds carving through the Western Ghats.',
        specialty: 'Wild rainforest valley and dramatic canyon depth',
        bestTimeToVisit: 'Afternoon 2:30 PM - 4:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['Canyon', 'Wild Bamboo', 'Mountain Slopes']
      },
      {
        id: 'food-km-adimali-honey',
        name: 'Adimali Organic Cardamom Cafe & Forest Honey',
        category: 'food',
        categoryLabel: 'Mountain Spice Cafe',
        icon: '🫖',
        distanceMarkKm: 104,
        distanceMarkFormatted: '104 km from Kochi',
        locationName: 'Adimali Spice Bazaar',
        description: 'Charming roadside stall where mountain cardamom tea is brewed fresh alongside coconut-oil fried banana chips and wild honey.',
        specialty: 'Fresh Cardamom Spiced Tea & Hot Banana Chips',
        bestTimeToVisit: 'Tea Time 3:30 PM - 5:00 PM',
        estimatedTime: '20 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Cardamom Tea', 'Banana Chips', 'Wild Honey', 'Farm Fresh']
      },
      {
        id: 'food-km-pothamedu-dhaba',
        name: 'Pothamedu Mountain View Tea & Snacks',
        category: 'food',
        categoryLabel: 'Scenic Ridge Teahouse',
        icon: '☕',
        distanceMarkKm: 122,
        distanceMarkFormatted: '122 km from Kochi',
        locationName: 'Pothamedu Ridge Curve',
        description: 'Cliffside open teahouse serving hot ginger lemon tea, vegetable pakoras, and freshly toasted bread omelettes with valley vistas.',
        specialty: 'Ginger Lemon Honey Tea & Hot Pakoras',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 6:00 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Tea With View', 'Pakoras', 'Sunset Cafe', 'Munnar Approach']
      },
      {
        id: 'vp-km-pothamedu-ridge',
        name: 'Pothamedu Ridge Cloud Bed & Sunset Crest',
        category: 'viewpoint',
        categoryLabel: 'Premier Sunset Viewpoint',
        icon: '🌅',
        distanceMarkKm: 124,
        distanceMarkFormatted: '124 km from Kochi',
        locationName: 'Pothamedu Viewpoint Ridge',
        description: 'Legendary panoramic vantage point looking down into the Muthirapuzha river and the wide sea of tea plantations draped in mist.',
        specialty: 'Sunset cloud beds over rolling green tea plantations',
        bestTimeToVisit: 'Sunset 5:00 PM - 6:30 PM',
        estimatedTime: '40 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Sunset Crest', 'Tea Gardens', 'Panoramic Valley', 'Cloud Bed']
      }
    ]
  },

  'delhi-jaipur': {
    id: 'route-delhi-jaipur',
    startLocation: 'New Delhi',
    destinationId: 'jaipur-rajasthan',
    destinationName: 'Jaipur',
    primaryDistanceKm: 275,
    recommendedMode: 'public_transport',
    bestTimeToDepart: '06:00 AM (catch early Vande Bharat Express or beat Gurgaon expressway traffic)',
    elevationProfile: 'Flat Gangetic plains to Aravalli rocky ridge (220 m to 430 m)',
    waypoints: [
      { name: 'Gurgaon CyberCity Hub', type: 'rest', distanceMark: '30 km', description: 'Metropolitan express corridor.' },
      { name: 'Sohna Expressway Interchange', type: 'charging', distanceMark: '55 km', description: 'High-speed EV fast charging plaza.' },
      { name: 'Dausa Rest & Food Court', type: 'food', distanceMark: '190 km', description: 'Famous Rajasthani pyaz kachori and tea stop.' },
      { name: 'Amer Valley Entry Gate', type: 'scenic', distanceMark: '265 km', description: 'Grand entry passing Amber Fort ramparts.' }
    ],
    transitOptions: {
      walking: {
        mode: 'walking',
        label: 'Walking & Trekking',
        icon: '🚶',
        durationMinutes: 330,
        durationFormatted: '5 hrs 30 mins (Aravalli Royal Fort Hike)',
        distanceKm: 16,
        estimatedCost: 0,
        costBreakdown: 'Free / Heritage trails & fort ramparts',
        routeName: 'Aravalli Hills & Jaigarh-Amer Royal Rampart Trail',
        difficulty: 'Moderate',
        scenicRating: 9.4,
        carbonKg: 0,
        isEcoFriendly: true,
        caloriesBurned: 1040,
        elevationGainM: 380,
        highlights: ['Walking along the massive fortress wall of Amer', 'Panoramic views of Maota Lake & Jaipur pink city', 'Heritage watchtowers'],
        steps: [
          { stepNumber: 1, instruction: 'Start from Amer Fort cobblestone elephant path', distance: '2.5 km', duration: '45 mins', mode: 'walk', icon: '🚶', landmark: 'Amer Sun Gate' },
          { stepNumber: 2, instruction: 'Ascend secret underground tunnel and stone rampart towards Jaigarh Fort', distance: '5.2 km', duration: '1 hr 45 mins', mode: 'walk', icon: '🚶', landmark: 'Jaigarh Cannon Yard' },
          { stepNumber: 3, instruction: 'Follow Aravalli ridge trail overlooking Nahargarh & Pink City', distance: '8.3 km', duration: '3 hrs 00 mins', mode: 'walk', icon: '🚶', landmark: 'Nahargarh Fort View' }
        ]
      },
      car: {
        mode: 'car',
        label: 'Car / Driving',
        icon: '🚗',
        durationMinutes: 255,
        durationFormatted: '4 hrs 15 mins',
        distanceKm: 275,
        estimatedCost: 2650,
        costBreakdown: 'Estimated Fuel: ~₹2,200 + Expressway Tolls: ~₹450',
        routeName: 'NE 4 Delhi-Mumbai 8-Lane Expressway & NH 48',
        difficulty: 'Very smooth & fast expressway cruising',
        scenicRating: 8.6,
        carbonKg: 35.8,
        isEcoFriendly: false,
        highlights: ['120 km/h access-controlled speed limit on NE 4', 'Modern food plazas & EV fast-chargers every 50 km', 'Scenic Aravalli ridge entry into Jaipur'],
        steps: [
          { stepNumber: 1, instruction: 'Take Delhi-Gurgaon Expressway past Sohna onto NE 4 Delhi-Mumbai Expressway', distance: '70 km', duration: '55 mins', mode: 'car', icon: '🚗', landmark: 'Sohna Toll Plaza' },
          { stepNumber: 2, instruction: 'Cruise south on NE 4 expressway towards Dausa interchange', distance: '140 km', duration: '1 hr 35 mins', mode: 'car', icon: '🚗', landmark: 'Dausa Exit' },
          { stepNumber: 3, instruction: 'Take NH 21 spur towards Jaipur bypass and Amer Fort foothills', distance: '55 km', duration: '1 hr 15 mins', mode: 'car', icon: '🚗', landmark: 'Rambagh Palace / Pink City' }
        ]
      },
      public_transport: {
        mode: 'public_transport',
        label: 'Public Transport (Vande Bharat Train)',
        icon: '🚆',
        durationMinutes: 230,
        durationFormatted: '3 hrs 50 mins',
        distanceKm: 300,
        estimatedCost: 890,
        costBreakdown: 'Vande Bharat Express Chair Car: ₹890 / Executive: ₹1,650',
        routeName: 'Indian Railways Vande Bharat Superfast Rail Link',
        difficulty: 'Ultra-luxurious, zero road stress, hot breakfast included',
        scenicRating: 9.0,
        carbonKg: 7.2,
        isEcoFriendly: true,
        transfers: 0,
        scheduleOrFrequency: 'Departs New Delhi (NDLS) at 06:10 AM, arrives Jaipur (JP) at 10:00 AM',
        highlights: ['Fastest and most comfortable connection', 'Gourmet meal and tea service onboard', 'Arrives directly at Jaipur Junction in city center'],
        steps: [
          { stepNumber: 1, instruction: 'Board Vande Bharat Express at New Delhi Railway Station (Platform 2)', distance: '298 km', duration: '3 hrs 45 mins', mode: 'train', icon: '🚆', landmark: 'NDLS Station' },
          { stepNumber: 2, instruction: 'Alight at Jaipur Junction (JP), take 10-minute taxi to heritage hotel', distance: '3 km', duration: '15 mins', mode: 'car', icon: '🚕', landmark: 'Jaipur Junction' }
        ]
      }
    },
    multiDayPlan: {
      isMultiDay: true,
      recommendedDays: 2,
      dayLegs: [
        {
          dayNumber: 1,
          title: 'Day 1: Delhi Expressway Cruise to Dausa / Sohna Oasis',
          distanceKm: 190,
          targetHalt: 'Dausa Food & Rest Plaza / Sohna Foothills',
          recommendedStayId: 'hotel-delhi-dausa-transit',
          description: 'High-speed cruise on NE 4 Delhi-Mumbai Expressway. Unwind at countryside oasis or modern express transit hotel.'
        },
        {
          dayNumber: 2,
          title: 'Day 2: Royal Amber Gateway & Jaipur Pink City Arrival',
          distanceKm: 85,
          targetHalt: 'Amer Foothills & Jaipur Heritage Center',
          recommendedStayId: 'hotel-jaipur-amer-heritage',
          description: 'Pass the Aravalli hills and Amer Fort ramparts, checking into your royal haveli in the heart of the Pink City.'
        }
      ]
    },
    routeHotels: [
      {
        id: 'hotel-delhi-sohna',
        name: 'The Westin Sohna Resort & Spa Oasis',
        category: 'luxury',
        locationName: 'Sohna Expressway Interchange (55 km mark)',
        distanceMarkKm: 55,
        distanceMarkFormatted: '55 km from Delhi',
        detour: '2 km off NE 4 Expressway',
        dayNumber: 1,
        stopType: 'midway_stop',
        stopBadge: 'Day 1 Luxury Resort Escape',
        rating: 4.8,
        reviewCount: 650,
        pricePerNight: 9800,
        priceTier: 'luxury',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tagline: 'Sprawling countryside resort with equestrian grounds, luxury pool villas, and holistic wellness spa.',
        services: ['pool', 'spa', 'ev_charging', 'parking', 'wifi', 'restaurant', 'pet_friendly', 'cancellation'],
        rooms: [
          { id: 'rm-sohna-1', name: 'Premier Garden Villa', price: 9800, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Private Garden', 'Deep Soaking Tub', 'Breakfast Included'] },
          { id: 'rm-sohna-2', name: 'Luxury Pool Villa', price: 16500, capacity: '2 Adults + 2 Kids', bed: '1 King Bed + Living Room', amenities: ['Private Plunge Pool', 'Outdoor Rain Shower', 'Club Lounge Access'] }
        ]
      },
      {
        id: 'hotel-delhi-dausa-transit',
        name: 'Midway Expressway Highway Palace & EV Hub',
        category: 'highway',
        locationName: 'Dausa Food & Rest Plaza (190 km mark)',
        distanceMarkKm: 190,
        distanceMarkFormatted: '190 km from Delhi',
        detour: 'Direct NE 4 Expressway Service Plaza',
        dayNumber: 1,
        stopType: 'overnight_hub',
        stopBadge: 'Day 1 Express Overnight Hub',
        rating: 4.6,
        reviewCount: 520,
        pricePerNight: 3200,
        priceTier: 'budget',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tagline: 'Modern express highway hotel with 150kW ultra-fast EV chargers, soundproof suites, and 24/7 food court.',
        services: ['ev_charging', 'checkin_24h', 'free_breakfast', 'parking', 'wifi', 'restaurant'],
        rooms: [
          { id: 'rm-dausa-1', name: 'Express Transit Room', price: 3200, capacity: '2 Adults', bed: '1 Queen Bed', amenities: ['100% Soundproof Glass', 'Complimentary Breakfast', 'EV Charging Voucher'] },
          { id: 'rm-dausa-2', name: 'Deluxe Rajputana Room', price: 4400, capacity: '3 Adults', bed: '1 King + 1 Single', amenities: ['Rajasthani Thali Voucher', 'Valet Parking', 'Free Cancellation'] }
        ]
      },
      {
        id: 'hotel-jaipur-amer-heritage',
        name: 'Heritage Haveli & Boutique Fort Resort',
        category: 'boutique',
        locationName: 'Amer Valley Foothills (265 km mark)',
        distanceMarkKm: 265,
        distanceMarkFormatted: '265 km (Amer Gateway)',
        detour: '1.5 km from Amer Fort',
        dayNumber: 2,
        stopType: 'destination_gateway',
        stopBadge: 'Day 2 Royal Heritage Gateway',
        rating: 4.9,
        reviewCount: 840,
        pricePerNight: 6900,
        priceTier: 'mid',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tagline: 'Authentic 200-year-old Rajput haveli overlooking the illuminated Amber Fort ramparts.',
        services: ['view', 'pool', 'free_breakfast', 'spa', 'parking', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-amer-1', name: 'Royal Jharokha Suite', price: 6900, capacity: '2 Adults', bed: '1 Royal Carved King Bed', amenities: ['Fort View Jharokha Window', 'Folk Dance Performance Access', 'Royal Breakfast'] },
          { id: 'rm-amer-2', name: 'Maharani Palace Suite', price: 11000, capacity: '2 Adults + 1 Child', bed: '1 Four-Poster King Bed', amenities: ['Private Terrace', 'Heritage Fresco Ceilings', 'Personal Butler'] }
        ]
      }
    ],
    famousSpots: [
      {
        id: 'spot-dj-neemrana',
        name: 'Neemrana Fort-Palace Heritage Citadel',
        category: 'famous',
        categoryLabel: 'Famous Medieval Fortress',
        icon: '🏰',
        distanceMarkKm: 122,
        distanceMarkFormatted: '122 km from Delhi',
        locationName: 'Neemrana Foothills, NH 48',
        description: 'Stunning 15th-century Rajput fort palace built over 14 tiered terraces cut into the Aravalli hills with aerial zip-lining.',
        specialty: '14-tiered hill fort palace & aerial zip-lining',
        bestTimeToVisit: 'Morning 10:00 AM - 1:00 PM',
        estimatedTime: '1.5 hours',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Medieval Fort', 'Heritage Architecture', 'Zip Lining', 'Aravalli Hills']
      },
      {
        id: 'spot-dj-bhangarh-turnoff',
        name: 'Bhangarh Fort Archaeological Citadel Gateway',
        category: 'famous',
        categoryLabel: 'Famous Archaeological Site',
        icon: '🏛️',
        distanceMarkKm: 210,
        distanceMarkFormatted: '210 km from Delhi',
        locationName: 'Alwar-Dausa Heritage Belt',
        description: 'Legendary 17th-century ASI-protected historical fort citadel featuring grand stone gates, royal palaces, and banyan trees.',
        specialty: 'Ancient royal bazaar & stone fortified ramparts',
        bestTimeToVisit: 'Afternoon 1:30 PM - 3:30 PM',
        estimatedTime: '1 hour',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Archaeological', 'ASI Monument', 'Ancient Ruins', 'Royal Palaces']
      },
      {
        id: 'spot-dj-chand-baori',
        name: 'Chand Baori Ancient Stepwell Monument',
        category: 'famous',
        categoryLabel: 'Famous Ancient Architecture',
        icon: '🏛️',
        distanceMarkKm: 225,
        distanceMarkFormatted: '225 km from Delhi',
        locationName: 'Abhaneri Historical Village (off Expressway)',
        description: 'One of the deepest and largest stepwells in the world, built in the 9th century with 3,500 symmetrical geometric stone steps descending 13 stories.',
        specialty: '3,500 geometric stone steps & 9th-century carvings',
        bestTimeToVisit: 'Afternoon 2:30 PM - 4:00 PM',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Stepwell', 'Ancient Engineering', 'Geometric Marvel', 'Abhaneri']
      },
      {
        id: 'spot-dj-amer-fort',
        name: 'Amer Fort Sandstone Bastions & Sun Gate',
        category: 'famous',
        categoryLabel: 'UNESCO World Heritage Monument',
        icon: '👑',
        distanceMarkKm: 265,
        distanceMarkFormatted: '265 km from Delhi',
        locationName: 'Amer Heritage Valley, Jaipur Entrance',
        description: 'Majestic UNESCO World Heritage fortress made of red sandstone and marble, overlooking Maota Lake with the Sheesh Mahal (Mirror Palace).',
        specialty: 'Sheesh Mahal (Hall of Mirrors) & Maota Lake Bastions',
        bestTimeToVisit: 'Late Afternoon 3:30 PM - 5:30 PM',
        estimatedTime: '1.5 hours',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['UNESCO Heritage', 'Amer Fort', 'Sheesh Mahal', 'Rajput Grandeur']
      }
    ],
    foodSpots: [
      {
        id: 'food-dj-old-rao',
        name: 'Old Rao Dhaba Behror Highway Institution',
        category: 'food',
        categoryLabel: 'Famous Highway Dhaba',
        icon: '🍛',
        distanceMarkKm: 130,
        distanceMarkFormatted: '130 km from Delhi',
        locationName: 'NH 48 Behror Highway Hub',
        description: 'Legendary north Indian highway institution renowned for tandoori stuffed parathas with white butter, slow-simmered dal makhani, and thick kulhad lassi.',
        specialty: 'Tandoori Aloo-Pyaz Paratha with White Butter & Lassi',
        bestTimeToVisit: 'Breakfast or Early Lunch 10:30 AM - 1:00 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Iconic Dhaba', 'Tandoori Paratha', 'Kulhad Lassi', 'Dal Makhani']
      },
      {
        id: 'food-dj-mannat-king',
        name: 'Mannat Dhaba & Highway King Food Plaza',
        category: 'food',
        categoryLabel: 'Multi-Cuisine Highway Plaza',
        icon: '🍽️',
        distanceMarkKm: 172,
        distanceMarkFormatted: '172 km from Delhi',
        locationName: 'Kotputli Express Bypass',
        description: 'Large modern air-conditioned expressway rest plaza featuring fresh paneer tikka, Rajasthani gatta curry, and clay-pot masala chai.',
        specialty: 'Rajasthani Gatta Curry & Tandoori Kulcha',
        bestTimeToVisit: 'Lunch 1:00 PM - 2:30 PM',
        estimatedTime: '40 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Family Food Court', 'Rajasthani Thali', 'Clean Restrooms', 'EV Fast Charging']
      },
      {
        id: 'food-dj-dausa-kachori',
        name: 'Dausa Pyaz Kachori & Jalebi Stop',
        category: 'food',
        categoryLabel: 'Rajasthani Snack Station',
        icon: '🥟',
        distanceMarkKm: 220,
        distanceMarkFormatted: '220 km from Delhi',
        locationName: 'Dausa Expressway Service Plaza',
        description: 'Famous roadside halt serving world-renowned crisp, flaky Rajasthani spiced onion kachoris paired with sweet rabri jalebi.',
        specialty: 'Crisp Pyaz Kachori, Sweet Jalebi & Kadak Masala Chai',
        bestTimeToVisit: 'Snack Break 3:30 PM - 5:00 PM',
        estimatedTime: '25 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Pyaz Kachori', 'Jalebi', 'Kadak Chai', 'Rajasthani Street Food']
      },
      {
        id: 'food-dj-rawat-mishthan',
        name: 'Rawat Mishthan Bhandar Jaipur Arrival',
        category: 'food',
        categoryLabel: 'Heritage Sweets & Restaurant',
        icon: '🍲',
        distanceMarkKm: 272,
        distanceMarkFormatted: '272 km from Delhi',
        locationName: 'Jaipur Station Road Approach',
        description: 'Celebrated culinary destination in Jaipur famous for authentic mawa kachoris, paneer ghevar, mirchi vadas, and dal baati churma.',
        specialty: 'Dal Baati Churma, Mawa Kachori & Paneer Ghevar',
        bestTimeToVisit: 'Evening Dinner 6:30 PM - 8:30 PM',
        estimatedTime: '50 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Heritage Sweets', 'Dal Baati Churma', 'Ghevar', 'Jaipur Classic']
      }
    ],
    viewpoints: [
      {
        id: 'vp-dj-aravalli-pass',
        name: 'Aravalli Hills Mountain Pass Vista',
        category: 'viewpoint',
        categoryLabel: 'Geological Mountain Viewpoint',
        icon: '🌄',
        distanceMarkKm: 145,
        distanceMarkFormatted: '145 km from Delhi',
        locationName: 'NH 48 Aravalli Saddle',
        description: 'Panoramic mountain pass where the ancient Aravalli hill ranges rise sharply out of the plains with rugged quartzite peaks.',
        specialty: 'Ancient Aravalli rocky ridges & desert scrub horizon',
        bestTimeToVisit: 'Morning 9:30 AM - 11:00 AM',
        estimatedTime: '15 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Aravalli Range', 'Mountain Pass', 'Geological Heritage']
      },
      {
        id: 'vp-dj-bairat-rock',
        name: 'Bairat Ancient Buddhist Rock Overlook',
        category: 'viewpoint',
        categoryLabel: 'Historical Hill Overlook',
        icon: '🌅',
        distanceMarkKm: 190,
        distanceMarkFormatted: '190 km from Delhi',
        locationName: 'Viratnagar Ridge',
        description: 'Perched on high granite boulders overlooking ancient Buddhist stupa remains and fertile Rajasthani agricultural valleys.',
        specialty: 'Granite boulder landscapes & ancient Buddhist valley',
        bestTimeToVisit: 'Afternoon 2:00 PM - 3:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Granite Rocks', 'Ancient Heritage', 'Valley View']
      },
      {
        id: 'vp-dj-amer-lake',
        name: 'Amer Fort Maota Lake Mirror Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'Lake & Fortress Mirror Viewpoint',
        icon: '🏰',
        distanceMarkKm: 266,
        distanceMarkFormatted: '266 km from Delhi',
        locationName: 'Amer Valley Causeway',
        description: 'Breathtaking vantage point along the causeway with golden reflections of the massive Amber Fort ramparts in Maota Lake.',
        specialty: 'Golden fort rampart reflections in Maota Lake',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 5:30 PM',
        estimatedTime: '25 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tags: ['Lake Reflection', 'Amer Fort', 'Photography Gold', 'Kesar Kyari']
      },
      {
        id: 'vp-dj-nahargarh-crest',
        name: 'Nahargarh Hill Fort Valley Panoramic Crest',
        category: 'viewpoint',
        categoryLabel: 'Premier Sunset City Viewpoint',
        icon: '🌅',
        distanceMarkKm: 273,
        distanceMarkFormatted: '273 km from Delhi',
        locationName: 'Nahargarh Summit Road',
        description: 'Unmatched 360-degree sunset vista overlooking the entire Pink City grid, the glowing Jal Mahal, and the royal palace domes.',
        specialty: '360° sunset panorama over the entire Pink City',
        bestTimeToVisit: 'Sunset 5:30 PM - 6:45 PM',
        estimatedTime: '45 mins',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Sunset Panoramic', 'Pink City Horizon', 'Must Visit', 'Domes']
      }
    ],
    enrouteSpots: [
      {
        id: 'spot-dj-neemrana',
        name: 'Neemrana Fort-Palace Heritage Citadel',
        category: 'famous',
        categoryLabel: 'Famous Medieval Fortress',
        icon: '🏰',
        distanceMarkKm: 122,
        distanceMarkFormatted: '122 km from Delhi',
        locationName: 'Neemrana Foothills, NH 48',
        description: 'Stunning 15th-century Rajput fort palace built over 14 tiered terraces cut into the Aravalli hills with aerial zip-lining.',
        specialty: '14-tiered hill fort palace & aerial zip-lining',
        bestTimeToVisit: 'Morning 10:00 AM - 1:00 PM',
        estimatedTime: '1.5 hours',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Medieval Fort', 'Heritage Architecture', 'Zip Lining', 'Aravalli Hills']
      },
      {
        id: 'food-dj-old-rao',
        name: 'Old Rao Dhaba Behror Highway Institution',
        category: 'food',
        categoryLabel: 'Famous Highway Dhaba',
        icon: '🍛',
        distanceMarkKm: 130,
        distanceMarkFormatted: '130 km from Delhi',
        locationName: 'NH 48 Behror Highway Hub',
        description: 'Legendary north Indian highway institution renowned for tandoori stuffed parathas with white butter, slow-simmered dal makhani, and thick kulhad lassi.',
        specialty: 'Tandoori Aloo-Pyaz Paratha with White Butter & Lassi',
        bestTimeToVisit: 'Breakfast or Early Lunch 10:30 AM - 1:00 PM',
        estimatedTime: '45 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        tags: ['Iconic Dhaba', 'Tandoori Paratha', 'Kulhad Lassi', 'Dal Makhani']
      },
      {
        id: 'vp-dj-aravalli-pass',
        name: 'Aravalli Hills Mountain Pass Vista',
        category: 'viewpoint',
        categoryLabel: 'Geological Mountain Viewpoint',
        icon: '🌄',
        distanceMarkKm: 145,
        distanceMarkFormatted: '145 km from Delhi',
        locationName: 'NH 48 Aravalli Saddle',
        description: 'Panoramic mountain pass where the ancient Aravalli hill ranges rise sharply out of the plains with rugged quartzite peaks.',
        specialty: 'Ancient Aravalli rocky ridges & desert scrub horizon',
        bestTimeToVisit: 'Morning 9:30 AM - 11:00 AM',
        estimatedTime: '15 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Aravalli Range', 'Mountain Pass', 'Geological Heritage']
      },
      {
        id: 'food-dj-mannat-king',
        name: 'Mannat Dhaba & Highway King Food Plaza',
        category: 'food',
        categoryLabel: 'Multi-Cuisine Highway Plaza',
        icon: '🍽️',
        distanceMarkKm: 172,
        distanceMarkFormatted: '172 km from Delhi',
        locationName: 'Kotputli Express Bypass',
        description: 'Large modern air-conditioned expressway rest plaza featuring fresh paneer tikka, Rajasthani gatta curry, and clay-pot masala chai.',
        specialty: 'Rajasthani Gatta Curry & Tandoori Kulcha',
        bestTimeToVisit: 'Lunch 1:00 PM - 2:30 PM',
        estimatedTime: '40 mins',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tags: ['Family Food Court', 'Rajasthani Thali', 'Clean Restrooms', 'EV Fast Charging']
      },
      {
        id: 'vp-dj-bairat-rock',
        name: 'Bairat Ancient Buddhist Rock Overlook',
        category: 'viewpoint',
        categoryLabel: 'Historical Hill Overlook',
        icon: '🌅',
        distanceMarkKm: 190,
        distanceMarkFormatted: '190 km from Delhi',
        locationName: 'Viratnagar Ridge',
        description: 'Perched on high granite boulders overlooking ancient Buddhist stupa remains and fertile Rajasthani agricultural valleys.',
        specialty: 'Granite boulder landscapes & ancient Buddhist valley',
        bestTimeToVisit: 'Afternoon 2:00 PM - 3:30 PM',
        estimatedTime: '25 mins',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
        tags: ['Granite Rocks', 'Ancient Heritage', 'Valley View']
      },
      {
        id: 'spot-dj-bhangarh-turnoff',
        name: 'Bhangarh Fort Archaeological Citadel Gateway',
        category: 'famous',
        categoryLabel: 'Famous Archaeological Site',
        icon: '🏛️',
        distanceMarkKm: 210,
        distanceMarkFormatted: '210 km from Delhi',
        locationName: 'Alwar-Dausa Heritage Belt',
        description: 'Legendary 17th-century ASI-protected historical fort citadel featuring grand stone gates, royal palaces, and banyan trees.',
        specialty: 'Ancient royal bazaar & stone fortified ramparts',
        bestTimeToVisit: 'Afternoon 1:30 PM - 3:30 PM',
        estimatedTime: '1 hour',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tags: ['Archaeological', 'ASI Monument', 'Ancient Ruins', 'Royal Palaces']
      },
      {
        id: 'food-dj-dausa-kachori',
        name: 'Dausa Pyaz Kachori & Jalebi Stop',
        category: 'food',
        categoryLabel: 'Rajasthani Snack Station',
        icon: '🥟',
        distanceMarkKm: 220,
        distanceMarkFormatted: '220 km from Delhi',
        locationName: 'Dausa Expressway Service Plaza',
        description: 'Famous roadside halt serving world-renowned crisp, flaky Rajasthani spiced onion kachoris paired with sweet rabri jalebi.',
        specialty: 'Crisp Pyaz Kachori, Sweet Jalebi & Kadak Masala Chai',
        bestTimeToVisit: 'Snack Break 3:30 PM - 5:00 PM',
        estimatedTime: '25 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
        tags: ['Pyaz Kachori', 'Jalebi', 'Kadak Chai', 'Rajasthani Street Food']
      },
      {
        id: 'spot-dj-chand-baori',
        name: 'Chand Baori Ancient Stepwell Monument',
        category: 'famous',
        categoryLabel: 'Famous Ancient Architecture',
        icon: '🏛️',
        distanceMarkKm: 225,
        distanceMarkFormatted: '225 km from Delhi',
        locationName: 'Abhaneri Historical Village (off Expressway)',
        description: 'One of the deepest and largest stepwells in the world, built in the 9th century with 3,500 symmetrical geometric stone steps descending 13 stories.',
        specialty: '3,500 geometric stone steps & 9th-century carvings',
        bestTimeToVisit: 'Afternoon 2:30 PM - 4:00 PM',
        estimatedTime: '45 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        tags: ['Stepwell', 'Ancient Engineering', 'Geometric Marvel', 'Abhaneri']
      },
      {
        id: 'spot-dj-amer-fort',
        name: 'Amer Fort Sandstone Bastions & Sun Gate',
        category: 'famous',
        categoryLabel: 'UNESCO World Heritage Monument',
        icon: '👑',
        distanceMarkKm: 265,
        distanceMarkFormatted: '265 km from Delhi',
        locationName: 'Amer Heritage Valley, Jaipur Entrance',
        description: 'Majestic UNESCO World Heritage fortress made of red sandstone and marble, overlooking Maota Lake with the Sheesh Mahal (Mirror Palace).',
        specialty: 'Sheesh Mahal (Hall of Mirrors) & Maota Lake Bastions',
        bestTimeToVisit: 'Late Afternoon 3:30 PM - 5:30 PM',
        estimatedTime: '1.5 hours',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags: ['UNESCO Heritage', 'Amer Fort', 'Sheesh Mahal', 'Rajput Grandeur']
      },
      {
        id: 'vp-dj-amer-lake',
        name: 'Amer Fort Maota Lake Mirror Viewpoint',
        category: 'viewpoint',
        categoryLabel: 'Lake & Fortress Mirror Viewpoint',
        icon: '🏰',
        distanceMarkKm: 266,
        distanceMarkFormatted: '266 km from Delhi',
        locationName: 'Amer Valley Causeway',
        description: 'Breathtaking vantage point along the causeway with golden reflections of the massive Amber Fort ramparts in Maota Lake.',
        specialty: 'Golden fort rampart reflections in Maota Lake',
        bestTimeToVisit: 'Late Afternoon 4:30 PM - 5:30 PM',
        estimatedTime: '25 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        tags: ['Lake Reflection', 'Amer Fort', 'Photography Gold', 'Kesar Kyari']
      },
      {
        id: 'food-dj-rawat-mishthan',
        name: 'Rawat Mishthan Bhandar Jaipur Arrival',
        category: 'food',
        categoryLabel: 'Heritage Sweets & Restaurant',
        icon: '🍲',
        distanceMarkKm: 272,
        distanceMarkFormatted: '272 km from Delhi',
        locationName: 'Jaipur Station Road Approach',
        description: 'Celebrated culinary destination in Jaipur famous for authentic mawa kachoris, paneer ghevar, mirchi vadas, and dal baati churma.',
        specialty: 'Dal Baati Churma, Mawa Kachori & Paneer Ghevar',
        bestTimeToVisit: 'Evening Dinner 6:30 PM - 8:30 PM',
        estimatedTime: '50 mins',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tags: ['Heritage Sweets', 'Dal Baati Churma', 'Ghevar', 'Jaipur Classic']
      },
      {
        id: 'vp-dj-nahargarh-crest',
        name: 'Nahargarh Hill Fort Valley Panoramic Crest',
        category: 'viewpoint',
        categoryLabel: 'Premier Sunset City Viewpoint',
        icon: '🌅',
        distanceMarkKm: 273,
        distanceMarkFormatted: '273 km from Delhi',
        locationName: 'Nahargarh Summit Road',
        description: 'Unmatched 360-degree sunset vista overlooking the entire Pink City grid, the glowing Jal Mahal, and the royal palace domes.',
        specialty: '360° sunset panorama over the entire Pink City',
        bestTimeToVisit: 'Sunset 5:30 PM - 6:45 PM',
        estimatedTime: '45 mins',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
        tags: ['Sunset Panoramic', 'Pink City Horizon', 'Must Visit', 'Domes']
      }
    ]
  }
};

/**
 * Dynamically synthesizes famous spots, food spots, and viewpoints along any route corridor
 * based on start location, target destination, and total road distance.
 */
function buildDynamicEnrouteSpots(normStart, destObjOrName, destName, carDistanceKm) {
  const destFamous = Array.isArray(destObjOrName?.famousSpots) ? destObjOrName.famousSpots : [];
  const destFood = Array.isArray(destObjOrName?.foodSpots) ? destObjOrName.foodSpots : [];
  const destViewpoints = Array.isArray(destObjOrName?.viewpoints) ? destObjOrName.viewpoints : [];

  const mark25 = Math.max(5, Math.round(carDistanceKm * 0.25));
  const mark50 = Math.max(10, Math.round(carDistanceKm * 0.50));
  const mark75 = Math.max(15, Math.round(carDistanceKm * 0.75));

  const famousSpots = [
    {
      id: `spot-dyn-fam-1-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${normStart} Historical Frontier & Gateway Arch`,
      category: 'famous',
      categoryLabel: 'Famous Heritage Landmark',
      icon: '🏛️',
      distanceMarkKm: mark25,
      distanceMarkFormatted: `${mark25} km from ${normStart}`,
      locationName: `${normStart} Express Arterial Gateway`,
      description: `Historic departure landmark and regional heritage arch commemorating ancient trade routes from ${normStart}.`,
      specialty: 'Historic stone gateway and cultural museum',
      bestTimeToVisit: 'Morning 8:30 AM - 10:30 AM',
      estimatedTime: '30 mins',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      tags: ['Heritage', 'Historic Monument', 'Photo Stop']
    },
    {
      id: `spot-dyn-fam-2-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: 'Midway Ancient Trade Route & Fort Bastion',
      category: 'famous',
      categoryLabel: 'Famous Historic Monument',
      icon: '🏰',
      distanceMarkKm: mark50,
      distanceMarkFormatted: `${mark50} km mark`,
      locationName: 'Midway Highway Corridor',
      description: 'Centuries-old fortified staging post and archaeological watchtower overlooking the regional transport pass.',
      specialty: 'Stone ramparts and panoramic travel milestone',
      bestTimeToVisit: 'Midday 11:30 AM - 1:30 PM',
      estimatedTime: '40 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      tags: ['Archaeological', 'Ancient Fort', 'Scenic Lookout']
    },
    {
      id: `spot-dyn-fam-3-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${destName} Foothills Heritage Sanctuary`,
      category: 'famous',
      categoryLabel: 'Famous Cultural Landmark',
      icon: '⛩️',
      distanceMarkKm: mark75,
      distanceMarkFormatted: `${mark75} km mark`,
      locationName: `${destName} Valley Approach`,
      description: `Sacred grove and historic pilgrimage landmark welcoming travelers approaching the ${destName} foothills.`,
      specialty: 'Traditional architecture and artisanal craft center',
      bestTimeToVisit: 'Afternoon 2:30 PM - 4:00 PM',
      estimatedTime: '35 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      tags: ['Cultural', 'Architecture', 'Sacred Grove']
    },
    {
      id: `spot-dyn-fam-4-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: destFamous[0] ? destFamous[0].split('(')[0].trim() : `${destName} Grand Heritage Core`,
      category: 'famous',
      categoryLabel: 'Famous Destination Landmark',
      icon: '🏛️',
      distanceMarkKm: carDistanceKm,
      distanceMarkFormatted: `${carDistanceKm} km (Destination Arrival)`,
      locationName: `${destName} Central Heritage Quarter`,
      description: destFamous[0] ? `${destFamous[0]} — the premier iconic cultural attraction of ${destName}.` : `The premier cultural landmark and signature attraction of ${destName}.`,
      specialty: destFamous[0] || `Historic epicenter of ${destName}`,
      bestTimeToVisit: 'Late Afternoon / Evening',
      estimatedTime: '1 - 2 hours',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tags: ['Iconic Landmark', 'Prime Attraction', destName]
    }
  ];

  const foodSpots = [
    {
      id: `food-dyn-1-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${normStart} Highway Express Food Plaza`,
      category: 'food',
      categoryLabel: 'Highway Dining & Breakfast',
      icon: '🍛',
      distanceMarkKm: mark25,
      distanceMarkFormatted: `${mark25} km from ${normStart}`,
      locationName: `${normStart} Expressway Service Area`,
      description: `Vibrant highway dining court offering hot local breakfast delicacies, fresh filter coffee, and quick takeaways.`,
      specialty: 'Crispy Dosas, Hot Parathas & Fresh Brewed Filter Coffee',
      bestTimeToVisit: 'Breakfast 7:30 AM - 10:00 AM',
      estimatedTime: '35 mins',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      tags: ['Breakfast', 'Local Cuisine', 'Clean Restrooms', 'AC Dining']
    },
    {
      id: `food-dyn-2-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: 'Midway Highway Oasis Multi-Cuisine Diner',
      category: 'food',
      categoryLabel: 'Highway Oasis & Rest Stop',
      icon: '🍽️',
      distanceMarkKm: mark50,
      distanceMarkFormatted: `${mark50} km mark`,
      locationName: 'Central Corridor Rest Plaza',
      description: 'Comprehensive highway halt with farm-fresh thalis, clay-oven tandoor specialties, and artisanal ice creams.',
      specialty: 'Authentic Regional Thali & Handcrafted Refreshments',
      bestTimeToVisit: 'Lunch 12:30 PM - 2:30 PM',
      estimatedTime: '45 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      tags: ['Thali', 'Clay Oven', 'Family Dining', 'EV Charger']
    },
    {
      id: `food-dyn-3-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${destName} Foothills Spiced Chai & Farm Fresh Cafe`,
      category: 'food',
      categoryLabel: 'Artisanal Highway Cafe',
      icon: '🫖',
      distanceMarkKm: mark75,
      distanceMarkFormatted: `${mark75} km mark`,
      locationName: `${destName} Countryside Approach`,
      description: 'Cozy rustic open-air cafe serving spiced herbal teas, freshly baked warm pastries, and local savories.',
      specialty: 'Masala Spiced Chai & Warm Organic Pastries',
      bestTimeToVisit: 'Tea Break 3:30 PM - 5:30 PM',
      estimatedTime: '25 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      tags: ['Chai', 'Organic Bakery', 'Scenic Terrace', 'Local Honey']
    },
    {
      id: `food-dyn-4-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: destFood[0] ? destFood[0].split('(')[0].trim() : `${destName} Signature Heritage Dining`,
      category: 'food',
      categoryLabel: 'Prime Destination Culinary Hub',
      icon: '🍲',
      distanceMarkKm: carDistanceKm,
      distanceMarkFormatted: `${carDistanceKm} km (Destination Arrival)`,
      locationName: `${destName} Gourmet Quarter`,
      description: destFood[0] ? `${destFood[0]} — highly recommended dining institution in ${destName}.` : `Legendary culinary destination in ${destName} showcasing authentic local recipes.`,
      specialty: destFood[0] || `Signature local delicacies of ${destName}`,
      bestTimeToVisit: 'Dinner 7:00 PM - 9:30 PM',
      estimatedTime: '1 hour',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      tags: ['Fine Dining', 'Authentic Taste', 'Must Try', destName]
    }
  ];

  const viewpoints = [
    {
      id: `vp-dyn-1-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${normStart} Valley Scenic Lookout Point`,
      category: 'viewpoint',
      categoryLabel: 'Scenic Valley Overlook',
      icon: '🌅',
      distanceMarkKm: mark25,
      distanceMarkFormatted: `${mark25} km from ${normStart}`,
      locationName: 'Highway Ridge Curve',
      description: 'First panoramic overlook on the route offering wide-angle views of the countryside and morning haze.',
      specialty: 'Sweeping horizon over regional green belts',
      bestTimeToVisit: 'Morning 7:00 AM - 8:30 AM',
      estimatedTime: '15 mins',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tags: ['Scenic View', 'Morning Mist', 'Photo Spot']
    },
    {
      id: `vp-dyn-2-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: 'Midway Mountain Pass & Cloud Crest',
      category: 'viewpoint',
      categoryLabel: 'Mountain Pass Viewpoint',
      icon: '🌄',
      distanceMarkKm: mark50,
      distanceMarkFormatted: `${mark50} km mark`,
      locationName: 'High Elevation Saddle Point',
      description: 'Elevated highway vantage point providing dramatic views of undulating ridges and distant mountain ranges.',
      specialty: 'High-elevation mountain pass panorama',
      bestTimeToVisit: 'Midday 12:00 PM - 2:00 PM',
      estimatedTime: '20 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      tags: ['Mountain Pass', 'Ridge Crest', 'Dramatic Elevation']
    },
    {
      id: `vp-dyn-3-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: `${destName} Gateway Panoramic Lookout`,
      category: 'viewpoint',
      categoryLabel: 'Sunset Scenic Vista',
      icon: '🌅',
      distanceMarkKm: mark75,
      distanceMarkFormatted: `${mark75} km mark`,
      locationName: `${destName} Canyon Ridge Overlook`,
      description: 'Spectacular viewpoint with vistas of rolling hills, dramatic cliff drops, and winding mountain roadways.',
      specialty: 'Golden-hour light across the valley',
      bestTimeToVisit: 'Late Afternoon 4:30 PM - 5:45 PM',
      estimatedTime: '25 mins',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
      tags: ['Sunset View', 'Canyon Overlook', 'Golden Hour']
    },
    {
      id: `vp-dyn-4-${destName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: destViewpoints[0] ? destViewpoints[0].split('(')[0].trim() : `${destName} Pinnacle Viewpoint`,
      category: 'viewpoint',
      categoryLabel: 'Prime Destination Viewpoint',
      icon: '🌄',
      distanceMarkKm: carDistanceKm,
      distanceMarkFormatted: `${carDistanceKm} km (Destination Arrival)`,
      locationName: `${destName} Summit Ridge`,
      description: destViewpoints[0] ? `${destViewpoints[0]} — the most celebrated scenic viewpoint in ${destName}.` : `Unrivaled 360-degree vista overlooking the entire destination landscape of ${destName}.`,
      specialty: destViewpoints[0] || `Panoramic vistas of ${destName}`,
      bestTimeToVisit: 'Sunset or Early Morning',
      estimatedTime: '45 mins',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      tags: ['360 Panorama', 'Summit Vista', destName]
    }
  ];

  const enrouteSpots = [...famousSpots, ...foodSpots, ...viewpoints].sort(
    (a, b) => a.distanceMarkKm - b.distanceMarkKm
  );

  return { famousSpots, foodSpots, viewpoints, enrouteSpots };
}

// In-memory memo cache for route plan calculations
const routePlanCalculationCache = new Map();

/**
 * Dynamically constructs a RoutePlan between any origin and destination
 * with comprehensive transit options (walking, car, public transport).
 * 
 * @param {string} startLocation - User entered origin (e.g. "Calicut", "Delhi", "Kochi")
 * @param {Object|string} destinationObjOrName - Destination object or destination name
 * @param {TransitMode} [preferredMode='car'] - Default active transit mode
 * @returns {RoutePlan} Complete RoutePlan structure
 */
export function calculateRoutePlan(startLocation = 'Current Location', destinationObjOrName = 'Munnar', preferredMode = 'car') {
  const normStart = (typeof startLocation === 'string' ? startLocation : 'Current Location').trim();
  const destName = typeof destinationObjOrName === 'string'
    ? destinationObjOrName
    : (destinationObjOrName?.name || 'Munnar');
  const destId = typeof destinationObjOrName === 'object' && destinationObjOrName?.id
    ? destinationObjOrName.id
    : destName.toLowerCase().replace(/\s+/g, '-');

  const cacheKey = `${normStart.toLowerCase()}___${destId.toLowerCase()}___${preferredMode}`;
  if (routePlanCalculationCache.has(cacheKey)) {
    return routePlanCalculationCache.get(cacheKey);
  }

  // Check if we have an exact pre-configured corridor match
  const startLower = normStart.toLowerCase();
  const destLower = destName.toLowerCase();

  let matchedCorridor = null;
  if ((startLower.includes('calicut') || startLower.includes('kozhikode')) && destLower.includes('munnar')) {
    matchedCorridor = SAMPLE_ROUTE_PLANS['calicut-munnar'];
  } else if ((startLower.includes('kochi') || startLower.includes('cochin') || startLower.includes('ernakulam')) && destLower.includes('munnar')) {
    matchedCorridor = SAMPLE_ROUTE_PLANS['kochi-munnar'];
  } else if (startLower.includes('delhi') && destLower.includes('jaipur')) {
    matchedCorridor = SAMPLE_ROUTE_PLANS['delhi-jaipur'];
  }

  if (matchedCorridor) {
    const corridorPlan = {
      ...matchedCorridor,
      startLocation: normStart || matchedCorridor.startLocation,
      recommendedMode: preferredMode || matchedCorridor.recommendedMode
    };
    routePlanCalculationCache.set(cacheKey, corridorPlan);
    return corridorPlan;
  }

  // Construct dynamic route plan based on realistic parameters
  // Estimate distance based on destination
  let baseDistance = 145; // Default distance in km
  if (destLower.includes('zanskar') || destLower.includes('ladakh')) {
    baseDistance = 220;
  } else if (destLower.includes('kyoto')) {
    baseDistance = 65;
  } else if (destLower.includes('goa')) {
    baseDistance = 18;
  } else if (destLower.includes('varanasi')) {
    baseDistance = 25;
  } else if (destLower.includes('jaipur')) {
    baseDistance = 275;
  } else if (destLower.includes('munnar')) {
    baseDistance = 135;
  }

  // Walking calculations
  const walkDistanceKm = Math.min(baseDistance, 18); // Walking focused on scenic local trail portion if long
  const walkMinutes = Math.round((walkDistanceKm / 4.2) * 60);
  const walkHours = Math.floor(walkMinutes / 60);
  const walkMinsRem = walkMinutes % 60;
  const walkCalories = Math.round(walkDistanceKm * 65);
  const walkElevation = Math.min(850, Math.round(walkDistanceKm * 38));

  // Car calculations
  const carDistanceKm = baseDistance;
  const carSpeed = baseDistance > 100 ? 55 : 45;
  const carMinutes = Math.round((carDistanceKm / carSpeed) * 60) + 15;
  const carHours = Math.floor(carMinutes / 60);
  const carMinsRem = carMinutes % 60;
  const carCost = Math.round(carDistanceKm * 8.5 + (baseDistance > 100 ? 250 : 80));
  const carCarbon = parseFloat((carDistanceKm * 0.13).toFixed(1));

  // Public transport calculations
  const ptDistanceKm = Math.round(baseDistance * 1.05);
  const ptSpeed = 45;
  const ptMinutes = Math.round((ptDistanceKm / ptSpeed) * 60) + 35; // Includes transfer/station buffer
  const ptHours = Math.floor(ptMinutes / 60);
  const ptMinsRem = ptMinutes % 60;
  const ptCost = Math.round(ptDistanceKm * 2.2);
  const ptCarbon = parseFloat((ptDistanceKm * 0.038).toFixed(1));
  const ptTransfers = baseDistance > 180 ? 1 : 0;

  const dynamicEnroute = buildDynamicEnrouteSpots(normStart, destinationObjOrName, destName, carDistanceKm);

  return {
    id: `route-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
    startLocation: normStart,
    destinationId: destId,
    destinationName: destName,
    primaryDistanceKm: carDistanceKm,
    recommendedMode: preferredMode,
    bestTimeToDepart: '06:00 AM - 07:30 AM (smoothest traffic & morning light)',
    elevationProfile: `Ascending smoothly into ${destName} scenic geographic zone`,
    waypoints: [
      { name: `${normStart} Transit Departure Hub`, type: 'transit_hub', distanceMark: '0 km', description: 'Starting checkpoint with route signage & transit access.' },
      { name: 'Midway Highway Oasis & EV Hub', type: 'charging', distanceMark: `${Math.round(carDistanceKm * 0.45)} km`, description: 'Refuel, fast EV charging, fresh dining and restrooms.' },
      { name: `${destName} Panoramic Scenic Gateway`, type: 'scenic', distanceMark: `${Math.round(carDistanceKm * 0.85)} km`, description: 'Sweeping scenic vistas, photography points, and local produce.' },
      { name: `${destName} Heritage Arrival Point`, type: 'rest', distanceMark: `${carDistanceKm} km`, description: 'Central arrival gateway adjacent to curated stays & local transit.' }
    ],
    transitOptions: {
      walking: {
        mode: 'walking',
        label: 'Walking & Trekking',
        icon: '🚶',
        durationMinutes: walkMinutes,
        durationFormatted: walkHours > 0 ? `${walkHours} hr${walkHours > 1 ? 's' : ''} ${walkMinsRem} mins (Scenic Circuit)` : `${walkMinutes} mins`,
        distanceKm: walkDistanceKm,
        estimatedCost: 0,
        costBreakdown: 'Free / Public nature paths & scenic walking tracks',
        routeName: `${destName} Heritage Nature & Scenic Walking Trail`,
        difficulty: walkDistanceKm > 10 ? 'Moderate' : 'Easy',
        scenicRating: 9.6,
        carbonKg: 0,
        isEcoFriendly: true,
        caloriesBurned: walkCalories,
        elevationGainM: walkElevation,
        highlights: [
          `Scenic pedestrian pathways through ${destName}`,
          'Zero carbon emission green travel',
          'Close proximity to local flora, viewpoints, and photo points',
          'Fresh mountain / coastal air and low traffic paths'
        ],
        steps: [
          { stepNumber: 1, instruction: `Begin along the main ${destName} pedestrian trail heading toward the valley viewpoint`, distance: `${(walkDistanceKm * 0.3).toFixed(1)} km`, duration: `${Math.round(walkMinutes * 0.3)} mins`, mode: 'walk', icon: '🚶', landmark: 'Trailhead Arch' },
          { stepNumber: 2, instruction: `Traverse panoramic nature path with scenic valley and photography viewpoints`, distance: `${(walkDistanceKm * 0.4).toFixed(1)} km`, duration: `${Math.round(walkMinutes * 0.4)} mins`, mode: 'walk', icon: '🚶', landmark: 'Scenic Overlook' },
          { stepNumber: 3, instruction: `Arrive at central hospitality quarter and resort entrance`, distance: `${(walkDistanceKm * 0.3).toFixed(1)} km`, duration: `${Math.round(walkMinutes * 0.3)} mins`, mode: 'walk', icon: '🚶', landmark: `${destName} Destination Core` }
        ]
      },
      car: {
        mode: 'car',
        label: 'Car / Driving',
        icon: '🚗',
        durationMinutes: carMinutes,
        durationFormatted: carHours > 0 ? `${carHours} hr${carHours > 1 ? 's' : ''} ${carMinsRem} mins` : `${carMinutes} mins`,
        distanceKm: carDistanceKm,
        estimatedCost: carCost,
        costBreakdown: `Estimated Fuel: ~₹${Math.round(carDistanceKm * 7.5)} + Tolls/Parking: ~₹${carCost - Math.round(carDistanceKm * 7.5)}`,
        routeName: `Primary Highway Corridor to ${destName}`,
        difficulty: 'Direct & Comfortable',
        scenicRating: 9.1,
        carbonKg: carCarbon,
        isEcoFriendly: false,
        highlights: [
          `Fastest door-to-door transit between ${normStart} and ${destName}`,
          'Private luggage capacity & flexible stops',
          'EV fast-chargers available at major service plazas en route'
        ],
        steps: [
          { stepNumber: 1, instruction: `Depart from ${normStart} connecting to the primary express highway`, distance: `${Math.round(carDistanceKm * 0.25)} km`, duration: `${Math.round(carMinutes * 0.25)} mins`, mode: 'car', icon: '🚗', landmark: 'Expressway Interchange' },
          { stepNumber: 2, instruction: `Continue along national highway with scenic mountain/coastal panoramas`, distance: `${Math.round(carDistanceKm * 0.5)} km`, duration: `${Math.round(carMinutes * 0.45)} mins`, mode: 'car', icon: '🚗', landmark: 'Midway Highway Plaza' },
          { stepNumber: 3, instruction: `Enter ${destName} scenic arterial road leading directly to your stay`, distance: `${Math.round(carDistanceKm * 0.25)} km`, duration: `${Math.round(carMinutes * 0.3)} mins`, mode: 'car', icon: '🚗', landmark: `${destName} Hotel Entrance` }
        ]
      },
      public_transport: {
        mode: 'public_transport',
        label: 'Public Transport (Bus / Train)',
        icon: '🚌',
        durationMinutes: ptMinutes,
        durationFormatted: ptHours > 0 ? `${ptHours} hr${ptHours > 1 ? 's' : ''} ${ptMinsRem} mins` : `${ptMinutes} mins`,
        distanceKm: ptDistanceKm,
        estimatedCost: ptCost,
        costBreakdown: `Express Public Transit Fare: ₹${ptCost} / person`,
        routeName: `State Express & Regional Transit Link to ${destName}`,
        difficulty: 'Affordable & relaxed',
        scenicRating: 8.9,
        carbonKg: ptCarbon,
        isEcoFriendly: true,
        transfers: ptTransfers,
        scheduleOrFrequency: 'Frequent departures every 30 to 60 minutes from major transit terminals',
        highlights: [
          'Eco-friendly sustainable shared transit',
          'Substantially lower carbon footprint than private cars',
          'Arrives at central station with immediate cab and auto rickshaw connectivity'
        ],
        steps: [
          { stepNumber: 1, instruction: `Board regional Express Train or State AC Bus from ${normStart} central station`, distance: `${Math.round(ptDistanceKm * 0.75)} km`, duration: `${Math.round(ptMinutes * 0.7)} mins`, mode: 'bus', icon: '🚌', landmark: `${normStart} Central Terminal` },
          { stepNumber: 2, instruction: ptTransfers > 0 ? `Transfer at regional gateway terminal to the ${destName} Mountain/Coastal Shuttle` : `Direct transit arriving at ${destName} Central Bus/Train Terminal`, distance: `${Math.round(ptDistanceKm * 0.25)} km`, duration: `${Math.round(ptMinutes * 0.25)} mins`, mode: 'bus', icon: '🚌', landmark: `${destName} Station` },
          { stepNumber: 3, instruction: `Short 5-minute local electric shuttle or auto to your accommodation`, distance: '2.5 km', duration: '10 mins', mode: 'car', icon: '🚕', landmark: `${destName} Resort Reception` }
        ]
      }
    },
    multiDayPlan: {
      isMultiDay: carDistanceKm > 80,
      recommendedDays: carDistanceKm > 200 ? 3 : (carDistanceKm > 80 ? 2 : 1),
      dayLegs: [
        {
          dayNumber: 1,
          title: `Day 1: Departure from ${normStart} to Midway Highway Halt`,
          distanceKm: Math.round(carDistanceKm * 0.55),
          targetHalt: `Midway Highway Oasis (~${Math.round(carDistanceKm * 0.55)} km mark)`,
          recommendedStayId: `stay-dyn-transit-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
          description: `Cruising along primary corridor with scenic stopovers. Relax and recharge overnight before the final leg.`
        },
        {
          dayNumber: 2,
          title: `Day 2: Scenic Transition & Arrival in ${destName}`,
          distanceKm: Math.round(carDistanceKm * 0.45),
          targetHalt: `${destName} Destination Core`,
          recommendedStayId: `stay-dyn-dest-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
          description: `Final scenic approach into ${destName} with full day destination exploration and resort check-in.`
        }
      ]
    },
    routeHotels: [
      {
        id: `stay-dyn-transit-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
        name: `${normStart} Expressway Gateway Inn & EV Station`,
        category: 'highway',
        locationName: `Highway Corridor (~${Math.round(carDistanceKm * 0.45)} km mark)`,
        distanceMarkKm: Math.round(carDistanceKm * 0.45),
        distanceMarkFormatted: `${Math.round(carDistanceKm * 0.45)} km from Origin`,
        detour: '0.3 km off main highway',
        dayNumber: 1,
        stopType: 'overnight_hub',
        stopBadge: 'Day 1 En-Route Transit Hub',
        rating: 4.6,
        reviewCount: 230,
        pricePerNight: 2900,
        priceTier: 'budget',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        tagline: 'Modern roadtrip stay with 24/7 check-in, EV fast chargers, and soundproof rooms.',
        services: ['ev_charging', 'checkin_24h', 'free_breakfast', 'parking', 'wifi', 'restaurant'],
        rooms: [
          { id: 'rm-dyn-1', name: 'Express Highway Room', price: 2900, capacity: '2 Adults', bed: '1 Queen Bed', amenities: ['Soundproof Windows', 'EV Charging Voucher', 'Free Breakfast'] },
          { id: 'rm-dyn-2', name: 'Family Traveler Suite', price: 4100, capacity: '4 Adults', bed: '2 Queen Beds', amenities: ['Fast Wi-Fi', 'Complimentary Buffet Breakfast', 'Valet Parking'] }
        ]
      },
      {
        id: `stay-dyn-nature-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
        name: `${destName} Foothills Boutique Retreat & Spa`,
        category: 'boutique',
        locationName: `${destName} Approach Ridge (~${Math.round(carDistanceKm * 0.75)} km mark)`,
        distanceMarkKm: Math.round(carDistanceKm * 0.75),
        distanceMarkFormatted: `${Math.round(carDistanceKm * 0.75)} km from Origin`,
        detour: '1.2 km scenic detour',
        dayNumber: 1,
        stopType: 'scenic_halt',
        stopBadge: 'Scenic Nature Halt',
        rating: 4.8,
        reviewCount: 380,
        pricePerNight: 5200,
        priceTier: 'mid',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        tagline: 'Charming regional architecture, local garden dining, and tranquil mountain/country views.',
        services: ['spa', 'pool', 'view', 'free_breakfast', 'parking', 'wifi', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-dyn-nat-1', name: 'Heritage View Chalet', price: 5200, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Panoramic Balcony', 'Ayurvedic Breakfast', 'Swimming Pool Access'] },
          { id: 'rm-dyn-nat-2', name: 'Executive Panorama Suite', price: 7400, capacity: '3 Adults', bed: '1 King + 1 Daybed', amenities: ['Deep Soaking Tub', 'Complimentary Spa Pass', 'Mountain View'] }
        ]
      },
      {
        id: `stay-dyn-dest-${normStart.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${destId}`,
        name: `The Grand ${destName} Sanctuary Resort & Spa`,
        category: 'luxury',
        locationName: `${destName} Central Gateway (${carDistanceKm} km mark)`,
        distanceMarkKm: carDistanceKm,
        distanceMarkFormatted: `${carDistanceKm} km (Destination Core)`,
        detour: 'Destination Center',
        dayNumber: 2,
        stopType: 'destination_gateway',
        stopBadge: 'Day 2 Destination Finale',
        rating: 4.9,
        reviewCount: 620,
        pricePerNight: 8500,
        priceTier: 'luxury',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        tagline: `Signature 5-star hospitality in ${destName} featuring heated pools, fine dining, and spa.`,
        services: ['spa', 'pool', 'view', 'ev_charging', 'free_breakfast', 'parking', 'restaurant', 'cancellation'],
        rooms: [
          { id: 'rm-dyn-dest-1', name: 'Signature Valley King Room', price: 8500, capacity: '2 Adults', bed: '1 King Bed', amenities: ['Valley View', 'Heated Bathroom', 'Buffet Breakfast'] },
          { id: 'rm-dyn-dest-2', name: 'Presidential Royal Suite', price: 14500, capacity: '2 Adults + 2 Kids', bed: '1 Emperor Bed + Living Room', amenities: ['Personal Butler', 'Infinity Pool Pass', 'Free Airport Transfer'] }
        ]
      }
    ],
    famousSpots: dynamicEnroute.famousSpots,
    foodSpots: dynamicEnroute.foodSpots,
    viewpoints: dynamicEnroute.viewpoints,
    enrouteSpots: dynamicEnroute.enrouteSpots
  };
}

/**
 * Default User Profile for WanderLust Platform
 */
export const DEFAULT_USER_PROFILE = {
  id: 'user-aysha',
  name: 'Aysha Rayan',
  handle: '@aysha_explorer',
  bio: 'Global Travel Architect & High-Altitude Enthusiast. Crafting memories one horizon at a time.',
  location: 'Bangalore, India',
  passportId: 'WNDR-2026-X79',
  tier: 'APEX VOYAGER',
  avatarInitials: 'AR',
  avatarUrl: '',
  joinedDate: 'March 2026',
  favoriteDestinations: ['Munnar', 'Ladakh', 'Goa', 'Ooty'],
  travelStyle: 'Luxury Eco-Resorts & High-Speed Transit',
  followersCount: 1420,
  followers: [
    {
      id: 'f-1',
      name: 'Kabir Mehta',
      handle: '@kabir_trails',
      avatar: 'KM',
      role: 'High-Altitude Trekker',
      location: 'Manali, India',
      bio: 'Traversing the Himalayan passes and alpine lakes.',
      isFollowing: true
    },
    {
      id: 'f-2',
      name: 'Zoya Khan',
      handle: '@zoyatravels',
      avatar: 'ZK',
      role: 'Heritage Architect',
      location: 'Jaipur, India',
      bio: 'Passionate about Mughal courtyards and Rajput forts.',
      isFollowing: false
    },
    {
      id: 'f-3',
      name: 'Alex Rivera',
      handle: '@alex_globetrotter',
      avatar: 'AR',
      role: 'Drone Cinematographer',
      location: 'Lisbon, Portugal',
      bio: 'Documenting the world from 400 feet up.',
      isFollowing: true
    },
    {
      id: 'f-4',
      name: 'Ananya Sharma',
      handle: '@ananya_coastal',
      avatar: 'AS',
      role: 'Marine Biologist & Scuba Pro',
      location: 'Goa, India',
      bio: 'Protecting coral reefs and chasing glowing bioluminescence.',
      isFollowing: false
    }
  ],
  following: ['user-sameer', 'user-elena']
};

/**
 * Community Travel Architects & Explorers Network
 */
export const COMMUNITY_EXPLORERS = [
  {
    id: 'user-sameer',
    name: 'Dr. Sameer Siddiqui',
    handle: '@sameer_peaks',
    avatar: 'SS',
    role: 'Western Ghats Specialist & Glaciologist',
    location: 'Pune, India',
    bio: 'Pioneered tea plantation microclimate surveys. 42 Himalayan summits logged.',
    followersCount: 2840,
    followingCount: 310,
    badges: ['Himalayan Apex', 'Western Ghats Pioneer'],
    specialty: 'High-Altitude Treks & Eco Stays',
    favoriteDestinations: ['Munnar', 'Ladakh', 'Wayanad'],
    tripsPlanned: 19
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    handle: '@elena_wanderer',
    avatar: 'ER',
    role: 'Coastal Architecture & Sunset Connoisseur',
    location: 'Nice, France',
    bio: 'Curating boutique heritage villas and seaside cliff retreats across Asia & Europe.',
    followersCount: 3190,
    followingCount: 420,
    badges: ['Coastal Connoisseur', 'Sunset Vanguard'],
    specialty: 'Boutique Seaside Villas & Fine Dining',
    favoriteDestinations: ['Goa', 'Pondicherry', 'Varkala'],
    tripsPlanned: 27
  },
  {
    id: 'user-kenji',
    name: 'Kenji Sato',
    handle: '@kenji_routes',
    avatar: 'KS',
    role: 'Multi-Modal Transit & High-Speed Rail Scout',
    location: 'Kyoto, Japan',
    bio: 'Passionate about scenic mountain railways, EV road trips, and green travel corridors.',
    followersCount: 1980,
    followingCount: 180,
    badges: ['Transit Pathfinder', 'Eco Navigator'],
    specialty: 'Multi-Modal Rail & Scenic Highways',
    favoriteDestinations: ['Ooty', 'Hampi', 'Jaipur'],
    tripsPlanned: 15
  },
  {
    id: 'user-chloe',
    name: 'Chloe Dupont',
    handle: '@chloe_ecolife',
    avatar: 'CD',
    role: 'Sustainable Eco-Resort & Tea Estate Curator',
    location: 'Geneva, Switzerland',
    bio: 'Advocating for zero-waste luxury hospitality, organic farm stays, and cloud forest sanctuaries.',
    followersCount: 4520,
    followingCount: 560,
    badges: ['Emerald Custodian', 'Luxury Connoisseur'],
    specialty: 'Zero-Waste Luxury & Cloud Forest Stays',
    favoriteDestinations: ['Munnar', 'Coorg', 'Darjeeling'],
    tripsPlanned: 34
  },
  {
    id: 'user-nikhil',
    name: 'Nikhil Varma',
    handle: '@nikhil_nomad',
    avatar: 'NV',
    role: 'Heritage Forts & Royal Palace Historian',
    location: 'New Delhi, India',
    bio: 'Uncovering centuries of royal lore, palace suites, and traditional artisanal crafts.',
    followersCount: 2150,
    followingCount: 290,
    badges: ['Royal Historian', 'Heritage Pioneer'],
    specialty: 'Palace Stays & Cultural Trails',
    favoriteDestinations: ['Jaipur', 'Udaipur', 'Mysore'],
    tripsPlanned: 22
  },
  {
    id: 'user-maya',
    name: 'Maya Lin',
    handle: '@maya_culinary',
    avatar: 'ML',
    role: 'Gastronomy Trail Scout & Street Food Critic',
    location: 'Singapore',
    bio: 'Mapping legendary culinary corridors, night bazaars, and farm-to-table secret recipes.',
    followersCount: 3410,
    followingCount: 380,
    badges: ['Master Gourmet', 'Cultural Explorer'],
    specialty: 'Gastronomy Trails & Night Markets',
    favoriteDestinations: ['Amritsar', 'Kochi', 'Lucknow'],
    tripsPlanned: 29
  }
];

