import { z } from 'zod';

export const createProjectSchema = z.object({
    projectName: z.string().min(1, 'Project name is required'),
    hostingType: z.enum(['git', 'file']),
    subdomain: z
        .string()
        .min(1, 'Subdomain is required')
        .regex(
            /^[a-z0-9-]+$/,
            'Subdomain can only contain lowercase letters, numbers, and hyphens',
        ),
    zipFile: z.instanceof(File).nullable().optional(), // You can adjust this as needed if using a string path
    gitURL: z
        .string()
        .url('Invalid URL format')
        .refine(
            (url) => {
                // Custom validation regex for Git URLs
                const gitUrlRegex =
                    /^(https?:\/\/(www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/.+\.git|git@.+\.git)$/;
                return gitUrlRegex.test(url);
            },
            {
                message:
                    'The URL must be a valid Git repository URL (GitHub, GitLab, or Bitbucket)',
            },
        )
        .optional(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
