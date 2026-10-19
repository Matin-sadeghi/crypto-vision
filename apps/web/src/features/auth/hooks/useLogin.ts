import { tokenStore } from '@crypto/frontend-core';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { loginApi } from '../api';
import { AuthLoginFormData } from '../types';

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: loginApi,
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
