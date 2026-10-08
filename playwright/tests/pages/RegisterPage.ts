import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class RegisterPage extends BasePage {
  constructor(page: Page) { super(page); }
  async visit(): Promise<void> { await this.open("/register"); }
  async expectForm(): Promise<void> {
    await expect(this.page.getByRole("heading", { name: "Create Account" })).toBeVisible();
    await expect(this.page.getByLabel("Name")).toBeVisible();
    await expect(this.page.getByLabel("Email")).toBeVisible();
    await expect(this.page.getByLabel("Password")).toBeVisible();
  }
  async register(name: string, email: string, password: string): Promise<void> {
    await this.page.getByLabel("Name").fill(name);
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Register" }).click();
  }
  async goToLogin(): Promise<void> { await this.page.getByRole("link", { name: "Login" }).click(); }
}
