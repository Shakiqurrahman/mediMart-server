import status from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import sendResponse from '../../utils/sendResponse';
import { userService } from './userService';
import { userValidation } from './userValidation';

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
    const validatedData = userValidation.updateValidation.parse(req.body);
    let imageUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        imageUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(status.INTERNAL_SERVER_ERROR, 'Upload failed');
        }
    }

    const updatedUser = await userService.updateUserByIdInDB(userId, {
        avatarUrl: imageUrl,
        ...validatedData,
    });

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
