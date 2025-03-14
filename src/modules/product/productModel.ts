import { model, Schema } from 'mongoose';
import { TProduct } from './productInterface';

const productModel = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        thumbnail: String,
        isStock: {
            type: Boolean,
            default: true,
        },
        requiredPrescriptions: {
            type: Boolean,
            default: false,
        },
        manufacturer: String,
        expiryDate: String,
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Product = model<TProduct>('Product', productModel);
