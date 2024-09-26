import simpleGit from 'simple-git';
import fs from 'fs/promises';
import { getLocalProjectDirPath } from './getLocalProjectDirPath';
// Function to clone repository
export const cloneProjectLocally = async (
    repoUrl: string,
    projectId: string,
): Promise<boolean> => {
    try {
        const clonePath = getLocalProjectDirPath(projectId);
        // Check if deployment directory exists before attempting to remove it
        const directoryExists = await fs
            .stat(clonePath)
            .then((stat) => stat.isDirectory())
            .catch(() => false);
        if (directoryExists) {
            // Remove the deployment directory if it exists
            await fs.rm(clonePath, { recursive: true });
        }
        const git = simpleGit();
        await git.clone(repoUrl, clonePath);
        return true;
    } catch (error: any) {
        console.error('Error cloning project:', error);
        throw new Error(`Failed to clone project: ${error.message}`);
    }
};
