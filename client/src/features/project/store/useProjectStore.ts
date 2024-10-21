import { create } from 'zustand';
import { Project } from '../types/Project';

interface ProjectState {
    project: Project;
    isDeleteDialogOpen: boolean;
}

export const useProjectStore = create<ProjectState>(() => ({
    project: {
        _id: '',
        subdomain: '',
        customDomain: '',
        gitURL: '',
        name: '',
        userId: '',
        hostingType: 'git',
        deploymentStatus: 'deployed',
        previewImage: '',
        url: '',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        analytics: {
            dailyVisits: [
                {
                    date: new Date(),
                    visitCount: 0,
                },
            ],
        },
    },
    isDeleteDialogOpen: false,
}));
