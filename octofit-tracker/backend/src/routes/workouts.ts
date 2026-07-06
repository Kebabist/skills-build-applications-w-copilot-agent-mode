import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts
 * Get all available workouts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json({ 
      message: 'Get all workouts',
      count: workouts.length,
      workouts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

/**
 * GET /api/workouts/:id
 * Get a specific workout by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id)
      .populate('userId', 'name email');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ 
      message: `Get workout ${id}`,
      workout
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

/**
 * POST /api/workouts
 * Create a new workout suggestion
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, difficulty, duration, description, exercises, completed, scheduledDate } = req.body;
    const workout = new Workout({
      userId,
      type,
      difficulty,
      duration,
      description,
      exercises,
      completed,
      scheduledDate,
    });
    await workout.save();
    res.status(201).json({ 
      message: 'Workout suggestion created',
      workout
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/workouts/suggestions/:userId
 * Get personalized workout suggestions for a user
 */
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const suggestions = await Workout.find({
      userId,
      completed: false,
    })
      .populate('userId', 'name email')
      .sort({ scheduledDate: 1 });
    res.json({ 
      message: `Get suggestions for user ${userId}`,
      count: suggestions.length,
      suggestions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

/**
 * PUT /api/workouts/:id
 * Update a workout
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, difficulty, duration, description, exercises, completed, scheduledDate } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      id,
      { type, difficulty, duration, description, exercises, completed, scheduledDate },
      { new: true }
    ).populate('userId', 'name email');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ 
      message: `Workout ${id} updated`,
      workout
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/workouts/:id
 * Delete a workout
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ 
      message: `Workout ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
