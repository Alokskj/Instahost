import { NextFunction, Request, Response } from 'express';
// Define the type for the controller function
type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export const asyncHandler =
    (controller: ControllerFunction) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    };
