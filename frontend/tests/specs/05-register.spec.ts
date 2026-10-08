import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("Registration page displays all required fields", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.visit();
  await register.expectForm();
});

test("Registration page links back to login", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.visit();
  await register.goToLogin();
  await expect(page).toHaveURL(/\/login$/);
});

test("New account registers and redirects to student dashboard", async ({ page }) => {
  const register = new RegisterPage(page);
  await register.visit();
  const uniqueEmail = `pw-${Date.now()}-${test.info().parallelIndex}@example.com`;
  await register.register("Playwright Student", uniqueEmail, "Student@123");
  await expect(page).toHaveURL(/\/student\/dashboard$/);
});
