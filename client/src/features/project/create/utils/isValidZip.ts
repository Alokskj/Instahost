export const isValidZip = (file: File) => {
    // Check for valid file types
    const validMimeTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-zip',
    ];

    if (!validMimeTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload a ZIP file.');
    }

    // Check for file size
    const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxSizeInBytes) {
        throw new Error(
            'File size exceeds the maximum allowed size of 100 MB. Please upload a smaller file.',
        );
    }
    return true;
};
