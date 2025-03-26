import { RegisterInput } from '@/schemas/account/inputs/registerInput';

import { createHttpAdapter } from '../http/httpAdapter';
import { authApiUrl, authApiSuffix } from '@/constants';

const http = createHttpAdapter(authApiUrl + authApiSuffix);

export function registerAccount(input: RegisterInput) {
  return http.post('/accounts', input);
}
