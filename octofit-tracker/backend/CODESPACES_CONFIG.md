# Codespaces & Localhost Configuration Guide

## API Configuration Overview

The OctoFit Tracker backend is now fully configured to work seamlessly in both **GitHub Codespaces** and **localhost** environments.

## Configuration Files

### 1. **src/utils/urls.ts** - Environment Detection

This utility automatically detects the environment and generates the correct API URL:

```typescript
/**
 * Get the API base URL based on environment
 * Supports GitHub Codespaces with CODESPACE_NAME environment variable
 */
export const getApiBaseUrl = (): string => {
  const codspaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codspaceName) {
    // Running in GitHub Codespaces
    return `https://${codspaceName}-${port}.app.github.dev`;
  }

  // Running locally
  const host = process.env.HOST || 'localhost';
  return `http://${host}:${port}`;
};
```

### 2. **src/index.ts** - CORS Middleware

Automatic CORS configuration based on frontend URL:

```typescript
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
```

## URL Detection Examples

### Localhost Environment

When running locally:
- API URL: `http://localhost:8000`
- Frontend URL: `http://localhost:5173`
- Database: `mongodb://localhost:27017/octofit_db`

### Codespaces Environment

When running in GitHub Codespaces (with `CODESPACE_NAME=legendary-waddle-6pq6rjw7ggqfxr77`):
- API URL: `https://legendary-waddle-6pq6rjw7ggqfxr77-8000.app.github.dev`
- Frontend URL: `https://legendary-waddle-6pq6rjw7ggqfxr77-5173.app.github.dev`
- Database: `mongodb://localhost:27017/octofit_db` (same as localhost)

## Port Configuration

- **Backend API**: 8000
- **Frontend Dev Server**: 5173
- **MongoDB**: 27017

These are automatically used in the URL generation based on environment variables:
- `PORT` - Backend port (default: 8000)
- `FRONTEND_PORT` - Frontend port (default: 5173)
- `CODESPACE_NAME` - GitHub Codespaces name (auto-detected)

## TypeScript Configuration

Updated `tsconfig.json` to support ts-node with proper Node.js type definitions:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Key addition: `"types": ["node"]` - enables Node.js type definitions for ts-node

## API Endpoints

All endpoints automatically use the environment-aware base URL:

### Root Endpoint
```bash
GET /
```
Response includes:
- `message`: API description
- `apiUrl`: Current environment's API URL
- `version`: API version

### Health Check
```bash
GET /health
```
Response includes:
- `status`: Server status
- `timestamp`: Server time

### API Routes
- `GET /api/users` - Get all users
- `GET /api/teams` - Get all teams
- `GET /api/activities` - Get all activities
- `GET /api/leaderboard` - Get competitive leaderboard
- `GET /api/workouts` - Get all workouts

## Running the Application

### Development Mode
```bash
npm run dev
```
This uses ts-node to run TypeScript directly with automatic reloading.

### Production Mode
```bash
npm run build
npm run start
```

## Testing the API

### Test Root Endpoint (shows environment detection)
```bash
curl http://localhost:8000/
```

### Test Health Check
```bash
curl http://localhost:8000/health
```

### Test Users Endpoint
```bash
curl http://localhost:8000/api/users | jq .
```

### Test Activities Endpoint
```bash
curl http://localhost:8000/api/activities | jq .
```

## Environment Variables

### .env File Configuration

```bash
# Backend server port
PORT=8000

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/octofit_db

# Environment
NODE_ENV=development
```

### Codespaces Auto-Detection

The application automatically detects GitHub Codespaces using:
```bash
process.env.CODESPACE_NAME
```

This variable is automatically set by GitHub Codespaces. No configuration needed!

## Cross-Origin Resource Sharing (CORS)

The API is configured to accept requests from:
- **Localhost**: `http://localhost:5173` (frontend dev server)
- **Codespaces**: `https://{CODESPACE_NAME}-5173.app.github.dev` (frontend in Codespaces)

All HTTP methods are allowed:
- GET
- POST
- PUT
- DELETE
- OPTIONS

## Database Connection

MongoDB connection uses:
```
mongodb://localhost:27017/octofit_db
```

The database name `octofit_db` is consistent across both localhost and Codespaces environments.

## Quick Start Checklist

✅ Backend port configured to 8000
✅ URL detection for Codespaces using `CODESPACE_NAME`
✅ Localhost fallback when Codespaces name not available
✅ CORS middleware configured for both environments
✅ TypeScript configured for ts-node execution
✅ Database connection to `octofit_db` on port 27017
✅ API endpoints tested and returning data
✅ Health check endpoint operational
✅ Environment variables documented

## Troubleshooting

### API not accessible in Codespaces
1. Check that `CODESPACE_NAME` environment variable is set
2. Verify port 8000 is in forwarded ports (should be public)
3. Check CORS headers with curl -i

### TypeScript compilation errors
1. Ensure `tsconfig.json` includes `"types": ["node"]`
2. Run `npm install` to ensure types are installed
3. Try running `npm run build` to identify specific errors

### MongoDB connection issues
1. Verify MongoDB is running: `ps aux | grep mongod`
2. Check connection string in `.env`
3. Ensure database `octofit_db` exists or will be created on first write
