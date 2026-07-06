# OctoFit Tracker Backend API

Node.js + Express + TypeScript API server for the OctoFit Tracker multi-tier application.

## Features

- Express.js REST API framework
- TypeScript for type safety
- MongoDB integration with Mongoose
- RESTful route handlers for:
  - `/api/users/` - User management
  - `/api/teams/` - Team management
  - `/api/activities/` - Activity logging
  - `/api/leaderboard/` - Competitive leaderboard
  - `/api/workouts/` - Workout suggestions
- Codespaces-aware API URL support
- CORS middleware for frontend integration
- Health check endpoint

## Prerequisites

- Node.js 18+ (LTS)
- MongoDB 6+ running on `localhost:27017`
- npm or yarn

## Installation

```bash
cd octofit-tracker/backend
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Available environment variables:
- `MONGODB_URI` - MongoDB connection string (default: `mongodb://localhost:27017/octofit-tracker`)
- `PORT` - Server port (default: `8000`)
- `NODE_ENV` - Environment (default: `development`)
- `CODESPACE_NAME` - GitHub Codespace name (auto-detected in Codespaces)

## Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled production server

## API Endpoints

### Root
- `GET /` - API information
- `GET /health` - Health check

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Log activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/leaderboard/teams` - Get team leaderboard
- `GET /api/leaderboard/users` - Get user leaderboard
- `GET /api/leaderboard/:id` - Get leaderboard entry

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create workout
- `GET /api/workouts/suggestions/:userId` - Get personalized suggestions
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Development

Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:8000` (or `https://{CODESPACE_NAME}-8000.app.github.dev` in Codespaces).

### Codespaces Support

When running in GitHub Codespaces, the API automatically detects the environment using the `CODESPACE_NAME` variable and provides the correct public URL:

```
API URL: https://{CODESPACE_NAME}-8000.app.github.dev
Frontend URL: https://{CODESPACE_NAME}-5173.app.github.dev
```

## Database

MongoDB connection is configured in `src/config/database.ts`. The database will automatically connect on server startup.

To seed the database with test data:

```bash
npm run build
npx ts-node src/scripts/seed.ts
```

## Building

Compile TypeScript to JavaScript:

```bash
npm run build
```

Output files are in the `dist/` directory.

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main Express app
│   ├── config/
│   │   └── database.ts       # MongoDB configuration
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── users.ts
│   │   ├── teams.ts
│   │   ├── activities.ts
│   │   ├── leaderboard.ts
│   │   └── workouts.ts
│   ├── utils/
│   │   └── urls.ts           # Codespaces URL utilities
│   └── scripts/
│       └── seed.ts           # Database seeding
├── dist/                     # Compiled JavaScript
├── tsconfig.json             # TypeScript configuration
├── package.json
└── .env.example
```

## License

ISC
