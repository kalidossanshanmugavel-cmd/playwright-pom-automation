import { test, expect } from "@playwright/test";
import { loginAs } from "@utils/auth";
import { CoursesPage } from "@pages/CoursesPage";
import { DashboardPage } from "@pages/DashboardPage";

for (const role of ["admin", "trainer", "student"] as const) {
  test(`TC14 - ${role} can browse courses`, async ({ page }) => {
    await loginAs(page, role);
    await page.goto("/courses");
    const courses = new CoursesPage(page);
    await courses.expectCourses();
  });
}

test("TC15 - student opens first course", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/courses");
  const courses = new CoursesPage(page);
  await courses.openFirstCourse();
});

test("TC16 - dashboard course card navigates", async ({ page }) => {
  await loginAs(page, "student");
  const dashboard = new DashboardPage(page);
  await dashboard.openCoursesCard();
});

test("TC17 - MCQ page is accessible", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/mcq");
  await expect(page.getByRole("heading", { name: "MCQ Assessment" })).toBeVisible();
});

test("TC18 - practice page is accessible", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/practice");
  await expect(page.getByRole("heading", { name: "Practice Lab" })).toBeVisible();
});

test("TC19 - progress page is accessible", async ({ page }) => {
  await loginAs(page, "student");
  await page.goto("/progress");
  await expect(page.getByRole("heading", { name: "Learning Progress" })).toBeVisible();
});
