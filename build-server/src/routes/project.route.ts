import express from 'express';
import {
    projectCreateRules,
    projectDeployRules,
} from '../validators/project.validator';
import validate from '../middlewares/validation.middleware';
import {
    createProject,
    deployProject,
} from '../controllers/project.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';

const router = express.Router();

router.post(
    '/create',
    protectedRoute,
    projectCreateRules,
    validate,
    createProject,
);
router.post(
    '/deploy',
    protectedRoute,
    projectDeployRules,
    validate,
    deployProject,
);

export default router;
