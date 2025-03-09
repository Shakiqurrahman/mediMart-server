import status from 'http-status';
import { config } from '../../config/config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './authService';
import { authValidation } from './authValidation';

const registerUser = catchAsync(async (req, res) => {
    const validatedData = authValidation.registerValidationSchema.parse(
        req.body,
    );

    const { user, accessToken, refreshToken } =
        await authService.registerUserIntoDB(validatedData);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'User registered successfully',
        data: {
            user,
            accessToken,
        },
    });
});

const loginUser = catchAsync(async (req, res) => {
    const validatedData = authValidation.loginValidationSchema.parse(req.body);

    const { user, accessToken, refreshToken } =
        await authService.loginUserFromDB(validatedData);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Login successful',
        data: {
            accessToken,
            user,
        },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = await authService.generateNewAccessToken(refreshToken);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: {
            accessToken,
        },
    });
});

const logoutUser = catchAsync(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!req.cookies || !refreshToken) {
        return sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: 'Logged out successfully',
        });
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Logged out successfully',
    });
});

export const authControllers = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
};
