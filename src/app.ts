import express, { Request, Response } from 'express';
import { globalErrorHandler, notFound } from './middlewares/error.middleware';
import UserRoutes from './routes/auth.route';

const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use('/api/user', UserRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is running' });
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
