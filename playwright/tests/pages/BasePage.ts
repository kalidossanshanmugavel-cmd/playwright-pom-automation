import { expect, Page } from "@playwright/test";
import { Role } from "@data/users";
import { getUser } from "@utils/excelReader";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async expectPath(path: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(path);
  }

  async expectLoginPath(): Promise<void> {
    await this.expectPath(/\/login$/);
  }

  async expectDashboardPath(role: Role): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/${role}/dashboard$`));
  }
}
