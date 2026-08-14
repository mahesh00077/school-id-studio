/**
 * Feature services.
 *
 * Each function calls the real API through `api` when VITE_API_BASE_URL is
 * configured, and otherwise returns clearly marked mock data so the UI can be
 * developed before the FastAPI backend exists. Replacing mock fallbacks with
 * real endpoints is a one-line change per function.
 */

import { API_CONFIGURED, api } from "./api";
import {
  MOCK_CREDITS,
  MOCK_DESIGNS,
  MOCK_ID_CARDS,
  MOCK_OWNER_ACTIVITY,
  MOCK_OWNER_STATS,
  MOCK_SCHOOL_ACTIVITY,
  MOCK_SCHOOL_STATS,
  MOCK_USERS,
} from "./mock-data";
import type {
  ActivityEvent,
  CardDesign,
  CreditTransaction,
  IdCard,
  OwnerStats,
  School,
  SchoolStats,
  User,
} from "@/types";

/** True when the UI is showing temporary mock data instead of live API data. */
export const USING_MOCK_DATA = !API_CONFIGURED;

async function withFallback<T>(request: () => Promise<T>, fallback: T): Promise<T> {
  if (!API_CONFIGURED) return fallback;
  return request();
}

export const ownerService = {
  getStats: () => withFallback<OwnerStats>(() => api.get("/owner/stats"), MOCK_OWNER_STATS),
  getActivity: () =>
    withFallback<ActivityEvent[]>(() => api.get("/owner/activity"), MOCK_OWNER_ACTIVITY),
};

export const schoolsService = {
  list: () => api.get<School[]>("/schools"),
  get: (id: number) => api.get<School>(`/schools/${id}`),
  create: (payload: { name: string; code: string }) => api.post<School>("/schools", payload),
  update: (id: number, payload: Partial<School>) => api.patch<School>(`/schools/${id}`, payload),
};

export const usersService = {
  list: (params?: { schoolId?: string }) =>
    withFallback<User[]>(
      () => api.get("/users", { query: params }),
      params?.schoolId ? MOCK_USERS.filter((u) => u.schoolId === params.schoolId) : MOCK_USERS,
    ),
  invite: (payload: { email: string; role: string; schoolId?: string }) =>
    api.post<User>("/users/invite", payload),
};

export const designsService = {
  list: (params?: { schoolId?: string }) =>
    withFallback<CardDesign[]>(
      () => api.get("/designs", { query: params }),
      params?.schoolId ? MOCK_DESIGNS.slice(0, 2) : MOCK_DESIGNS,
    ),
};

export const creditsService = {
  listTransactions: (params?: { schoolId?: string }) =>
    withFallback<CreditTransaction[]>(
      () => api.get("/credits/transactions", { query: params }),
      MOCK_CREDITS,
    ),
  allocate: (payload: { schoolId: string; amount: number; note?: string }) =>
    api.post<CreditTransaction>("/credits/allocate", payload),
};

export const idCardsService = {
  list: (params?: { schoolId?: string }) =>
    withFallback<IdCard[]>(() => api.get("/id-cards", { query: params }), MOCK_ID_CARDS),
  /**
   * Generation, credit validation and JPEG rendering happen entirely
   * server-side in a later phase. This is the call signature the UI will use.
   */
  generate: (payload: { designId: string; fields: Record<string, string>; photo?: File }) =>
    api.post<IdCard>("/id-cards/generate", payload),
};

export const schoolPortalService = {
  getStats: (schoolId?: string) =>
    withFallback<SchoolStats>(
      () => api.get("/school/stats", { query: { schoolId } }),
      MOCK_SCHOOL_STATS,
    ),
  getActivity: (schoolId?: string) =>
    withFallback<ActivityEvent[]>(
      () => api.get("/school/activity", { query: { schoolId } }),
      MOCK_SCHOOL_ACTIVITY,
    ),
};
