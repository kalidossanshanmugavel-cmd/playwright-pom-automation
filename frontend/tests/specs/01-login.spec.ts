import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { users } from "../data/users";
import { loginAs } from "../utils/auth";

test("TC01 - login page displays form", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openLogin();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("TC02 - invalid credentials show error", async ({ page }) => {
  const login = new LoginPage(page);
  await login.openLogin();
  await login.fillCredentials("student@example.com", "wrong-password");
  await login.submit();
  await login.expectLoginError();
});

test("TC03 - admin login redirects", async ({ page }) => {
  await loginAs(page, "admin");
});

test("TC04 - trainer login redirects", async ({ page }) => {
  await loginAs(page, "trainer");
});

test("TC05 - student login redirects", async ({ page }) => {
  await loginAs(page, "student");
});

test("TC06 - logout clears session", async ({ page }) => {
  await loginAs(page, "student");
  const dashboard = new DashboardPage(page);
  await dashboard.logout();
  await page.goto(users.student.dashboard);
  await expect(page).toHaveURL(/\/login$/);
});

test("TC07 - login session survives reload", async ({ page }) => {
  await loginAs(page, "trainer");
  await page.reload();
  const dashboard = new DashboardPage(page);
  await dashboard.expectRoleDashboard("trainer");
});
