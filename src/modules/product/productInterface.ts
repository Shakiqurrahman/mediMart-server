export type TProduct = {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    isStock: boolean;
    requiredPrescriptions: boolean;
    manufacturer?: string;
    expiryDate?: string;
    isDeleted?: boolean;
};
