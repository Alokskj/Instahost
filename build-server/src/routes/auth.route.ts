import express from 'express';
import {
    sendVerifyEmailRules,
    userLoginRules,
    userRegisterRules,
} from '../validators/user.validator';
import validate from '../middlewares/validation.middleware';
import {
    getUser,
    loginUser,
    registerUser,
    sendVerifyMail,
    verifyUser,
} from '../controllers/auth.controllers';
import passport from 'passport';
import { protectedRoute } from '../middlewares/protected.middleware';

const router = express.Router();

router.get('/', protectedRoute, getUser);
router.post('/register', userRegisterRules, validate, registerUser);
router.get('/verify/:id/:token', verifyUser);
router.post(
    '/send-verify-mail',
    sendVerifyEmailRules,
    validate,
    sendVerifyMail,
);
router.post('/login', userLoginRules, validate, loginUser);

export default router;
