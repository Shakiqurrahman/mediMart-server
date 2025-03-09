"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = require("../modules/auth/authRoute");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute_1.authRoutes,
    },
    // {
    //     path: '/users',
    //     route: userRoutes,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
