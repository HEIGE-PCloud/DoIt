---
weight: 4
title: "主题文档 - 扩展 Shortcodes"
date: 2020-03-06T16:29:59+08:00
lastmod: 2020-03-06T16:29:59+08:00
draft: false
authors: [Dillon, PCloud]
author: "Dillon"
authorLink: "https://dillonzq.com"
description: "DoIt 主题在 Hugo 内置的 shortcode 的基础上提供多个扩展的 shortcode."
featuredImage: "featured-image.webp"
featuredImagePreview: "featured-image-preview.webp"
series_weight: 4
tags: ["shortcodes"]
categories: ["documentation"]
series: ["getting-start"]

lightgallery: true
mapbox:
  lightStyle: mapbox://styles/mapbox/light-zh-v1?optimize=true
  darkStyle: mapbox://styles/mapbox/dark-zh-v1?optimize=true
math:
  enable: true
---

**DoIt** 主题在 Hugo 内置的 shortcode 的基础上提供多个扩展的 shortcode.

<!--more-->

## style

{{< version 0.2.0 changed >}}

{{< admonition >}}
Hugo **extended** 版本对于 `style` shortcode 是必需的.
{{< /admonition >}}

`style` shortcode 用来在你的文章中插入自定义样式.

`style` shortcode 有两个位置参数.

