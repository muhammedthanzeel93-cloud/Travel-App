const http = require('http');
const assert = require('assert');
const app = require('./server');

const TEST_PORT = 5099;
let server;

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: data ? JSON.parse(data) : null
            });
          } catch (e) {
            resolve({ statusCode: res.statusCode, rawBody: data });
          }
        });
      }
    );

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runServerTests() {
  console.log('\n🧪 Starting WanderLust Backend API Integration Tests...\n');

  server = app.listen(TEST_PORT);
  let passedCount = 0;
  let failedCount = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`  ✗ ${name}:`, err.message);
      failedCount++;
    }
  }

  try {
    // 1. Health Check
    await test('GET /api/health returns status ok and service metadata', async () => {
      const res = await makeRequest('/api/health');
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.status, 'ok');
      assert.ok(res.body.version);
    });

    // 2. Destinations
    await test('GET /api/destinations returns curated destinations list', async () => {
      const res = await makeRequest('/api/destinations');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.length > 0);
    });

    await test('GET /api/destinations/trending returns trending destinations', async () => {
      const res = await makeRequest('/api/destinations/trending');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body.data));
    });

    await test('POST /api/destinations creates custom user destination', async () => {
      const newDest = {
        title: 'Varkala Cliff Trail',
        location: 'Kerala, India',
        pricePerDay: 3200,
        tags: ['Coastal', 'Cliffs', 'Beach']
      };
      const res = await makeRequest('/api/destinations', 'POST', newDest);
      assert.strictEqual(res.statusCode, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.title, 'Varkala Cliff Trail');
    });

    // 3. Multi-Modal Routes & Hotels
    await test('POST /api/routes/plan calculates multi-modal itinerary and stops', async () => {
      const payload = {
        origin: 'Bangalore',
        destination: 'Munnar',
        transitMode: 'car',
        isMultiDay: true
      };
      const res = await makeRequest('/api/routes/plan', 'POST', payload);
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.data.distanceKm > 0);
      assert.ok(Array.isArray(res.body.data.enrouteSpots));
      assert.ok(Array.isArray(res.body.data.routeHotels));
    });

    await test('GET /api/routes/hotels filters hotels by rating and amenities', async () => {
      const res = await makeRequest('/api/routes/hotels?minRating=4.5');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body.data));
      res.body.data.forEach((h) => assert.ok(h.rating >= 4.5));
    });

    // 4. AI Travel Concierge
    await test('POST /api/ai/itinerary generates customized day-by-day plan', async () => {
      const payload = {
        destination: 'Zanskar Frozen Valley',
        days: 4,
        style: 'High-Altitude Alpine',
        budgetTier: 'Luxury'
      };
      const res = await makeRequest('/api/ai/itinerary', 'POST', payload);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.data.totalDays, 4);
      assert.strictEqual(res.body.data.days.length, 4);
      assert.ok(Array.isArray(res.body.data.packingTips));
    });

    await test('POST /api/ai/chat returns contextual travel concierge advice', async () => {
      const payload = { message: 'What is the best winter weather gear?' };
      const res = await makeRequest('/api/ai/chat', 'POST', payload);
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.data.reply.length > 0);
    });

    // 5. Social Feed & Posts
    await test('GET /api/posts returns Instagram feed posts', async () => {
      const res = await makeRequest('/api/posts');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.length > 0);
    });

    await test('POST /api/posts publishes new travel photo post', async () => {
      const payload = {
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        caption: 'Sunset over turquoise ocean horizon #TravelLife',
        location: 'Varkala Beach'
      };
      const res = await makeRequest('/api/posts', 'POST', payload);
      assert.strictEqual(res.statusCode, 201);
      assert.strictEqual(res.body.data.location, 'Varkala Beach');
    });

    await test('POST /api/posts/:id/like toggles post like status', async () => {
      const res = await makeRequest('/api/posts/post-1/like', 'POST');
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.data.id, 'post-1');
      assert.strictEqual(typeof res.body.data.isLiked, 'boolean');
    });

    // 6. User Profile & Story Highlights
    await test('GET /api/profile returns user credentials and counters', async () => {
      const res = await makeRequest('/api/profile');
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.data.name, 'Aysha Rayan');
      assert.strictEqual(typeof res.body.data.followersCount, 'number');
    });

    await test('GET /api/profile/story-highlights returns horizontal story highlights', async () => {
      const res = await makeRequest('/api/profile/story-highlights');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body.data));
    });

    await test('POST /api/profile/follow/:id toggles follow of community explorer', async () => {
      const res = await makeRequest('/api/profile/follow/exp-3', 'POST');
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.data.id, 'exp-3');
      assert.strictEqual(res.body.data.isFollowing, true);
    });

    // 7. Dynamic Budget
    await test('POST /api/budget/calculate returns itemized cost forecast', async () => {
      const payload = {
        days: 5,
        travelers: 2,
        stayTier: 'comfort'
      };
      const res = await makeRequest('/api/budget/calculate', 'POST', payload);
      assert.strictEqual(res.statusCode, 200);
      assert.ok(res.body.data.grandTotal > 0);
      assert.ok(res.body.data.breakdown.accommodation > 0);
    });
  } finally {
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`Server Tests Finished: ${passedCount} passed, ${failedCount} failed.`);
  console.log(`========================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

if (require.main === module) {
  runServerTests();
}

module.exports = runServerTests;
