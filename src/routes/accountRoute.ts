import express from 'express';
import validate from '../middlewares/validate';
import accountValidation from '@/validations/accountValidation';
import accountController from '@/controllers/accountController';

const router = express.Router();

router.post(
  '/register',
  validate(accountValidation.register),
  accountController.register,
);

export default router;
