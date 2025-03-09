/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import status from 'http-status';
import { config } from '../../config/config';
import AppError from '../../errors/AppError';
import { User } from '../user/userModel';
import { TLoginPayload, TRegisterPayload } from './authInterface';
import { createToken, verifyToken } from './authUtils';

const registerUserIntoDB = async (payload: TRegisterPayload) => {
    const isUserRegistered = await User.findOne({
        email: payload.email,
    });

    if (isUserRegistered) {
        throw new AppError(status.CONFLICT, 'User already exists');
    }

    const newUser = await User.create(payload);
    const { password, ...data } = newUser.toObject();

    const jwtPayload = {
        userId: newUser.id,
        role: newUser.role,
    };
    const accessToken = createToken(
        jwtPayload,
        config.ACCESS_TOKEN_SECRET as string,
        config.ACCESS_TOKEN_EXPIRY as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.REFRESH_TOKEN_SECRET as string,
        config.REFRESH_TOKEN_EXPIRY as string,
    );
    return {
        accessToken,
        refreshToken,
        user: data,
    };
};

const loginUserFromDB = async (payload: TLoginPayload) => {
    const user = await User.findOne({ email: payload.email }).select(
        '+password',
    );

    if (!user || !(await user.comparePassword(payload.password))) {
        throw new AppError(status.UNAUTHORIZED, 'Invalid credentials!');
    }

    if (user?.isDeleted) {
        throw new AppError(status.UNAUTHORIZED, 'This user is deleted!');
    }

    if (user.userStatus === 'blocked') {
        throw new AppError(status.UNAUTHORIZED, 'This user is blocked!');
    }

    const { password, ...restUser } = user.toObject();

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = createToken(
        jwtPayload,
        config.ACCESS_TOKEN_SECRET as string,
        config.ACCESS_TOKEN_EXPIRY as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.REFRESH_TOKEN_SECRET as string,
        config.REFRESH_TOKEN_EXPIRY as string,
    );

    return {
        accessToken,
        refreshToken,
        user: restUser,
    };
};

const generateNewAccessToken = async (
    refreshToken: string,
): Promise<string> => {
    if (!refreshToken) {
        throw new AppError(status.NOT_FOUND, 'Refresh token not found !');
    }
    const decoded = verifyToken(
        refreshToken,
        config.REFRESH_TOKEN_SECRET as string,
    );

    const { userId } = decoded;

    // checking if the user is exist
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    if (user?.isDeleted) {
        throw new AppError(status.NOT_FOUND, 'This user is deleted !');
    }

    const isBlocked = user?.userStatus === 'blocked';

    if (isBlocked) {
        throw new AppError(status.NOT_FOUND, 'This user is blocked !');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    
    const accessToken = createToken(
        jwtPayload,
        config.ACCESS_TOKEN_SECRET as string,
        config.ACCESS_TOKEN_EXPIRY as string,
    );
    return accessToken;
};

export const authService = {
    registerUserIntoDB,
    loginUserFromDB,
    generateNewAccessToken,
};
