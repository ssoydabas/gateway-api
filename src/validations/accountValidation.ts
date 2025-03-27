import { z } from 'zod';

import { registerInput } from '@/schemas/account/inputs/registerInput';
import { loginInput } from '@/schemas/account/inputs/loginInput';

const register = z.object({
  body: registerInput,
});

const login = z.object({
  body: loginInput,
});

export default {
  register,
  login,
};
