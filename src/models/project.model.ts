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
            visits: number;
        }[];
    };
    increaseVisitCount: () => Promise<IProject>; // Method signature
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
                    visits: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
        },
    },
    { timestamps: true },
);

// Add the increaseVisitCount method to the schema
projectSchema.methods.increaseVisitCount =
    async function (): Promise<IProject> {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        console.log('visited');
        // Check if today's visit already exists
        const todayVisit = (this as IProject).analytics.dailyVisits.find(
            (v) => v.date.toISOString().split('T')[0] === todayString,
        );
        if (todayVisit) {
            todayVisit.visits += 1; // Increment the count
        } else {
            // If not, add a new entry for today
            this.analytics.dailyVisits.push({ date: today, visits: 1 });
        }
        return this.save(); // Save the updated document
    };

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
