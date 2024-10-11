import { z } from 'zod';

export const createProjectSchema = z.object({
    projectType: z.enum(['git', 'zip']),
    gitUrl: z.string().optional(),
    projectName: z.string().min(1, 'Project name is required'),
    subdomain: z
        .string()
        .min(1, 'Subdomain is required')
        .regex(
            /^[a-z0-9-]+$/,
            'Subdomain can only contain lowercase letters, numbers, and hyphens',
        ),
});

export type createProject = z.infer<typeof createProjectSchema>;
