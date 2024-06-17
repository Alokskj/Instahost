import mongoose, { Document, Model } from 'mongoose';

// Define the User interface
interface IUser {
    username: string;
    password: string;
    displayName: string;
    email: string;
    verified: boolean;
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

// Define the model
const UserModel = mongoose.model<IUser>('User', userSchema);
export type User = Model<IUser>;
export default UserModel;
