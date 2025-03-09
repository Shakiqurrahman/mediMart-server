import { Server } from 'http';
import { app } from './app';
import { config } from './config/config';
import { connectDB } from './db/db';

let server: Server;

connectDB()
    .then(() => {
        server = app.listen(config.port, () => {
            console.log(`☑️ Server is running at port : ${config.port}`);
        });
    })
    .catch((error) => console.log('❗MONGODB connection failed!!! ', error));

process.on('unhandledRejection', () => {
    console.log('❗Unhandled Rejection at:', new Date().toISOString());
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log('❗UncaughtException at:', new Date().toISOString());
    process.exit(1);
});
