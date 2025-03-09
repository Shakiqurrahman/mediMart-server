import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './userService';

const getUserById = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const user = await userService.getUserByIdFromDB(userId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'user retrieved succesfully!',
        data: user,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsersFromDB();
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Users retrived succesfully!',
        data: users,
    });
});

const updateUser = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const updatedUser = await userService.updateUserByIdInDB(userId, req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Updated successfully!',
        data: updatedUser,
    });
});

export const userController = {
    getUserById,
    getAllUsers,
    updateUser,
};
