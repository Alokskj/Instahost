import jwt from 'jsonwebtoken';
import { Response } from 'express';
import _config from '../../config/_config';
export const signJWT = (userId: string) => {
    if (!userId) throw new Error('User id is required');
    const token = jwt.sign({ userId }, _config.jwtSecret as string, {
        expiresIn: '7d', // Token expires in 7 days
    });
    return token;
};

export const verifyJWT = (token: string) => {
    return jwt.verify(token, _config.jwtSecret as string);
};

export const sendJWTAsCookie = (res: Response, token: string) => {
    res.cookie('jwt', JSON.stringify(token), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        secure: _config.env === 'production',
    });
};
