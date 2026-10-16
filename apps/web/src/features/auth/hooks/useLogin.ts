import { useMutation } from '@tanstack/react-query';
import { api } from '~/api';
import { AuthLoginFormData } from '../types';
import { tokenStore } from '@crypto/frontend-core';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type LoginResponse = {
  access: string;
  refresh: string;
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (data: AuthLoginFormData) => api.post<LoginResponse>('/auth/login/', data),
    onSuccess: (res) => {
      tokenStore.set(res.access);
      redirect('/me');
    },
    onError: (_e) => {
      console.log(_e);
      //   toast.error('error');
    },
  });

  return {
    submit: (data: AuthLoginFormData) => mutation.mutateAsync(data),
    loading: mutation.isPending,
  };
};
