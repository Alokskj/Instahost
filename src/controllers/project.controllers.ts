import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import ProjectModel from '../models/project.model';
import { ApiError } from '../utils/ApiError';
import _config from '../config/_config';
import { ApiResponse } from '../utils/ApiResponse';
import { gitClone } from '../utils/gitClone';

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { gitURL, name } = req.body;
        const isProjectExists = await ProjectModel.findOne({ name });
        if (isProjectExists) {
            throw new ApiError(400, 'This name is already taken.');
        }
        const project = await ProjectModel.create({
            name,
            gitURL,
            subDomain: `${name}.${_config.proxyServerDomain}`,
            userId: req.user,
        });
        res.status(201).json(new ApiResponse(201, project));
    },
);

export const deployProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.body;
        // find project that if project belonges to current user
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        // run deployment
        await gitClone(project.gitURL, project._id.toString());
        res.send('ok');
    },
);
