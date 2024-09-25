import express from 'express';
import {
    createProject,
    deployProject,
} from '../controllers/project.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    projectCreateRules,
    projectDeployRules,
} from '../validators/project.validator';

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
