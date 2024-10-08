import express from 'express';
import {
    addDomain,
    cloneProjectFiles,
    createProject,
    deployProject,
    uploadProjectFiles,
    verifyDomainOwnership,
} from '../controllers/project.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    projectAddDomainRules,
    projectCreateRules,
    projectIdRules,
    projectVerifyDomainOwnershipRules,
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

router.post(
    '/:projectId/domains',
    protectedRoute,
    projectAddDomainRules,
    validate,
    addDomain,
);
router.get(
    '/:projectId/domains/:domain/verify',
    protectedRoute,
    projectVerifyDomainOwnershipRules,
    validate,
    verifyDomainOwnership,
);

export default router;
