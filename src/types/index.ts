/**
 * Shared domain types.
 * These mirror the payloads the FastAPI backend will expose.
 */

export type Role = "OWNER" | "SCHOOL_ADMIN" | "SCHOOL_STAFF";

export type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface School {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string | null;
  schoolName: string | null;
  status: Status;
  lastActiveAt: string | null;
}

export interface CardDesign {
  id: string;
  name: string;
  orientation: "PORTRAIT" | "LANDSCAPE";
  hasBackSide: boolean;
  assignedSchools: number;
  updatedAt: string;
  /** Field keys the dynamic student form will render later. */
  fields: string[];
}

export interface CreditTransaction {
  id: string;
  schoolId: string;
  schoolName: string;
  type: "ALLOCATION" | "DEDUCTION" | "ADJUSTMENT";
  amount: number;
  balanceAfter: number;
  note: string;
  createdAt: string;
}

export interface IdCard {
  id: string;
  studentName: string;
  studentClass: string;
  rollNumber: string;
  designId: string;
  designName: string;
  schoolId: string;
  schoolName: string;
  status: "GENERATED" | "FAILED" | "PENDING";
  generatedBy: string;
  generatedAt: string;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface OwnerStats {
  totalSchools: number;
  activeSchools: number;
  totalUsers: number;
  totalCredits: number;
  totalCardsGenerated: number;
}

export interface SchoolStats {
  availableCredits: number;
  assignedDesigns: number;
  totalGenerated: number;
  generatedThisMonth: number;
}

/** Generic list envelope used by the future REST API. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
