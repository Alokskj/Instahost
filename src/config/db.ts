import mongoose from 'mongoose';
import _config from './_config';

// connect's to mongodb database
const connectDB = async () => {
    try {
        mongoose.connection.on('error', (err) => {
            console.log('Failed to connec to database', err);
        });
        await mongoose.connect(_config.mongoURI as string);
    } catch (error) {
        console.log('Failed to connect to database', error);
        process.exit(1);
    }
};

export default connectDB;
