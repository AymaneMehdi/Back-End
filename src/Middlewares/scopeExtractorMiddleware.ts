import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const scopeExtractorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).populate('scope');
    if (user) {
      req.scope = user.scope?.name;
    }
    next();
  } catch (error) {
    next(error);
  }
};
