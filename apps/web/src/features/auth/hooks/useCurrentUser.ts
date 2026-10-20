'use client';

import { useQuery } from '@tanstack/react-query';
import { currentUserApi } from '../api';
import { authKeys } from './auth.query-name';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const response = await currentUserApi();

      if (!response.data) {
        throw new Error('The current-user response did not include user data.');
      }

      return response.data;
    },
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
