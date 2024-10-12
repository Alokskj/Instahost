import { toast } from 'sonner';

export const isValidZip = (file: File) => {
    // Check for valid file types
    const validMimeTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-zip',
    ];

    if (!validMimeTypes.includes(file.type)) {
        toast.error('Invalid file type', {
            description: 'Please upload a ZIP file.',
        });
        return false;
    }

    // Check for file size (e.g., limit to 10MB)
    const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSizeInBytes) {
        toast.error('File too large', {
            description: 'Please upload a ZIP file smaller than 10 MB.',
        });
        return false;
    }
    return true;
};
