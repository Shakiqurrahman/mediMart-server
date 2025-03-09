import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async () => {
    try {
        mongoose.connect(config.MONGODB_URI as string);
    } catch (error) {
        console.log('MongoDB connection Failed : ', error);
        process.exit(1); //current process will stop!! - [node js]
    }
};
