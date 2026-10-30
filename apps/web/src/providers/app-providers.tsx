'use client';

import { useThemeStore } from '@crypto/frontend-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

import { queryClient } from '~/api';

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useThemeStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" closeButton duration={4000} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </>
  );
}
