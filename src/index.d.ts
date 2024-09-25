import { Express } from 'express-serve-static-core';
import { IUser } from './models/user.model';

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}
