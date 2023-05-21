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
---

<!--more-->

{{< tabs >}}
{{< tab title="Tab 1" >}}
Content 1
{{< /tab >}}
{{< tab title="Tab 2" select=true >}}
Content 2
{{< /tab >}}
{{< /tabs >}}

{{< tabs >}}
{{< tab title="Tab 1" >}}
Content 1
{{< /tab >}}
{{< tab title="Tab 2" >}}
Content 2
{{< /tab >}}
{{< /tabs >}}


{{< tabs >}}
{{< tab title="Nested Tab 1" >}}
    {{< tabs >}}
    {{< tab title="SubTab 1" >}}
    Content 1
    {{< /tab >}}
    {{< tab title="SubTab 2" >}}
    Content 2
    {{< /tab >}}
    {{< /tabs >}}
{{< /tab >}}
{{< tab title="Nested Tab 2" >}}
    {{< tabs >}}
    {{< tab title="SubTab 3" >}}
    Content 1
    {{< /tab >}}
    {{< tab title="SubTab 4" >}}
    Content 2
    {{< /tab >}}
    {{< /tabs >}}

{{< /tab >}}
{{< /tabs >}}
