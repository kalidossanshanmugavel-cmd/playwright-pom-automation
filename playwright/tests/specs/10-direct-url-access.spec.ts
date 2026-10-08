import { test, expect } from "@playwright/test";
import { loginAs } from "@utils/auth";

const protectedPaths = ["/admin/dashboard", "/trainer/dashboard", "/student/dashboard", "/admin/users", "/courses", "/mcq", "/practice", "/progress"];
for (const path of protectedPaths) {
  test(`Guest cannot directly access ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login$/);
  });
}
for (const role of ["admin", "trainer", "student"] as const) {
  for (const other of ["admin", "trainer", "student"] as const) {
    if (role === other) continue;
    test(`${role} cannot open ${other} dashboard directly`, async ({ page }) => {
      await loginAs(page, role);
      await page.goto(`/${other}/dashboard`);
      await expect(page).toHaveURL(new RegExp(`/${role}/dashboard$`));
    });
  }
}
