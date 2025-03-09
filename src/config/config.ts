import dotenv from 'dotenv';
dotenv.config();

export const config = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};