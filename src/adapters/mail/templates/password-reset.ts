export const passwordResetTemplate = (token: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
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
        .reset-code {
            background-color: #f8f9fa;
            border-radius: 4px;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 20px 0;
        }
        .warning {
            color: #dc3545;
            font-weight: 500;
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
            <h1>Password Reset Request</h1>
        </div>
        
        <p>Hello,</p>
        
        <p>We received a request to reset your password. Use the code below to complete the reset:</p>
        
        <div class="reset-code">
            ${token}
        </div>
        
        <p class="warning">
            If you didn't request a password reset, please ignore this email and make sure your account is secure.
        </p>
        
        <p>This code will expire in 15 minutes for security reasons.</p>
        
        <p>Best regards,<br>Your App Team</p>
        
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>For security, this request was received from your account. If you did not make this request, please contact support immediately.</p>
        </div>
    </div>
</body>
</html>
`;
