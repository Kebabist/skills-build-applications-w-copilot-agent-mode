import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected to octofit_db database on port 27017');
    console.log('🌱 Starting database seed...\n');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        bio: 'Fitness enthusiast and marathon runner',
      },
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        bio: 'Yoga and pilates instructor',
      },
      {
        name: 'Mike Davis',
        email: 'mike.davis@example.com',
        bio: 'Gym and strength training coach',
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@example.com',
        bio: 'Cycling and outdoor sports lover',
      },
      {
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        bio: 'Swimming and triathlon athlete',
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.insertMany([
      {
        name: 'Team Velocity',
        description: 'High-energy cardio and running team',
        leader: users[0]._id,
        members: [users[0]._id, users[3]._id],
        totalScore: 1250,
      },
      {
        name: 'Fitness Legends',
        description: 'Strength training and gym enthusiasts',
        leader: users[2]._id,
        members: [users[2]._id, users[1]._id],
        totalScore: 980,
      },
      {
        name: 'Aqua Athletes',
        description: 'Swimming and water sports team',
        leader: users[4]._id,
        members: [users[4]._id],
        totalScore: 750,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    const activityDates = [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      new Date(Date.now()),
    ];

    const activities = await Activity.insertMany([
      // Alex's activities
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        calories: 450,
        distance: 7.2,
        intensity: 'high',
        date: activityDates[0],
      },
      {
        userId: users[0]._id,
        type: 'gym',
        duration: 60,
        calories: 350,
        intensity: 'medium',
        date: activityDates[1],
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 50,
        calories: 500,
        distance: 8.1,
        intensity: 'high',
        date: activityDates[6],
      },
      // Sarah's activities
      {
        userId: users[1]._id,
        type: 'yoga',
        duration: 75,
        calories: 250,
        intensity: 'low',
        date: activityDates[2],
      },
      {
        userId: users[1]._id,
        type: 'gym',
        duration: 55,
        calories: 320,
        intensity: 'medium',
        date: activityDates[5],
      },
      // Mike's activities
      {
        userId: users[2]._id,
        type: 'gym',
        duration: 90,
        calories: 600,
        intensity: 'high',
        date: activityDates[1],
      },
      {
        userId: users[2]._id,
        type: 'gym',
        duration: 85,
        calories: 580,
        intensity: 'high',
        date: activityDates[4],
      },
      // Emily's activities
      {
        userId: users[3]._id,
        type: 'cycling',
        duration: 60,
        calories: 400,
        distance: 25.3,
        intensity: 'medium',
        date: activityDates[2],
      },
      {
        userId: users[3]._id,
        type: 'cycling',
        duration: 75,
        calories: 500,
        distance: 31.5,
        intensity: 'high',
        date: activityDates[6],
      },
      // James's activities
      {
        userId: users[4]._id,
        type: 'swimming',
        duration: 45,
        calories: 380,
        distance: 2.1,
        intensity: 'high',
        date: activityDates[3],
      },
      {
        userId: users[4]._id,
        type: 'swimming',
        duration: 50,
        calories: 420,
        distance: 2.3,
        intensity: 'high',
        date: activityDates[6],
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        type: 'strength',
        difficulty: 'advanced',
        duration: 60,
        description: 'Upper body strength training focusing on chest and shoulders',
        exercises: ['Bench press', 'Shoulder press', 'Lateral raises'],
        completed: true,
        scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'cardio',
        difficulty: 'advanced',
        duration: 45,
        description: 'High-intensity interval training on the track',
        exercises: ['Sprint intervals', 'Recovery jogs'],
        completed: false,
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 75,
        description: 'Full body yoga and stretching session',
        exercises: ['Sun salutation', 'Downward dog', 'Child pose'],
        completed: true,
        scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        type: 'strength',
        difficulty: 'advanced',
        duration: 90,
        description: 'Full body strength and power development',
        exercises: ['Deadlifts', 'Squats', 'Power cleans'],
        completed: true,
        scheduledDate: new Date(Date.now()),
      },
      {
        userId: users[3]._id,
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 60,
        description: 'Cycling endurance training on rolling hills',
        exercises: ['Hill climbs', 'Flat sprints'],
        completed: false,
        scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id,
        type: 'hiit',
        difficulty: 'intermediate',
        duration: 30,
        description: 'Swimming interval training for speed and endurance',
        exercises: ['Sprint laps', 'Recovery laps'],
        completed: true,
        scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      // Individual leaderboard
      {
        userId: users[0]._id,
        rank: 1,
        score: 1350,
        totalActivities: 3,
        totalCalories: 1400,
        streak: 7,
        type: 'individual',
      },
      {
        userId: users[2]._id,
        rank: 2,
        score: 1180,
        totalActivities: 2,
        totalCalories: 1180,
        streak: 5,
        type: 'individual',
      },
      {
        userId: users[3]._id,
        rank: 3,
        score: 900,
        totalActivities: 2,
        totalCalories: 900,
        streak: 3,
        type: 'individual',
      },
      {
        userId: users[4]._id,
        rank: 4,
        score: 800,
        totalActivities: 2,
        totalCalories: 800,
        streak: 4,
        type: 'individual',
      },
      {
        userId: users[1]._id,
        rank: 5,
        score: 570,
        totalActivities: 2,
        totalCalories: 570,
        streak: 2,
        type: 'individual',
      },
      // Team leaderboard
      {
        teamId: teams[0]._id,
        rank: 1,
        score: 2250,
        totalActivities: 5,
        totalCalories: 2300,
        streak: 6,
        type: 'team',
      },
      {
        teamId: teams[1]._id,
        rank: 2,
        score: 1750,
        totalActivities: 4,
        totalCalories: 1750,
        streak: 4,
        type: 'team',
      },
      {
        teamId: teams[2]._id,
        rank: 3,
        score: 800,
        totalActivities: 2,
        totalCalories: 800,
        streak: 3,
        type: 'team',
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Teams: ${teams.length}`);
    console.log(`  - Activities: ${activities.length}`);
    console.log(`  - Workouts: ${workouts.length}`);
    console.log(`  - Leaderboard Entries: ${leaderboardEntries.length}`);
    console.log(`\nDatabase: octofit_db on mongodb://localhost:27017\n`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
