import express from 'express';
import {
    addDomain,
    checkSubdomainAvailability,
    cloneProjectFiles,
    createProject,
    deleteProject,
    deployProject,
    getAnalytics,
    getProject,
    getProjects,
    updateProject,
    uploadProjectFiles,
    verifyDomainOwnership,
} from '../controllers/project.controllers';
import { protectedRoute } from '../middlewares/protected.middleware';
import validate from '../middlewares/validation.middleware';
import {
    projectAddDomainRules,
    projectCreateRules,
    projectIdRules,
    projectSubDomainAvailabilityRules,
    projectVerifyDomainOwnershipRules,
} from '../validators/project.validator';
import upload from '../services/uploadFilesLocally.service';
import { extractZip } from '../middlewares/extractZip.middleware';

const router = express.Router();

router
    .route('/')
    .get(protectedRoute, getProjects)
    .post(protectedRoute, projectCreateRules, validate, createProject);

router
    .route('/:projectId')
    .get(protectedRoute, projectIdRules, validate, getProject)
    .delete(protectedRoute, projectIdRules, validate, deleteProject)
    .patch(protectedRoute, projectIdRules, validate, updateProject);

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
    '/:projectId/analytics',
    protectedRoute,
    projectIdRules,
    validate,
    getAnalytics,
);

router.get(
    '/:projectId/domains/:domain/verify',
    protectedRoute,
    projectVerifyDomainOwnershipRules,
    validate,
    verifyDomainOwnership,
);

router.get(
    '/subdomain/check',
    protectedRoute,
    projectSubDomainAvailabilityRules,
    validate,
    checkSubdomainAvailability,
);

export default router;
