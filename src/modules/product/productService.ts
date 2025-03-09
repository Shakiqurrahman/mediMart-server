import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './productInterface';
import { Product } from './productModel';

const createProductInDB = async (payload: TProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
};

const getAllProductsFromDB = async () => {
    const products = await Product.find({ isDeleted: false }).sort({
        createdAt: -1,
    });
    return products;
};

const getProductByIdFromDB = async (productId: string) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError(status.NOT_FOUND, 'Product not found!');
    }
    if (product.isDeleted) {
        throw new AppError(status.NOT_FOUND, 'Product is deleted!');
    }
    return product;
};

const updateProductInDB = async (
    productId: string,
    payload: Partial<TProduct>,
) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, payload, {
        new: true,
        runValidators: true,
    });

    if (!updatedProduct) {
        throw new AppError(status.NOT_FOUND, 'Product not found!');
    }

    return updatedProduct;
};

const deleteProductFromDB = async (productId: string) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError(status.NOT_FOUND, 'Product not found!');
    }

    product.isDeleted = true;
    await product.save();
    return;
};

export const productService = {
    createProductInDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
