import { RegisterInput } from '@/schemas/account/inputs/registerInput';

import { createHttpAdapter } from '../http/httpAdapter';
import { authApiUrl, authApiSuffix } from '@/constants';
import { TokenModel } from '@/models/accountModels/tokenModel';
import { VerificationCodeOutput } from '@/schemas/account/outputs/verificationCodeOutput';
import { LoginInput } from '@/schemas/account/inputs/loginInput';
import { AccountModel } from '@/models/accountModels/accountModel';
import { EmailInput } from '@/schemas/common/inputs/emailInput';
import { ResetPasswordInput } from '@/schemas/account/inputs/resetPasswordInput';

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

export function getEmailVerificationTokenAccount(id: string) {
  return http.get<TokenModel>(`/accounts/get-email-verification-token/${id}`);
}

export function verifyEmailAccount(token: string) {
  return http.post(`/accounts/verify-email`, { token });
}

export function setResetPasswordTokenAccount(input: EmailInput) {
  return http.post(`/accounts/set-reset-password-token`, input);
}

export function resetPasswordAccount(input: ResetPasswordInput) {
  return http.post(`/accounts/reset-password`, input);
}

// ----------- GET REQUESTS -----------

export function getAccountByEmail(email: string) {
  return http.get<AccountModel>(`/accounts/email/${email}`);
}
