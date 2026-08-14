/**
 * TEMPORARY MOCK DATA — UI development only.
 *
 * Every export here is consumed exclusively by the feature services, which
 * fall back to this file while VITE_API_BASE_URL is unset. Delete this file
 * once the FastAPI endpoints are live.
 */

import type {
  ActivityEvent,
  CardDesign,
  CreditTransaction,
  IdCard,
  OwnerStats,
  SchoolStats,
  User,
} from "@/types";

export const MOCK_USERS: User[] = [
  {
    id: "usr_001",
    name: "Aarav Mehta",
    email: "aarav@idsuite.app",
    role: "OWNER",
    schoolId: null,
    schoolName: null,
    status: "ACTIVE",
    lastActiveAt: "2026-08-12T09:20:00Z",
  },
  {
    id: "usr_002",
    name: "Priya Nair",
    email: "priya@greenwood.edu",
    role: "SCHOOL_ADMIN",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    status: "ACTIVE",
    lastActiveAt: "2026-08-12T07:05:00Z",
  },
  {
    id: "usr_003",
    name: "Rahul Deshpande",
    email: "rahul@greenwood.edu",
    role: "SCHOOL_STAFF",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    status: "ACTIVE",
    lastActiveAt: "2026-08-11T14:42:00Z",
  },
  {
    id: "usr_004",
    name: "Sana Kapoor",
    email: "sana@xavier.edu",
    role: "SCHOOL_ADMIN",
    schoolId: "sch_002",
    schoolName: "St. Xavier High School",
    status: "ACTIVE",
    lastActiveAt: "2026-08-10T11:18:00Z",
  },
  {
    id: "usr_005",
    name: "Imran Sheikh",
    email: "imran@sunrise.edu",
    role: "SCHOOL_STAFF",
    schoolId: "sch_003",
    schoolName: "Sunrise Public School",
    status: "SUSPENDED",
    lastActiveAt: null,
  },
];

export const MOCK_DESIGNS: CardDesign[] = [
  {
    id: "dsg_001",
    name: "Classic Blue — Portrait",
    orientation: "PORTRAIT",
    hasBackSide: true,
    assignedSchools: 3,
    updatedAt: "2026-07-28",
    fields: ["student_name", "class", "roll_number", "blood_group", "guardian_contact"],
  },
  {
    id: "dsg_002",
    name: "Minimal White — Portrait",
    orientation: "PORTRAIT",
    hasBackSide: false,
    assignedSchools: 2,
    updatedAt: "2026-06-11",
    fields: ["student_name", "class", "admission_number"],
  },
  {
    id: "dsg_003",
    name: "Wide Badge — Landscape",
    orientation: "LANDSCAPE",
    hasBackSide: true,
    assignedSchools: 1,
    updatedAt: "2026-08-04",
    fields: ["student_name", "class", "roll_number", "address"],
  },
];

export const MOCK_CREDITS: CreditTransaction[] = [
  {
    id: "crd_001",
    schoolId: "sch_004",
    schoolName: "Delhi Model Academy",
    type: "ALLOCATION",
    amount: 1000,
    balanceAfter: 2150,
    note: "Annual top-up",
    createdAt: "2026-08-11T10:00:00Z",
  },
  {
    id: "crd_002",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    type: "DEDUCTION",
    amount: -1,
    balanceAfter: 1240,
    note: "ID card generated",
    createdAt: "2026-08-12T08:14:00Z",
  },
  {
    id: "crd_003",
    schoolId: "sch_002",
    schoolName: "St. Xavier High School",
    type: "ALLOCATION",
    amount: 500,
    balanceAfter: 380,
    note: "Purchase order #4411",
    createdAt: "2026-08-05T13:30:00Z",
  },
];

export const MOCK_ID_CARDS: IdCard[] = [
  {
    id: "idc_001",
    studentName: "Ananya Sharma",
    studentClass: "VIII-B",
    rollNumber: "2026-0184",
    designId: "dsg_001",
    designName: "Classic Blue — Portrait",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    status: "GENERATED",
    generatedBy: "Rahul Deshpande",
    generatedAt: "2026-08-12T08:14:00Z",
  },
  {
    id: "idc_002",
    studentName: "Kabir Joshi",
    studentClass: "X-A",
    rollNumber: "2026-0091",
    designId: "dsg_001",
    designName: "Classic Blue — Portrait",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    status: "GENERATED",
    generatedBy: "Rahul Deshpande",
    generatedAt: "2026-08-11T16:02:00Z",
  },
  {
    id: "idc_003",
    studentName: "Meera Iyer",
    studentClass: "VI-C",
    rollNumber: "2026-0322",
    designId: "dsg_002",
    designName: "Minimal White — Portrait",
    schoolId: "sch_001",
    schoolName: "Greenwood International School",
    status: "FAILED",
    generatedBy: "Priya Nair",
    generatedAt: "2026-08-10T09:45:00Z",
  },
  {
    id: "idc_004",
    studentName: "Dev Patel",
    studentClass: "IX-A",
    rollNumber: "2026-0410",
    designId: "dsg_003",
    designName: "Wide Badge — Landscape",
    schoolId: "sch_002",
    schoolName: "St. Xavier High School",
    status: "GENERATED",
    generatedBy: "Sana Kapoor",
    generatedAt: "2026-08-09T12:20:00Z",
  },
];

export const MOCK_OWNER_ACTIVITY: ActivityEvent[] = [
  {
    id: "act_001",
    actor: "Priya Nair",
    action: "generated an ID card",
    target: "Ananya Sharma",
    createdAt: "2026-08-12T08:14:00Z",
  },
  {
    id: "act_002",
    actor: "Owner",
    action: "allocated 1000 credits",
    target: "Delhi Model Academy",
    createdAt: "2026-08-11T10:00:00Z",
  },
  {
    id: "act_003",
    actor: "Owner",
    action: "assigned design",
    target: "Wide Badge — Landscape → St. Xavier",
    createdAt: "2026-08-08T15:31:00Z",
  },
  {
    id: "act_004",
    actor: "Sana Kapoor",
    action: "invited a staff member",
    target: "arjun@xavier.edu",
    createdAt: "2026-08-07T11:12:00Z",
  },
];

export const MOCK_SCHOOL_ACTIVITY: ActivityEvent[] = [
  {
    id: "sact_001",
    actor: "Rahul Deshpande",
    action: "generated an ID card",
    target: "Ananya Sharma — VIII-B",
    createdAt: "2026-08-12T08:14:00Z",
  },
  {
    id: "sact_002",
    actor: "Rahul Deshpande",
    action: "generated an ID card",
    target: "Kabir Joshi — X-A",
    createdAt: "2026-08-11T16:02:00Z",
  },
  {
    id: "sact_003",
    actor: "Priya Nair",
    action: "failed generation (photo rejected)",
    target: "Meera Iyer — VI-C",
    createdAt: "2026-08-10T09:45:00Z",
  },
];

export const MOCK_OWNER_STATS: OwnerStats = {
  totalSchools: 4,
  activeSchools: 3,
  totalUsers: 5,
  totalCredits: 3770,
  totalCardsGenerated: 8412,
};

export const MOCK_SCHOOL_STATS: SchoolStats = {
  availableCredits: 1240,
  assignedDesigns: 2,
  totalGenerated: 1731,
  generatedThisMonth: 96,
};
