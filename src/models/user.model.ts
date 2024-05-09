import mongoose from 'mongoose';
import { projectType } from './project.model';

export type User = {
    username: string;
    password: string;
    displayName: string;
    email: string;
    verified: boolean;
};

const userSchema = new mongoose.Schema<User>(
    {
        displayName: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        email: {
            type: String,
            required: [true, 'email is required '],
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
