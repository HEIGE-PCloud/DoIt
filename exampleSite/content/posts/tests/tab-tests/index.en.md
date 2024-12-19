---
title: "Tab Tests"
date: 2023-05-20T17:50:43+01:00
lastmod: 2023-05-20T17:50:43+01:00
draft: true
description: "Tab Tests"
categories: [Tests]
authors: [PCloud]
hiddenFromHomePage: true
hiddenFromSearch: true
sponsor: 
    enable: false
---

<!--more-->

## Tabs 

{{< tabs defaultTab="1" >}}

{{% tab title="Tab 1" %}}

Content 1

{{% /tab %}}

{{% tab title="Tab 2" %}}

Content 2

{{% /tab %}}

{{< /tabs >}}

## Tabs with Markdown

{{< tabs >}}

{{% tab title="Tab 1" %}}

## Markdown Content 1

### Markdown Content 2

```
code
```

{{% /tab %}}

{{% tab title="Tab 2" select=true %}}

Content 2

{{% /tab %}}

{{< /tabs >}}

## Tabs with Codeblock

{{< tabs >}}

{{% tab title="Tab 1" %}}

```python
def hello():
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
```

{{% /tab %}}

{{% tab title="Tab 2" %}}

```python
def hello():
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
    print("Hello World!")
```

{{% /tab %}}


{{< /tabs >}}

## Single Tab

{{< tabs >}}

{{% tab title="Tab 1" %}}

Content 1

{{% /tab %}}

{{< /tabs >}}

## Nested Tabs

{{< tabs >}}

{{< tab title="Tab 1" >}}

SubTab 1

{{< tabs >}}

{{< tab title="Tab 1" >}}

Content 1

{{< /tab >}}

{{< tab title="Tab 2" >}}

Content 2

{{< /tab >}}

{{< /tabs >}}

{{< /tab >}}

{{< tab title="Tab 2" >}}

SubTab 2

{{< tabs >}}

{{< tab title="Tab 1" >}}

Content 1

{{< /tab >}}

{{< tab title="Tab 2" >}}

Content 2

{{< /tab >}}

{{< /tabs >}}

{{< /tab >}}

{{< /tabs >}}

## Overflow Tabs

{{< tabs >}}

{{% tab title="Tab 1" %}}

Content 1

{{% /tab %}}

{{% tab title="Tab 2" %}}

Content 2

{{% /tab %}}

{{% tab title="Tab 3" %}}

Content 3

{{% /tab %}}

{{% tab title="Tab 4" %}}

Content 4

{{% /tab %}}

{{% tab title="Tab 5" %}}

Content 5

{{% /tab %}}

{{% tab title="Tab 6" %}}

Content 6

{{% /tab %}}

{{% tab title="Tab 7" %}}

Content 7

{{% /tab %}}

{{% tab title="Tab 8" %}}

Content 8

{{% /tab %}}

{{% tab title="Tab 9" %}}

Content 9

{{% /tab %}}

{{% tab title="Tab 10" %}}

Content 10

{{% /tab %}}

{{% tab title="Tab 11" %}}

Content 11

{{% /tab %}}

{{% tab title="Tab 12" %}}

Content 12

{{% /tab %}}

{{< /tabs >}}

---

## Tab with super long name

{{< tabs >}}

{{% tab title="Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab " %}}

Content 1

{{% /tab %}}

{{% tab title="Tab 2" %}}

Content 2

{{% /tab %}}

{{< /tabs >}}

## Tab codeblock

{{< tabs >}}

{{% tab title="HTML" %}}

```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World!</title>
</head>
<body>
    <h1>Hello HTML!</h1>
</body>
</html>
```

{{% /tab %}}

{{% tab title="CSS" %}}

```css
body {
    background-color: lightblue;
}
h1 {
    color: white;
    text-align: center;
}
```

{{% /tab %}}

{{% tab title="JavaScript" %}}

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```
{{% /tab %}}

{{< /tabs >}}
