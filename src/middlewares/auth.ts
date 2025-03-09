import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/userInterface';
import { User } from '../modules/user/userModel';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token =
                req.headers['authorization']?.split(' ')[1] ||
                req?.headers?.authorization;

            // checking if the token is missing
            if (!token) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    'Invalid Token!',
                );
            }

            // try {
                // checking if the given token is valid
                const decoded = jwt.verify(
                    token,
                    config.ACCESS_TOKEN_SECRET as string,
                ) as JwtPayload;

                const { role, userId } = decoded;

                const user = await User.findById(userId);

                if (!user) {
                    throw new AppError(
                        httpStatus.NOT_FOUND,
                        'This user is not found!',
                    );
                }

                if (user.isDeleted) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'This user is deleted!',
                    );
                }

                if (user.userStatus === 'blocked') {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'This user is blocked!',
                    );
                }

                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'You are not authorized!',
                    );
                }

                req.user = decoded as JwtPayload;
                next();
                // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            // } catch (error) {
            //     throw new AppError(httpStatus.FORBIDDEN, 'Invalid token');
            // }
        },
    );
};

export default auth;
