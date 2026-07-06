import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

/**
 * GET /api/teams
 * Get all teams
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email')
      .populate('members', 'name email');
    res.json({ 
      message: 'Get all teams',
      count: teams.length,
      teams
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

/**
 * GET /api/teams/:id
 * Get a specific team by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id)
      .populate('leader', 'name email')
      .populate('members', 'name email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ 
      message: `Get team ${id}`,
      team
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

/**
 * POST /api/teams
 * Create a new team
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader, members } = req.body;
    const team = new Team({ name, description, leader, members });
    await team.save();
    res.status(201).json({ 
      message: 'Team created',
      team
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PUT /api/teams/:id
 * Update a team
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, members, totalScore } = req.body;
    const team = await Team.findByIdAndUpdate(
      id,
      { name, description, members, totalScore },
      { new: true }
    )
      .populate('leader', 'name email')
      .populate('members', 'name email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ 
      message: `Team ${id} updated`,
      team
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/teams/:id
 * Delete a team
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ 
      message: `Team ${id} deleted`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
