/**
 * Centralized API client.
 *
 * All network access goes through this module. UI components never call
 * fetch directly — they use the feature services in src/services/*.ts.
 *
 * The FastAPI backend is not available yet; base URL comes from the
 * VITE_API_BASE_URL environment variable (see .env.example).
 */

export const API_BASE_URL: string =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "";

export const API_CONFIGURED = API_BASE_URL.length > 0;

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/** Dispatched whenever a request returns 401 so the session can be dropped. */
export const UNAUTHORIZED_EVENT = "app:unauthorized";

type Query = Record<string, string | number | boolean | undefined | null>;


export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown | undefined;
  query?: Query | undefined;
  signal?: AbortSignal | undefined;
  headers?: Record<string, string> | undefined;
}

function buildUrl(path: string, query?: Query): string {
  const base = API_BASE_URL.replace(/\/$/, "");
  const url = `${base}/${path.replace(/^\//, "")}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

/**
 * Session credentials are expected to be delivered by the backend as
 * httpOnly cookies. Nothing sensitive is ever written to localStorage.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_CONFIGURED) {
    throw new ApiError(
      "API base URL is not configured. Set VITE_API_BASE_URL to the FastAPI server.",
      0,
    );
  }

  const { method = "GET", body, query, signal, headers } = options;

  const response = await fetch(buildUrl(path, query), {
    method,
    credentials: "include",
    ...(signal ? { signal } : {}),
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      // Notify the session provider; it clears state without retrying.
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    const message =
      (payload as { detail?: string } | null)?.detail ?? `Request failed (${response.status})`;
    throw new ApiError(message, response.status, payload);
  }


  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
