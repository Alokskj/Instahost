import app from './src/app';
import _config from './src/config/_config';
import connectDB from './src/config/db';
import redis from './src/config/redis';
import server from './src/config/socket';
async function startServer() {
    await connectDB();
    await redis.hello();
    const port = _config.port || 3000;
    server.listen(3000, () => {
        console.log(`Socket server is running at port 3000`);
    });
    app.listen(port, () => console.log(`Server is running at port ${port}`));
}

startServer();
