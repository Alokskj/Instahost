import JwtStrategy from 'passport-jwt';
import GoogleStrategy from 'passport-google-oauth20';
import UserModel from '../models/user.model';
import _config from './_config';
import { ApiError } from '../lib/utils/ApiError';
import { Request } from 'express';
import crypto from 'node:crypto';
// fn to extract jwt cookie from the req
const cookieExtractor = (req: Request) => {
    if (!req.cookies.jwt) {
        return null;
    }
    const token = JSON.parse(req.cookies.jwt);
    return token;
};

const options: JwtStrategy.StrategyOptionsWithoutRequest = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: _config.jwtSecret,
};

export const jwtStrategy = new JwtStrategy.Strategy(options, async function (
    payload,
    done,
) {
    try {
        const user = await UserModel.findById(payload.userId);
        if (!user) {
            const error = new ApiError(404, 'User not found');
            return done(error, false);
        }
        if (!user.verified) {
            const error = new ApiError(401, 'User is not verified');
            return done(error, false);
        }
        done(null, user);
    } catch (err) {
        const apiError = new ApiError(500, 'Internal server error');
        return done(apiError, false);
    }
});

export const googleStrategy = new GoogleStrategy.Strategy(
    {
        clientID: _config.googleClientID,
        clientSecret: _config.googleClientSecret,
        callbackURL: `${_config.baseURL}/api/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const email = profile.emails?.[0].value;
            if (!email) {
                return cb(new Error('Email not found'), false);
            }
            let user = await UserModel.findOne({ email });
            if (user) {
                if (!user.verified) {
                    user.verified = true;
                    user.username = profile.displayName;
                    user.password = crypto.randomBytes(32).toString('hex');
                }
                user.googleId = profile.id;
                user.lastLogin = new Date();
                await user.save();
                return cb(null, user);
            }

            user = await UserModel.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails?.[0].value,
                verified: true,
                password: crypto.randomBytes(32).toString('hex'),
            });
            cb(null, user);
        } catch (error) {
            cb(error, false);
        }
    },
);
