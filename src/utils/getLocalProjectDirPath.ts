import path from 'path';

/**
 * Get the absolute path for the project's uploads directory.
 *
 * @param projectId - The ID of the project for which the path is being generated.
 * @returns The absolute path to the project's uploads directory.
 */
export const getLocalProjectDirPath = (projectId: string): string => {
    // Get the absolute path to the project root
    const projectRootDir = process.cwd();
    // Return the absolute path to the project's uploads directory
    return path.join(projectRootDir, 'uploads', 'websites', projectId);
};
