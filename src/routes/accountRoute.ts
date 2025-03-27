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

export default router;
