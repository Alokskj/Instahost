import express from 'express';
import {
    cloneProjectFiles,
    createProject,
    deployProject,
    uploadProjectFiles,
} from '../controllers/project.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    projectCreateRules,
    projectIdRules,
} from '../validators/project.validator';
import upload from '../services/uploadFilesLocally.service';
import { extractZip } from '../middlewares/extractZip.middleware';

const router = express.Router();

router.post(
    '/create',
    protectedRoute,
    projectCreateRules,
    validate,
    createProject,
);
router.post(
    '/:projectId/deploy',
    protectedRoute,
    projectIdRules,
    validate,
    deployProject,
);

router.post(
    '/:projectId/upload-files',
    protectedRoute,
    projectIdRules,
    validate,
    upload.single('file'),
    extractZip,
    uploadProjectFiles,
);

router.post(
    '/:projectId/clone-files',
    protectedRoute,
    projectIdRules,
    validate,
    cloneProjectFiles,
);

export default router;
