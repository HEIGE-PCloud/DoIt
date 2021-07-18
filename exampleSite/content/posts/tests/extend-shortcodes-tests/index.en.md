---
title: "Extend Shortcodes Tests"
date: 2021-04-16T14:21:36+01:00
lastmod: 2021-04-16T14:21:36+01:00
draft: false
description: "Extend Shortcodes Tests"
categories: [Tests]
authors: [PCloud]
lightgallery: true
hiddenFromHomePage: true
hiddenFromSearch: true
---

<!--more-->

## style

{{< style "text-align:right; strong{color:#00b1ff;}" >}}
This is a **right-aligned** paragraph.
{{< /style >}}

## link

{{< link "https://github.com/upstage/" Upstage "Visit Upstage!" >}}

## image

{{< image src="/images/lighthouse.webp" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.webp" src_l="/images/lighthouse-large.webp" >}}

{{< image src="/images/lighthouse.webp" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.webp" src_l="/images/lighthouse-large.webp" >}}

{{< image src="/images/lighthouse.webp" caption="Lighthouse (`image`)" src_s="/images/lighthouse-small.webp" src_l="/images/lighthouse-large.webp" >}}

## admonition

{{< admonition >}}
A **note** banner
{{< /admonition >}}

{{< admonition abstract >}}
An **abstract** banner
{{< /admonition >}}

{{< admonition info >}}
A **info** banner
{{< /admonition >}}

{{< admonition tip >}}
A **tip** banner
{{< /admonition >}}

{{< admonition success >}}
A **success** banner
{{< /admonition >}}

{{< admonition question >}}
A **question** banner
{{< /admonition >}}

{{< admonition warning >}}
A **warning** banner
{{< /admonition >}}

{{< admonition failure >}}
A **failure** banner
{{< /admonition >}}

{{< admonition danger >}}
A **danger** banner
{{< /admonition >}}

{{< admonition bug >}}
A **bug** banner
{{< /admonition >}}

{{< admonition example >}}
An **example** banner
{{< /admonition >}}

{{< admonition quote >}}
A **quote** banner
{{< /admonition >}}

{{< admonition type=tip title="open=false" open=false >}}
open=false
{{< /admonition >}}

{{< admonition tip "open=true" true >}}
open=true
{{< /admonition >}}

## script

{{< script >}}
console.log('Hello!');
{{< /script >}}
