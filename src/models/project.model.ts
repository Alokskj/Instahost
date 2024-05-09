import mongoose from 'mongoose';
import { deploymentType } from './deployment.model';
import { User } from './user.model';
export type projectType = {
    subDomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: User;
};
const projectSchema = new mongoose.Schema<projectType>(
    {
        name: String,
        customDomain: String,
        gitURL: {
            type: String,
            required: true,
        },
        subDomain: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const ProjectModel = mongoose.model('Project', projectSchema);

export default ProjectModel;
