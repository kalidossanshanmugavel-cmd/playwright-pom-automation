import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class CoursesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCourses(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Courses", exact: true })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "View Course" }).first()).toBeVisible();
  }

  async openFirstCourse(): Promise<void> {
    await this.page.getByRole("link", { name: "View Course" }).first().click();
    await expect(this.page).toHaveURL(/\/courses\/\d+$/);
  }
}
