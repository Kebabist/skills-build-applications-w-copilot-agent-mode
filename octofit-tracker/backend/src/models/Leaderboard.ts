import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  rank: number;
  score: number;
  totalActivities: number;
  totalCalories: number;
  streak: number;
  type: 'individual' | 'team';
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    rank: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['individual', 'team'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>(
  'Leaderboard',
  leaderboardSchema
);
