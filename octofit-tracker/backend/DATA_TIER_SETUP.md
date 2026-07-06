# OctoFit Tracker - Data Tier Setup Guide

## Overview

The data tier for OctoFit Tracker is built with MongoDB and Mongoose, providing a robust schema-based approach to data management. This guide explains the database setup, models, and how to populate the database with seed data.

## Database Configuration

### MongoDB Setup

- **Database Name**: `octofit_db`
- **Connection String**: `mongodb://localhost:27017/octofit_db`
- **Port**: 27017

### Configuration File

Database connection is managed in `src/config/database.ts`:

```typescript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
```

### Environment Variables

Add to your `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/octofit_db
```

## Mongoose Models

Five core models are defined for the OctoFit application:

### 1. User Model (`src/models/User.ts`)

Represents individual users in the system.

**Fields:**
- `name` (string, required) - User's full name
- `email` (string, required, unique) - User's email address
- `password` (string, optional) - Hashed password
- `avatar` (string, optional) - Avatar URL
- `bio` (string, optional) - User biography
- `createdAt` (Date) - Account creation timestamp
- `updatedAt` (Date) - Last update timestamp

### 2. Team Model (`src/models/Team.ts`)

Represents groups of users competing together.

**Fields:**
- `name` (string, required, unique) - Team name
- `description` (string, optional) - Team description
- `leader` (ObjectId, ref: User) - Team leader/creator
- `members` (ObjectId[], ref: User) - Array of team member references
- `totalScore` (number, default: 0) - Cumulative team score
- `createdAt` (Date) - Team creation timestamp
- `updatedAt` (Date) - Last update timestamp

### 3. Activity Model (`src/models/Activity.ts`)

Logs user workout activities.

**Fields:**
- `userId` (ObjectId, ref: User, required) - User who performed activity
- `type` (enum) - Activity type: `running`, `cycling`, `swimming`, `gym`, `walking`, `yoga`, `sports`
- `duration` (number, required) - Duration in minutes
- `calories` (number, required) - Calories burned
- `distance` (number, optional) - Distance in kilometers
- `intensity` (enum, default: medium) - Intensity level: `low`, `medium`, `high`
- `notes` (string, optional) - Additional notes
- `date` (Date, default: now) - When the activity occurred
- `createdAt` (Date) - Record creation timestamp

### 4. Leaderboard Model (`src/models/Leaderboard.ts`)

Tracks competitive rankings and scores.

**Fields:**
- `userId` (ObjectId, ref: User, optional) - Individual user entry
- `teamId` (ObjectId, ref: Team, optional) - Team entry
- `rank` (number, required) - Current rank/position
- `score` (number, default: 0) - Total score
- `totalActivities` (number, default: 0) - Count of activities
- `totalCalories` (number, default: 0) - Total calories burned
- `streak` (number, default: 0) - Current activity streak (days)
- `type` (enum, required) - Entry type: `individual` or `team`
- `updatedAt` (Date) - Last update timestamp

### 5. Workout Model (`src/models/Workout.ts`)

Stores workout plans and suggestions.

**Fields:**
- `userId` (ObjectId, ref: User, required) - User the workout is for
- `type` (enum, required) - Workout type: `strength`, `cardio`, `flexibility`, `hiit`, `sports`, `recovery`
- `difficulty` (enum, default: intermediate) - Difficulty level: `beginner`, `intermediate`, `advanced`
- `duration` (number, required) - Duration in minutes
- `description` (string, required) - Workout description
- `exercises` (string[], optional) - Array of exercises
- `completed` (boolean, default: false) - Completion status
- `scheduledDate` (Date, optional) - Scheduled workout date
- `createdAt` (Date) - Creation timestamp
- `updatedAt` (Date) - Last update timestamp

## Seed Data

### Running the Seed Script

To populate the database with realistic test data:

```bash
npm run build
npx ts-node src/scripts/seed.ts
```

Or after compilation:

```bash
npm run build
node dist/scripts/seed.js
```

### Seed Data Summary

The seed script (`src/scripts/seed.ts`) creates:

**Users (5):**
- Alex Johnson (Running/Cardio enthusiast)
- Sarah Chen (Yoga/Pilates instructor)
- Mike Davis (Strength training coach)
- Emily Rodriguez (Cycling enthusiast)
- James Wilson (Swimming athlete)

