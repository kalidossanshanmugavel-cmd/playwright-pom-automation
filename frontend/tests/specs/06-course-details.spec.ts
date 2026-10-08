import { test } from "@playwright/test";
import { loginAs } from "../utils/auth";
import { CoursesPage } from "../pages/CoursesPage";
import { CourseDetailsPage } from "../pages/CourseDetailsPage";

for (const role of ["admin", "trainer", "student"] as const) {
  test(`${role} can open course lessons and assessment`, async ({ page }) => {
    await loginAs(page, role);
    const courses = new CoursesPage(page);
    await courses.open("/courses");
    await courses.openFirstCourse();
    const details = new CourseDetailsPage(page);
    await details.expectLoaded();
    await details.expandFirstLesson();
    await details.startAssessment();
  });
}
