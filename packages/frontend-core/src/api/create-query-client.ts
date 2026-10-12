import { isApiForbiddenError, isApiUnauthorizedError } from '@crypto/common';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export type ApiErrorHandler = (error: unknown) => void;

export type CreateQueryClientOptions = {
  onUnauthorized?: ApiErrorHandler;
  onForbidden?: ApiErrorHandler;
};

const defaultHandleError =
  (options: CreateQueryClientOptions) =>
  (error: unknown): void => {
    if (isApiUnauthorizedError(error)) {
      options.onUnauthorized?.(error);
      return;
    }

    if (isApiForbiddenError(error)) {
      options.onForbidden?.(error);
    }
  };

export function createQueryClient(options: CreateQueryClientOptions = {}) {
  const handleError = defaultHandleError(options);

  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleError,
    }),
    mutationCache: new MutationCache({
      onError: handleError,
    }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
