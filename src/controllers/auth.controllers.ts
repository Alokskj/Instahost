import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import _config from '../config/_config';
import { sendEmail } from '../config/nodemailer';
import TokenModel from '../models/token.model';
import UserModel from '../models/user.model';
import { ApiError } from '../lib/utils/ApiError';
import { ApiResponse } from '../lib/utils/ApiResponse';
import { asyncHandler } from '../lib/utils/asyncHandler';
import verifyEmailTemplate from '../lib/emails/verifyEmailTemplate';
import { sendJWTAsCookie, signJWT } from '../lib/utils/jwt';
import jwt from 'jsonwebtoken';
import { getVerificationMailUrl } from '../lib/utils/getVerificationMailUrl';

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
        const verificationLink = getVerificationMailUrl(
            newUser._id,
            token.token,
        );

        // Send verification email
        await sendEmail(
            email,
            'Verification Email',
            verifyEmailTemplate(verificationLink),
        );

        // Generate JWT token
        const jwtToken = signJWT(newUser._id);
        // Send JWT as cookie
        sendJWTAsCookie(res, jwtToken);

        // Send success response
        res.status(201).json(
            new ApiResponse(
                201,
                {
                    username: newUser.username,
                    email: newUser.email,
                    token: jwtToken,
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

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json(
        new ApiResponse(200, null, 'User logged out successfully'),
    );
});

// Get user details
export const getUser = asyncHandler(async (req: Request, res: Response) => {
    // Send user details in response
    const token = req.cookies.jwt && (JSON.parse(req.cookies.jwt) as string);
    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }
    const decodedToken = jwt.verify(token, _config.jwtSecret) as {
        userId: string;
    };
    if (!decodedToken) {
        throw new ApiError(401, 'Unauthorized');
    }
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    res.json(
        new ApiResponse(200, {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            verified: user.verified,
        }),
    );
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
    res.redirect(`${_config.clientURL}/`);
});

export const sendVerifyMail = asyncHandler(
    async (req: Request, res: Response) => {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        if (user.verified) {
            throw new ApiError(400, 'User already verified');
        }
        // Generate a verification token
        const token = await TokenModel.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        });

        // Generate verification link
        const verificationLink = getVerificationMailUrl(user._id, token.token);

        // Send verification email
        await sendEmail(
            user.email,
            'Verification Email',
            verifyEmailTemplate(verificationLink),
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
        res.redirect(`${_config.clientURL}/`);
    },
);
