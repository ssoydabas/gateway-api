import { RegisterInput } from '@/schemas/account/inputs/registerInput';
import { TokenOutput } from '@/schemas/account/outputs/tokenOutput';
import { AuthServiceError } from '@/errors/authServiceError';
import { registerAccount } from '@/adapters/auth/authAdapter';
import { AxiosError } from 'axios';
import { sendVerificationEmail } from '@/adapters/mail/mailAdapter';
import { LoginInput } from '@/schemas/account/inputs/loginInput';
import { loginAccount } from '@/adapters/auth/authAdapter';

async function register(input: RegisterInput): Promise<TokenOutput> {
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

async function login(input: LoginInput): Promise<TokenOutput> {
  const response = await loginAccount(input);
  const { token } = response.data;
  return { token };
}

export default {
  register,
  login,
};
