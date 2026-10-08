import { test } from "@playwright/test";
import { loginAs } from "@utils/auth";
import { PracticePage } from "@pages/PracticePage";

for (const role of ["admin", "trainer", "student"] as const) {
  test(`${role} can view practice exercises`, async ({ page }) => {
    await loginAs(page, role);
    const practice = new PracticePage(page);
    await practice.visit();
    await practice.expectLoaded();
    await practice.expandFirstExercise();
  });
}
