import { test, expect } from "@playwright/test";

const pages = [
  "",
  // "posts",
  "tags",
  "categories",
  "series",
  "authors",
  "showcase",
  "about",
  "aplayer-tests",
  "extend-shortcodes-tests",
  "person-tests",
  "author-fallback-tests",
  "friend-link-tests",
  "related-tests",
  "author-single-tests",
  "image-tests",
  "series-taxonomy-tests",
  // "bilibili-tests",
  // "katex-tests",
  "showcase-tests",
  "bluesky-tests",
  // "mapbox-tests",
  "tab-tests",
  // "builtin-shortcodes-tests",
  "markdown-tests",
  "toc-tests",
  "codeblock-tests",
  // "mermaid-tests",
  "typeit-tests",
  "echarts-tests",
  // "music-tests",
  "wavedrom-tests",
];

const BASE_URL = "http://127.0.0.1:1313";
pages.forEach((path) => {
  test(`Visual regression for /${path}`, async ({ page }) => {
    await page.goto(`${BASE_URL}/${path}`, {
      waitUntil: "networkidle",
    });

    await expect(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});

test("Visual regression for /plantuml-tests", async ({ page }) => {
  await page.goto(BASE_URL + "/plantuml-tests", {
    waitUntil: "domcontentloaded",
  });
  // Wait until all images are loaded
  const lazyImagesLocator = page.locator('img.plantuml-diagram');
  await expect(lazyImagesLocator).toHaveCount(11);
  const lazyImages = await lazyImagesLocator.all();
  for (const lazyImage of lazyImages) {
    await lazyImage.scrollIntoViewIfNeeded();
    await expect(lazyImage).not.toHaveJSProperty('naturalWidth', 0);
  }
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });  
});
