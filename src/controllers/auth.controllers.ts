import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import UserModel from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import _config from '../config/_config';
import { sendEmail } from '../config/nodemailer';
import verifyEmailTemplate from '../utils/templates/verifyEmailTemplate';
import TokenModel from '../models/token.model';
import crypto from 'node:crypto';
import redis from '../config/redis';

// Register a new user
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        // Extract email, username, and password from request body
        const { email, username, password } = req.body;

        // Check if the user already exists
        const isUserExists = await UserModel.findOne({ email });
        if (isUserExists) {
            throw new ApiError(409, 'User with email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            username,
        });

        // Generate a verification token
        const token = await TokenModel.create({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        // Generate verification link
        const link = `${_config.baseURL}/api/user/verify/${newUser._id}/${token.token}`;

        // Send verification email
        await sendEmail(
            email,
            'Verification Email',
            verifyEmailTemplate(username, link),
        );

        // Send success response
        res.status(201).json(
            new ApiResponse(
                201,
                undefined,
                'An Email sent to your email please verify',
            ),
        );
    },
);

// Login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email }).select('password');
    if (!user) {
        throw new ApiError(400, 'User is not registered');
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Password is incorrect');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, _config.jwtSecret as string, {
        expiresIn: '7d', // Token expires in 7 days
    });
    res.cookie('jwt', JSON.stringify(token), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    // Send token in response
    res.status(200).json(new ApiResponse(200, { token }));
});

// Get user details
export const getUser = asyncHandler(async (req: Request, res: Response) => {
    // Send user details in response
    res.json({ user: req.user });
});
// verify user email
export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
        throw new ApiError(400, 'Invalid Link.');
    }
    const token = await TokenModel.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) {
        throw new ApiError(400, 'Invalid Link.');
    }
    user.verified = true;
    await user.save();
    await TokenModel.findByIdAndDelete(token._id);
    res.status(200).json(
        new ApiResponse(200, undefined, 'Email verified successfully'),
    );
});

export const sendVerifyMail = asyncHandler(
    async (req: Request, res: Response) => {
        const { jwtToken } = req.body;
        const decoded: any = jwt.verify(jwtToken, _config.jwtSecret as string);
        if (!decoded) {
            throw new ApiError(400, 'Invalid Jwt');
        }
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            throw new ApiError(400, 'User with do not exist');
        }
        // Generate a verification token
        const token = await TokenModel.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        // Generate verification link
        const link = `${_config.baseURL}/api/user/verify/${user._id}/${token.token}`;

        // Send verification email
        await sendEmail(
            user.email,
            'Verification Email',
            verifyEmailTemplate(user.username, link),
        );

        res.status(200).json(
            new ApiResponse(
                200,
                undefined,
                'Verification mail send successfully',
            ),
        );
    },
);
