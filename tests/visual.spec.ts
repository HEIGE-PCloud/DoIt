import { test, expect } from "@playwright/test";


test('Homepage should look the same', async ({ page }) => {
  await page.goto('https://hugodoit.pages.dev');
  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('homepage.png');
});
