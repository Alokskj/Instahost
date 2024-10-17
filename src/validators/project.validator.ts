import { body, param, query } from 'express-validator';
import ProjectModel from '../models/project.model';
import { Request } from 'express';

// Reusable function to check if a project exists
const projectExists = async (projectId: string, req: Request) => {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
        return Promise.reject('Project does not exist');
    }
    // Check if the project belongs to the current user
    if (project.userId.toString() !== req.user?._id.toString()) {
        return Promise.reject(
            'You do not have permission to access this project',
        );
    }
};

export const projectCreateRules = [
    body('name', 'Name is missing'),
    body('gitURL', 'git Url is missing').optional(),
    body('subdomain', 'subdomain is required')
        .isLength({ min: 2 })
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Invalid subdomain'),
];

export const projectIdRules = [
    param('projectId', 'Project Id is missing')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid project Id')
        .custom((projectId: string, { req }) => {
            return projectExists(projectId, req as Request);
        }),
];

export const projectAddDomainRules = [
    ...projectIdRules,
    body('customDomain', 'Custom domain is missing')
        .notEmpty()
        .isFQDN()
        .withMessage('Custom domain is required'),
];

export const projectVerifyDomainOwnershipRules = [
    ...projectIdRules,
    param('domain', 'Custom domain is missing')
        .notEmpty()
        .isFQDN()
        .withMessage('Custom domain is required'),
];

export const projectSubDomainAvailabilityRules = [
    query('subdomain', 'Subdomain is missing')
        .notEmpty()
        .isLength({ min: 2 })
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Invalid subdomain'),
];
