import * as XLSX from "xlsx";
import path from "path";
import { dashboardFor, Role, TestUser } from "@data/users";

interface ExcelUserRow {
  role?: string;
  email?: string;
  username?: string;
  password?: string;
  dashboard?: string;
}

const filePath = path.resolve(__dirname, "../data/testdata.xlsx");

export function getUser(role: Role): TestUser {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames.find(name => name.toLowerCase() === "users") ?? workbook.SheetNames[0];
  if (!sheetName) throw new Error(`Excel file has no sheets: ${filePath}`);
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<ExcelUserRow>(sheet, { defval: "" });
  const user = rows.find(row => String(row.role).trim().toLowerCase() === role);
  if (!user) throw new Error(`User role '${role}' not found in Excel: ${filePath}`);
  const email = String(user.email || user.username || "").trim();
  const password = String(user.password || "");
  if (!email || !password) throw new Error(`Missing email/username or password for '${role}' in Excel`);
  return { role, email, password, dashboard: String(user.dashboard || dashboardFor(role)).trim() };
}
