import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MCQPage extends BasePage {
  constructor(page: Page) { super(page); }
  async visit(): Promise<void> { await this.open("/mcq"); }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "MCQ Assessment" })).toBeVisible();
    await expect(this.page.getByRole("button", { name: "Shuffle Questions" })).toBeVisible();
  }
  async expectQuestion(): Promise<void> {
    await expect(this.page.getByText(/Question 1 of \d+/)).toBeVisible();
    await expect(this.page.getByRole("radiogroup")).toBeVisible();
  }
  async answerCurrent(): Promise<void> {
    await this.page.getByRole("radiogroup").getByRole("radio").first().check();
  }
  async next(): Promise<void> { await this.page.getByRole("button", { name: "Next" }).click(); }
  async previous(): Promise<void> { await this.page.getByRole("button", { name: "Previous" }).click(); }
  async shuffle(): Promise<void> { await this.page.getByRole("button", { name: "Shuffle Questions" }).click(); }
  async answerAndSubmitAll(): Promise<void> {
    for (let index = 0; index < 100; index++) {
      await this.answerCurrent();
      const submit = this.page.getByRole("button", { name: "Submit Assessment" });
      if (await submit.isVisible()) {
        await submit.click();
        await expect(this.page.getByText(/Score: \d+\/\d+/)).toBeVisible();
        return;
      }
      await this.next();
    }
    throw new Error("Assessment exceeded 100 questions");
  }
}
