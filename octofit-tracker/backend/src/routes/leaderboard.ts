import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

/**
 * GET /api/leaderboard
 * Get the competitive leaderboard
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'name email')
      .populate('teamId', 'name')
      .sort({ rank: 1 });
    res.json({ 
      message: 'Get leaderboard',
      count: leaderboard.length,
      leaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

/**
 * GET /api/leaderboard/teams
 * Get team leaderboard
 */
router.get('/teams', async (req: Request, res: Response) => {
  try {
    const teamLeaderboard = await Leaderboard.find({ type: 'team' })
      .populate('teamId', 'name')
      .sort({ rank: 1 });
    res.json({ 
      message: 'Get team leaderboard',
      count: teamLeaderboard.length,
      teamLeaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

/**
 * GET /api/leaderboard/users
 * Get user leaderboard
 */
router.get('/users', async (req: Request, res: Response) => {
  try {
    const userLeaderboard = await Leaderboard.find({ type: 'individual' })
      .populate('userId', 'name email')
      .sort({ rank: 1 });
    res.json({ 
      message: 'Get user leaderboard',
      count: userLeaderboard.length,
      userLeaderboard
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard' });
  }
});

/**
 * GET /api/leaderboard/:id
 * Get leaderboard entry for a specific user or team
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entry = await Leaderboard.findById(id)
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json({ 
      message: `Get leaderboard entry for ${id}`,
      entry
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

export default router;
