---
weight: 1
title: "主题文档 - 基本概念"
date: 2020-03-03T21:40:32+08:00
lastmod: 2020-03-06T21:40:32+08:00
draft: false
authors: ["Dillon", "PCloud"]
description: "探索 Hugo - DoIt 主题的全部内容和背后的核心概念."
featuredImage: "featured-image.webp"

tags: ["installation", "configuration"]
categories: ["documentation"]
series: ["getting-start"]
series_weight: 1
lightgallery: true

toc:
  auto: false
---

探索 Hugo - **DoIt** 主题的全部内容和背后的核心概念.

<!--more-->

## 1 准备

由于 Hugo 提供的便利性, [Hugo](https://gohugo.io/) 本身是这个主题唯一的依赖.

直接安装满足你操作系统 (**Windows**, **Linux**, **macOS**) 的最新版本 [:(far fa-file-archive fa-fw): Hugo (> 0.83.0)](https://gohugo.io/getting-started/installing/).

{{< admonition note "为什么不支持早期版本的 Hugo?" >}}
由于 [WebP 图像处理](https://gohugo.io/content-management/image-processing/#jpeg-and-webp-quality) 在 [Hugo 0.83.0版本](https://gohugo.io/news/0.83.0-relnotes/) 中被引入, 本主题只支持高于 **0.83.0** 的 Hugo 版本.
{{< /admonition >}}

{{< admonition tip "推荐使用 Hugo extended 版本" >}}
由于这个主题的一些特性需要将 :(fab fa-sass fa-fw): SCSS 转换为 :(fab fa-css3 fa-fw): CSS, 推荐使用 Hugo **extended** 版本来获得更好的使用体验.
{{< /admonition >}}

## 2 安装

以下步骤可帮助你初始化新网站. 如果你根本不了解 Hugo, 我们强烈建议你按照此 [快速入门文档](https://gohugo.io/getting-started/quick-start/) 进一步了解它.

### 2.1 创建你的项目

Hugo 提供了一个 `new` 命令来创建一个新的网站:

```bash
hugo new site my_website
cd my_website
```

### 2.2 安装主题

**DoIt** 主题的仓库是: [https://github.com/HEIGE-PCloud/DoIt](https://github.com/HEIGE-PCloud/DoIt).

你可以下载主题的 [最新版本 :(far fa-file-archive fa-fw): .zip 文件](https://github.com/HEIGE-PCloud/DoIt/releases) 并且解压放到 `themes` 目录.

另外, 也可以直接把这个主题克隆到 `themes` 目录:

```bash
git clone https://github.com/HEIGE-PCloud/DoIt.git themes/DoIt
```

或者, 初始化你的项目目录为 git 仓库, 并且把主题仓库作为你的网站目录的子模块:

```bash
git init
git submodule add https://github.com/HEIGE-PCloud/DoIt.git themes/DoIt
```

### 2.3 基础配置 {#basic-configuration}

以下是 DoIt 主题的基本配置:

```toml
baseURL = "http://example.org/"
# [en, zh-cn, fr, ...] 设置默认的语言
defaultContentLanguage = "zh-cn"
# 网站语言, 仅在这里 CN 大写
languageCode = "zh-CN"
# 是否包括中日韩文字
hasCJKLanguage = true
# 网站标题
title = "我的全新 Hugo 网站"

# 更改使用 Hugo 构建网站时使用的默认主题
theme = "DoIt"

[params]
  # DoIt 主题版本
  version = "0.2.X"

[menu]
  [[menu.main]]
    identifier = "posts"
    # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
    pre = ""
    # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
    post = ""
    name = "文章"
    url = "/posts/"
    # 当你将鼠标悬停在此菜单链接上时, 将显示的标题
    title = ""
    weight = 1
  [[menu.main]]
    identifier = "tags"
    pre = ""
    post = ""
    name = "标签"
    url = "/tags/"
    title = ""
    weight = 2
  [[menu.main]]
    identifier = "categories"
    pre = ""
    post = ""
    name = "分类"
    url = "/categories/"
    title = ""
    weight = 3

# Hugo 解析文档的配置
[markup]
  # 语法高亮设置 (https://gohugo.io/content-management/syntax-highlighting)
  [markup.highlight]
    # false 是必要的设置 (https://github.com/dillonzq/LoveIt/issues/158)
    noClasses = false
```

{{< admonition >}}
在构建网站时, 你可以使用 `--theme` 选项设置主题. 但是, 我建议你修改配置文件 (**config.toml**) 将本主题设置为默认主题.
{{< /admonition >}}

### 2.4 创建你的第一篇文章

以下是创建第一篇文章的方法:

```bash
hugo new posts/first_post.md
```

通过添加一些示例内容并替换文件开头的标题, 你可以随意编辑文章.

{{< admonition >}}
默认情况下, 所有文章和页面均作为草稿创建. 如果想要渲染这些页面, 请从元数据中删除属性 `draft: true`, 设置属性 `draft: false` 或者为 `hugo` 命令添加 `-D`/`--buildDrafts` 参数.
{{< /admonition >}}

### 2.5 在本地启动网站

使用以下命令启动网站:

```bash
hugo serve
```

去查看 `http://localhost:1313`.

{{< image src="basic-configuration-preview.zh-cn.webp" caption="基本配置下的预览" width="2450" height="1562" >}}

{{< admonition tip >}}
当你运行 `hugo serve` 时, 当文件内容更改时, 页面会随着更改自动刷新.
{{< /admonition >}}

{{< admonition >}}
由于本主题使用了 Hugo 中的 `.Scratch` 来实现一些特性,
非常建议你为 `hugo server` 命令添加 `--disableFastRender` 参数来实时预览你正在编辑的文章页面.

```bash
hugo serve --disableFastRender
```
{{< /admonition >}}

### 2.6 构建网站

当你准备好部署你的网站时, 运行以下命令:

```bash
hugo
```

会生成一个 `public` 目录, 其中包含你网站的所有静态内容和资源. 现在可以将其部署在任何 Web 服务器上.

{{< admonition tip >}}
网站内容可以通过 [Netlify](https://www.netlify.com/) 自动发布和托管 (了解有关[通过 Netlify 进行 HUGO 自动化部署](https://www.netlify.com/blog/2015/07/30/hosting-hugo-on-netlifyinsanely-fast-deploys/) 的更多信息).
或者, 您可以使用 [AWS Amplify](https://gohugo.io/hosting-and-deployment/hosting-on-aws-amplify/), [Github pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/), [Render](https://gohugo.io/hosting-and-deployment/hosting-on-render/) 以及更多...
{{< /admonition >}}

## 3 配置

### 3.1 网站配置 {#site-configuration}

除了 [Hugo 全局配置](https://gohugo.io/overview/configuration/) 和 [菜单配置](#basic-configuration) 之外, **DoIt** 主题还允许您在网站配置中定义以下参数 (这是一个示例 `config.toml`, 其内容为默认值).

请打开下面的代码块查看完整的示例配置 :(far fa-hand-point-down fa-fw)::

```toml
[params]
  # {{< version 0.2.0 changed >}} DoIt 主题版本
  version = "0.2.X"
  # 网站名称
  title = "我的全新 Hugo 网站"
  # 网站描述
  description = "这是我的全新 Hugo 网站"
  # 网站关键词
  keywords = ["Theme", "Hugo"]
  # {{< version 0.2.11 changed >}} 网站默认主题样式 ("light", "dark", "black", "auto")
  defaultTheme = "auto"
  # 公共 git 仓库路径, 仅在 enableGitInfo 设为 true 时有效
  gitRepo = ""
  # {{< version 0.1.1 >}} 哪种哈希函数用来 SRI, 为空时表示不使用 SRI
  # ("sha256", "sha384", "sha512", "md5")
  fingerprint = ""
  # {{< version 0.2.0 >}} 日期格式
  dateFormat = "2006-01-02"
  # 网站图片, 用于 Open Graph 和 Twitter Cards
  images = ["/logo.png"]
  # {{< version 0.2.11 >}} 开启 PWA 支持
  enablePWA = false
  # {{< version 0.2.14 >}} 版权信息
  license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'
  # {{< version 0.2.0 >}} 应用图标配置
  [params.app]
    # 当添加到 iOS 主屏幕或者 Android 启动器时的标题, 覆盖默认标题
    title = "DoIt"
    # 是否隐藏网站图标资源链接
    noFavicon = false
    # 更现代的 SVG 网站图标, 可替代旧的 .png 和 .ico 文件
    svgFavicon = ""
    # Safari 图标颜色
    iconColor = "#5bbad5"
    # Windows v8-10磁贴颜色
    tileColor = "#da532c"

  # {{< version 0.2.0 >}} 搜索配置
  [params.search]
    enable = true
    # 搜索引擎的类型 ("lunr", "algolia", "fuse")
    type = "fuse"
    # 文章内容最长索引长度
    contentLength = 4000
    # 搜索框的占位提示语
    placeholder = ""
    # {{< version 0.2.1 >}} 最大结果数目
    maxResultLength = 10
    # {{< version 0.2.3 >}} 结果内容片段长度
    snippetLength = 50
    # {{< version 0.2.1 >}} 搜索结果中高亮部分的 HTML 标签
    highlightTag = "em"
    # {{< version 0.2.4 >}} 是否在搜索索引中使用基于 baseURL 的绝对路径
    absoluteURL = false
    [params.search.algolia]
      index = ""
      appID = ""
      searchKey = ""
    [params.search.fuse]
      # {{< version 0.2.12 >}} https://fusejs.io/api/options.html
      isCaseSensitive = false
      minMatchCharLength = 2
      findAllMatches = false
      location = 0
      threshold = 0.3
      distance = 100
      ignoreLocation = false
      useExtendedSearch = false
      ignoreFieldNorm = false

  # 页面头部导航栏配置
  [params.header]
    # 桌面端导航栏模式 ("fixed", "normal", "auto")
    desktopMode = "fixed"
    # 移动端导航栏模式 ("fixed", "normal", "auto")
    mobileMode = "auto"
    # {{< version 0.2.11 >}} 主题切换模式
    # 主题切换模式 ("switch", "select")
    themeChangeMode = "select"
    # {{< version 0.2.0 >}} 页面头部导航栏标题配置
    [params.header.title]
      # LOGO 的 URL
      logo = ""
      # 标题名称
      name = ""
      # 你可以在名称 (允许 HTML 格式) 之前添加其他信息, 例如图标
      pre = ""
      # 你可以在名称 (允许 HTML 格式) 之后添加其他信息, 例如图标
      post = ""
      # {{< version 0.2.5 >}} 是否为标题显示打字机动画
      typeit = false

  # 页面底部信息配置
  [params.footer]
    enable = true
    # {{< version 0.2.0 >}} 自定义内容 (支持 HTML 格式)
    custom = ''
    # {{< version 0.2.0 >}} 是否显示 Hugo 和主题信息
    hugo = true
    # {{< version 0.2.14 >}} 托管服务信息 (支持 HTML 格式)
    # <a title="Github Pages" href="https://docs.github.com/en/pages/" target="_blank" rel="noopener noreffer">GitHub Pages</a>
    hostedOn = '' 
    # {{< version 0.2.0 >}} 是否显示版权信息
    copyright = true
    # {{< version 0.2.0 >}} 是否显示作者
    author = true
    # 网站创立年份
    since = 2019
    # ICP 备案信息, 仅在中国使用 (支持 HTML 格式)
    icp = ""
    # 许可协议信息 (支持 HTML 格式)
    license = '<a rel="license external nofollow noopener noreffer" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">CC BY-NC 4.0</a>'

  # {{< version 0.2.0 >}} Section (所有文章) 页面配置
  [params.section]
    # section 页面每页显示文章数量
    paginate = 20
    # 日期格式 (月和日)
    dateFormat = "01-02"
    # RSS 文章数目
    rss = 10
    # {{< version 0.2.13 >}} 最近更新文章设置
    [params.section.recentlyUpdated]
      enable = false
      rss = false
      days = 30
      maxCount = 10

  # {{< version 0.2.0 >}} List (目录或标签) 页面配置
  [params.list]
    # list 页面每页显示文章数量
    paginate = 20
    # 日期格式 (月和日)
    dateFormat = "01-02"
    # RSS 文章数目
    rss = 10

  # 主页配置
  [params.home]
    # {{< version 0.2.0 >}} RSS 文章数目
    rss = 10
    # 主页个人信息
    [params.home.profile]
      enable = true
      # Gravatar 邮箱, 用于优先在主页显示的头像
      gravatarEmail = ""
      # 主页显示头像的 URL
      # 将你的头像文件放置于 static 或者 assets 目录下
      # 文件路径是相对于 static 或者 assets 目录的
      avatarURL = "/images/avatar.webp"
      # {{< version 0.2.7 changed >}} 主页显示的网站标题 (支持 HTML 格式)
      title = ""
      # 主页显示的网站副标题
      subtitle = "这是我的全新 Hugo 网站"
      # 是否为副标题显示打字机动画
      typeit = true
      # 是否显示社交账号
      social = true
      # {{< version 0.2.0 >}} 免责声明 (支持 HTML 格式)
      disclaimer = ""
    # 主页文章列表
    [params.home.posts]
      enable = true
      # 主页每页显示文章数量
      paginate = 6
      # {{< version 0.2.0 deleted >}} 被 params.page 中的 hiddenFromHomePage 替代
      # 当你没有在文章前置参数中设置 "hiddenFromHomePage" 时的默认行为
      defaultHiddenFromHomePage = false

  # 作者的社交信息设置
  [params.social]
    GitHub = "xxxx"
    Linkedin = ""
    Twitter = "xxxx"
    Instagram = "xxxx"
    Facebook = "xxxx"
    Telegram = "xxxx"
    Medium = ""
    Gitlab = ""
    Youtubelegacy = ""
    Youtubecustom = ""
    Youtubechannel = ""
    Tumblr = ""
    Quora = ""
    Keybase = ""
    Pinterest = ""
    Reddit = ""
    Codepen = ""
    FreeCodeCamp = ""
    Bitbucket = ""
    Stackoverflow = ""
    Weibo = ""
    Odnoklassniki = ""
    VK = ""
    Flickr = ""
    Xing = ""
    Snapchat = ""
    Soundcloud = ""
    Spotify = ""
    Bandcamp = ""
    Paypal = ""
    Fivehundredpx = ""
    Mix = ""
    Goodreads = ""
    Lastfm = ""
    Foursquare = ""
    Hackernews = ""
    Kickstarter = ""
    Patreon = ""
    Steam = ""
    Twitch = ""
    Strava = ""
    Skype = ""
    Whatsapp = ""
    Zhihu = ""
    Douban = ""
    Angellist = ""
    Slidershare = ""
    Jsfiddle = ""
    Deviantart = ""
    Behance = ""
    Dribbble = ""
    Wordpress = ""
    Vine = ""
    Googlescholar = ""
    Researchgate = ""
    Mastodon = ""
    Thingiverse = ""
    Devto = ""
    Gitea = ""
    XMPP = ""
    Matrix = ""
    Bilibili = ""
    ORCID = ""
    Liberapay = ""
    Ko-Fi = ""
    BuyMeACoffee = ""
    Linktree = ""
    QQ = ""
    QQGroup = ""
    Email = "xxxx@xxxx.com"
    RSS = true # {{< version 0.2.0 >}}

  # {{< version 0.2.0 changed >}} 文章页面配置
  [params.page]
    # {{< version 0.2.0 >}} 是否在主页隐藏一篇文章
    hiddenFromHomePage = false
    # {{< version 0.2.0 >}} 是否在搜索结果中隐藏一篇文章
    hiddenFromSearch = false
    # {{< version 0.2.0 >}} 是否使用 twemoji
    twemoji = false
    # 是否使用 lightgallery
    lightgallery = false
    # {{< version 0.2.0 >}} 是否使用 ruby 扩展语法
    ruby = true
    # {{< version 0.2.0 >}} 是否使用 fraction 扩展语法
    fraction = true
    # {{< version 0.2.0 >}} 是否使用 fontawesome 扩展语法
    fontawesome = true
    # 是否在文章页面显示原始 Markdown 文档链接
    linkToMarkdown = true
    # {{< version 0.2.14 >}} 配置文章原始文件的链接
    linkToSource = false
    # "https://github.com/user/repo/blob/main/{path}"
    # {{< version 0.2.13 >}} 配置编辑文章的链接
    linkToEdit = false
    # "https://github.com/user/repo/edit/main/{path}"
    # "https://gitlab.com/user/repo/-/edit/main/{path}"
    # "https://bitbucket.org/user/repo/src/main/{path}?mode=edit"
    # {{< version 0.2.14 >}} 配置提交错误的链接
    linkToReport = false
    # "https://github.com/user/repo/issues/new?title=[bug]%20{title}&body=|Field|Value|%0A|-|-|%0A|Title|{title}|%0A|Url|{url}|%0A|Filename|https://github.com/user/repo/blob/main/{path}|"
    # {{< version 0.2.4 >}} 是否在 RSS 中显示全文内容
    rssFullText = false
    # {{< version 0.2.11 >}} 页面样式 ("normal", "wide")
    pageStyle = "normal"
    # {{< version 0.2.13 >}} 是否在文章开头显示系列导航
    seriesNavigation = true
    # {{< version 0.2.13 >}} 过时文章提示
    [params.page.outdatedArticleReminder]
      enable = true
      # 如果文章最后更新于 90 天之前，显示提醒
      reminder = 90
      # 如果文章最后更新于 180 天之前，显示警告
      warning = 180
    # {{< version 0.2.0 >}} 目录配置
    [params.page.toc]
      # 是否使用目录
      enable = true
      # {{< version 0.2.9 >}} 是否保持使用文章前面的静态目录
      keepStatic = true
      # 是否使侧边目录自动折叠展开
      auto = true
    # {{< version 0.2.0 >}} 代码配置
    [params.page.code]
      # 是否显示代码块的复制按钮
      copy = true
      # 默认展开显示的代码行数
      maxShownLines = 10
    # {{< version 0.2.14 >}} 表格配置
    [params.page.table]
      # 是否开启表格排序
      sort = true
    # {{< version 0.2.0 changed >}} {{< link "https://katex.org/" KaTeX >}} 数学公式
    [params.page.math]
      enable = true
      # 默认块定界符是 $$ ... $$ 和 \\[ ... \\]
      blockLeftDelimiter = ""
      blockRightDelimiter = ""
      # 默认行内定界符是 $ ... $ 和 \\( ... \\)
      inlineLeftDelimiter = ""
      inlineRightDelimiter = ""
      # KaTeX 插件 copy_tex
      copyTex = true
      # KaTeX 插件 mhchem
      mhchem = true
    # {{< version 0.2.0 >}} {{< link "https://docs.mapbox.com/mapbox-gl-js" "Mapbox GL JS" >}} 配置
    [params.page.mapbox]
      # Mapbox GL JS 的 access token
      accessToken = ""
      # 浅色主题的地图样式
      lightStyle = "mapbox://styles/mapbox/light-v9"
      # 深色主题的地图样式
      darkStyle = "mapbox://styles/mapbox/dark-v9"
      # 是否添加 {{< link "https://docs.mapbox.com/mapbox-gl-js/api#navigationcontrol" NavigationControl >}}
      navigation = true
      # 是否添加 {{< link "https://docs.mapbox.com/mapbox-gl-js/api#geolocatecontrol" GeolocateControl >}}
      geolocate = true
      # 是否添加 {{< link "https://docs.mapbox.com/mapbox-gl-js/api#scalecontrol" ScaleControl >}}
      scale = true
      # 是否添加 {{< link "https://docs.mapbox.com/mapbox-gl-js/api#fullscreencontrol" FullscreenControl >}}
      fullscreen = true
    # {{< version 0.2.0 changed >}} 文章页面的分享信息设置
    [params.page.share]
      enable = true
      Twitter = true
      Facebook = true
      Linkedin = false
      Whatsapp = true
      Pinterest = false
      Tumblr = false
      HackerNews = false
      Reddit = false
      VK = false
      Buffer = false
      Xing = false
      Line = true
      Instapaper = false
      Pocket = false
      Digg = false
      Stumbleupon = false
      Flipboard = false
      Weibo = true
      Renren = false
      Myspace = true
      Blogger = true
      Baidu = false
      Odnoklassniki = false
      Evernote = true
      Skype = false
      Trello = false
      Mix = false
    # {{< version 0.2.0 changed >}} 评论系统设置
    [params.page.comment]
      enable = true
      # {{< link "https://disqus.com/" Disqus >}} 评论系统设置
      [params.page.comment.disqus]
        # {{< version 0.1.1 >}}
        enable = false
        # Disqus 的 shortname, 用来在文章中启用 Disqus 评论系统
        shortname = ""
      # {{< link "https://github.com/gitalk/gitalk" Gitalk >}} 评论系统设置
      [params.page.comment.gitalk]
        # {{< version 0.1.1 >}}
        enable = false
        owner = ""
        repo = ""
        clientId = ""
        clientSecret = ""
      # {{< link "https://github.com/xCss/Valine" Valine >}} 评论系统设置
      [params.page.comment.valine]
        enable = false
        appId = ""
        appKey = ""
        placeholder = ""
        avatar = "mp"
        meta= ""
        pageSize = 10
        lang = ""
        visitor = true
        recordIP = true
        highlight = true
        enableQQ = false
        serverURLs = ""
        # {{< version 0.2.6 >}} emoji 数据文件名称, 默认是 "google.yml"
        # ("apple.yml", "google.yml", "facebook.yml", "twitter.yml")
        # 位于 "themes/DoIt/assets/data/emoji/" 目录
        # 可以在你的项目下相同路径存放你自己的数据文件:
        # "assets/data/emoji/"
        emoji = ""
      # {{< link "https://github.com/xCss/Valine" Waline >}} 评论系统设置
      [params.page.comment.waline]
        # {{< version 0.2.13 changed >}}
        enable = false
        serverURL = ""
        visitor = false
        emoji = ['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']
        meta = ['nick', 'mail', 'link']
        requiredMeta = []
        login = 'enable'
        wordLimit = 0
        pageSize = 10
        uploadImage = false
        highlight = true
        mathTagSupport = false
        commentCount = true
      # {{< link "https://developers.facebook.com/docs/plugins/comments" "Facebook 评论系统" >}}设置
      [params.page.comment.facebook]
        enable = false
        width = "100%"
        numPosts = 10
        appId = ""
        languageCode = "zh_CN"
      # {{< version 0.2.0 >}} {{< link "https://comments.app/" "Telegram Comments" >}} 评论系统设置
      [params.page.comment.telegram]
        enable = false
        siteID = ""
        limit = 5
        height = ""
        color = ""
        colorful = true
        dislikes = false
        outlined = false
        dark = false
      # {{< version 0.2.0 >}} {{< link "https://commento.io/" "Commento" >}} 评论系统设置
      [params.page.comment.commento]
        enable = false
      # {{< version 0.2.5 >}} {{< link "https://utteranc.es/" "Utterances" >}} 评论系统设置
      [params.page.comment.utterances]
        enable = false
        # owner/repo
        repo = ""
        issueTerm = "pathname"
        label = ""
        lightTheme = "github-light"
        darkTheme = "github-dark"
      # {{< version 0.2.12 >}} {{< link "https://twikoo.js.org/" "Twikoo" >}} 评论系统设置
      [params.page.comment.twikoo]
        enable = false
        envId = ""
        region = ""
        path = ""
        visitor = true
        commentCount = true
      # {{< version 0.2.12 >}} {{< link "https://vssue.js.org/" "Vssue" >}} 评论系统设置
      [params.page.comment.vssue]
        enable = false
        platform = "" # ("bitbucket", "gitea", "gitee", "github", "gitlab")
        owner = ""
        repo = ""
        clientId = ""
        clientSecret = ""
      # {{< version 0.2.13 >}} {{< link "https://remark42.com/" "Remark42" >}} 评论系统设置
      [params.page.comment.remark42]
        enable = false
        host = ""
        site_id = ""
        max_shown_comments = 15
        show_email_subscription = true
        simple_view = false
      # {{< version 0.2.13 >}} {{< link "https://giscus.app/" "giscus" >}} 评论系统设置
      [params.page.comment.giscus]
        enable = false
        # owner/repo
        dataRepo = ""
        dataRepoId = ""
        dataCategory = ""
        dataCategoryId = ""
        dataMapping = "pathname"
        dataReactionsEnabled = "1"
        dataEmitMetadata = "0"
        lightTheme = "light"
        darkTheme = "dark"
    # {{< version 0.2.7 >}} 第三方库配置
    [params.page.library]
      [params.page.library.css]
        # someCSS = "some.css"
        # {{< version 0.2.14 >}} 更多第三方库配置
        # [params.page.library.css.someOtherCSS]
        #   src = "someOther.css"
        #   defer = true
        #   attr = "customAttribute"
        # 位于 "assets/"
        # 或者
        # someCSS = "https://cdn.example.com/some.css"
      [params.page.library.js]
        # someJavaScript = "some.js"
        # {{< version 0.2.14 >}} 更多第三方库配置
        # [params.page.library.js.someOtherJavaScript]
        #   src = "someOther.js"
        #   defer = false
        #   async = true
        #   attr = "customAttribute"
        # 位于 "assets/"
        # 或者
        # someJavaScript = "https://cdn.example.com/some.js"
    # {{< version 0.2.10 changed >}} 页面 SEO 配置
    [params.page.seo]
      # 图片 URL
      images = []
      # 出版者信息
      [params.page.seo.publisher]
        name = ""
        logoUrl = ""

  # {{< version 0.2.13 >}} 赞赏配置
  [params.sponsor]
    enable = false
    bio = "如果你觉得这篇文章对你有所帮助，欢迎赞赏~"
    link = "https://www.buymeacoffee.com" # 你的赞赏页面的地址
    custom = "" # 自定义 HTML 

  # {{< version 0.2.5 >}} TypeIt 配置
  [params.typeit]
    # 每一步的打字速度 (单位是毫秒)
    speed = 100
    # 光标的闪烁速度 (单位是毫秒)
    cursorSpeed = 1000
    # 光标的字符 (支持 HTML 格式)
    cursorChar = "|"
    # 打字结束之后光标的持续时间 (单位是毫秒, "-1" 代表无限大)
    duration = -1

  # 网站验证代码, 用于 Google/Bing/Yandex/Pinterest/Baidu
  [params.verification]
    google = ""
    bing = ""
    yandex = ""
    pinterest = ""
    baidu = ""
    so = "" # 360 search
    sogou = ""

  # {{< version 0.2.10 >}} 网站 SEO 配置
  [params.seo]
    # 图片 URL
    image = ""
    # 缩略图 URL
    thumbnailUrl = ""

  # {{< version 0.2.0 >}} 网站分析配置
  [params.analytics]
    enable = false
    # Google Analytics
    [params.analytics.google]
      id = ""
      # 是否匿名化用户 IP
      anonymizeIP = true
    # Fathom Analytics
    [params.analytics.fathom]
      id = ""
      # 自行托管追踪器时的主机路径
      server = ""
    # {{< version 0.2.13 >}} Baidu Analytics
    [params.analytics.baidu]
      id = ""
    # {{< version 0.2.13 >}} Umami Analytics
    [params.analytics.umami]
      data_website_id = ""
      src = ""
      data_domains = ""
    # {{< version 0.2.13 >}} Plausible Analytics
    [params.analytics.plausible]
      data_domain = ""
      src = ""
    # {{< version 0.2.14 >}} Cloudflare Analytics
    [params.analytics.cloudflare]
      token = ""

  # {{< version 0.2.7 >}} Cookie 许可配置
  [params.cookieconsent]
    enable = true
    # 用于 Cookie 许可横幅的文本字符串
    [params.cookieconsent.content]
      message = ""
      dismiss = ""
      link = ""

  # {{< version 0.2.7 changed >}} 第三方库文件的 CDN 设置
  [params.cdn]
    # CDN 数据文件名称, 默认不启用
    # ("jsdelivr.yml")
    # 位于 "themes/DoIt/assets/data/cdn/" 目录
    # 可以在你的项目下相同路径存放你自己的数据文件:
    # "assets/data/cdn/"
    data = ""

  # {{< version 0.2.8 >}} 兼容性设置
  [params.compatibility]
    # 是否使用 Polyfill.io 来兼容旧式浏览器
    polyfill = false
    # 是否使用 object-fit-images 来兼容旧式浏览器
    objectFit = false

# Hugo 解析文档的配置
[markup]
  # {{< link "https://gohugo.io/content-management/syntax-highlighting" "语法高亮设置" >}}
  [markup.highlight]
    codeFences = true
    guessSyntax = true
    lineNos = true
    lineNumbersInTable = true
    # false 是必要的设置
    # ({{< link "https://github.com/dillonzq/LoveIt/issues/158" >}})
    noClasses = false
  # Goldmark 是 Hugo 0.60 以来的默认 Markdown 解析库
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList = true
      footnote = true
      linkify = true
      strikethrough = true
      table = true
      taskList = true
      typographer = true
    [markup.goldmark.renderer]
      # 是否在文档中直接使用 HTML 标签
      unsafe = true
  # 目录设置
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 6

# 作者配置
[author]
  name = "xxxx"
  email = ""
  link = ""
  avatar = ""
  gravatarEmail = ""

# 网站地图配置
[sitemap]
  changefreq = "weekly"
  filename = "sitemap.xml"
  priority = 0.5

# {{< link "https://gohugo.io/content-management/urls#permalinks" "Permalinks 配置" >}}
[Permalinks]
  # posts = ":year/:month/:filename"
  posts = ":filename"

# {{< link "https://gohugo.io/about/hugo-and-gdpr/" "隐私信息配置" >}}
[privacy]
  # {{< version 0.2.0 deleted >}} Google Analytics 相关隐私 (被 params.analytics.google 替代)
  [privacy.googleAnalytics]
    # ...
  [privacy.twitter]
    enableDNT = true
  [privacy.youtube]
    privacyEnhanced = true

# 用于输出 Markdown 格式文档的设置
[mediaTypes]
  [mediaTypes."text/plain"]
    suffixes = ["md"]

# 用于输出 Markdown 格式文档的设置
[outputFormats.MarkDown]
  mediaType = "text/plain"
  isPlainText = true
  isHTML = false

# 用于 Hugo 输出文档的设置
[outputs]
  # {{< version 0.2.0 changed >}}
  home = ["HTML", "RSS", "JSON"]
  page = ["HTML", "MarkDown"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  taxonomyTerm = ["HTML"]

# 用于分类的设置
[taxonomies]
author = "authors"
category = "categories"
tag = "tags"
series = "series"
```

{{< admonition >}}
请注意, 本文档其他部分将详细解释其中一些参数.
{{< /admonition >}}

{{< admonition note "Hugo 的运行环境" >}}
`hugo serve` 的默认运行环境是 `development`,
而 `hugo` 的默认运行环境是 `production`.

由于本地 `development` 环境的限制,
**评论系统**, **CDN** 和 **fingerprint** 不会在 `development` 环境下启用.

你可以使用 `hugo serve -e production` 命令来开启这些特性.
{{< /admonition >}}

{{< admonition tip "关于头像配置的技巧" >}}

```toml
[params.home.profile]
  # Gravatar 邮箱, 用于优先在主页显示的头像
  gravatarEmail = ""
  # 主页显示头像的 URL
  avatarURL = "/images/avatar.webp"
````
你可以在 [Gravatar](https://cn.gravatar.com) 注册并设置自己的头像, 网站会通过`gravatarEmail`中填写的邮箱自动获取并设置你的头像.

或者可以在`/assets`或`/static`目录下放置图片文件, 并配置`avatarURL`下的地址来显示头像.引用资源的文件路径是相对于`assets`或`static`目录的.详细的本地资源引用方法请查看[这篇文档](/zh-cn/theme-documentation-content/#contents-organization).

{{< /admonition >}}

{{< admonition tip "关于 CDN 配置的技巧" >}}
{{< version 0.2.7 changed >}}

```toml
[params.cdn]
  # CDN 数据文件名称, 默认不启用
  # ("jsdelivr.yml")
  data = ""
````

默认的 CDN 数据文件位于 `themes/DoIt/assets/data/cdn/` 目录.
可以在你的项目下相同路径存放你自己的数据文件: `assets/data/cdn/`.
{{< /admonition >}}

{{< admonition tip "关于社交链接配置的技巧" >}}
{{< version 0.2.0 >}}

你可以直接配置你的社交 ID 来生成一个默认社交链接和图标:

```toml
[params.social]
  Mastodon = "@xxxx"
```

生成的社交链接是 `https://mastodon.technology/@xxxx`.

或者你可以通过一个字典来设置更多的选项:

```toml
[params.social]
  [params.social.Mastodon]
    # 排列图标时的权重 (权重越大, 图标的位置越靠后)
    weight = 0
    # 你的社交 ID
    id = "@xxxx"
    # 你的社交链接的前缀
    prefix = "https://mastodon.social/"
    # 当鼠标停留在图标上时的提示内容
    title = "Mastodon"
```

所有支持的社交链接的默认数据位于 `themes/DoIt/assets/data/social.yaml`.
你可以参考它来配置你的社交链接.
{{< /admonition >}}

{{< image src="complete-configuration-preview.zh-cn.webp" caption="完整配置下的预览" width="2450" height="1562" >}}

### 3.2 网站图标, 浏览器配置, 网站清单

强烈建议你把:

* apple-touch-icon.png (180x180)
* favicon-32x32.png (32x32)
* favicon-16x16.png (16x16)
* mstile-150x150.png (150x150)
* android-chrome-192x192.png (192x192)
* android-chrome-512x512.png (512x512)

放在 `/static` 目录. 利用 [https://realfavicongenerator.net/](https://realfavicongenerator.net/) 可以很容易地生成这些文件.

可以自定义 `browserconfig.xml` 和 `site.webmanifest` 文件来设置 theme-color 和 background-color.

### 3.3 自定义样式

{{< version 0.2.8 changed >}}

{{< admonition >}}
Hugo **extended** 版本对于自定义样式是必需的.
{{< /admonition >}}

通过定义自定义 `.scss` 样式文件, **DoIt** 主题支持可配置的样式.

包含自定义 `.scss` 样式文件的目录相对于 **你的项目根目录** 的路径为 `assets/css`.

在 `assets/css/_override.scss` 中, 你可以覆盖 `themes/DoIt/assets/css/_variables.scss` 中的变量以自定义样式.

这是一个例子:

```scss
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400,700&display=swap&subset=latin-ext');
$code-font-family: Fira Mono, Source Code Pro, Menlo, Consolas, Monaco, monospace;
```

在 `assets/css/_custom.scss` 中, 你可以添加一些 CSS 样式代码以自定义样式.

## 4 多语言和 i18n

**DoIt** 主题完全兼容 Hugo 的多语言模式, 并且支持在网页上切换语言.

{{< image src="language-switch.gif" caption="语言切换" width="770" height="226" >}}

### 4.1 兼容性 {#language-compatibility}

{{< version 0.2.10 changed >}}

| 语言 | Hugo 代码 | HTML `lang` 属性 | 主题文档 | Lunr.js 支持 |
|:---- |:----:|:----:|:----:|:----:|
| 英语 | `en` | `en` | :(far fa-check-square fa-fw): | :(far fa-check-square fa-fw): |
| 简体中文 | `zh-cn` | `zh-CN` | :(far fa-check-square fa-fw): | :(far fa-check-square fa-fw): |
| 法语 | `fr` | `fr` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 波兰语 | `pl` | `pl` | :(far fa-square fa-fw): | :(far fa-square fa-fw): |
| 巴西葡萄牙语 | `pt-br` | `pt-BR` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 意大利语 | `it` | `it` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 西班牙语 | `es` | `es` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 德语 | `de` | `de` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 塞尔维亚语 | `pl` | `pl` | :(far fa-square fa-fw): | :(far fa-square fa-fw): |
| 俄语 | `ru` | `ru` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 罗马尼亚语 | `ro` | `ro` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |
| 越南语 | `vi` | `vi` | :(far fa-square fa-fw): | :(far fa-check-square fa-fw): |

### 4.2 基本配置

学习了 [Hugo如何处理多语言网站](https://gohugo.io/content-management/multilingual) 之后, 请在 [站点配置](#site-configuration) 中定义你的网站语言.

例如, 一个支持英语, 中文和法语的网站配置:

```toml
# [en, zh-cn, fr, pl, ...] 设置默认的语言
defaultContentLanguage = "zh-cn"

[languages]
  [languages.en]
    weight = 1
    title = "My New Hugo Site"
    languageCode = "en"
    languageName = "English"
    [[languages.en.menu.main]]
      identifier = "posts"
      pre = ""
      post = ""
      name = "Posts"
      url = "/posts/"
      title = ""
      weight = 1
    [[languages.en.menu.main]]
      identifier = "tags"
      pre = ""
      post = ""
      name = "Tags"
      url = "/tags/"
      title = ""
      weight = 2
    [[languages.en.menu.main]]
      identifier = "categories"
      pre = ""
      post = ""
      name = "Categories"
      url = "/categories/"
      title = ""
      weight = 3

  [languages.zh-cn]
    weight = 2
    title = "我的全新 Hugo 网站"
    # 网站语言, 仅在这里 CN 大写
    languageCode = "zh-CN"
    languageName = "简体中文"
    # 是否包括中日韩文字
    hasCJKLanguage = true
    [[languages.zh-cn.menu.main]]
      identifier = "posts"
      pre = ""
      post = ""
      name = "文章"
      url = "/posts/"
      title = ""
      weight = 1
    [[languages.zh-cn.menu.main]]
      identifier = "tags"
      pre = ""
      post = ""
      name = "标签"
      url = "/tags/"
      title = ""
      weight = 2
    [[languages.zh-cn.menu.main]]
      identifier = "categories"
      pre = ""
      post = ""
      name = "分类"
      url = "/categories/"
      title = ""
      weight = 3
```

然后, 对于每个新页面, 将语言代码附加到文件名中.

单个文件 `my-page.md` 需要分为两个文件:

* 英语: `my-page.en.md`
* 中文: `my-page.zh-cn.md`

{{< admonition >}}
请注意, 菜单中仅显示翻译的页面. 它不会替换为默认语言内容.
{{< /admonition >}}

{{< admonition tip >}}
也可以使用 [文章前置参数](https://gohugo.io/content-management/multilingual#translate-your-content) 来翻译网址.
{{< /admonition >}}

### 4.3 修改默认的翻译字符串

翻译字符串用于在主题中使用的常见默认值.
目前提供[一些语言](#language-compatibility)的翻译, 但你可能自定义其他语言或覆盖默认值.

要覆盖默认值, 请在你项目的 i18n 目录 `i18n/<languageCode>.toml` 中创建一个新文件, 并从 `themes/DoIt/i18n/en.toml` 中获得提示.

另外, 由于你的翻译可能会帮助到其他人, 请花点时间通过 [:(fas fa-code-branch fa-fw): 创建一个 PR](https://github.com/HEIGE-PCloud/DoIt/pulls) 来贡献主题翻译, 谢谢!

## 5 搜索

{{< version 0.2.0 >}}

基于 [Lunr.js](https://lunrjs.com/) 或 [algolia](https://www.algolia.com/), **DoIt** 主题支持搜索功能.

### 5.1 输出配置

为了生成搜索功能所需要的 `index.json`, 请在你的 [网站配置](#site-configuration) 中添加 `JSON` 输出文件类型到 `outputs` 部分的 `home` 字段中.

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

### 5.2 搜索配置

基于 Hugo 生成的 `index.json` 文件, 你可以激活搜索功能.

这是你的 [网站配置](#site-configuration) 中的搜索部分:

```toml
[params.search]
  enable = true
  # 搜索引擎的类型 ("lunr", "algolia", "fuse")
  type = "fuse"
  # 文章内容最长索引长度
  contentLength = 4000
  # 搜索框的占位提示语
  placeholder = ""
  # {{< version 0.2.1 >}} 最大结果数目
  maxResultLength = 10
  # {{< version 0.2.3 >}} 结果内容片段长度
  snippetLength = 50
  # {{< version 0.2.1 >}} 搜索结果中高亮部分的 HTML 标签
  highlightTag = "em"
  # {{< version 0.2.4 >}} 是否在搜索索引中使用基于 baseURL 的绝对路径
  absoluteURL = false
  [params.search.algolia]
    index = ""
    appID = ""
    searchKey = ""
  [params.search.fuse]
    # {{< version 0.2.12 >}} https://fusejs.io/api/options.html
    isCaseSensitive = false
    minMatchCharLength = 2
    findAllMatches = false
    location = 0
    threshold = 0.3
    distance = 100
    ignoreLocation = false
    useExtendedSearch = false
    ignoreFieldNorm = false
```

{{< admonition note "怎样选择搜索引擎?" >}}
以下是两种搜索引擎的对比:

* `fuse`: 简单, 无需同步 `index.json`, 没有 `contentLength` 的限制, 性能高
* `lunr`: 简单, 无需同步 `index.json`, 没有 `contentLength` 的限制, 但占用带宽大且性能低 (特别是中文需要一个较大的分词依赖库)
* `algolia`: 高性能并且占用带宽低, 但需要同步 `index.json` 且有 `contentLength` 的限制

{{< version 0.2.3 >}} 文章内容被 `h2` 和 `h3` HTML 标签切分来提高查询效果并且基本实现全文搜索.
`contentLength` 用来限制 `h2` 和 `h3` HTML 标签开头的内容部分的最大长度.
{{< /admonition >}}

{{< admonition tip "关于 algolia 的使用技巧" >}}
你需要上传 `index.json` 到 algolia 来激活搜索功能. 你可以使用浏览器来上传 `index.json` 文件但是一个自动化的脚本可能效果更好.
[Algolia Atomic](https://github.com/chrisdmacrae/atomic-algolia) 是一个不错的选择.
为了兼容 Hugo 的多语言模式, 你需要上传不同语言的 `index.json` 文件到对应的 algolia index, 例如 `zh-cn/index.json` 或 `fr/index.json`...
{{< /admonition >}}
