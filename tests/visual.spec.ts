import { test, expect } from "@playwright/test";

const pages = [
  "",
  "posts",
  "tags",
  "categories",
  "series",
  "authors",
  "docs",
];

pages.forEach((path) => {
  test(`Visual regression for /${path}`, async ({ page }) => {
    await page.goto(`https://hugodoit.pages.dev/${path}`, {
      waitUntil: "networkidle",
    });

    await expect(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
