import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import { errorMiddleware } from './Middlewares/errorMiddleware';
import { authMiddleware } from './Middlewares/authMiddleware';
import { scopeExtractorMiddleware } from './Middlewares/scopeExtractorMiddleware';
import { scopeValidatorMiddleware } from './Middlewares/scopeValidatorMiddleware';

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);

app.use('/starship/:starshipId/comments', authMiddleware, scopeExtractorMiddleware, (req: any, res: any) => {
  
});

app.use('/starship/:starshipId/likes', authMiddleware, (req: any, res: any) => {
  
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/express-mongo-app');
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

startServer();
