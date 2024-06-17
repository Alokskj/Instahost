import mongoose, { Schema } from 'mongoose';

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const TokenModel = mongoose.model('token', tokenSchema);

export default TokenModel;
