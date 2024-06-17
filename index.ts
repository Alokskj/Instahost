import server from './src/app';
import _config from './src/config/_config';
import connectDB from './src/config/db';
import redis from './src/config/redis';
import colors from 'colors';
import io, { socketServer } from './src/config/socket';

async function startServer() {
    try {
        // Connect to the database
        const dbConnection = await connectDB();
        console.log(colors.green('✅ Database connected successfully'));

        // Connect to Redis
        await redis.hello(() => {
            console.log(colors.green('✅ Redis connected successfully' + '\n'));
        });

        // Define ports
        const httpPort = _config.port || 3000;
        // attact server to socket
        socketServer(server);
        // Start the HTTP server
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
