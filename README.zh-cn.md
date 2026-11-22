# DoIt 主题 | Hugo

[English README](https://github.com/HEIGE-PCloud/DoIt/blob/main/README.md) | 简体中文说明

> [DoIt](https://github.com/HEIGE-PCloud/DoIt) 是一个**简洁**、**优雅**且**高效**的 [Hugo](https://gohugo.io/) 博客主题。

它的原型基于 [LoveIt 主题](https://github.com/dillonzq/LoveIt), [LeaveIt 主题](https://github.com/liuzc/LeaveIt) 和 [KeepIt 主题](https://github.com/Fastbyte01/KeepIt)。

DoIt 主题继承了这些主题的优秀功能，并在此基础上添加了新的功能与优化，请阅读 [为什么选择 DoIt](#为什么选择-DoIt)来了解更多。

DoIt 主题的目标是创建一个功能强大且易于使用的 Hugo 主题，您可以全心关注于创作博客内容，而无需担心复杂的技术细节，just** do it**。

## 立即开始

前往这篇[文档](https://hugodoit.pages.dev/zh-cn/theme-documentation-basics/)，阅读关于安装与使用的详细指南。

## 从 LoveIt 迁移

如果你现在正在使用 LoveIt 主题，你可以很容易地迁移至 DoIt。

你可以将这个主题仓库添加为你的网站目录的子模块。

```bash
git submodule add https://github.com/HEIGE-PCloud/DoIt.git themes/DoIt
```

之后，你可以通过这条命令来将主题更新至最新版本。

```bash
git submodule update --remote --merge
```

或者，你可以下载主题的[最新版本.zip 文件](https://github.com/HEIGE-PCloud/DoIt/releases)并且解压放到`themes`目录。（不推荐，这个主题会被频繁更新，发行版中可能包含过时的文件。）

接着，前往 `config.toml` 并将默认主题更改为 `DoIt`。

```diff
- theme = "LoveIt"
+ theme = "DoIt"
```

这样就完成了迁移工作，现在一切准备就绪 🎉

DoIt 主题增加了许多新的功能与配置项，查看[变更日志](https://github.com/HEIGE-PCloud/DoIt/blob/main/CHANGELOG.md)与[文档](https://hugodoit.pages.dev/)来了解更多。

## 主题[预览](https://hugodoit.pages.dev/zh-cn/)

为了直观地浏览主题特性，这里有一个基于 **DoIt** 主题渲染的 [预览网站](https://hugodoit.pages.dev/zh-cn/)。

## 为什么选择 DoIt

* 自定义**标题栏**
* 自定义**CSS 样式**
* 焕然一新的**主页**，已经兼容最新版 Hugo
* 大量的**样式细节调整**，包括颜色、字体大小、边距、代码预览样式
* 可读性更强的**深色模式**
* 一些美观的 **CSS 动画**
* 易用和自动展开的**文章目录**
* 支持更多的**社交链接**、**网站分享**和**评论系统**
* 支持基于 [algolia](https://www.algolia.com/) 或 [Fuse.js](https://fusejs.io/) 的**搜索**
* 一键**复制代码**到剪贴板
* 支持基于 **[Font Awesome](https://fontawesome.com/) 图标**的扩展 Markdown 语法
* 支持**上标注释**的扩展 Markdown 语法
* 支持**分数**的扩展 Markdown 语法
* 支持基于 [KaTeX](https://katex.org/) 的**数学公式**
* 支持基于 [mermaid](https://github.com/knsv/mermaid) 的**图表**生成功能
* 支持基于 [ECharts](https://echarts.apache.org/) 的**交互式数据可视化**生成功能
* 支持基于 [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) 的 **Mapbox** 地图显示功能
* 支持基于 [APlayer](https://github.com/MoePlayer/APlayer) 和 [MetingJS](https://github.com/metowolf/MetingJS) 的内嵌**音乐播放器**
* 支持内嵌 **Bilibili** 视频
* 支持多种**注释**的 shortcode
* 支持自定义样式的 shortcode
* 支持所有第三方库的 **CDN**
* 支持**多作者分类**
* ...

所以，如果你更偏好 DoIt 主题的设计语言和自由度，如果你想便捷地使用扩展的 Font Awesome 图标，如果你想在文章内嵌数学公式、流程图、音乐或是 Bilibili 视频，
那么，DoIt 主题可能是更适合你。

## 特性

### 性能和 SEO

* **性能**优化：在 [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) 中， 99/100 的移动设备得分和 100/100 的桌面设备得分
* 使用基于 JSON-LD 格式 的 **SEO SCHEMA** 文件进行 SEO 优化
* 支持 **[Google Analytics](https://analytics.google.com/analytics)**
* 支持 **[Fathom Analytics](https://usefathom.com/)**
* 支持 **[百度统计](https://tongji.baidu.com/)**
* 支持 **[Umami Analytics](https://umami.is/)**
* 支持 **[Plausible Analytics](https://plausible.io/)**
* 支持 **[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics)**
* 支持 **[Splitbee Analytics](https://splitbee.io)**
* 支持 **[Matomo Analytics](http://www.matomo.com/)**
* 支持搜索引擎的**网站验证** (Google, Bind, Yandex and Baidu)
* 支持所有第三方库的 **CDN**

### 外观和布局

* **响应式**布局
* **浅色/深色/黑色** 主题模式
* 全局一致的**设计语言**
* 支持**分页**
* 易用和自动展开的**文章目录**
* 支持**多语言**和国际化
* 美观的 **CSS 动画**
* 全新的为宽屏适配的**页面布局**
* 全新的**PWA应用**适配

### 社交和评论系统

* 支持 **[Gravatar](https://gravatar.com)** 头像
* 支持本地**头像**
* 支持多达 **64** 种社交链接
* 支持多达 **28** 种网站分享
* 支持 **[Disqus](https://disqus.com)** 评论系统
* 支持 **[Gitalk](https://github.com/gitalk/gitalk)** 评论系统
* 支持 **[Valine](https://valine.js.org/)** 评论系统
* 支持 **[Waline](https://waline.js.org/)** 评论系统
* 支持 **[Facebook](https://developers.facebook.com/docs/plugins/comments/) 评论**系统
* 支持 **[Telegram comments](https://comments.app/) 评论**系统
* 支持 **[Commento](https://commento.io/)** 评论系统
* 支持 **[Utterances](https://utteranc.es/)** 评论系统
* 支持 **[Twikoo](https://twikoo.js.org/)** 评论系统
* 支持 **[Vssue](https://vssue.js.org/)** 评论系统
* 支持 **[Remark42](https://remark42.com/)** 评论系统
* 支持 **[giscus](https://giscus.app/)** 评论系统
* 支持 **[Artalk](https://artalk.js.org/)** 评论系统

### 扩展功能

* 支持基于 [algolia](https://www.algolia.com/) 或 [Fuse.js](https://fusejs.io/) 的**搜索**
* 支持 **Twemoji**
* 支持**代码高亮**
* 一键**复制代码**到剪贴板
* 支持基于 [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js) 的**图片画廊**
* 支持 **[Font Awesome](https://fontawesome.com/) 图标**的扩展 Markdown 语法
* 支持**上标注释**的扩展 Markdown 语法
* 支持**分数**的扩展 Markdown 语法
* 支持基于 [KaTeX](https://katex.org/) 的**数学公式**
* 支持基于 [mermaid](https://github.com/knsv/mermaid) 的**图表** shortcode
* 支持基于 [ECharts](https://echarts.apache.org/) 的**交互式数据可视化** shortcode
* 支持基于 [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) 的 **Mapbox** shortcode
* 支持基于 [APlayer](https://github.com/MoePlayer/APlayer) 和 [MetingJS](https://github.com/metowolf/MetingJS) 的**音乐播放器** shortcode
* 支持 **Bilibili 视频** shortcode
* 支持多种**注释**的 shortcode
* 支持**自定义样式**的 shortcode
* 支持**自定义脚本**的 shortcode
* 支持**友链**的 shortcode
* 支持基于 [TypeIt](https://typeitjs.com/) 的**打字动画** shortcode
* 支持基于原生CSS的**滚动动画**
* 支持基于 [cookieconsent](https://github.com/osano/cookieconsent) 的 **Cookie 许可横幅**
* 支持本地**缓存远程图床图片**
* ...

## [文档](https://hugodoit.pages.dev/zh-cn/categories/documentation/)

在本地构建文档:

安装 [Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass), 并确保其可执行文件位于 `PATH` 中. 主题显式使用 Dart Sass, 不需要 Hugo 的 extended 版本. Hugo 0.170.0 及之后的版本不再区分 extended 版本.

```bash
hugo server --source=exampleSite
```

开发环境会禁用评论系统、PWA、CDN 和 fingerprint. 使用 `npm run server:production` 预览这些功能.

运行 `npm run test:build` 检查开发和生产构建是否无警告, 以及深色模式选择器和样式覆盖是否正常.

运行 `npm install` 后, 使用 `npm run format` 格式化支持的源文件, 使用 `npm run format:check` 检查格式而不修改文件. `.prettierignore` 和 `.gitignore` 会排除 Hugo 模板、HTML、Markdown、第三方资源和生成的输出.

## 多语言和国际化

DoIt 支持下列语言:

* 英语
* 简体中文
* 法语
* 波兰语
* 巴西葡萄牙语
* 意大利语
* 西班牙语
* 德语
* 塞尔维亚语
* 俄语
* 罗马尼亚语
* 越南语
* [贡献一种新的语言](https://github.com/HEIGE-PCloud/DoIt/pulls)

[语言兼容性](https://hugodoit.pages.dev/zh-cn/theme-documentation-basics/#language-compatibility)

## [路线图](https://github.com/HEIGE-PCloud/DoIt/projects/1)

## [变更日志](https://github.com/HEIGE-PCloud/DoIt/blob/main/CHANGELOG.md)

## 问题、想法、 bugs 和 PRs

所有的反馈都是欢迎的！详见 [issue tracker](https://github.com/HEIGE-PCloud/DoIt/issues)。

## 许可协议

DoIt 根据 **MIT** 许可协议授权。 更多信息请查看 [LICENSE 文件](https://github.com/HEIGE-PCloud/DoIt/blob/master/LICENSE)。

DoIt 主题中用到了以下项目，感谢它们的作者：

* [Font Awesome](https://fontawesome.com/)
* [Simple Icons](https://github.com/simple-icons/simple-icons)
* [autocomplete.js](https://github.com/algolia/autocomplete.js)
* [algoliasearch](https://github.com/algolia/algoliasearch-client-javascript)
* [Fuse.js](https://fusejs.io/)
* [object-fit-images](https://github.com/fregante/object-fit-images)
* [Twemoji](https://github.com/twitter/twemoji)
* [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js)
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
* [cookieconsent](https://github.com/osano/cookieconsent)
* [Remark42](https://remark42.com/)

## 作者

[PCloud](https://github.com/HEIGE-PCloud)
