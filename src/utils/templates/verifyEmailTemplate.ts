const verifyEmailTemplate = (username: string, link: string): string => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body>
            <div style="font-family: Arial, sans-serif;">
                <h2>Hello ${username},</h2>
                <p>Welcome to our platform! To complete your registration, please verify your email address by clicking the link below:</p>
                <p><a href="${link}" target="_blank" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Verify Email</a></p>
                <p>If you didn't create an account on our platform, you can safely ignore this email.</p>
                <p>Thanks,<br>Our Platform Team</p>
            </div>
        </body>
        </html>
    `;
};

export default verifyEmailTemplate;
