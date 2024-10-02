import express from 'express';
import { globalErrorHandler, notFound } from './middlewares/error.middleware';
import AuthRoutes from './routes/auth.route';
import ProjectRoutes from './routes/project.route';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import _config from './config/_config';
import reverseProxy from './middlewares/reverseProxy.middleware';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import connectDB from './config/db';
import colors from 'colors';
import { googleStrategy, jwtStrategy } from './config/passport';
import path from 'path';
const app = express();
// middlewares
app.use(cors({ origin: _config.baseURL }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(_config.cookieSecret));
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(googleStrategy);

// reverse proxy
app.use(reverseProxy);

// serve static client
app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
app.use('/api/auth', AuthRoutes);
app.use('/api/projects', ProjectRoutes);

// app.get('/', (req, res) => {
//     res.json({ message: 'Server is running 👍' });
// });
// Fallback for SPA (Single Page Application) routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use('*', notFound);

app.use(globalErrorHandler);

const server = http.createServer(app);

async function startServer() {
    try {
        // Connect to the database
        await connectDB();
        console.log(colors.green('✅ Database connected successfully'));

        // Define ports
        const httpPort = _config.port || 3000;

        server.listen(httpPort, () => {
            console.log(
                colors.blue('🚀 Server is running at: ') +
                    colors.underline(`http://localhost:${httpPort}`),
            );
            console.log(
                '\n' +
                    colors.green('------------------------------------------'),
            );
            console.log(
                colors.green('   🚀 All Services are up and running   '),
            );
            console.log(
                colors.green('------------------------------------------') +
                    '\n',
            );
        });
    } catch (error) {
        console.error(colors.red(`❌ Error starting the servers: ${error}`));
        process.exit(1);
    }
}

startServer();
