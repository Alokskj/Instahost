import mongoose from 'mongoose';

type User = {
    username: string;
    password: string;
    displayName: string;
    emai: string;
};

const userSchema = new mongoose.Schema<User>({
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
    },
    emai: {
        type: String,
        required: [true, 'email is required '],
    },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
