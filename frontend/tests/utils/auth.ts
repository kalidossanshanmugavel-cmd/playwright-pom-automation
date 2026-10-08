import { Page } from "@playwright/test";
import { Role, users } from "../data/users";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

export async function loginAs(page: Page, role: Role): Promise<void> {
  const account = users[role];
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await login.openLogin();
  await login.fillCredentials(account.email, account.password);
  await login.submit();
  await dashboard.expectRoleDashboard(role);
}
