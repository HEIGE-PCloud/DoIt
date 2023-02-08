# DoIt Theme | Hugo

English README | [简体中文说明](https://github.com/HEIGE-PCloud/DoIt/blob/main/README.zh-cn.md)

> **DoIt** is a **clean**, **elegant** and **advanced** blog theme for [Hugo](https://gohugo.io/).

It is based on the [LoveIt Theme](https://github.com/dillonzq/LoveIt), [LeaveIt Theme](https://github.com/liuzc/LeaveIt) and [KeepIt Theme](https://github.com/Fastbyte01/KeepIt).

The DoIt theme inherits the excellent functions of these themes, and adds new functions and optimizations on this basis. Please read [Why Choose DoIt](#why-choose-doit) to learn more.

The goal of DoIt theme is to create a powerful and easy-to-use Hugo theme, so you can go straight into your blog content creation and just **do it** without worrying about the complex technical details.

## Getting started

Head to this [documentation page](https://hugodoit.pages.dev/theme-documentation-basics/) for a complete guidence to get started with the DoIt theme.

## Migrate from LoveIt

If you are currently using the LoveIt theme, it is very easy to migrate to DoIt.

You can add this repo as a submodule of your site directory.

```bash
git submodule add https://github.com/HEIGE-PCloud/DoIt.git themes/DoIt
```

And later you can update the submodule in your site directory to the latest commit using this command:

```bash
git submodule update --remote --merge
```

Alternatively, you can download the [latest release .zip file](https://github.com/HEIGE-PCloud/DoIt/releases) of the theme and extract it in the themes directory. (Not recommended, the repo is being updated frequently so the releases may out of date.)

Next, go to the `config.toml` and change the default theme to `DoIt`.

```diff
- theme = "LoveIt"
+ theme = "DoIt"
```

Now the migration is finished and everything is ready 🎉

Many new features and configurations have been added to the DoIt theme, check the [changelog](https://github.com/HEIGE-PCloud/DoIt/blob/main/CHANGELOG.md) and [documentation](https://hugodoit.pages.dev/) for more information.

## [Demo Site](https://hugodoit.pages.dev/)

To see this theme in action, here is a live [demo site](https://hugodoit.pages.dev/) which is rendered with **DoIt** theme.

## Why choose DoIt

* Custom **Header**
* Custom **CSS Style**
* A new **home page**, compatible with the latest version of Hugo
* A lot of **style detail adjustments,** including color, font size, margins, code preview style
* More readable **dark mode**
* Some beautiful **CSS animations**
* Easy-to-use and self-expanding **table of contents**
* More **social links**, **share sites** and **comment system**
* **Search** supported by [algolia](https://www.algolia.com/) or [Fuse.js](https://fusejs.io/)
* **Copy code** to clipboard with one click
* Extended Markdown syntax for **[Font Awesome](https://fontawesome.com/) icons**
* Extended Markdown syntax for **ruby annotation**
* Extended Markdown syntax for **fraction**
* **Mathematical formula** supported by [KaTeX](https://katex.org/)
* **Diagram syntax** shortcode supported by [mermaid](https://github.com/knsv/mermaid)
* **Interactive data visualization** shortcode supported by [ECharts](https://echarts.apache.org/)
* **Mapbox** shortcode supported by [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js)
* Embedded **music player** supported by [APlayer](https://github.com/MoePlayer/APlayer) and [MetingJS](https://github.com/metowolf/MetingJS)
* **Bilibili** player supported
* Kinds of **admonitions** shortcode supported
* Custom style shortcodes supported
* **CDN** for all third-party libraries supported
* **Mulitple Authors** supported
* ...

In short,
if you prefer the design language and freedom of the DoIt theme,
if you want to use the extended Font Awesome icons conveniently,
if you want to embed mathematical formulas, flowcharts, music or Bilibili videos in your posts,
the DoIt theme may be more suitable for you.

## Features

### Performance and SEO

* Optimized for **performance**: 99/100 on mobile and 100/100 on desktop in [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights)
* Optimized SEO performance with a correct **SEO SCHEMA** based on JSON-LD
* **[Google Analytics](https://analytics.google.com/analytics)** supported
* **[Fathom Analytics](https://usefathom.com/)** supported
* **[Baidu Analytics](https://tongji.baidu.com/)** supported
* **[Umami Analytics](https://umami.is/)** supported
* **[Plausible Analytics](https://plausible.io/)** supported
* **[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics)** supported
* **[Splitbee Analytics](https://splitbee.io)** supported
* Search engine **verification** supported (Google, Bind, Yandex and Baidu)
* **CDN** for third-party libraries supported

### Appearance and Layout

* **Responsive** layout
* **Light/Dark/Black** mode
* Globally consistent **design language**
* **Pagination** supported
* Easy-to-use and self-expanding **table of contents**
* **Multilanguage** supported and i18n ready
* Beautiful **CSS animation**
* Brand new **Page Layout** optimized for wide screens
* Compatibility for **PWA**

### Social and Comment Systems

* **Gravatar** supported by [Gravatar](https://gravatar.com)
* Local **Avatar** supported
* Up to **64** social links supported
* Up to **28** share sites supported
* **Disqus** comment system supported by [Disqus](https://disqus.com)
* **Gitalk** comment system supported by [Gitalk](https://github.com/gitalk/gitalk)
* **Valine** comment system supported by [Valine](https://valine.js.org/)
* **Waline** comment system supported by [Waline](https://waline.js.org/)
* **Facebook comments** system supported by [Facebook](https://developers.facebook.com/docs/plugins/comments/)
* **Telegram comments** system supported by [Telegram Comments](https://comments.app/)
* **Commento** comment system supported by [Commento](https://commento.io/)
* **Utterances** comment system supported by [Utterances](https://utteranc.es/)
* **Twikoo** comment system supported by [Twikoo](https://twikoo.js.org/)
* **Vssue** comment system supported by [Vssue](https://vssue.js.org/)
* **Remark42** comment system supported by[Remark42](https://remark42.com/)
* **giscus** comment system supported by [giscus](https://giscus.app/)

### Extended Features

* **Search** supported by [algolia](https://www.algolia.com/) or [Fuse.js](https://fusejs.io/)
* **Twemoji** supported
* Automatically **highlighting** code
* **Copy code** to clipboard with one click
* **Images gallery** supported by [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js)
* Extended Markdown syntax for **[Font Awesome](https://fontawesome.com/) icons**
* Extended Markdown syntax for **ruby annotation**
* Extended Markdown syntax for **fraction**
* **Mathematical formula** supported by [KaTeX](https://katex.org/)
* **Diagrams** shortcode supported by [mermaid](https://github.com/knsv/mermaid)
* **Interactive data visualization** shortcode supported by [ECharts](https://echarts.apache.org/)
* **Mapbox** shortcode supported by [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js)
* **Music player** shortcode supported by [APlayer](https://github.com/MoePlayer/APlayer) and [MetingJS](https://github.com/metowolf/MetingJS)
* **Bilibili player** shortcode
* Kinds of **admonitions** shortcode
* **Custom style** shortcode
* **Custom script** shortcode
* **Custom friend** shortcode
* **Animated typing** supported by [TypeIt](https://typeitjs.com/)
* **Dynamic scroll** supported by native CSS
* **Cookie consent banner** supported by [cookieconsent](https://github.com/osano/cookieconsent)
* Option to **cache remote images**
* ...

## [Documentation](https://hugodoit.pages.dev/categories/documentation/)

Build Documentation Locally:

```bash
hugo server --source=exampleSite
```

## Multilingual and i18n

DoIt supports the following languages:

* English
* Simplified Chinese
* French
* Polish
* Brazilian Portuguese
* Italian
* Spanish
* German
* Serbian
* Russian
* Romanian
* Vietnamese
* [Contribute with a new language](https://github.com/HEIGE-PCloud/DoIt/pulls)

[Languages Compatibility](https://hugodoit.pages.dev/theme-documentation-basics/#language-compatibility)

## [Roadmap](https://github.com/HEIGE-PCloud/DoIt/projects/1)

## [Changelog](https://github.com/HEIGE-PCloud/DoIt/blob/main/CHANGELOG.md)

## Questions, ideas, bugs, pull requests

All feedback is welcome! Head over to the [issue tracker](https://github.com/HEIGE-PCloud/DoIt/issues).

## License

DoIt is licensed under the **MIT** license. Check the [LICENSE file](https://github.com/HEIGE-PCloud/DoIt/blob/master/LICENSE) for details.

Thanks to the authors of following resources included in the theme:

* [normalize.css](https://github.com/necolas/normalize.css)
* [Font Awesome](https://fontawesome.com/)
* [Simple Icons](https://github.com/simple-icons/simple-icons)
* [Animate.css](https://daneden.github.io/animate.css/)
* [autocomplete.js](https://github.com/algolia/autocomplete.js)
* [algoliasearch](https://github.com/algolia/algoliasearch-client-javascript)
* [Fuse.js](https://fusejs.io/)
* [object-fit-images](https://github.com/fregante/object-fit-images)
* [Twemoji](https://github.com/twitter/twemoji)
* [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js)
* [clipboard.js](https://github.com/zenorocha/clipboard.js)
* [Sharer.js](https://github.com/ellisonleao/sharer.js)
* [TypeIt](https://typeitjs.com/)
* [KaTeX](https://katex.org/)
* [mermaid](https://github.com/knsv/mermaid)
* [ECharts](https://echarts.apache.org/)
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js)
* [APlayer](https://github.com/MoePlayer/APlayer)
* [MetingJS](https://github.com/metowolf/MetingJS)
* [Gitalk](https://github.com/gitalk/gitalk)
* [Valine](https://valine.js.org/)
* [Waline](https://waline.js.org/)
* [Twikoo](https://twikoo.js.org/)
* [Vssue](https://vssue.js.org/)
* [Remark42](https://remark42.com/)
* [cookieconsent](https://github.com/osano/cookieconsent)

## Author

[PCloud](https://github.com/HEIGE-PCloud)
