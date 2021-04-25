# DoIt 主题 | Hugo

[English README](https://github.com/HEIGE-PCloud/DoIt/blob/master/README.md) | 简体中文说明

> [DoIt](https://github.com/HEIGE-PCloud/DoIt) 是一个**不简洁**、**不优雅**也**不高效**但仍然被维护的 [Hugo](https://gohugo.io/) 博客主题。

它的原型基于 [LoveIt 主题](https://github.com/dillonzq/LoveIt) [LeaveIt 主题](https://github.com/liuzc/LeaveIt) 和 [KeepIt 主题](https://github.com/Fastbyte01/KeepIt)。

由于三个主题外观的相似性，如果你对于它们的不同之处有疑问，请阅读 [为什么选择 DoIt](#为什么选择-DoIt)，以便你能选择最适合你的一个。

# 安装
如果你还没有使用过LoveIt主题，强烈建议你阅读[主题文档](https://hugodoit.pages.dev/zh-cn/theme-documentation-basics/#basic-configuration)。否则你会无法使用主题。
**注意**:当然如果你想立即看到效果，那么你只需要安装[hugo-extened](https://gohugo.io/getting-started/installing),如果安装失败，请到[hugo的github官网](https://github.com/gohugoio/hugo/)下载带有extended后缀的安装包。
## 主题[预览](https://hugodoit.pages.dev/zh-cn/)

为了直观地浏览主题特性，这里有一个基于 **DoIt** 主题渲染的 [预览网站](https://hugodoit.pages.dev/zh-cn/)。

## 为什么选择 DoIt

相较于 LeaveIt 主题 和 KeepIt 主题，DoIt 主题主要有以下修改

* 自定义**标题栏**
* 自定义**CSS 样式**
* 焕然一新的**主页**，已经兼容最新版 Hugo
* 大量的**样式细节调整**，包括颜色、字体大小、边距、代码预览样式
* 可读性更强的**深色模式**
* 一些美观的 **CSS 动画**
* 易用和自动展开的**文章目录**
* 支持更多的**社交链接**、**网站分享**和**评论系统**
* 支持基于 [Lunr.js](https://lunrjs.com/) 或 [algolia](https://www.algolia.com/) 的**搜索**
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
* ...

所以，如果你更偏好 DoIt 主题的设计语言和自由度，如果你想便捷地使用扩展的 Font Awesome 图标，如果你想在文章内嵌数学公式、流程图、音乐或是 Bilibili 视频，
那么，DoIt 主题可能是更适合你。
希望你会 LoveIt ❤️!

## 特性

### 性能和 SEO

* **性能**优化：在 [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) 中， 99/100 的移动设备得分和 100/100 的桌面设备得分
* 使用基于 JSON-LD 格式 的 **SEO SCHEMA** 文件进行 SEO 优化
* 支持 **[Google Analytics](https://analytics.google.com/analytics)**
* 支持 **[Fathom Analytics](https://usefathom.com/)**
* 支持搜索引擎的**网站验证** (Google, Bind, Yandex and Baidu)
* 支持所有第三方库的 **CDN**
* 基于 [lazysizes](https://github.com/aFarkas/lazysizes) 自动转换图片为**懒加载**

### 外观和布局

* **响应式**布局
* **浅色/深色** 主题模式
* 全局一致的**设计语言**
* 支持**分页**
* 易用和自动展开的**文章目录**
* 支持**多语言**和国际化
* 美观的 **CSS 动画**

### 社交和评论系统

* 支持 **[Gravatar](https://gravatar.com)** 头像
* 支持本地**头像**
* 支持多达 **64** 种社交链接
* 支持多达 **28** 种网站分享
* 支持 **[Disqus](https://disqus.com)** 评论系统
* 支持 **[Gitalk](https://github.com/gitalk/gitalk)** 评论系统
* 支持 **[Valine](https://valine.js.org/)** 评论系统
* 支持 **[Facebook](https://developers.facebook.com/docs/plugins/comments/) 评论**系统
* 支持 **[Telegram comments](https://comments.app/) 评论**系统
* 支持 **[Commento](https://commento.io/)** 评论系统
* 支持 **[Utterances](https://utteranc.es/)** 评论系统

### 扩展功能

* 支持基于 [Lunr.js](https://lunrjs.com/) 或 [algolia](https://www.algolia.com/) 的**搜索**
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
* 支持基于 [TypeIt](https://typeitjs.com/) 的**打字动画** shortcode
* 支持基于 [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll) 的**滚动动画**
* 支持基于 [cookieconsent](https://github.com/osano/cookieconsent) 的 **Cookie 许可横幅**
* ...

## [文档](https://hugodoit.pages.dev/zh-cn/categories/documentation/)

在本地构建文档:

```bash
hugo server --source=exampleSite
```

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

## 问题、想法、 bugs 和 PRs

所有的反馈都是欢迎的！详见 [issue tracker](https://github.com/HEIGE-PCloud/DoIt/issues)。

## 许可协议

DoIt 根据 **MIT** 许可协议授权。 更多信息请查看 [LICENSE 文件](https://github.com/HEIGE-PCloud/DoIt/blob/master/LICENSE)。

DoIt 主题中用到了以下项目，感谢它们的作者：

* [normalize.css](https://github.com/necolas/normalize.css)
* [Font Awesome](https://fontawesome.com/)
* [Simple Icons](https://github.com/simple-icons/simple-icons)
* [Animate.css](https://daneden.github.io/animate.css/)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [autocomplete.js](https://github.com/algolia/autocomplete.js)
* [Lunr.js](https://lunrjs.com/)
* [algoliasearch](https://github.com/algolia/algoliasearch-client-javascript)
* [lazysizes](https://github.com/aFarkas/lazysizes)
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
* [cookieconsent](https://github.com/osano/cookieconsent)

## 作者

[PCloud](https://planet-cloud.fun)

## 赞助支持

如果你喜爱这个主题, 请考虑给我买杯咖啡 ☕️.

谢谢! ❤️
