/**
 * Authentication service.
 *
 * Thin wrapper around the shared API client (src/services/api.ts) for the
 * existing FastAPI session endpoints. Authentication relies entirely on the
 * httpOnly `school_id_session` cookie set by the backend — no token is ever
 * read, stored, or sent by this code.
 */

import { api } from "./api";

export type BackendRole = "OWNER" | "SCHOOL_ADMIN" | "SCHOOL_STAFF";

/** Exact shape returned by the backend UserResponse schema. */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: BackendRole;
  school_id: number | null;
}

export function login(email: string, password: string): Promise<AuthUser> {
  return api.post<AuthUser>("/auth/login", { email, password });
}

export function fetchMe(signal?: AbortSignal): Promise<AuthUser> {
  return api.get<AuthUser>("/auth/me", signal ? { signal } : {});
}

export function logoutRequest(): Promise<{ message: string }> {
  return api.post<{ message: string }>("/auth/logout");
}

/** Landing route for an authenticated user, decided by the backend role. */
export function dashboardPathForRole(role: BackendRole): string {
  return role === "OWNER" ? "/owner/dashboard" : "/school/dashboard";
}
