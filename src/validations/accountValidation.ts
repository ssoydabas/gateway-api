import { z } from 'zod';

import { registerInput } from '@/schemas/account/inputs/registerInput';

const register = z.object({
  body: registerInput,
});

export default {
  register,
};
