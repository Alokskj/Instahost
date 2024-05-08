import express from 'express';
import {
    userLoginRules,
    userRegisterRules,
} from '../validators/user.validator';
import validate from '../middlewares/validation.middleware';
import {
    getUser,
    loginUser,
    registerUser,
    verifyUser,
} from '../controllers/auth.controllers';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUser);
router.post('/register', userRegisterRules, validate, registerUser);
router.get('/verify/:id/:token', verifyUser);
router.post('/login', userLoginRules, validate, loginUser);

export default router;
