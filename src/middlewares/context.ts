import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { decodeJwtToken } from '@/utils/decodeJwtToken';

export const contextMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const baseContext = {
    requestId: uuid(),
    startTime: Date.now(),
    source: (req.headers['x-source'] as 'web' | 'mobile' | 'api') || 'api',
  };

  const jwtToken = req.headers?.['x-auth'];
  if (!jwtToken || typeof jwtToken !== 'string' || jwtToken.length === 0) {
    req.context = baseContext;
    return next();
  } else {
    const decodedToken = decodeJwtToken(jwtToken);
    if (!decodedToken) req.context = baseContext;
    else {
      // const account = await accountRepository.getById(decodedToken);
      // if (!account) req.context = baseContext;
      // else {
      //   const parsedAccount = accountModel.parse(account);
      //   req.context = {
      //     ...baseContext,
      //     account: parsedAccount,
      //   };
      // }
      console.log('Token is available');
      req.context = {
        ...baseContext,
      };
    }
  }

  next();
};
