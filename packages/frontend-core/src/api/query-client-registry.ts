import type { QueryClient } from '@tanstack/react-query';

let queryClientRef: QueryClient | null = null;

export function registerQueryClient(client: QueryClient): void {
  queryClientRef = client;
}

export function getRegisteredQueryClient(): QueryClient | null {
  return queryClientRef;
}
