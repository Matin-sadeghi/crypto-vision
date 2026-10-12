import {
  createApiClient,
  createQueryClient,
  registerQueryClient,
  resolveApiBaseUrl,
} from '@crypto/frontend-core';

export const api = createApiClient({
  baseUrl: resolveApiBaseUrl,
});


export const queryClient = createQueryClient({
  onUnauthorized: () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/login');
    }
  },
  onForbidden: () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/forbidden');
    }
  },
});

registerQueryClient(queryClient);
