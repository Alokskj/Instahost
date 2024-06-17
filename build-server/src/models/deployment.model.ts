import mongoose from 'mongoose';
import { Project } from './project.model';

export type deploymentType = {
    projectId: Project;
    status: 'QUEUE' | 'PROGRESS' | 'SUCCESS' | 'FAIL';
};
const deploymentSchema = new mongoose.Schema<deploymentType>(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
        status: {
            type: String,
            enum: ['QUEUE', 'PROGRESS', 'SUCCESS', 'FAIL'],
            default: 'QUEUE',
        },
    },
    { timestamps: true },
);

const DeploymentModel = mongoose.model('Deployment', deploymentSchema);

export default DeploymentModel;
