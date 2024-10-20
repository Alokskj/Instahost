import mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IProject extends Document {
    subdomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: mongoose.Schema.Types.ObjectId;
    hostingType: 'git' | 'file';
    deploymentStatus: 'deployed' | 'pending' | 'failed';
    previewImage: string;
    active: boolean;
    analytics: {
        dailyVisits: {
            date: Date;
            visitCount: number;
        }[];
    };
}
const projectSchema = new mongoose.Schema<IProject>(
    {
        name: String,
        customDomain: String,
        gitURL: {
            type: String,
        },
        subdomain: {
            type: String,
            unique: true,
            trim: true,
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
        active: {
            type: Boolean,
            default: true,
        },
        analytics: {
            dailyVisits: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    visitCount: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
        },
    },
    { timestamps: true },
);

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
