import nodemailer, { Transporter } from 'nodemailer';
import _config from './_config';
import { ApiError } from '../utils/ApiError';

let transporter: Transporter | null = null;

/**
 * Initializes the transporter with SMTP credentials and verifies them.
 */
const initializeTransporter = async () => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: _config.smtpUser,
            pass: _config.smtpPASS,
        },
    });

    try {
        // Verify the transporter to check if SMTP credentials are valid
        await transporter.verify();
    } catch (error) {
        throw new ApiError(500, 'Invalid SMTP credentials');
    }
};

// Initialize the transporter
initializeTransporter();

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
    if (!transporter) {
        throw new ApiError(500, 'Transporter is not initialized');
    }

    try {
        await transporter.sendMail({
            from: `Instahost <${_config.smtpUser}>`,
            to: email,
            subject,
            html,
        });
        return { success: true };
    } catch (error) {
        throw new ApiError(500, 'Failed to send email');
    }
};
