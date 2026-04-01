/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./layouts/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "fgColor-default": "var(--fgColor-default)",
        "fgColor-secondary": "var(--fgColor-secondary)",
        "fgColor-muted": "var(--fgColor-muted)",
        "fgColor-link": "var(--fgColor-link)",
        "fgColor-link-hover": "var(--fgColor-link-hover)",
        "fgColor-link-muted": "var(--global-link-color)",
        "fgColor-link-muted-hover": "var(--global-link-hover-color)",
        "bgColor-default": "var(--bgColor-default)",
        "bgColor-secondary": "var(--bgColor-secondary)",
        "bgColor-accent-emphasis": "var(--bgColor-accent-emphasis)",
        "bgColor-accent-muted": "var(--bgColor-accent-muted)",
        "borderColor-default": "var(--borderColor-default)",
        "selection-bgColor": "var(--selection-bgColor)",
        "button-default-bgColor-rest": "var(--button-default-bgColor-rest)",
        "button-default-bgColor-hover": "var(--button-default-bgColor-hover)",
      },
    },
  },
  safelist: ["tw-text-wrap", "!tw-max-h-0"],
  plugins: [],
};
