import { AccountModel } from '@/models/accountModels/accountModel';

declare global {
  namespace Express {
    interface Request {
      context: {
        requestId: string;
        account?: AccountModel;
        startTime?: number;
        source?: 'web' | 'mobile' | 'api';
        [key: string]: any;
      };
    }
  }
}
