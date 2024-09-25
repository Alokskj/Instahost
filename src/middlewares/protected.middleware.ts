import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../models/user.model';

export const protectedRoute = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Use passport.authenticate middleware with 'jwt' strategy
    passport.authenticate(
        'jwt',
        { session: false },
        (err: any, user: IUser) => {
            if (err) {
                return next(err);
            }
            // If user is not authenticated, send 401 Unauthorized response
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // If user is authenticated, store user object in request for further processing
            // req.user = user;
            next();
        },
    )(req, res, next);
};
