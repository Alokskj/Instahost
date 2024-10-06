const verifyEmailTemplate = (verificationLink: string): string => {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email for Instahost</title>
</head>
<body style="background-color: #8a2be2; margin: 0; padding: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#8a2be2">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 40px; background-color: #8a2be2; border-radius: 8px;">
                            <img src="https://i.ibb.co/dgWrXyN/logo.png" alt="Instahost Logo" width="50" style="display: block; margin: 0 auto 32px;">
                            <h1 style="color: #ffffff; font-size: 36px; font-weight: bold; margin-bottom: 16px; text-transform: uppercase; text-align: center; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">Verify Your Email</h1>
                            <p style="color: #ffffff; font-size: 18px; margin-bottom: 32px; text-align: center; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">Free, fast, and secure static website hosting. Just verify your email to get started.</p>
                            <a href="${verificationLink}" style="background-color: #ffd700; color: #000000; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 18px; text-transform: uppercase; display: inline-block; margin-bottom: 20px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">Verify Email</a>
                            <p style="color: #ffffff; font-size: 16px; margin-bottom: 32px; text-align: center; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">We're excited to see what you'll create with Instahost!</p>
                            <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.3); margin: 32px 0;">
                            <p style="color: rgba(255, 255, 255, 0.7); font-size: 12px; margin-bottom: 8px; text-align: center; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                If you didn't sign up for an Instahost account, please ignore this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

export default verifyEmailTemplate;
