import { RegisterInput } from '@/schemas/account/inputs/registerInput';

import { createHttpAdapter } from '../http/httpAdapter';
import { authApiUrl, authApiSuffix } from '@/constants';
import { TokenOutput } from '@/schemas/account/outputs/tokenOutput';

const http = createHttpAdapter(authApiUrl + authApiSuffix);

export function registerAccount(input: RegisterInput) {
  return http.post<TokenOutput>('/accounts', input);
}
