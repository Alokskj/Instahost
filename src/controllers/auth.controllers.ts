import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import _config from '../config/_config';
import { sendEmail } from '../config/nodemailer';
import TokenModel from '../models/token.model';
import UserModel from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import verifyEmailTemplate from '../utils/templates/verifyEmailTemplate';
import { sendJWTAsCookie, signJWT } from '../utils/jwt';

// Register a new user
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        // Extract email, username, and password from request body
        const { email, username, password } = req.body;

        // Check if the user already exists
        const isUserExists = await UserModel.findOne({ email, verified: true });
        if (isUserExists) {
            throw new ApiError(409, 'User with email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create or update user (if email exists but not verified)
        const newUser = await UserModel.findOneAndUpdate(
            { email },
            {
                email,
                password: hashedPassword,
                username,
            },
            { upsert: true, new: true },
        );

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
                {
                    username: newUser.username,
                    email: newUser.email,
                },
                'User registred Successfully',
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
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    // Generate JWT token
    const token = signJWT(user._id);
    // Send JWT as cookie
    sendJWTAsCookie(res, token);
    // Send token in response
    res.status(200).json(new ApiResponse(200, { token }));
});

// Get user details
export const getUser = asyncHandler(async (req: Request, res: Response) => {
    // Send user details in response
    res.json(new ApiResponse(200, { user: req.user }));
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
            throw new ApiError(400, 'User with the id do not exist');
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

export const loginWithGoogle = asyncHandler(
    async (req: Request, res: Response) => {
        const token = signJWT(req.user?._id);
        sendJWTAsCookie(res, token);
        res.redirect('/api/auth/me');
    },
);
