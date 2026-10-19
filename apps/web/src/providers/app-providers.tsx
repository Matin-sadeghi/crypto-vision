'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { queryClient } from '~/api';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors position="top-center" closeButton duration={4000} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    </>
  );
}
