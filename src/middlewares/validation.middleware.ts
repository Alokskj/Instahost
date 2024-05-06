import { NextFunction, Request, Response } from 'express';

import { validationResult } from 'express-validator';
import { ApiResponse } from '../utils/ApiResponse';

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res
        .status(400)
        .json(
            new ApiResponse(
                400,
                { errors: errors.array() },
                'Validation Failed',
            ),
        );
};

export default validate;