**Teams (3):**
- Team Velocity (Running & Cardio) - 2 members
- Fitness Legends (Strength Training) - 2 members
- Aqua Athletes (Swimming) - 1 member

**Activities (11):**
- Mix of different activity types across users
- Realistic durations, calories, and intensities
- Spanning 6 days of activity history

**Workouts (6):**
- Variety of workout types and difficulty levels
- Mix of completed and scheduled workouts
- Personalized suggestions for each user

**Leaderboard Entries (8):**
- 5 individual rankings
- 3 team rankings
- Calculated scores and streaks

### Sample Data Statistics

After running the seed script:
- **Total Users**: 5
- **Total Teams**: 3
- **Total Activities**: 11
- **Total Workouts**: 6
- **Leaderboard Entries**: 8 (5 individual + 3 team)

## API Routes with Database Integration

### Users API
- `GET /api/users` - Fetch all users
- `GET /api/users/:id` - Fetch specific user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Activities API
- `GET /api/activities` - Fetch all activities
- `GET /api/activities/:id` - Fetch specific activity
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Teams API
- `GET /api/teams` - Fetch all teams
- `GET /api/teams/:id` - Fetch specific team
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Workouts API
- `GET /api/workouts` - Fetch all workouts
- `GET /api/workouts/:id` - Fetch specific workout
- `POST /api/workouts` - Create new workout
- `GET /api/workouts/suggestions/:userId` - Get personalized suggestions
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Leaderboard API
- `GET /api/leaderboard` - Fetch full leaderboard
- `GET /api/leaderboard/teams` - Fetch team leaderboard
- `GET /api/leaderboard/users` - Fetch user leaderboard
- `GET /api/leaderboard/:id` - Fetch specific entry

## Verifying Data Creation

### Test with API Routes

After starting the server and seeding the database:

```bash
# Get all users
curl http://localhost:8000/api/users

# Get all teams
curl http://localhost:8000/api/teams

# Get all activities
curl http://localhost:8000/api/activities

# Get leaderboard
curl http://localhost:8000/api/leaderboard

# Get workouts
curl http://localhost:8000/api/workouts
```

### Using MongoDB CLI

Connect to MongoDB directly:

```bash
mongosh mongodb://localhost:27017/octofit_db
```

Check collections:

```javascript
// Show all databases
show dbs

// Use octofit_db
use octofit_db

// Show collections
show collections

// Count documents in each collection
db.users.countDocuments()
db.teams.countDocuments()
db.activities.countDocuments()
db.leaderboards.countDocuments()
db.workouts.countDocuments()

// Sample queries
db.users.find()
db.activities.find().pretty()
db.leaderboards.find({ type: 'individual' }).pretty()
```

## Development Workflow

1. **Start MongoDB**:
   ```bash
   mongod --dbpath /path/to/data
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build TypeScript**:
   ```bash
   npm run build
   ```

4. **Seed the database**:
   ```bash
   npx ts-node src/scripts/seed.ts
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

6. **Test with API**:
   ```bash
   curl http://localhost:8000/api/users
   ```

## Project Structure

```
backend/src/
├── models/
│   ├── User.ts
│   ├── Team.ts
│   ├── Activity.ts
│   ├── Leaderboard.ts
│   └── Workout.ts
├── routes/
│   ├── users.ts
│   ├── teams.ts
│   ├── activities.ts
│   ├── leaderboard.ts
│   └── workouts.ts
├── scripts/
│   └── seed.ts
├── config/
│   └── database.ts
├── utils/
│   └── urls.ts
└── index.ts
```

## Notes

- All models use TypeScript interfaces for type safety
- Mongoose automatically handles timestamps (createdAt, updatedAt)
- References between collections use population for easy data access
- The seed script clears existing data before inserting new data
- Sample data includes realistic values for testing API responses
- Database connection uses environment variables for flexibility

## Troubleshooting

### MongoDB not running
```bash
# Check if mongod is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /path/to/data
```

### Connection refused
- Ensure MongoDB is running on port 27017
- Check `MONGODB_URI` environment variable
- Verify database name is `octofit_db`

### Models not found
- Ensure all files in `src/models/` are saved
- Run `npm run build` to recompile TypeScript
- Check that imports in route files match model file names

### Seed script fails
- Verify MongoDB is running
- Check database connection string
- Ensure all model files are properly defined
- Review seed script error messages for specific issues
