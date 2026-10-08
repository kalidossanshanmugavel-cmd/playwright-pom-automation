import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class CourseDetailsPage extends BasePage {
  constructor(page: Page) { super(page); }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Course Lessons" })).toBeVisible();
    await expect(this.page.getByRole("link", { name: "Start Assessment" })).toBeVisible();
  }
  async expandFirstLesson(): Promise<void> {
    const lesson = this.page.locator(".MuiAccordionSummary-root").first();
    await expect(lesson).toBeVisible();
    await lesson.click();
    await expect(this.page.locator(".MuiAccordionDetails-root").first()).toBeVisible();
  }
  async startAssessment(): Promise<void> {
    await this.page.getByRole("link", { name: "Start Assessment" }).click();
    await expect(this.page).toHaveURL(/\/mcq\?course=/);
  }
}
