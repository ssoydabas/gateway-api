import request from 'supertest';
import app from '@/app';
import httpStatus from 'http-status';
import { generateRandomUserData } from '@/utils/test/generateMockData';

describe('Authentication Routes', () => {
  const registerUrl = '/api/v1/accounts/register';
  const loginUrl = '/api/v1/accounts/login';
  const meUrl = '/api/v1/accounts/me';
  const getEmailVerificationTokenUrl =
    '/api/v1/accounts/get-email-verification-token';
  const verifyEmailUrl = '/api/v1/accounts/verify-email';
  const setResetPasswordTokenUrl = '/api/v1/accounts/set-reset-password-token';
  const resetPasswordUrl = '/api/v1/accounts/reset-password';

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      const userData = generateRandomUserData();

      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);
    });

    it('should return 400 for empty request body', async () => {
      const response = await request(app)
        .post(registerUrl)
        .send({})
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body).toHaveProperty('details');
      expect(response.body.details.errors).toHaveLength(5); // All required fields
    });

    it('should return 400 for invalid email format', async () => {
      const userData = generateRandomUserData();
      userData.email = 'invalid-email';

      const response = await request(app)
        .post(registerUrl)
        .send(userData)
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body.details.errors).toContainEqual(
        expect.objectContaining({
          path: 'body.email',
          message: 'Invalid email',
        }),
      );
    });

    it('should return 400 for weak password', async () => {
      const userData = generateRandomUserData();
      userData.password = '123';

      const response = await request(app)
        .post(registerUrl)
        .send(userData)
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body.details.errors).toContainEqual(
        expect.objectContaining({
          message: 'Password must be at least 8 characters long',
          path: 'body.password',
        }),
      );
    });

    it('should return 409 for existing email', async () => {
      const userData = generateRandomUserData();

      // First registration
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      // Try to register with same email
      const response = await request(app)
        .post(registerUrl)
        .send({ ...userData, phone: `+${Date.now()}` })
        .expect(httpStatus.CONFLICT);

      expect(response.body).toHaveProperty('status', 409);
      expect(response.body).toHaveProperty('code', 'RESOURCE_CONFLICT');
      expect(response.body).toHaveProperty('message', 'email already in use');
    });

    it('should return 409 for existing phone number', async () => {
      const userData = generateRandomUserData();

      // First registration
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      // Try to register with same phone
      const response = await request(app)
        .post(registerUrl)
        .send({ ...userData, email: `test-${Date.now()}@example.com` })
        .expect(httpStatus.CONFLICT);

      expect(response.body).toHaveProperty('status', 409);
      expect(response.body).toHaveProperty('code', 'RESOURCE_CONFLICT');
      expect(response.body).toHaveProperty(
        'message',
        'phone number already in use',
      );
    });

    it('should return 400 for invalid phone number format', async () => {
      const userData = generateRandomUserData();
      userData.phone = '123456789';

      const response = await request(app)
        .post(registerUrl)
        .send(userData)
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body.details.errors).toContainEqual(
        expect.objectContaining({
          path: 'body.phone',
          message: 'Phone number must start with country code (e.g., +90)',
        }),
      );
    });

    it('should handle unicode characters in names', async () => {
      const userData = generateRandomUserData();
      userData.first_name = 'Jöhn';
      userData.last_name = 'Döe';

      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);
    });

    it('should handle very long inputs', async () => {
      const userData = generateRandomUserData();
      userData.first_name = 'A'.repeat(1000);
      userData.last_name = 'B'.repeat(1000);
      userData.email = `test-${'a'.repeat(1000)}@example.com`;

      const response = await request(app)
        .post(registerUrl)
        .send(userData)
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body.details.errors).toStrictEqual([
        {
          message: 'String must contain at most 255 character(s)',
          path: 'body.first_name',
        },
        {
          message: 'String must contain at most 255 character(s)',
          path: 'body.last_name',
        },
        {
          message: 'String must contain at most 255 character(s)',
          path: 'body.email',
        },
      ]);
    });
  });

  describe('POST /login', () => {
    it('should login user successfully', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const response = await request(app)
        .post(loginUrl)
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(httpStatus.OK);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const response = await request(app)
        .post(loginUrl)
        .send({
          email: userData.email,
          password: 'wrongpassword',
        })
        .expect(httpStatus.UNAUTHORIZED);

      expect(response.body).toHaveProperty('type');
      expect(response.body.type).toBe('AUTHENTICATION_ERROR');

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /me', () => {
    it('should return user info with valid token', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const loginResponse = await request(app)
        .post(loginUrl)
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(httpStatus.OK);

      const { token } = loginResponse.body;

      const response = await request(app)
        .get(meUrl)
        .set('Authorization', `Bearer ${token}`)
        .expect(httpStatus.OK);

      expect(response.body).not.toBeNull();
      expect(response.body).not.toBeUndefined();
      expect(response.body).toHaveProperty('created_at');
      expect(response.body).toHaveProperty('phone');
    });

    it('should return 401 without authorization header', async () => {
      const response = await request(app)
        .get(meUrl)
        .expect(httpStatus.UNAUTHORIZED);

      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe('AUTHORIZATION_ERROR');

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Authorization header is required');
    });

    it('should return 401 with invalid token format', async () => {
      const response = await request(app)
        .get(meUrl)
        .set('Authorization', 'InvalidToken')
        .expect(httpStatus.UNAUTHORIZED);

      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe('AUTHORIZATION_ERROR');

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(
        'Invalid authorization format. Use Bearer token',
      );
    });
  });

  describe('Email Verification', () => {
    it('should request email verification token successfully', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const response = await request(app)
        .get(getEmailVerificationTokenUrl)
        .query({ email: userData.email })
        .expect(httpStatus.OK);

      expect(response.body).toHaveProperty('token');
    });

    it('should verify email with valid token', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const getEmailVerificationTokenResponse = await request(app)
        .get(getEmailVerificationTokenUrl)
        .query({ email: userData.email })
        .expect(httpStatus.OK);

      const { token } = getEmailVerificationTokenResponse.body;

      await request(app)
        .get(verifyEmailUrl)
        .query({ token })
        .expect(httpStatus.OK);
    });

    it('should return 404 for invalid verification token', async () => {
      const response = await request(app)
        .get(verifyEmailUrl)
        .query({ token: 'invalid-token' })
        .expect(httpStatus.NOT_FOUND);

      expect(response.body).toHaveProperty('type');
      expect(response.body.type).toBe('NOT_FOUND');

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Account not found');
    });
  });

  describe('Password Reset', () => {
    it('should request password reset token successfully', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const response = await request(app)
        .post(setResetPasswordTokenUrl)
        .send({ email: userData.email })
        .expect(httpStatus.OK);

      expect(response.body).toHaveProperty('token');
    });

    it('should reset password with valid token', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const setResetPasswordTokenResponse = await request(app)
        .post(setResetPasswordTokenUrl)
        .send({ email: userData.email })
        .expect(httpStatus.OK);

      const { token } = setResetPasswordTokenResponse.body;

      const resetData = {
        token,
        password: 'newpassword123',
        confirm_password: 'newpassword123',
      };

      await request(app)
        .post(resetPasswordUrl)
        .send(resetData)
        .expect(httpStatus.OK);

      await request(app)
        .post(loginUrl)
        .send({
          email: userData.email,
          password: 'newpassword123',
        })
        .expect(httpStatus.OK);
    });

    it('should return 400 for password mismatch', async () => {
      const userData = generateRandomUserData();
      await request(app).post(registerUrl).send(userData).expect(httpStatus.OK);

      const setResetPasswordTokenResponse = await request(app)
        .post(setResetPasswordTokenUrl)
        .send({ email: userData.email })
        .expect(httpStatus.OK);

      const { token } = setResetPasswordTokenResponse.body;

      const resetData = {
        token,
        password: 'newpassword123',
        confirm_password: 'differentpassword',
      };

      const response = await request(app)
        .post(resetPasswordUrl)
        .send(resetData)
        .expect(httpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(
        'password and confirm password do not match',
      );
    });

    it('should return 400 for invalid reset token', async () => {
      const resetData = {
        token: 'invalid-token',
        password: 'newpassword123',
        confirm_password: 'newpassword123',
      };

      const response = await request(app)
        .post(resetPasswordUrl)
        .send(resetData)
        .expect(httpStatus.NOT_FOUND);

      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Account not found');
    });
  });

  describe('Account Retrieval', () => {
    describe('GET /:id', () => {
      it('should return account details by id', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        const loginResponse = await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const { token } = loginResponse.body;

        const meResponse = await request(app)
          .get(meUrl)
          .set('Authorization', `Bearer ${token}`)
          .expect(httpStatus.OK);

        const response = await request(app)
          .get(`/api/v1/accounts/${meResponse.body.id}`)
          .expect(httpStatus.OK);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('first_name', userData.first_name);
        expect(response.body).toHaveProperty('last_name', userData.last_name);
      });

      it('should return 400 for non-existent account with invalid id', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const response = await request(app)
          .get('/api/v1/accounts/non-existent-id')
          .expect(httpStatus.BAD_REQUEST);

        expect(response.body).toHaveProperty('type', 'BAD_REQUEST');
        expect(response.body).toHaveProperty(
          'message',
          'Invalid account ID: must be a positive number',
        );
      });

      it('should return 404 for non-existent account with valid id', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const response = await request(app)
          .get('/api/v1/accounts/123456789')
          .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('type', 'NOT_FOUND');
        expect(response.body).toHaveProperty('message', 'Account not found');
      });
    });

    describe('GET /email/:email', () => {
      it('should return account details by email', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const response = await request(app)
          .get(`/api/v1/accounts/email/${userData.email}`)
          .expect(httpStatus.OK);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('first_name', userData.first_name);
        expect(response.body).toHaveProperty('last_name', userData.last_name);
      });

      it('should return 404 for non-existent email', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const response = await request(app)
          .get('/api/v1/accounts/email/non-existent@example.com')
          .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('type', 'NOT_FOUND');
        expect(response.body).toHaveProperty('message', 'Account not found');
      });

      it('should return 400 for invalid email format', async () => {
        const userData = generateRandomUserData();
        await request(app)
          .post(registerUrl)
          .send(userData)
          .expect(httpStatus.OK);

        await request(app)
          .post(loginUrl)
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(httpStatus.OK);

        const response = await request(app)
          .get('/api/v1/accounts/email/invalid-email')
          .expect(httpStatus.BAD_REQUEST);

        expect(response.body).toHaveProperty('status', 400);
        expect(response.body).toHaveProperty('code', 'VALIDATION_ERROR');
        expect(response.body.details.errors).toContainEqual(
          expect.objectContaining({
            path: 'params.email',
            message: 'Invalid email',
          }),
        );
      });
    });
  });
});