第一个参数是自定义样式的内容. 它支持 [:(fab fa-sass fa-fw): SASS](https://sass-lang.com/documentation/style-rules/declarations#nesting) 中的嵌套语法,
并且 `&` 指代这个父元素.

第二个参数是包裹你要更改样式的内容的 HTML 标签, 默认值是 `div`.

一个 `style` 示例:

```markdown
{{</* style "text-align:right; strong{color:#00b1ff;}" */>}}
This is a **right-aligned** paragraph.
{{</* /style */>}}
```

呈现的输出效果如下:

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

## link

{{< version 0.2.0 >}}

`link` shortcode 是 [Markdown 链接语法](../basic-markdown-syntax#links) 的替代.
`link` shortcode 可以提供一些其它的功能并且可以在代码块中使用.

{{< version 0.2.10 >}} 支持[本地资源引用](../theme-documentation-content#contents-organization)的完整用法.

`link` shortcode 有以下命名参数:

* **href** *[必需]* (**第一个**位置参数)

    链接的目标.

* **content** *[可选]* (**第二个**位置参数)

    链接的内容, 默认值是 **href** 参数的值.

    *支持 Markdown 或者 HTML 格式.*

* **title** *[可选]* (**第三个**位置参数)

    HTML `a` 标签 的 `title` 属性, 当悬停在链接上会显示的提示.

* **rel** *[可选]*

    HTML `a` 标签 的 `rel` 补充属性.

* **class** *[可选]*

    HTML `a` 标签 的 `class` 属性.

一个 `link` 示例:

```markdown
{{</* link "https://assemble.io" */>}}
或者
{{</* link href="https://assemble.io" */>}}

{{</* link "mailto:contact@revolunet.com" */>}}
或者
{{</* link href="mailto:contact@revolunet.com" */>}}

{{</* link "https://assemble.io" Assemble */>}}
或者
{{</* link href="https://assemble.io" content=Assemble */>}}
```

呈现的输出效果如下:

* {{< link "https://assemble.io" >}}
* {{< link "mailto:contact@revolunet.com" >}}
* {{< link "https://assemble.io" Assemble >}}

一个带有标题的 `link` 示例:

```markdown
{{</* link "https://github.com/upstage/" Upstage "Visit Upstage!" */>}}
或者
{{</* link href="https://github.com/upstage/" content=Upstage title="Visit Upstage!" */>}}
```

呈现的输出效果如下 (将鼠标悬停在链接上, 会有一行提示):

{{< link "https://github.com/upstage/" Upstage "Visit Upstage!" >}}

## image {#image}

{{< version 0.2.0 changed >}}

`image` shortcode 是 [`figure` shortcode](../theme-documentation-built-in-shortcodes#figure) 的替代. `image` shortcode 可以充分利用 [lightgallery.js](https://github.com/sachinchoolur/lightgallery.js).

{{< version 0.2.10 >}} 支持[本地资源引用](../theme-documentation-content#contents-organization)的完整用法.

`image` shortcode 有以下命名参数:

* **src** *[必需]* (**第一个**位置参数)

    图片的 URL.

* **alt** *[可选]* (**第二个**位置参数)

    图片无法显示时的替代文本, 默认值是 **src** 参数的值.

    *支持 Markdown 或者 HTML 格式.*

* **caption** *[可选]* (**第三个**位置参数)

    图片标题.

    *支持 Markdown 或者 HTML 格式.*

* **title** *[可选]*

    当悬停在图片上会显示的提示.

* **class** *[可选]*

    HTML `figure` 标签的 `class` 属性.

* **src_s** *[可选]*

    图片缩略图的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **src_l** *[可选]*

    高清图片的 URL, 用在画廊模式中, 默认值是 **src** 参数的值.

* **height** *[可选]*

    图片的 `height` 属性.

* **width** *[可选]*

    图片的 `width` 属性.

* **linked** *[可选]*

    图片是否需要被链接, 默认值是 `true`.

* **rel** *[可选]*

    HTML `a` 标签 的 `rel` 补充属性, 仅在 **linked** 属性设置成 `true` 时有效.

一个 `image` 示例:

```markdown
{{</* image src="/images/lighthouse.webp" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.webp" src_l="/images/lighthouse-large.webp" */>}}
```

呈现的输出效果如下:

{{< image src="/images/lighthouse.webp" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.webp" src_l="/images/lighthouse-large.webp" >}}

## admonition

`admonition` shortcode 支持 **12** 种 帮助你在页面中插入提示的横幅.

*支持 Markdown 或者 HTML 格式.*

{{< admonition >}}
一个 **注意** 横幅
{{< /admonition >}}

{{< admonition abstract >}}
一个 **摘要** 横幅
{{< /admonition >}}

{{< admonition info >}}
一个 **信息** 横幅
{{< /admonition >}}

{{< admonition tip >}}
一个 **技巧** 横幅
{{< /admonition >}}

{{< admonition success >}}
一个 **成功** 横幅
{{< /admonition >}}

{{< admonition question >}}
一个 **问题** 横幅
{{< /admonition >}}

{{< admonition warning >}}
一个 **警告** 横幅
{{< /admonition >}}

{{< admonition failure >}}
一个 **失败** 横幅
{{< /admonition >}}

{{< admonition danger >}}
一个 **危险** 横幅
{{< /admonition >}}

{{< admonition bug >}}
一个 **Bug** 横幅
{{< /admonition >}}

{{< admonition example >}}
一个 **示例** 横幅
{{< /admonition >}}

{{< admonition quote >}}
一个 **引用** 横幅
{{< /admonition >}}

`admonition` shortcode 有以下命名参数:

* **type** *[必需]* (**第一个**位置参数)

    `admonition` 横幅的类型, 默认值是 `note`.

* **title** *[可选]* (**第二个**位置参数)

    `admonition` 横幅的标题, 默认值是 **type** 参数的值.

* **open** *[可选]* (**第三个**位置参数) {{< version 0.2.0 changed >}}

    横幅内容是否默认展开, 默认值是 `true`.

一个 `admonition` 示例:

```markdown
{{</* admonition type=tip title="This is a tip" open=false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
或者
{{</* admonition tip "This is a tip" false */>}}
一个 **技巧** 横幅
{{</* /admonition */>}}
```

呈现的输出效果如下:

{{< admonition tip "This is a tip" false >}}
一个 **技巧** 横幅
{{< /admonition >}}

## mermaid

[mermaid](https://mermaidjs.github.io/) 是一个可以帮助你在文章中生成图表和流程图的库, 类似 Markdown 的语法.

只需将你的 mermaid 代码插入 `mermaid` shortcode 中即可.

### 流程图 {#flowchart}

一个 **流程图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}

### 时序图 {#sequence-diagram}

一个 **时序图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{< /mermaid >}}

### 甘特图 {#gantt}

一个 **甘特图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid
    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2               :         des4, after des3, 5d
    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}gantt
    dateFormat  YYYY-MM-DD
    title Adding GANTT diagram functionality to mermaid
    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2               :         des4, after des3, 5d
    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :1d
{{< /mermaid >}}

### 类图 {#class-diagram}

一个 **类图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label
{{< /mermaid >}}

### 状态图 {#state-diagram}

一个 **状态图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
{{< /mermaid >}}

### Git 图 {#git-graph}

一个 **Git 图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}
gitGraph
    commit
    branch hotfix
    checkout hotfix
    commit
    branch develop
    checkout develop
    commit id:"ash" tag:"abc"
    branch featureB
    checkout featureB
    commit type:HIGHLIGHT
    checkout main
    checkout hotfix
    commit type:NORMAL
    checkout develop
    commit type:REVERSE
    checkout featureB
    commit
    checkout main
    merge hotfix
    checkout featureB
    commit
    checkout develop
    branch featureA
    commit
    checkout develop
    merge hotfix
    checkout featureA
    commit
    checkout featureB
    commit
    checkout develop
    merge featureA
    branch release
    checkout release
    commit
    checkout main
    commit
    checkout release
    merge main
    checkout develop
    merge release
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}
gitGraph
    commit
    branch hotfix
    checkout hotfix
    commit
    branch develop
    checkout develop
    commit id:"ash" tag:"abc"
    branch featureB
    checkout featureB
    commit type:HIGHLIGHT
    checkout main
    checkout hotfix
    commit type:NORMAL
    checkout develop
    commit type:REVERSE
    checkout featureB
    commit
    checkout main
    merge hotfix
    checkout featureB
    commit
    checkout develop
    branch featureA
    commit
    checkout develop
    merge hotfix
    checkout featureA
    commit
    checkout featureB
    commit
    checkout develop
    merge featureA
    branch release
    checkout release
    commit
    checkout main
    commit
    checkout release
    merge main
    checkout develop
    merge release
{{< /mermaid >}}

### 饼图 {#pie}

一个 **饼图** `mermaid` 示例:

```markdown
{{</* mermaid */>}}pie
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
{{</* /mermaid */>}}
```

呈现的输出效果如下:

{{< mermaid >}}pie
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
{{< /mermaid >}}

## echarts

[ECharts](https://echarts.apache.org/) 是一个帮助你生成交互式数据可视化的库.

ECharts 提供了常规的 [折线图](https://echarts.apache.org/zh/option.html#series-line), [柱状图](https://echarts.apache.org/zh/option.html#series-line), [散点图](https://echarts.apache.org/zh/option.html#series-scatter), [饼图](https://echarts.apache.org/zh/option.html#series-pie), [K线图](https://echarts.apache.org/zh/option.html#series-candlestick), 用于统计的 [盒形图](https://echarts.apache.org/zh/option.html#series-boxplot), 用于地理数据可视化的 [地图](https://echarts.apache.org/zh/option.html#series-map), [热力图](https://echarts.apache.org/zh/option.html#series-heatmap), [线图](https://echarts.apache.org/zh/option.html#series-lines), 用于关系数据可视化的 [关系图](https://echarts.apache.org/zh/option.html#series-graph), [treemap](https://echarts.apache.org/zh/option.html#series-treemap), [旭日图](https://echarts.apache.org/zh/option.html#series-sunburst), 多维数据可视化的 [平行坐标](https://echarts.apache.org/zh/option.html#series-parallel), 还有用于 BI 的 [漏斗图](https://echarts.apache.org/zh/option.html#series-funnel), [仪表盘](https://echarts.apache.org/zh/option.html#series-gauge), 并且支持图与图之间的混搭.

只需在 `echarts` shortcode 中以 `JSON`/`YAML`/`TOML`格式插入 ECharts 选项即可.

一个 `JSON` 格式的 `echarts` 示例:

```json
{{</* echarts */>}}
{
  "title": {
    "text": "折线统计图",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    "top": "10%"
  },
  "grid": {
    "left": "5%",
    "right": "5%",
    "bottom": "5%",
    "top": "20%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "保存为图片"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "邮件营销",
      "type": "line",
      "stack": "总量",
      "data": [120, 132, 101, 134, 90, 230, 210]
    },
    {
      "name": "联盟广告",
      "type": "line",
      "stack": "总量",
      "data": [220, 182, 191, 234, 290, 330, 310]
    },
    {
      "name": "视频广告",
      "type": "line",
      "stack": "总量",
      "data": [150, 232, 201, 154, 190, 330, 410]
    },
    {
      "name": "直接访问",
      "type": "line",
      "stack": "总量",
      "data": [320, 332, 301, 334, 390, 330, 320]
    },
    {
      "name": "搜索引擎",
      "type": "line",
      "stack": "总量",
      "data": [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
{{</* /echarts */>}}
```

一个 `YAML` 格式的 `echarts` 示例:

```yaml
{{</* echarts */>}}
title:
    text: 折线统计图
    top: 2%
    left: center
tooltip:
    trigger: axis
legend:
    data:
        - 邮件营销
        - 联盟广告
        - 视频广告
        - 直接访问
        - 搜索引擎
    top: 10%
grid:
    left: 5%
    right: 5%
    bottom: 5%
    top: 20%
    containLabel: true
toolbox:
    feature:
        saveAsImage:
            title: 保存为图片
xAxis:
    type: category
    boundaryGap: false
    data:
        - 周一
        - 周二
        - 周三
        - 周四
        - 周五
        - 周六
        - 周日
yAxis:
    type: value
series:
    - name: 邮件营销
      type: line
      stack: 总量
      data:
          - 120
          - 132
          - 101
          - 134
          - 90
          - 230
          - 210
    - name: 联盟广告
      type: line
      stack: 总量
      data:
          - 220
          - 182
          - 191
          - 234
          - 290
          - 330
          - 310
    - name: 视频广告
      type: line
      stack: 总量
      data:
          - 150
          - 232
          - 201
          - 154
          - 190
          - 330
          - 410
    - name: 直接访问
      type: line
      stack: 总量
      data:
          - 320
          - 332
          - 301
          - 334
          - 390
          - 330
          - 320
    - name: 搜索引擎
      type: line
      stack: 总量
      data:
          - 820
          - 932
          - 901
          - 934
          - 1290
          - 1330
          - 1320
{{</* /echarts */>}}
```

一个 `TOML` 格式的 `echarts` 示例:

```toml
{{</* echarts */>}}
[title]
text = "折线统计图"
top = "2%"
left = "center"

[tooltip]
trigger = "axis"

[legend]
data = [
  "邮件营销",
  "联盟广告",
  "视频广告",
  "直接访问",
  "搜索引擎"
]
top = "10%"

[grid]
left = "5%"
right = "5%"
bottom = "5%"
top = "20%"
containLabel = true

[toolbox]
[toolbox.feature]
[toolbox.feature.saveAsImage]
title = "保存为图片"

[xAxis]
type = "category"
boundaryGap = false
data = [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日"
]

[yAxis]
type = "value"

[[series]]
name = "邮件营销"
type = "line"
stack = "总量"
data = [
  120.0,
  132.0,
  101.0,
  134.0,
  90.0,
  230.0,
  210.0
]

[[series]]
name = "联盟广告"
type = "line"
stack = "总量"
data = [
  220.0,
  182.0,
  191.0,
  234.0,
  290.0,
  330.0,
  310.0
]

[[series]]
name = "视频广告"
type = "line"
stack = "总量"
data = [
  150.0,
  232.0,
  201.0,
  154.0,
  190.0,
  330.0,
  410.0
]

[[series]]
name = "直接访问"
type = "line"
stack = "总量"
data = [
  320.0,
  332.0,
  301.0,
  334.0,
  390.0,
  330.0,
  320.0
]

[[series]]
name = "搜索引擎"
type = "line"
stack = "总量"
data = [
  820.0,
  932.0,
  901.0,
  934.0,
  1290.0,
  1330.0,
  1320.0
]
{{</* /echarts */>}}
```

呈现的输出效果如下:

{{< echarts >}}
{
  "title": {
    "text": "折线统计图",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    "top": "10%"
  },
  "grid": {
    "left": "5%",
    "right": "5%",
    "bottom": "5%",
    "top": "20%",
    "containLabel": true
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "保存为图片"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "boundaryGap": false,
    "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "邮件营销",
      "type": "line",
      "stack": "总量",
      "data": [120, 132, 101, 134, 90, 230, 210]
    },
    {
      "name": "联盟广告",
      "type": "line",
      "stack": "总量",
      "data": [220, 182, 191, 234, 290, 330, 310]
    },
    {
      "name": "视频广告",
      "type": "line",
      "stack": "总量",
      "data": [150, 232, 201, 154, 190, 330, 410]
    },
    {
      "name": "直接访问",
      "type": "line",
      "stack": "总量",
      "data": [320, 332, 301, 334, 390, 330, 320]
    },
    {
      "name": "搜索引擎",
      "type": "line",
      "stack": "总量",
      "data": [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
{{< /echarts >}}

`echarts` shortcode 还有以下命名参数:

* **width** *[可选]* (**第一个**位置参数)

    {{< version 0.2.0 >}} 数据可视化的宽度, 默认值是 `100%`.

* **height** *[可选]* (**第二个**位置参数)

    {{< version 0.2.0 >}} 数据可视化的高度, 默认值是 `30rem`.

## mapbox

{{< version 0.2.0 >}}

[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) 是一个 JavaScript 库, 它使用 WebGL, 以 [vector tiles](https://docs.mapbox.com/help/glossary/vector-tiles/) 和 [Mapbox styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/) 为来源, 将它们渲染成互动式地图.

`mapbox` shortcode 有以下命名参数来使用 Mapbox GL JS:

* **lng** *[必需]* (**第一个**位置参数)

    地图初始中心点的经度, 以度为单位.

* **lat** *[必需]* (**第二个**位置参数)

    地图初始中心点的纬度, 以度为单位.

* **zoom** *[可选]* (**第三个**位置参数)

    地图的初始缩放级别, 默认值是 `10`.

* **marked** *[可选]* (**第四个**位置参数)

    是否在地图的初始中心点添加图钉, 默认值是 `true`.

* **light-style** *[可选]* (**第五个**位置参数)

    浅色主题的地图样式, 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **dark-style** *[可选]* (**第六个**位置参数)

    深色主题的地图样式, 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **navigation** *[可选]*

    是否添加 [NavigationControl](https://docs.mapbox.com/mapbox-gl-js/api#navigationcontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **geolocate** *[可选]*

    是否添加 [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api#geolocatecontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **scale** *[可选]*

    是否添加 [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api#scalecontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **fullscreen** *[可选]*

   是否添加 [FullscreenControl](https://docs.mapbox.com/mapbox-gl-js/api#fullscreencontrol), 默认值是[前置参数](../theme-documentation-content#front-matter)或者[网站配置](../theme-documentation-basics#site-configuration)中设置的值.

* **width** *[可选]*

    地图的宽度, 默认值是 `100%`.

* **height** *[可选]*

    地图的高度, 默认值是 `20rem`.

一个简单的 `mapbox` 示例:

```markdown
{{</* mapbox 121.485 31.233 12 */>}}
或者
{{</* mapbox lng=121.485 lat=31.233 zoom=12 */>}}
```

呈现的输出效果如下:

{{< mapbox 121.485 31.233 12 >}}

一个带有自定义样式的 `mapbox` 示例:

```markdown
{{</* mapbox -122.252 37.453 10 false "mapbox://styles/mapbox/streets-zh-v1" */>}}
或者
{{</* mapbox lng=-122.252 lat=37.453 zoom=10 marked=false light-style="mapbox://styles/mapbox/streets-zh-v1" */>}}
```

呈现的输出效果如下:

{{< mapbox -122.252 37.453 10 false "mapbox://styles/mapbox/streets-zh-v1?optimize=true" >}}

## music

`music` shortcode 基于 [APlayer](https://github.com/MoePlayer/APlayer) 和 [MetingJS](https://github.com/metowolf/MetingJS) 提供了一个内嵌的响应式音乐播放器.

有三种方式使用 `music` shortcode.

### 自定义音乐 URL {#custom-music-url}

{{< version 0.2.10 >}} 支持[本地资源引用](../theme-documentation-content#contents-organization)的完整用法.

`music` shortcode 有以下命名参数来使用自定义音乐 URL:

* **server** *[必需]*

    音乐的链接.

* **type** *[可选]*

    音乐的名称.

* **artist** *[可选]*

    音乐的创作者.

* **cover** *[可选]*

    音乐的封面链接.

一个使用自定义音乐 URL 的 `music` 示例:

```markdown
{{</* music url="/music/Wavelength.mp3" name=Wavelength artist=oldmanyoung cover="/images/Wavelength.webp" */>}}
```

呈现的输出效果如下:

{{< music url="/music/Wavelength.mp3" name=Wavelength artist=oldmanyoung cover="/images/Wavelength.webp" >}}

### 音乐平台 URL 的自动识别 {#automatic-identification}

`music` shortcode 有一个命名参数来使用音乐平台 URL 的自动识别:

* **auto** *[必需]]* (**第一个**位置参数)

    用来自动识别的音乐平台 URL, 支持 `netease`, `tencent` 和 `xiami` 平台.

一个使用音乐平台 URL 的自动识别的 `music` 示例:

```markdown
{{</* music auto="https://music.163.com/#/playlist?id=60198" */>}}
或者
{{</* music "https://music.163.com/#/playlist?id=60198" */>}}
```

呈现的输出效果如下:

{{< music auto="https://music.163.com/#/playlist?id=60198" >}}

### 自定义音乐平台, 类型和 ID {#custom-server}

`music` shortcode 有以下命名参数来使用自定义音乐平台:

* **server** *[必需]* (**第一个**位置参数)

    [`netease`, `tencent`, `kugou`, `xiami`, `baidu`]

    音乐平台.

* **type** *[必需]* (**第二个**位置参数)

    [`song`, `playlist`, `album`, `search`, `artist`]

    音乐类型.

* **id** *[必需]* (**第三个**位置参数)

    歌曲 ID, 或者播放列表 ID, 或者专辑 ID, 或者搜索关键词, 或者创作者 ID.

一个使用自定义音乐平台的 `music` 示例:

```markdown
{{</* music server="netease" type="song" id="1868553" */>}}
或者
{{</* music netease song 1868553 */>}}
```

呈现的输出效果如下:

{{< music netease song 1868553 >}}

### 其它参数 {#other-parameters}

`music` shortcode 有一些可以应用于以上三种方式的其它命名参数:

* **theme** *[可选]*

    {{< version 0.2.0 changed >}} 音乐播放器的主题色, 默认值是 `#448aff`.

* **fixed** *[可选]*

    是否开启固定模式, 默认值是 `false`.

* **mini** *[可选]*

    是否开启迷你模式, 默认值是 `false`.

* **autoplay** *[可选]*

    是否自动播放音乐, 默认值是 `false`.

* **volume** *[可选]*

    第一次打开播放器时的默认音量, 会被保存在浏览器缓存中, 默认值是 `0.7`.

* **mutex** *[可选]*

    是否自动暂停其它播放器, 默认值是 `true`.

`music` shortcode 还有一些只适用于音乐列表方式的其它命名参数:

* **loop** *[可选]*

    [`all`, `one`, `none`]

    音乐列表的循环模式, 默认值是 `none`.

* **order** *[可选]*

    [`list`, `random`]

    音乐列表的播放顺序, 默认值是 `list`.

* **list-folded** *[可选]*

    初次打开的时候音乐列表是否折叠, 默认值是 `false`.

* **list-max-height** *[可选]*

    音乐列表的最大高度, 默认值是 `340px`.

## aplayer and audio

{{< version 0.2.14 >}}

如果你需要针对音乐播放器的更多自定义选项（如自定义歌单，迷你模式，自定义音乐类型以及更多...），你可以使用 `aplayer` shortcode 配合 `audio` shortcode 以发挥 [APlayer.js](https://aplayer.js.org) 的全部功能。

`aplayer` shortcode 用于创建一个 `APlayer` 播放器实例，`audio` shortcode 则用于设置音乐文件的相关信息。请查看 [APlayer.js 的文档](https://aplayer.js.org/#/zh-Hans/?id=%E5%8F%82%E6%95%B0) 来了解所有的可配置项。

一个 `aplayer` 和 `audio` 的示例：

```markdown
{{</* aplayer fixed=false mini=false autoplay=false theme="#b7daff" loop="all" order="list" preload="auto" volume=0.7 mutex=true lrcType=1 listFolded=false listMaxHeight="" storageName="aplayer-setting" */>}}
    {{</* audio name="Wavelength" artist="oldmanyoung" url="/music/Wavelength.mp3" cover="/images/Wavelength.webp" /*/>}}
    {{</* audio name="Wavelength" artist="oldmanyoung" url="/music/Wavelength.mp3" cover="/images/Wavelength.webp" */>}}
        [00:00.00]APlayer audio1
        [00:04.01]is
        [00:08.02]amazing
    {{</* /audio */>}}
{{</* /aplayer */>}}
```

呈现的输出效果如下：

{{< aplayer fixed=false mini=false autoplay=false theme="#b7daff" loop="all" order="list" preload="auto" volume=0.7 mutex=true lrcType=1 listFolded=false listMaxHeight="" storageName="aplayer-setting" >}}
    {{< audio name="Wavelength" artist="oldmanyoung" url="/music/Wavelength.mp3" cover="/images/Wavelength.webp" />}}
    {{< audio name="Wavelength" artist="oldmanyoung" url="/music/Wavelength.mp3" cover="/images/Wavelength.webp" >}}
        [00:00.00]APlayer audio1
        [00:04.01]is
        [00:08.02]amazing
    {{< /audio >}}
{{< /aplayer >}}

需要注意的是，这两个 shortcodes 并不能单独使用，并且必须使用命名参数来设置它们的属性。

如果你将 LRC 放置于 `audio` shortcode 之中，它会通过 JS 字符串方式传递给 APlayer，所以你需要将 `lrcType` 设置为 1。如果你通过配置 `lrc` 参数的方式来设置 LRC 文件的链接，那么它将会被通过 LRC 文件方式传递给 APlayer，则 `lrcType` 需要被设置为 3。

## bilibili

{{< version 0.2.0 changed >}}

`bilibili` shortcode 提供了一个内嵌的用来播放 bilibili 视频的响应式播放器.

如果视频只有一个部分, 则仅需要视频的 BV `id`, 例如:

```code
https://www.bilibili.com/video/BV1Sx411T7QQ
```

一个 `bilibili` 示例:

```markdown
{{</* bilibili BV1Sx411T7QQ */>}}
或者
{{</* bilibili id=BV1Sx411T7QQ */>}}
```

呈现的输出效果如下:

{{< bilibili id=BV1Sx411T7QQ >}}

如果视频包含多个部分, 则除了视频的 BV `id` 之外, 还需要 `p`, 默认值为 `1`, 例如:

```code
https://www.bilibili.com/video/BV1TJ411C7An?p=3
```

一个带有 `p` 参数的 `bilibili` 示例:

```markdown
{{</* bilibili BV1TJ411C7An 3 */>}}
或者
{{</* bilibili id=BV1TJ411C7An p=3 */>}}
```

呈现的输出效果如下:

{{< bilibili id=BV1TJ411C7An p=3 >}}

## typeit

`typeit` shortcode 基于 [TypeIt](https://typeitjs.com/) 提供了打字动画.

只需将你需要打字动画的内容插入 `typeit` shortcode 中即可.

### 简单内容 {#simple-content}

允许使用 `Markdown` 格式的简单内容, 并且 **不包含** 富文本的块内容, 例如图像等等...

一个 `typeit` 示例:

```markdown
{{</* typeit */>}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{</* /typeit */>}}
```

呈现的输出效果如下:

{{< typeit >}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{< /typeit >}}

另外, 你也可以自定义 **HTML 标签**.

一个带有 `h4` 标签的 `typeit` 示例:

```markdown
{{</* typeit tag=h4 */>}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{</* /typeit */>}}
```

呈现的输出效果如下:

{{< typeit tag=h4 >}}
这一个带有基于 [TypeIt](https://typeitjs.com/) 的 **打字动画** 的 *段落*...
{{< /typeit >}}

### 代码内容 {#code-content}

代码内容也是允许的, 并且通过使用参数 `code` 指定语言类型可以实习语法高亮.

一个带有 `code` 参数的 `typeit` 示例:

```markdown
{{</* typeit code=java */>}}
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World");
    }
}
{{</* /typeit */>}}
```

呈现的输出效果如下:

{{< typeit code=java >}}
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World");
    }
}
{{< /typeit >}}

### 分组内容 {#code-content}

默认情况下, 所有打字动画都是同时开始的.
但是有时你可能需要按顺序开始一组 `typeit` 内容的打字动画.

一组具有相同 `group` 参数值的 `typeit` 内容将按顺序开始打字动画.

一个带有 `group` 参数的 `typeit` 示例:

```markdown
{{</* typeit group=paragraph */>}}
**首先**, 这个段落开始
{{</* /typeit */>}}

{{</* typeit group=paragraph */>}}
**然后**, 这个段落开始
{{</* /typeit */>}}
```

呈现的输出效果如下:

{{< typeit group=paragraph >}}
**首先**, 这个段落开始
{{< /typeit >}}

{{< typeit group=paragraph >}}
**然后**, 这个段落开始
{{< /typeit >}}

## script

{{< version 0.2.8 >}}

`script` shortcode 用来在你的文章中插入 **:(fab fa-js fa-fw): Javascript** 脚本.

{{< admonition >}}
脚本内容可以保证在所有的第三方库加载之后按顺序执行.
所以你可以自由地使用第三方库.
{{< /admonition >}}

一个 `script` 示例:

```markdown
{{</* script */>}}
console.log('Just DoIt!');
{{</* /script */>}}
```

你可以在开发者工具的控制台中看到输出.

{{< script >}}
console.log('Just DoIt!');
{{< /script >}}

## friend

{{< version 0.2.11 >}}

`friend` shortcode 用来在你的页面上插入友链.

`friend` shortcode 有以下命名参数:

* **name** *[必需]* (**第一个**位置参数)

    友站的名称.

* **url** *[必需]* (**第二个**位置参数)

    友站的链接.

* **avatar** *[必需]* (**第三个**位置参数)

    友站的头像.

* **bio** *[必需]* (**第四个**位置参数)

    友站的简介.

一个 `friend` 示例:


```markdown
{{</* friend "PCloud" "https://github.com/HEIGE-PCloud/" "https://avatars.githubusercontent.com/u/52968553?v=4" "This is PCloud~💤" */>}}
或者
{{</* friend name="PCloud" url="https://github.com/HEIGE-PCloud/" avatar="https://avatars.githubusercontent.com/u/52968553?v=4" bio="This is PCloud~💤" */>}}
```

呈现的输出效果如下:

{{< friend name="PCloud" url="https://github.com/HEIGE-PCloud/" avatar="https://avatars.githubusercontent.com/u/52968553?v=4" bio="This is PCloud~💤" >}}

## showcase

{{< version 0.2.12 >}}

`showcase` 用于在页面上插入一个个人项目的展示柜.

`showcase` shortcode 有以下命名参数:

* **title** *[required]* (**第一个**位置参数)

    项目名称.

* **summary** *[required]* (**第二个**位置参数)

    项目简介.

* **image** *[required]* (**第三个**位置参数)

    预览图的链接.

* **link** *[required]* (**第四个**位置参数)

    项目主页的链接.

* **column** *[optional]* (**fifth** positional parameter)

    这个参数定义一行显示几个 `showcase`. 默认的值是 2, 默认一行显示两个 `showcase`. 你可以将它改为 1, 2 或 3. 需要注意的是, 当用户使用小屏幕访问网站时, 每行显示的 `showcase` 数量将会被自动调整以保证最好的体验.

一个 `showcase` 示例:

```markdown
{{</* showcase title="Theme Documentation - Basics" summary="Discover what the Hugo - DoIt theme is all about and the core-concepts behind it." image="/theme-documentation-basics/featured-image.webp" link="/theme-documentation-basics" */>}}
Or
{{</* showcase "Theme Documentation - Basics" "Discover what the Hugo - DoIt theme is all about and the core-concepts behind it." "/theme-documentation-basics/featured-image.webp" "/theme-documentation-basics" */>}}
```

呈现的输出效果如下:

{{< showcase title="主题文档 - 基本概念" summary="探索 Hugo - DoIt 主题的全部内容和背后的核心概念." image="/theme-documentation-basics/featured-image.webp" link="/theme-documentation-basics" >}}

## math

{{< version 0.2.12 >}}

`math` 用于插入数学公式. 它可以阻止 [Goldmark](https://gohugo.io/getting-started/configuration-markup/#goldmark) 将数学表达式中的特殊字符解析为 HTML 从而避免很多问题. 在 `math` 中, 你不再需要转义特殊字符.

一个 `math` 示例:

```markdown
{{</* math */>}}$\|\boldsymbol{x}\|_{0}=\sqrt[0]{\sum_{i} x_{i}^{0}}${{</* /math */>}}
Or
{{</* math */>}}
$$\|\boldsymbol{x}\|_{0}=\sqrt[0]{\sum_{i} x_{i}^{0}}$$
{{</* /math */>}}
```

呈现的输出效果如下:

{{< math >}}$\|\boldsymbol{x}\|_{0}=\sqrt[0]{\sum_{i} x_{i}^{0}}${{< /math >}}

{{< math >}}
$$\|\boldsymbol{x}\|_{0}=\sqrt[0]{\sum_{i} x_{i}^{0}}$$
{{< /math >}}
