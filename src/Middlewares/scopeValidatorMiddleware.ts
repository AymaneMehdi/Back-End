import { Request, Response, NextFunction } from 'express';

export const scopeValidatorMiddleware = (requiredScope: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.scope !== requiredScope) {
      return res.status(403).json({ message: 'Insufficient scope' });
    }
    next();
  };
};
