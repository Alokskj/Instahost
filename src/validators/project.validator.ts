import { body } from 'express-validator';

export const projectCreateRules = [
    body('gitURL', 'git Url is missing').notEmpty(),
    body('name', 'project name is required')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .withMessage('Invalid project name'),
];

export const projectDeployRules = [
    body('projectId', 'Project Id is missing')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid project Id'),
];
