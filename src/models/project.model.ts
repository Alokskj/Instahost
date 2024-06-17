import mongoose from 'mongoose';
import { deploymentType } from './deployment.model';
import { User } from './user.model';
import { Model } from 'mongoose';
interface IProjectType  {
    subDomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: User;
};
const projectSchema = new mongoose.Schema<IProjectType>(
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

const ProjectModel = mongoose.model<IProjectType>('Project', projectSchema);
export type Project = Model<IProjectType>
export default ProjectModel;
