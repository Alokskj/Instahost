import { resolveCname } from 'dns';

export const checkDomainCnameRecord = async (domain: string) => {
    const platfromCname = 'cname.alokskj.tech';

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
