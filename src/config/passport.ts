import passport from 'passport';
import JwtStrategy from 'passport-jwt';
import UserModel from '../models/user.model';
import _config from './_config';
import { ApiError } from '../utils/ApiError';

const options: JwtStrategy.StrategyOptionsWithoutRequest = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: _config.jwtSecret as string,
};

const jwtStrategy = new JwtStrategy.Strategy(options, async function (
    payload,
    done,
) {
    try {
        const user = await UserModel.findById(payload.id);
        if (!user) {
            const error = new ApiError(404, 'User not found');
            return done(error, false);
        }
        if (!user.verified) {
            const error = new ApiError(404, 'User is not verified');
            return done(error, false);
        }
        done(null, user);
    } catch (err) {
        const apiError = new ApiError(500, 'Internal server error');
        return done(apiError, false);
    }
});

export default jwtStrategy;
