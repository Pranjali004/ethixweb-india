import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB, isMongoConnected } from './src/config/db.js';
import leadRoutes from './src/routes/leadRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Startup Environment Validation
const REQUIRED_SECRETS = ['ADMIN_EMAIL', 'JWT_SECRET'];
REQUIRED_SECRETS.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Warning: [${key}] is not set in environment. Falling back to default development value.`);
  }
});
if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH) {
  console.warn('⚠️  Warning: Neither ADMIN_PASSWORD nor ADMIN_PASSWORD_HASH is set. Falling back to development credential.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy for Render / Cloud deployments (essential for rate limiting)
app.set('trust proxy', 1);

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // In development or if wildcard / vercel preview
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health Check & Render Wakeup Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'operational',
    service: 'Ethixweb India Redesign API',
    database: isMongoConnected() ? 'MongoDB Atlas (Connected)' : 'Resilient Fallback Repository (Active)',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// Mount Routes
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
});

// Connect to Database and Start Server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Ethixweb India Backend running on port ${PORT}`);
    console.log(`📡 Health Check available at http://localhost:${PORT}/api/health`);
  });
}

startServer();
