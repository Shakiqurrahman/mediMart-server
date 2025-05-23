/* eslint-disable no-unused-vars */

import { Document } from 'mongoose';
import { USER_ROLE } from './userConstant';

export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: string;
    phone ?: string;
    address ?: string;
    isDeleted: boolean;
    avatarUrl?: string;
};

type TUserMethods = {
    comparePassword(password: string): Promise<boolean>;
    generateAccessToken(): Promise<string>;
};

export interface IUser extends TUser, TUserMethods, Document {}
