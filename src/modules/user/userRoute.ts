import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './userConstant';
import { userController } from './userController';

const router = Router();

router.get('/', auth(USER_ROLE.admin), userController.getAllUsers);
router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    userController.getUserById,
);
router.patch(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    userController.updateUser,
);

export const userRoutes = router;
