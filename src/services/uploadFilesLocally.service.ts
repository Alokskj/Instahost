import multer, { diskStorage } from 'multer';
import { getLocalProjectDirPath } from '../lib/utils/getLocalProjectDirPath';
import { Request } from 'express';
import fs from 'node:fs/promises';

// File filter to accept only zip files
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) => {
    const isZip =
        file.mimetype === 'application/zip' ||
        file.mimetype === 'application/x-zip-compressed' ||
        file.originalname.endsWith('.zip');

    if (isZip) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only zip files are allowed')); // Reject the file
    }
};

const storage = diskStorage({
    destination: async (req: Request, file, cb) => {
        try {
            const projectId = req.params.projectId;
            const projectLocalDirPath = getLocalProjectDirPath(projectId);

            if (await fs.stat(projectLocalDirPath).catch(() => false)) {
                console.log(projectLocalDirPath);
                await fs.rm(projectLocalDirPath, {
                    recursive: true,
                    force: true,
                });
            }

            await fs.mkdir(projectLocalDirPath, { recursive: true });
            cb(null, projectLocalDirPath);
        } catch (err) {
            cb(new Error('Error setting upload destination'), '');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage, fileFilter });

export default upload;
