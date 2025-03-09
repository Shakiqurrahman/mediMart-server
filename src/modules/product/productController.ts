import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './productService';
import { productValidation } from './productValidation';

const createProduct = catchAsync(async (req, res) => {
    const validatedBody = productValidation.createProductValidation.parse(
        req.body,
    );

    const product = await productService.createProductInDB(validatedBody);

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

    const updatedProduct = await productService.updateProductInDB(
        productId,
        validatedBody,
    );

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
