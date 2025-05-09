import { RegisterInput } from '@/schemas/account/inputs/registerInput';
import { TokenModel } from '@/models/accountModels/tokenModel';
import { AuthServiceError } from '@/errors/authServiceError';
import {
  meAccount,
  registerAccount,
  loginAccount,
  getEmailVerificationTokenAccount,
  getAccountByEmail,
  verifyEmailAccount,
  setResetPasswordTokenAccount,
  resetPasswordAccount,
  getAccountById,
} from '@/adapters/auth/authAdapter';
import { AxiosError } from 'axios';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/adapters/mail/mailAdapter';
import { LoginInput } from '@/schemas/account/inputs/loginInput';
import { AccountModel } from '@/models/accountModels/accountModel';
import { EmailInput } from '@/schemas/common/inputs/emailInput';
import { ResetPasswordInput } from '@/schemas/account/inputs/resetPasswordInput';

async function register(input: RegisterInput): Promise<TokenModel> {
  try {
    const response = await registerAccount(input);
    const { verification_code, token } = response.data;
    await sendVerificationEmail(input.email, verification_code);
    return { token };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AuthServiceError(
        error.response?.status || 500,
        error.response?.data?.message || error.message,
        error.response?.data?.details,
      );
    }
    throw error;
  }
}

async function login(input: LoginInput): Promise<TokenModel> {
  const response = await loginAccount(input);
  const { token } = response.data;
  return { token };
}

async function me(token: string): Promise<AccountModel> {
  const response = await meAccount(token);
  return response.data;
}

async function getEmailVerificationToken(input: EmailInput): Promise<string> {
  const accountResponse = await getAccountByEmail(input.email);
  const response = await getEmailVerificationTokenAccount(
    accountResponse.data.id,
  );
  await sendVerificationEmail(input.email, response.data.token);
  return response.data.token;
}

async function verifyEmail(token: string): Promise<void> {
  await verifyEmailAccount(token);
}

async function setResetPasswordToken(input: EmailInput): Promise<string> {
  const response = await setResetPasswordTokenAccount(input);
  const { token } = response.data;
  await sendPasswordResetEmail(input.email, token);
  return token;
}

async function resetPassword(input: ResetPasswordInput): Promise<void> {
  await resetPasswordAccount(input);
}

// ----------- GET REQUESTS -----------

async function _getAccountById(id: string): Promise<AccountModel> {
  const response = await getAccountById(id);
  return response.data;
}

async function _getAccountByEmail(email: string): Promise<AccountModel> {
  const response = await getAccountByEmail(email);
  return response.data;
}

export default {
  register,
  login,
  me,
  getEmailVerificationToken,
  verifyEmail,
  setResetPasswordToken,
  resetPassword,
  _getAccountById,
  _getAccountByEmail,
};
