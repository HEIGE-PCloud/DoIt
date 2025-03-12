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
  "plantuml-tests",
  "wavedrom-tests",
];

pages.forEach((path) => {
  test(`Visual regression for /${path}`, async ({ page }) => {
    await page.goto(`http://127.0.0.1:1313/${path}`, {
      waitUntil: "networkidle",
    });

    await expect(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
