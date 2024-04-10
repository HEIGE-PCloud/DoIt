---
title: "Bilibili Tests"
date: 2021-04-16T14:32:18+01:00
lastmod: 2021-04-16T14:32:18+01:00
draft: true
description: "Bilibili Tests"
categories: [Tests]
authors: [PCloud]
hiddenFromHomePage: true
hiddenFromSearch: true
---

<!--more-->

Simple case `{{</* bilibili BV1Sx411T7QQ */>}}`

{{< bilibili BV1Sx411T7QQ >}}

Play the 3rd page `{{</* bilibili id=BV1TJ411C7An p=3 */>}}`

{{< bilibili id=BV1TJ411C7An p=3 >}}

Enable autoplay with annoying unmute `{{</* bilibili id=BV1TJ411C7An p=3 autoplay=true muted=false */>}}`

{{< bilibili id=BV1TJ411C7An p=3 autoplay=true muted=false >}}

A player with everything diabled `{{</* bilibili id=BV1TJ411C7An p=3 autoplay=0 muted=1 danmaku=0 t=100 hasMuteButton=0 hideCoverInfo=1 hideDanmakuButton=1 noFullScreenButton=1 fjw=1 */>}}` (Looks like only `autoplay`, `muted`, `danmaku` and `t` are working)

{{< bilibili id=BV1TJ411C7An p=3 autoplay=0 muted=1 danmaku=0 t=100 hasMuteButton=0 hideCoverInfo=1 hideDanmakuButton=1 noFullScreenButton=1 fjw=1 >}}