import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Scope from '../models/Scope';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, scope } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const scopeObj = await Scope.findOne({ name: scope });
    const user = new User({ email, password: hashedPassword, scope: scopeObj?._id });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
