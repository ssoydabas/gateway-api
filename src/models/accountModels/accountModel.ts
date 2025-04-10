import { z } from 'zod';
import { v4 as uuid } from 'uuid';

export enum VerificationStatus {
  NOT_VERIFIED = 'not_verified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export const accountModel = z.object({
  id: z.string().uuid().default(uuid()),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  photo_url: z.string().default(''),
  verification_status: z
    .nativeEnum(VerificationStatus)
    .default(VerificationStatus.PENDING),
  role: z.string(),
  status: z.string(),
  last_login_at: z.date(),
  created_at: z.date().default(new Date()),
  updated_at: z.date().default(new Date()),
});

export type AccountModel = z.infer<typeof accountModel>;
