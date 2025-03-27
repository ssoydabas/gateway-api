import express from 'express';
import validate from '../middlewares/validate';
import accountValidation from '@/validations/accountValidation';
import accountController from '@/controllers/accountController';
import authorizationMiddleware from '@/middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validate(accountValidation.register),
  accountController.register,
);

router.post(
  '/login',
  validate(accountValidation.login),
  accountController.login,
);

router.get('/me', authorizationMiddleware, accountController.me);

router.get(
  '/get-email-verification-token',
  validate(accountValidation.getEmailVerificationToken),
  accountController.getEmailVerificationToken,
);

router.get(
  '/verify-email',
  validate(accountValidation.verifyEmail),
  accountController.verifyEmail,
);

router.post(
  '/set-reset-password-token',
  validate(accountValidation.setResetPasswordToken),
  accountController.setResetPasswordToken,
);

router.post(
  '/reset-password',
  validate(accountValidation.resetPassword),
  accountController.resetPassword,
);

export default router;
