# API Gateway

A TypeScript-based Express.js API gateway that forwards requests to microservices. This gateway provides a unified entry point for client applications to interact with various microservices in the system.

## Features

- 🚀 TypeScript-based Express.js API gateway
- 🔒 Secure authentication and authorization
- 🔄 Request forwarding to microservices
- 📝 Comprehensive logging
- 🛡️ Security features (Helmet, CORS, Rate Limiting)
- ✅ Input validation using Zod
- 🎯 Clean architecture pattern
- 🔍 Error handling and propagation
- 📧 Email service integration
- 🚦 Environment-based configuration

## Prerequisites

- Node.js >= 18
- pnpm (recommended) or npm
- TypeScript
- Access to microservices (Auth Service and User Service)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd api
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
HOST=http://localhost
PORT=3000
LOG_LEVEL="debug"

JWT_SECRET="your-jwt-secret"
PASSWORD_SECRET="your-password-secret"
RESEND_API_KEY="your-resend-api-key"

# Auth API
AUTH_API_URL=http://localhost:8080
AUTH_API_SUFFIX=/api/v1

# User API
USER_API_URL=http://localhost:8081
USER_API_SUFFIX=/api/v1
```

## Development

Start the development server:
```bash
pnpm dev
```

The server will start with hot-reload enabled.

## Building for Production

1. Build the project:
```bash
pnpm build
```

2. Start the production server:
```bash
pnpm start
```

## Available Scripts

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build the project
- `pnpm start` - Start production server
- `pnpm clean` - Clean build directory
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier

## Project Structure

```
src/
├── adapters/         # HTTP and external service adapters
├── controllers/      # Request handlers
├── middlewares/      # Express middlewares
├── models/          # Data models
├── routes/          # API routes
├── schemas/         # Zod validation schemas
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── index.ts         # Application entry point
```

## API Endpoints

### Account Routes

- `POST /api/v1/register` - Register a new account
- `POST /api/v1/login` - Login to account
- `GET /api/v1/me` - Get current user information
- `GET /api/v1/get-email-verification-token` - Get email verification token
- `GET /api/v1/verify-email` - Verify email address
- `POST /api/v1/set-reset-password-token` - Request password reset
- `POST /api/v1/reset-password` - Reset password
- `GET /api/v1/:id` - Get account by ID
- `GET /api/v1/email/:email` - Get account by email

## Security

- Helmet for security headers
- CORS with configurable allowed origins
- JWT-based authentication
- Rate limiting
- Input validation
- Secure password handling
- Email verification system

## Error Handling

The API implements a comprehensive error handling system:
- Custom error classes
- Error middleware for consistent error responses
- Proper error propagation from microservices
- Detailed error logging

## Logging

- Uses Pino for logging
- Logs HTTP requests and responses
- Includes timing information
- Sanitizes sensitive data
- Configurable log levels

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Sertan Soydabas

## Support

For support, please open an issue in the repository or contact the maintainers. 