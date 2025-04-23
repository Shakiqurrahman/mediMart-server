import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './userInterface';
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
    const users = await User.find({ role: 'user'});
    return users;
};

const updateUserByIdInDB = async (userId: string, payload: Partial<TUser>) => {
    const user = await User.findByIdAndUpdate(userId, payload, { new: true });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found!');
    }

    return user;
};

export const userService = {
    getUserByIdFromDB,
    getAllUsersFromDB,
    updateUserByIdInDB,
};
