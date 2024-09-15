import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { authMiddleware } from '../Middlewares/authMiddleware';

const router = express.Router();

router.get('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).populate('scope');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
