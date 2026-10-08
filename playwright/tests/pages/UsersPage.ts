import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class UsersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectUserManagement(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "User Management" })).toBeVisible();
    await expect(this.page.getByText("admin@example.com")).toBeVisible();
  }
}
