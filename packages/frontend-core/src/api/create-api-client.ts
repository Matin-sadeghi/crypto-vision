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

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export function createApiClient({
  baseUrl,
  getToken = () => tokenStore.get(),
}: CreateApiClientOptions): ApiClient {
  const request = async <TResponse>(
    path: string,
    init?: RequestInit,
    jsonBody?: unknown,
  ): Promise<TResponse> => {
    const token = getToken();
    const headers = buildHeaders(init, jsonBody, token);

    const response = await fetch(joinUrl(resolveBaseUrl(baseUrl), path), {
      ...init,
      headers,
      credentials: 'include',
      body: jsonBody !== undefined ? JSON.stringify(jsonBody) : init?.body,
    });

    const parsedBody = await parseJsonBody(response);

    if (!response.ok) {
      const message =
        typeof parsedBody === 'object' &&
        parsedBody !== null &&
        'detail' in parsedBody &&
        typeof (parsedBody as { detail: unknown }).detail === 'string'
          ? (parsedBody as { detail: string }).detail
          : response.statusText || 'Request failed';

      throw new ApiError(response.status, message, parsedBody);
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
