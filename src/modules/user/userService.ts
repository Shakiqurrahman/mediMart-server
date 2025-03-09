import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './userModel';

const getUserByIdFromDB = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    if (user.isDeleted) {
        throw new AppError(status.UNAUTHORIZED, 'This user is deleted !');
    }

    return user;
};

const getAllUsersFromDB = async () => {
    const users = await User.find({ role: 'user', isDeleted: false });
    return users;
};

export const userService = {
    getUserByIdFromDB,
    getAllUsersFromDB,
};
