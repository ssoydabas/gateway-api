import { z } from 'zod';

import { registerInput } from '@/schemas/account/inputs/registerInput';
import { loginInput } from '@/schemas/account/inputs/loginInput';

const register = z.object({
  body: registerInput,
});

const login = z.object({
  body: loginInput,
});

const getEmailVerificationToken = z.object({
  query: z.object({
    email: z.string().email(),
  }),
});

export default {
  register,
  login,
  getEmailVerificationToken,
};
