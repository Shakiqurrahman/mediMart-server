import { z } from 'zod';

const createProductValidation = z.object({
    name: z.string({ required_error: 'Product name is required' }),
    description: z.string().optional(),
    price: z
        .number({ required_error: 'Price is required' })
        .positive('Price must be a positive number'),
    quantity: z.number({ required_error: 'Quantity is required' }),
    isStock: z.boolean().default(true),
    requiredPrescriptions: z.boolean().default(false),
    manufacturer: z.string().optional(),
    expiryDate: z.string().optional(),
    isDeleted: z.boolean().default(false),
});

export const updateProductValidation = createProductValidation.partial();

export const productValidation = {
    createProductValidation,
    updateProductValidation,
};
