import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class ProgressPage extends BasePage {
  constructor(page: Page) { super(page); }
  async visit(): Promise<void> { await this.open("/progress"); }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Learning Progress" })).toBeVisible();
    await expect(this.page.getByRole("columnheader", { name: "Course" })).toBeVisible();
    await expect(this.page.getByRole("columnheader", { name: "Score" })).toBeVisible();
    await expect(this.page.getByRole("columnheader", { name: "Percentage" })).toBeVisible();
  }
}
