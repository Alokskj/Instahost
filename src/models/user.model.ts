import mongoose, { Document } from 'mongoose';

// Define the User interface
export interface IUser extends Document {
    username: string;
    password: string;
    avatar: string;
    displayName: string;
    email: string;
    googleId?: string;
    verified: boolean;
    lastLogin: Date;
}

// Define the schema
const userSchema = new mongoose.Schema<IUser>(
    {
        displayName: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        avatar: {
            type: String,
            default: 'https://i.ibb.co/VgF6dgQ/9440461.jpg',
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required'],
        },
        googleId: {
            type: String,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

// Define the model
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
