/**
 * Session context — preview placeholder.
 *
 * Real authentication will be issued by FastAPI via httpOnly cookies in a
 * later phase. Until then, a fixed preview user is shown per portal so the UI
 * shell can be developed. No role switching is exposed; the role shown is
 * determined by the portal layout (owner vs. school), not by user action.
 *
 * Nothing sensitive is persisted to localStorage.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Role } from "@/types";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  schoolName: string | null;
}

interface SessionContextValue {
  user: SessionUser;
  isOwner: boolean;
  isSchoolAdmin: boolean;
  isSchoolStaff: boolean;
}

const PREVIEW_OWNER: SessionUser = {
  name: "Preview Owner",
  email: "owner@preview.local",
  role: "OWNER",
  schoolName: null,
};

const PREVIEW_SCHOOL_ADMIN: SessionUser = {
  name: "Preview School Admin",
  email: "school-admin@preview.local",
  role: "SCHOOL_ADMIN",
  schoolName: "Preview School",
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  children,
  initialRole = "OWNER",
}: {
  children: ReactNode;
  initialRole?: Role;
}) {
  const user = initialRole === "OWNER" ? PREVIEW_OWNER : PREVIEW_SCHOOL_ADMIN;

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      isOwner: user.role === "OWNER",
      isSchoolAdmin: user.role === "SCHOOL_ADMIN",
      isSchoolStaff: user.role === "SCHOOL_STAFF",
    }),
    [user],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
