import { z } from 'zod';

export const verificationCodeOutput = z.object({
  verification_code: z.string(),
});

export type VerificationCodeOutput = z.infer<typeof verificationCodeOutput>;
