import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '@/utils/catchAsync';
import accountService from '@/services/accountService';

const register = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService.register(req.body);
  res.status(httpStatus.OK).send({ account });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService.login(req.body);
  res.status(httpStatus.OK).send({ account });
});

const me = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService.me(req.headers.authorization!);
  res.status(httpStatus.OK).send({ account });
});

const getEmailVerificationToken = catchAsync(
  async (req: Request, res: Response) => {
    await accountService.getEmailVerificationToken({
      email: req.query['email'] as string,
    });
    res.status(httpStatus.OK).send();
  },
);

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await accountService.verifyEmail(req.query['token'] as string);
  res.status(httpStatus.OK).send();
});

const setResetPasswordToken = catchAsync(
  async (req: Request, res: Response) => {
    await accountService.setResetPasswordToken(req.body);
    res.status(httpStatus.OK).send();
  },
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await accountService.resetPassword(req.body);
  res.status(httpStatus.OK).send();
});

// ----------- GET REQUESTS -----------

const getAccountById = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService._getAccountById(req.params['id']!);
  res.status(httpStatus.OK).send({ account });
});

const getAccountByEmail = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService._getAccountByEmail(req.params['email']!);
  res.status(httpStatus.OK).send({ account });
});

export default {
  register,
  login,
  me,
  getEmailVerificationToken,
  verifyEmail,
  setResetPasswordToken,
  resetPassword,
  getAccountById,
  getAccountByEmail,
};
