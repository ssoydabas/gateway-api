import { RegisterInput } from '@/schemas/account/inputs/registerInput';

import { createHttpAdapter } from '../http/httpAdapter';
import { authApiUrl, authApiSuffix } from '@/constants';
import { TokenModel } from '@/models/accountModels/tokenModel';
import { VerificationCodeOutput } from '@/schemas/account/outputs/verificationCodeOutput';
import { LoginInput } from '@/schemas/account/inputs/loginInput';
import { AccountModel } from '@/models/accountModels/accountModel';

const http = createHttpAdapter(authApiUrl + authApiSuffix);

export function registerAccount(input: RegisterInput) {
  return http.post<TokenModel & VerificationCodeOutput>('/accounts', input);
}

export function loginAccount(input: LoginInput) {
  return http.post<TokenModel>('/accounts/authenticate', input);
}

export function meAccount(token: string) {
  return http.get<AccountModel>('/accounts/me', {
    Authorization: token,
  });
}
