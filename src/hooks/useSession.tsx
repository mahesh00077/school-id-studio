/**
 * Session context — backed by the FastAPI cookie session.
 *
 * The authenticated user is always the one returned by GET /api/auth/me.
 * No mock users, no role selection, no token in JS-accessible storage.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { ApiError } from "@/services/api";
import { fetchMe, logoutRequest, type AuthUser } from "@/services/auth";
import { UNAUTHORIZED_EVENT } from "@/services/api";

interface SessionContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const inFlight = useRef(false);

  const refreshSession = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    try {
      const me = await fetchMe();
      setUser(me);
    } catch (error) {
      // 401 (or any failure) simply means "not authenticated". Never retry.
      if (!(error instanceof ApiError)) console.error(error);
      setUser(null);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  // Any protected request that returns 401 drops the frontend session.
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Backend owns the cookie; clearing local state is still correct.
    }
    setUser(null);
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: user !== null,
      logout,
      refreshSession,
    }),
    [user, loading, logout, refreshSession],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
