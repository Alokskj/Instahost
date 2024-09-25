import mongoose from 'mongoose';

export type IDeployment = {
    projectId: mongoose.Schema.Types.ObjectId;
    status: 'QUEUE' | 'PROGRESS' | 'SUCCESS' | 'FAIL';
};
const deploymentSchema = new mongoose.Schema<IDeployment>(
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

const DeploymentModel = mongoose.model<IDeployment>(
    'Deployment',
    deploymentSchema,
);

export default DeploymentModel;
