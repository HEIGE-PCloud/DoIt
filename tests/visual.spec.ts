import { test, expect, Page } from "@playwright/test";

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
  // "bluesky-tests",
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

async function forceLoadLazyImages(page: Page): Promise<void> {
  return page.evaluate(() => {
    for (const image of document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]')) {
      image.setAttribute('loading', 'eager');
    }
  });
}

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

test.fixme("Visual regression for /plantuml-tests", async ({ page }) => {
  await page.goto(BASE_URL + "/plantuml-tests", {
    waitUntil: "domcontentloaded",
  });
  // Wait until all images are loaded
  const lazyImagesLocator = page.locator('img.plantuml-diagram');
  await expect(lazyImagesLocator).toHaveCount(11);
  await forceLoadLazyImages(page);
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });  
});
