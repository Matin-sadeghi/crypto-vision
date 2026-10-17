import { ApiError } from '@crypto/common';
import { tokenStore } from './token-store';

export type ApiClient = {
  get: <TResponse>(path: string, init?: RequestInit) => Promise<TResponse>;
  post: <TResponse>(path: string, body?: unknown, init?: RequestInit) => Promise<TResponse>;
  put: <TResponse>(path: string, body?: unknown, init?: RequestInit) => Promise<TResponse>;
  patch: <TResponse>(path: string, body?: unknown, init?: RequestInit) => Promise<TResponse>;
  delete: <TResponse>(path: string, init?: RequestInit) => Promise<TResponse>;
};

export type CreateApiClientOptions = {
  baseUrl: string | (() => string);
  getToken?: () => string | null;
};

type RefreshResponse = {
  access: string;
};

const REFRESH_PATH = '/auth/refresh/';

const resolveBaseUrl = (baseUrl: string | (() => string)): string =>
  typeof baseUrl === 'function' ? baseUrl() : baseUrl;

const joinUrl = (baseUrl: string, path: string): string => {
  const base = baseUrl.replace(/\/+$/, '');
  const segment = path.startsWith('/') ? path : `/${path}`;

  return `${base}${segment}`;
};

const parseJsonBody = async (response: Response): Promise<unknown> => {
  const text = await response.text();

  if (!text) return undefined;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const buildHeaders = (
  init: RequestInit | undefined,
  body: unknown,
  token: string | null,
): Headers => {
  const headers = new Headers(init?.headers);

  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // توکن جدید باید جایگزین Authorization قبلی شود.
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    headers.delete('Authorization');
  }

  return headers;
};

const getErrorMessage = (body: unknown, fallback: string): string => {
  if (
    typeof body === 'object' &&
    body !== null &&
    'detail' in body &&
    typeof body.detail === 'string'
  ) {
    return body.detail;
  }

  return fallback || 'Request failed';
};

const shouldRefreshToken = (path: string): boolean => {
  const pathname = path.split('?')[0].replace(/\/+$/, '');

  const excludedPaths = ['/auth/login', '/auth/refresh', '/auth/logout', '/auth/register'];

  return !excludedPaths.some((excluded) => pathname === excluded || pathname.endsWith(excluded));
};

export function createApiClient({
  baseUrl,
  getToken = () => tokenStore.get(),
}: CreateApiClientOptions): ApiClient {
  // درخواست‌های هم‌زمان 401 از یک Refresh مشترک استفاده می‌کنند.
  let refreshPromise: Promise<string | null> | null = null;

  const refreshAccessToken = async (): Promise<string | null> => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      try {
        const response = await fetch(joinUrl(resolveBaseUrl(baseUrl), REFRESH_PATH), {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          tokenStore.clear();
          return null;
        }

        const data = (await parseJsonBody(response)) as Partial<RefreshResponse> | undefined;

        if (!data || typeof data.access !== 'string') {
          tokenStore.clear();
          return null;
        }

        tokenStore.set(data.access);

        return data.access;
      } catch {
        tokenStore.clear();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();

    return refreshPromise;
  };

  const request = async <TResponse>(
    path: string,
    init?: RequestInit,
    jsonBody?: unknown,
    alreadyRetried = false,
  ): Promise<TResponse> => {
    const token = getToken();
    const headers = buildHeaders(init, jsonBody, token);

    const response = await fetch(joinUrl(resolveBaseUrl(baseUrl), path), {
      ...init,
      headers,
      credentials: 'include',
      body: jsonBody !== undefined ? JSON.stringify(jsonBody) : init?.body,
    });

    // در صورت انقضای Access Token، یک بار Refresh و Retry انجام بده.
    if (response.status === 401 && !alreadyRetried && shouldRefreshToken(path)) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        return request<TResponse>(path, init, jsonBody, true);
      }
    }

    const parsedBody = await parseJsonBody(response);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        getErrorMessage(parsedBody, response.statusText),
        parsedBody,
      );
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return parsedBody as TResponse;
  };

  return {
    get: (path, init) => request(path, { ...init, method: 'GET' }),
    post: (path, body, init) => request(path, { ...init, method: 'POST' }, body),
    put: (path, body, init) => request(path, { ...init, method: 'PUT' }, body),
    patch: (path, body, init) => request(path, { ...init, method: 'PATCH' }, body),
    delete: (path, init) => request(path, { ...init, method: 'DELETE' }),
  };
}

/**
 * Browser: same-origin `/api/v1` (Next rewrite → Django).
 * Server: `API_INTERNAL_BASE_URL` or direct Django URL.
 */
export function resolveApiBaseUrl(): string {
  return 'http://127.0.0.1:8000/api/v1';
}
