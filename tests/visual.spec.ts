import { test, expect } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("https://hugodoit.pages.dev");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
