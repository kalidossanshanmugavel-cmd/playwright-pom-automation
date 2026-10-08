import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PracticePage extends BasePage {
  constructor(page: Page) { super(page); }
  async visit(): Promise<void> { await this.open("/practice"); }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Practice Lab" })).toBeVisible();
    await expect(this.page.locator(".MuiSelect-select")).toBeVisible();
  }
  async expandFirstExercise(): Promise<void> {
    const exercise = this.page.locator(".MuiAccordionSummary-root").first();
    await expect(exercise).toBeVisible();
    await exercise.click();
    await expect(this.page.locator(".MuiAccordionDetails-root").first()).toBeVisible();
  }
}
