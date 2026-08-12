/**
 * Session context.
 *
 * Placeholder only. Real authentication will be issued by FastAPI via
 * httpOnly cookies; nothing is persisted to localStorage here. The active
 * role is kept in memory purely so the UI shell can be developed and
 * role-based navigation previewed.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Role } from "@/types";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  schoolName: string | null;
}

interface SessionContextValue {
  user: SessionUser;
  /** Preview-only role switch. Removed once real auth lands. */
  setRole: (role: Role) => void;
  isOwner: boolean;
  isSchoolAdmin: boolean;
  isSchoolStaff: boolean;
}

const DEFAULT_USERS: Record<Role, SessionUser> = {
  OWNER: { name: "Aarav Mehta", email: "aarav@idsuite.app", role: "OWNER", schoolName: null },
  SCHOOL_ADMIN: {
    name: "Priya Nair",
    email: "priya@greenwood.edu",
    role: "SCHOOL_ADMIN",
    schoolName: "Greenwood International School",
  },
  SCHOOL_STAFF: {
    name: "Rahul Deshpande",
    email: "rahul@greenwood.edu",
    role: "SCHOOL_STAFF",
    schoolName: "Greenwood International School",
  },
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  children,
  initialRole = "OWNER",
}: {
  children: ReactNode;
  initialRole?: Role;
}) {
  const [role, setRoleState] = useState<Role>(initialRole);
  const setRole = useCallback((next: Role) => setRoleState(next), []);

  const value = useMemo<SessionContextValue>(
    () => ({
      user: DEFAULT_USERS[role],
      setRole,
      isOwner: role === "OWNER",
      isSchoolAdmin: role === "SCHOOL_ADMIN",
      isSchoolStaff: role === "SCHOOL_STAFF",
    }),
    [role, setRole],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
