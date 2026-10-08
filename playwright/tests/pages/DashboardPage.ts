import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";
import { Role } from "@data/users";
import { getUser } from "@utils/excelReader";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectRoleDashboard(role: Role): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${getUser(role).dashboard}$`));
    await expect(this.page.getByRole("heading", { name: new RegExp(`${role} dashboard`, "i") })).toBeVisible();
  }

  async openCoursesCard(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Courses" }).click();
    await expect(this.page).toHaveURL(/\/courses$/);
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "Logout" }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}
