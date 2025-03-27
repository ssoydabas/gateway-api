import { RegisterInput } from '@/schemas/account/inputs/registerInput';
import { TokenModel } from '@/models/accountModels/tokenModel';
import { AuthServiceError } from '@/errors/authServiceError';
import {
  meAccount,
  registerAccount,
  loginAccount,
} from '@/adapters/auth/authAdapter';
import { AxiosError } from 'axios';
import { sendVerificationEmail } from '@/adapters/mail/mailAdapter';
import { LoginInput } from '@/schemas/account/inputs/loginInput';
import { AccountModel } from '@/models/accountModels/accountModel';

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

export default {
  register,
  login,
  me,
};
