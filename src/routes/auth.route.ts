import express from 'express';
import {
    getUser,
    registerUser,
    verifyUser,
    sendVerifyMail,
    loginUser,
    loginWithGoogle,
    logoutUser,
} from '../controllers/auth.controllers';
import validate from '../middlewares/validation.middleware';
import {
    userRegisterRules,
    sendVerifyEmailRules,
    userLoginRules,
} from '../validators/user.validator';
import passport from 'passport';

const router = express.Router();

router.get('/me', getUser);
router.post('/register', userRegisterRules, validate, registerUser);
router.get('/verify/:id/:token', verifyUser);
router.post(
    '/send-verification',
    sendVerifyEmailRules,
    validate,
    sendVerifyMail,
);
router.post('/login', userLoginRules, validate, loginUser);
router.post('/logout', logoutUser);
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
