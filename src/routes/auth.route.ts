import express from 'express';
import {
    getUser,
    registerUser,
    verifyUser,
    sendVerifyMail,
    loginUser,
} from '../controllers/auth.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    userRegisterRules,
    sendVerifyEmailRules,
    userLoginRules,
} from '../validators/user.validator';

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
