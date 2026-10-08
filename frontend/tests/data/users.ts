export type Role = "admin" | "trainer" | "student";

export interface TestUser {
  email: string;
  password: string;
  role: Role;
  dashboard: string;
}

export const users: Record<Role, TestUser> = {
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "Admin@123",
    role: "admin",
    dashboard: "/admin/dashboard"
  },
  trainer: {
    email: process.env.TRAINER_EMAIL || "trainer@example.com",
    password: process.env.TRAINER_PASSWORD || "Trainer@123",
    role: "trainer",
    dashboard: "/trainer/dashboard"
  },
  student: {
    email: process.env.STUDENT_EMAIL || "student@example.com",
    password: process.env.STUDENT_PASSWORD || "Student@123",
    role: "student",
    dashboard: "/student/dashboard"
  }
};
