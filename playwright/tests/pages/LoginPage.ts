import { expect, Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openLogin(): Promise<void> {
    await this.open("/login");
    await expect(this.page.getByRole("button", { name: "Login" })).toBeVisible();
  }

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByLabel("Password").fill(password);
  }

  async submit(): Promise<void> {
    await this.page.getByRole("button", { name: "Login", exact: true }).click();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.page.getByRole("alert")).toContainText("Invalid email or password");
  }
}
