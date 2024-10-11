import mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IProject extends Document {
    subDomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: mongoose.Schema.Types.ObjectId;
    hostingType: 'git' | 'file';
    deploymentStatus: 'deployed' | 'pending' | 'failed';
    previewImage: string;
}
const projectSchema = new mongoose.Schema<IProject>(
    {
        name: String,
        customDomain: String,
        gitURL: {
            type: String,
        },
        subDomain: {
            type: String,
            required: true,
        },
        previewImage: {
            type: String,
        },
        hostingType: {
            type: String,
            enum: ['git', 'file'],
        },
        deploymentStatus: {
            type: String,
            enum: ['deployed', 'pending', 'failed'],
            default: 'pending',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
