import { test, expect } from "@playwright/test";
import { loginAs } from "@utils/auth";
import { MCQPage } from "@pages/MCQPage";

test.beforeEach(async ({ page }) => { await loginAs(page, "student"); });

test("MCQ page shows course selector and shuffle control", async ({ page }) => {
  const mcq = new MCQPage(page);
  await mcq.visit();
  await mcq.expectLoaded();
  await mcq.expectQuestion();
});

test("MCQ navigation goes forward and backward", async ({ page }) => {
  const mcq = new MCQPage(page);
  await mcq.visit();
  await mcq.expectQuestion();
  await mcq.answerCurrent();
  await mcq.next();
  await expect(page.getByText(/Question 2 of \d+/)).toBeVisible();
  await mcq.previous();
  await expect(page.getByText(/Question 1 of \d+/)).toBeVisible();
});

test("Student can complete an assessment and see score", async ({ page }) => {
  const mcq = new MCQPage(page);
  await mcq.visit();
  await mcq.expectQuestion();
  await mcq.answerAndSubmitAll();
});
