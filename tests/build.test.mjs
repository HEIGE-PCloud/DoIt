import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(
  fileURLToPath(new URL("../package.json", import.meta.url)),
);

test("theme builds without warnings and preserves Sass behavior", async (t) => {
  // Snap Hugo cannot see the host's /tmp directory.
  const source = mkdtempSync(join(root, ".doit-build-test-"));
  const example = join(root, "exampleSite");
  try {
    cpSync(example, source, {
      recursive: true,
      filter: (path) =>
        path !== join(example, "public") &&
        path !== join(example, "resources") &&
        path !== join(example, ".hugo_build.lock"),
    });

    function build(environment) {
      const destination = mkdtempSync(join(source, "output-"));
      const result = spawnSync(
        "hugo",
        [
          "--source",
          source,
          "--themesDir",
          dirname(root),
          "--environment",
          environment,
          "--destination",
          destination,
          "--ignoreCache",
          "--panicOnWarning",
        ],
        { encoding: "utf8", timeout: 120_000 },
      );
      assert.ifError(result.error);
      const output = result.stdout + result.stderr;
      assert.equal(result.status, 0, output);
      assert.doesNotMatch(output, /^(?:WARN|ERROR)\s/m);
      const cssDir = join(destination, "css");
      const stylesheet = readdirSync(cssDir).find((name) =>
        /^style\.min(?:\.[a-f0-9]+)?\.css$/.test(name),
      );
      assert.ok(stylesheet, "Hugo must emit the theme stylesheet");
      return readFileSync(join(cssDir, stylesheet), "utf8");
    }

    await t.test(
      "development keeps dark-mode ancestors outside nested styles",
      () => {
        const css = build("development");
        assert.match(css, /\.dark \.single \.content \.gist \.gist-meta a/);
        assert.match(css, /\.dark \.single \.post-footer .*?a/);
        assert.match(css, /\.dark \.archive \.tag-cloud-tags a/);
        assert.doesNotMatch(
          css,
          /\.single \.content \.dark |\.single \.dark |\.archive \.dark /,
        );
      },
    );

    await t.test("production also builds without warnings", () => {
      build("production");
    });

    await t.test("site overrides reach theme modules and custom styles", () => {
      writeFileSync(
        join(source, "assets", "css", "_override.scss"),
        '$header-height: 4.5rem;\n$global-font-size: 18px;\n$code-font-family: "Regression Font", monospace;\n',
      );
      writeFileSync(
        join(source, "assets", "css", "_custom.scss"),
        '@use "variables" as *;\n.custom-style-probe { height: $header-height; }\n',
      );
      const css = build("development");
      assert.match(css, /#header-desktop\{[^}]*height:4\.5rem/);
      assert.match(css, /html\{[^}]*font-size:18px/);
      assert.match(css, /font-family:"Regression Font",monospace/);
      assert.match(css, /padding:1rem 1rem/);
      assert.match(css, /\.custom-style-probe\{height:4\.5rem\}/);
    });
  } finally {
    rmSync(source, { recursive: true, force: true });
  }
});
