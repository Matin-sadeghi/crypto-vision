export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export type ApiSuccessResponse<TData = undefined> = {
  status: number;
  message: string;
  data?: TData;
};

export type ApiErrorResponse = {
  status: number;
  message: string;
};

export function isApiUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export function isApiForbiddenError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 403;
}
