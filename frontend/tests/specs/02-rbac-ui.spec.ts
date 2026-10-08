import { test, expect } from "@playwright/test";
import { loginAs } from "../utils/auth";
import { DashboardPage } from "../pages/DashboardPage";
import { UsersPage } from "../pages/UsersPage";

for (const role of ["student", "trainer"] as const) {
  test(`TC08 - ${role} cannot open admin dashboard`, async ({ page }) => {
    await loginAs(page, role);
    await page.goto("/admin/dashboard");
    const dashboard = new DashboardPage(page);
    await dashboard.expectRoleDashboard(role);
  });

  test(`TC09 - ${role} cannot open user management`, async ({ page }) => {
    await loginAs(page, role);
    await page.goto("/admin/users");
    const dashboard = new DashboardPage(page);
    await dashboard.expectRoleDashboard(role);
  });
}

test("TC10 - student cannot open trainer dashboard", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/trainer/dashboard");
  await expect(page).toHaveURL(/\/student\/dashboard$/);
});

test("TC11 - admin can open user management", async ({ page }) => {
  await loginAs(page, "admin");
  await page.goto("/admin/users");
  const users = new UsersPage(page);
  await users.expectUserManagement();
});

test("TC12 - unauthenticated user redirected to login", async ({ page }) => {
  await page.goto("/admin/users");
  await expect(page).toHaveURL(/\/login$/);
});

test("TC13 - root redirects to user's dashboard", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/");
  await expect(page).toHaveURL(/\/student\/dashboard$/);
});
