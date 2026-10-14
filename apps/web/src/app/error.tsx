'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // TODO: Send error to monitoring service.
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z"
          />
        </svg>
      </div>

      <p className="mt-6 text-sm font-medium text-red-600 dark:text-red-400">Unexpected Error</p>

      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Something went wrong!</h1>

      <p className="mt-3 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
        We encountered an unexpected problem while processing your request. Please try again.
      </p>

      {error.digest && (
        <p className="mt-3 text-xs text-gray-500" dir="ltr">
          Error ID: {error.digest}
        </p>
      )}

      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Try Again
      </button>
    </main>
  );
}
