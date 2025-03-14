import { z } from 'zod';

const updateValidation = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid Email Format' }).optional(),
    avatarUrl: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export const userValidation = {
    updateValidation,
};
