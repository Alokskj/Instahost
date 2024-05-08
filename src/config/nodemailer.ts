import nodemailer, { Transporter } from 'nodemailer';
import _config from './_config';
import { ApiError } from '../utils/ApiError';

const transpoter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: _config.smtpUser,
        pass: _config.smtpPASS,
    },
});

/**
 * Sends an email using Nodemailer.
 * @param toEmail The email address of the recipient.
 * @param subject The subject of the email.
 * @param html The html content of the email.
 * @returns A Promise indicating the success or failure of the email sending process.
 */
export const sendEmail = async (
    email: string,
    subject: string,
    html: string,
): Promise<{ success: boolean }> => {
    try {
        await transpoter.sendMail({
            from: _config.smtpUser,
            to: email,
            subject,
            html,
        });
        return { success: true };
    } catch (error: any) {
        throw new Error(error);
    }
};
