import app from './src/app';
import _config from './src/config/_config';
import connectDB from './src/config/db';
async function startServer() {
    await connectDB();
    const port = _config.port || 3000;
    app.listen(port, () => console.log(`Server is running at port ${port}`));
}

startServer();
