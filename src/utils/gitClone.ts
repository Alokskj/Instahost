import simpleGit from 'simple-git';
import fs from 'fs/promises';
// Function to clone repository
export const gitClone = async (
    repoUrl: string,
    projectId: string,
): Promise<boolean> => {
    try {
        const clonePath = `public/websites/${projectId}`;
        // Check if directory exists before attempting to remove it
        const directoryExists = await fs
            .stat(clonePath)
            .then((stat) => stat.isDirectory())
            .catch(() => false);
        if (directoryExists) {
            // Remove the directory if it exists
            await fs.rm(clonePath, { recursive: true });
        }
        const git = simpleGit();
        await git.init();
        await git.clone(repoUrl, clonePath);
        return true;
    } catch (error: any) {
        throw new Error(error);
    }
};
