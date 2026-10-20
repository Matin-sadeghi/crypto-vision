import { api } from '~/api';
import { AuthLoginFormData } from '../types';
import { API_ENDPOINTS } from '@crypto/frontend-core';
import type { AuthUser } from '../types';

type LoginResponse = {
  user: AuthUser;
  access: string;
};

export const loginApi = async (data: AuthLoginFormData) =>
  api.post<LoginResponse>(API_ENDPOINTS.auth.login, data);
