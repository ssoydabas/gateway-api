export const verifyEmailTemplate = (token: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .verification-code {
            background-color: #f8f9fa;
            border-radius: 4px;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email Address</h1>
        </div>
        
        <p>Hello,</p>
        
        <p>Thank you for signing up! To complete your registration, please use the verification code below:</p>
        
        <div class="verification-code">
            ${token}
        </div>
        
        <p>This code will expire in 30 minutes. If you didn't request this verification, please ignore this email.</p>
        
        <p>Best regards,<br>Your App Team</p>
        
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;
