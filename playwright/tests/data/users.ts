export type Role = "admin" | "trainer" | "student";

export interface TestUser {
  role: Role;
  email: string;
  password: string;
  dashboard: string;
}

// Credentials are loaded from tests/data/testdata.xlsx by excelReader.ts.
export const dashboardFor = (role: Role): string => `/${role}/dashboard`;
