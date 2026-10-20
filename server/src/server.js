const express = require('express');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const destinationsRoutes = require('./routes/destinationsRoutes');
const routesRoutes = require('./routes/routesRoutes');
const aiRoutes = require('./routes/aiRoutes');
const postsRoutes = require('./routes/postsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Zero-dependency CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health & System Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WanderLust Backend API Server',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/destinations', destinationsRoutes);
app.use('/api/routes', routesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/auth', authRoutes);

// Fallback & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 WanderLust API Server running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 API Root:     http://localhost:${PORT}/api/`);
  });
}

module.exports = app;
