import mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IProject extends Document {
    subDomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: mongoose.Schema.Types.ObjectId;
}
const projectSchema = new mongoose.Schema<IProject>(
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

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
