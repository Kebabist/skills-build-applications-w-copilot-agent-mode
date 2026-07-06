import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes';
import { getApiBaseUrl, getFrontendUrl } from './utils/urls';

const app: Express = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for Codespaces support
app.use((req: Request, res: Response, next) => {
  const frontendUrl = getFrontendUrl();
  res.header('Access-Control-Allow-Origin', frontendUrl);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Root route
app.get('/', (req: Request, res: Response) => {
  const apiUrl = getApiBaseUrl();
  res.json({ 
    message: 'OctoFit Tracker API',
    apiUrl,
    version: '1.0.0'
  });
});

// API routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Not Found',
    path: req.path
  });
});

// Start server
const server = app.listen(PORT, () => {
  const apiUrl = getApiBaseUrl();
  const frontendUrl = getFrontendUrl();
  console.log(`\n🚀 OctoFit Tracker API Server`);
  console.log(`API URL: ${apiUrl}`);
  console.log(`Frontend URL: ${frontendUrl}`);
  console.log(`MongoDB: ${MONGODB_URI}`);
  console.log(`\nServer is running on port ${PORT}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.disconnect();
  });
});

