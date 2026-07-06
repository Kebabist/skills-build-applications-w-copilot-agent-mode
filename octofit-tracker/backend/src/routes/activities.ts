import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

/**
 * GET /api/activities
 * Get all activities
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'name email')
      .sort({ date: -1 });
    res.json({ 
      message: 'Get all activities',
      count: activities.length,
      activities
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

/**
 * GET /api/activities/:id
 * Get a specific activity by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id)
      .populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ 
      message: `Get activity ${id}`,
      activity
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

/**
 * POST /api/activities
 * Create a new activity log
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, calories, distance, intensity, notes } = req.body;
    const activity = new Activity({
      userId,
      type,
      duration,
      calories,
      distance,
      intensity,
      notes,
    });
    await activity.save();
    res.status(201).json({ 
      message: 'Activity logged',
      activity
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/activities/:id
 * Update an activity
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, duration, calories, distance, intensity, notes } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      id,
      { type, duration, calories, distance, intensity, notes },
      { new: true }
    ).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ 
      message: `Activity ${id} updated`,
      activity
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/activities/:id
 * Delete an activity
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ 
      message: `Activity ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
