import { test } from "@playwright/test";
import { loginAs } from "@utils/auth";
import { ProgressPage } from "@pages/ProgressPage";

for (const role of ["admin", "trainer", "student"] as const) {
  test(`${role} can view learning progress`, async ({ page }) => {
    await loginAs(page, role);
    const progress = new ProgressPage(page);
    await progress.visit();
    await progress.expectLoaded();
  });
}
