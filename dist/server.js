"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const db_1 = require("./db/db");
let server;
(0, db_1.connectDB)()
    .then(() => {
    server = app_1.app.listen(config_1.config.port, () => {
        console.log(`☑️ Server is running at port : ${config_1.config.port}`);
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
