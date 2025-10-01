const express = require('express');
const cors = require('cors');
const { config } = require('./configs');
const Database = require('./libs/initDB');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
const db = new Database({
  dbURI: config.DB_URI,
  dbName: config.DB_NAME,
  options: {
    retryWrites: true,
    w: 'majority',
  },
});

// Routes
app.use(require('./routes/core.routes'));
app.use('/api/v1', require('./routes/geo.routes'));

// Catch all unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

app.listen(config.PORT, async () => {
  await db.connect();
  console.log(`Server is running on port ${config.PORT}`);
});

process.on('SIGINT', async () => {
  console.warn('SIGINT | Process terminated');
  await db.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.warn('SIGTERM | Process terminated');
  await db.disconnect();
  process.exit(0);
});
