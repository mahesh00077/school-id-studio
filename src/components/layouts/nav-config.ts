import {
  Building2,
  CreditCard,
  Files,
  Gauge,
  History,
  IdCard,
  LayoutDashboard,
  Palette,
  Settings,
  Users,
} from "lucide-react";
import type { Role } from "@/types";

export interface NavItem {
  label: string;
  to: string;
  icon: typeof Gauge;
  /** Roles allowed to see this item once real auth is wired up. */
  roles: Role[];
}

export const OWNER_NAV: NavItem[] = [
  { label: "Dashboard", to: "/owner/dashboard", icon: LayoutDashboard, roles: ["OWNER"] },
  { label: "Schools", to: "/owner/schools", icon: Building2, roles: ["OWNER"] },
  { label: "Users", to: "/owner/users", icon: Users, roles: ["OWNER"] },
  { label: "Designs", to: "/owner/designs", icon: Palette, roles: ["OWNER"] },
  { label: "Credits", to: "/owner/credits", icon: CreditCard, roles: ["OWNER"] },
  { label: "History", to: "/owner/history", icon: History, roles: ["OWNER"] },
  { label: "Settings", to: "/owner/settings", icon: Settings, roles: ["OWNER"] },
];

export const SCHOOL_NAV: NavItem[] = [
  {
    label: "Dashboard",
    to: "/school/dashboard",
    icon: LayoutDashboard,
    roles: ["SCHOOL_ADMIN", "SCHOOL_STAFF"],
  },
  {
    label: "ID Cards",
    to: "/school/id-cards",
    icon: IdCard,
    roles: ["SCHOOL_ADMIN", "SCHOOL_STAFF"],
  },
  {
    label: "Generate ID",
    to: "/school/id-cards/create",
    icon: Files,
    roles: ["SCHOOL_ADMIN", "SCHOOL_STAFF"],
  },
  {
    label: "History",
    to: "/school/history",
    icon: History,
    roles: ["SCHOOL_ADMIN", "SCHOOL_STAFF"],
  },
  {
    label: "Designs",
    to: "/school/designs",
    icon: Palette,
    roles: ["SCHOOL_ADMIN", "SCHOOL_STAFF"],
  },
  { label: "Users", to: "/school/users", icon: Users, roles: ["SCHOOL_ADMIN"] },
];
