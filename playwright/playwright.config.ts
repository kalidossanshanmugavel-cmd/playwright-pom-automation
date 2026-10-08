import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/specs",
  tsconfig: "./tsconfig.json",
  timeout: 30000,
  expect: { timeout: 10000 },
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  reporter: [["list"], ["html", { open: "never" }]],
});
