import { API_ENDPOINTS } from '@crypto/frontend-core';
import { api } from '~/api';
import type { AuthUser } from '../types';

export const currentUserApi = () => api.get<AuthUser>(API_ENDPOINTS.auth.me);

export const logoutApi = () => api.post<never>(API_ENDPOINTS.auth.logout);
