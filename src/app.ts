import express, { Request, Response } from 'express';
import { globalErrorHandler, notFound } from './middlewares/error.middleware';
import UserRoutes from './routes/auth.route';
import ProjectRoutes from './routes/project.route';
import passport from 'passport';
import jwtStrategy from './config/passport';
import cookieParser from 'cookie-parser';
import _config from './config/_config';
import reverseProxy from './middlewares/reverseProxy.middleware';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
// middlewares
app.use(cors({ origin: _config.baseURL }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(_config.cookieSecret));
app.use(passport.initialize());
passport.use(jwtStrategy);
// reverse proxy
app.use(reverseProxy);
// routes
app.use('/api/user', UserRoutes);
app.use('/api/project', ProjectRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server is running' });
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
