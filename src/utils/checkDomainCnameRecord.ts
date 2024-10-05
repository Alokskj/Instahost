import { resolveCname } from 'dns';
import _config from '../config/_config';

export const checkDomainCnameRecord = async (domain: string) => {
    const platfromCname = _config.platformCname;

    return new Promise((resolve, reject) => {
        resolveCname(domain, (err, records) => {
            if (err) {
                return resolve(false);
            }

            if (!records.includes(platfromCname)) {
                return resolve(false);
            }
            resolve(true);
        });
    });
};
