import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

export const protectedRoute = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Use passport.authenticate middleware with 'jwt' strategy
    passport.authenticate('jwt', { session: false })(req, res, next);
};
