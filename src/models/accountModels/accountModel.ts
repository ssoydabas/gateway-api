import { z } from 'zod';
import { VerificationStatus } from './accountVerificationStatusEnum';
import { v4 as uuid } from 'uuid';

export const accountModel = z.object({
  id: z.string().uuid().default(uuid()),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  photoUrl: z.string().default(''),
  verificationStatus: z
    .nativeEnum(VerificationStatus)
    .default(VerificationStatus.PENDING),
  verificationCode: z.string().optional().nullable().default(uuid()),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export type AccountModel = z.infer<typeof accountModel>;
