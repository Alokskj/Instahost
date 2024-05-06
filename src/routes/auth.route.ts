import express from 'express';
import { userRegisterRules } from '../validators/user.validator';
import validate from '../middlewares/validation.middleware';
import { register } from 'module';
import { registerUser } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/register', userRegisterRules, validate, registerUser);

export default router;
