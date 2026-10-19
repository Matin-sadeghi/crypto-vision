import { useMutation } from '@tanstack/react-query';
import { api } from '~/api';
import { AuthLoginFormData } from '../types';
import { tokenStore } from '@crypto/frontend-core';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@crypto/frontend-core';

type LoginResponse = {
  access: string;
  refresh: string;
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (data: AuthLoginFormData) =>
      api.post<LoginResponse>(API_ENDPOINTS.auth.login, data),
    onSuccess: (res) => {
      if (!res.data) {
        toast.error('The login response did not include authentication data.');
        return;
      }

      tokenStore.set(res.data.access);
      toast.success(res.message);
      // redirect('/me');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return {
    submit: (data: AuthLoginFormData) => mutation.mutate(data),
    loading: mutation.isPending,
  };
};
