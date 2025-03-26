import status from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import sendResponse from '../../utils/sendResponse';
import { productService } from './productService';
import { productValidation } from './productValidation';

const createProduct = catchAsync(async (req, res) => {
    const validatedBody = productValidation.createProductValidation.parse(
        req.body,
    );

    let imageUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        imageUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(status.INTERNAL_SERVER_ERROR, 'Upload failed');
        }
    }

    const product = await productService.createProductInDB({
        thumbnail: imageUrl,
        ...validatedBody,
        price: Number(validatedBody.price),
        quantity: Number(validatedBody.quantity),
    });

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Product created successfully!',
        data: product,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const products = await productService.getAllProductsFromDB();

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Products retrieved successfully!',
        data: products,
    });
});

const getProductById = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const product = await productService.getProductByIdFromDB(productId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Product retrieved successfully!',
        data: product,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const validatedBody = productValidation.updateProductValidation.parse(
        req.body,
    );

    let imageUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        imageUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(status.INTERNAL_SERVER_ERROR, 'Upload failed');
        }
    }

    const updatedProduct = await productService.updateProductInDB(productId, {
        thumbnail: imageUrl,
        ...validatedBody,
        price: Number(validatedBody.price),
        quantity: Number(validatedBody.quantity),
    });

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
    });
});

const deleteProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    await productService.deleteProductFromDB(productId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Product deleted successfully!',
    });
});

export const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
