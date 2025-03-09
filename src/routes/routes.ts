import { Router } from 'express';
import { authRoutes } from '../modules/auth/authRoute';
import { productRoutes } from '../modules/product/productRoute';
import { userRoutes } from '../modules/user/userRoute';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/products',
        route: productRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
