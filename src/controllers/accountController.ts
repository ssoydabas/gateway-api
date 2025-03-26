import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '@/utils/catchAsync';
import accountService from '@/services/accountService';

const register = catchAsync(async (req: Request, res: Response) => {
  const account = await accountService.register(req.body);
  res.status(httpStatus.OK).send({ account });
});

export default {
  register,
};
