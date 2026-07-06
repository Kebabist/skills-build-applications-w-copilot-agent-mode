import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  exercises?: string[];
  completed: boolean;
  scheduledDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['strength', 'cardio', 'flexibility', 'hiit', 'sports', 'recovery'],
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    exercises: [String],
    completed: {
      type: Boolean,
      default: false,
    },
    scheduledDate: Date,
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
