import express from 'express';
import {
    getUser,
    registerUser,
    verifyUser,
    sendVerifyMail,
    loginUser,
    loginWithGoogle,
} from '../controllers/auth.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    userRegisterRules,
    sendVerifyEmailRules,
    userLoginRules,
} from '../validators/user.validator';
import passport from 'passport';

const router = express.Router();

router.get('/me', protectedRoute, getUser);
router.post('/register', userRegisterRules, validate, registerUser);
router.get('/verify/:id/:token', verifyUser);
router.post(
    '/send-verify-mail',
    sendVerifyEmailRules,
    validate,
    sendVerifyMail,
);
router.post('/login', userLoginRules, validate, loginUser);
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    loginWithGoogle,
);

export default router;
