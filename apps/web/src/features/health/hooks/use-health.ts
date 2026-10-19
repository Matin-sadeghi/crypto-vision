'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '~/api';

import type { HealthStatus } from '../types/health.types';
import { healthKeys } from './health.query-name';

export const useHealth = (enabled = true) => {
  const query = useQuery({
    queryKey: healthKeys.status(),
    queryFn: () => api.get<HealthStatus>('/health/'),
    enabled,
  });

  return {
    health: query.data?.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
