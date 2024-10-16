import { create } from 'zustand';
import { CreateProject } from '../schema/createProjectSchema';

interface CreateProjectState {
    initialState: CreateProject;
    project: CreateProject;
    setProject: (project: CreateProject) => void;
}
const initialState: CreateProject = {
    hostingType: 'file',
    projectName: '',
    subdomain: '',
    zipFile: null,
};
export const useCreateProjectStore = create<CreateProjectState>((set) => ({
    initialState: initialState,
    project: initialState,
    setProject: (project) => set({ project }),
}));
