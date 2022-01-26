---
title: "Markdown Tests"
subtitle: ""
date: 2021-04-16T12:27:57+01:00
lastmod: 2021-04-16T12:27:57+01:00
draft: true
description: "Test basic markdown rendering"
categories: [Tests]
authors: [PCloud]
hiddenFromHomePage: true
hiddenFromSearch: true
---

<!--more-->
## Headers

### heading 3

Under heading 3

#### heading 4

Under heading 4

##### heading 5

Under heading 5

###### heading 6

Under heading 6

## Comment

<!-- You cannot see this comment -->

## Horizontal Rules

---

___

***

## Body Copy

```markdown
Lorem ipsum dolor sit amet, graecis denique ei vel, at duo primis mandamus. Et legere ocurreret pri,
animal tacimates complectitur ad cum. Cu eum inermis inimicus efficiendi. Labore officiis his ex,
soluta officiis concludaturque ei qui, vide sensibus vim ad.
```
## Inline HTML

<div class="class">
    This is <b>HTML</b>
</div>


## Emphasis

*This text will be italic*

_This will also be italic_

**This text will be bold**

__This will also be bold__

~~Strike through this text.~~

_You **can** combine them_

***bold and italics***

~~**strikethrough and bold**~~

~~*strikethrough and italics*~~

~~***bold, italics and strikethrough***~~

## Blockquotes

> Donec massa lacus, ultricies a ullamcorper in, fermentum sed augue.
Nunc augue augue, aliquam non hendrerit ac, commodo vel nisi.
>> Sed adipiscing elit vitae augue consectetur a gravida nunc vehicula. Donec auctor
odio non est accumsan facilisis. Aliquam id turpis in dolor tincidunt mollis ac eu diam.


## Lists

* Item 1
* Item 2
  * Item 2a
  * Item 2b

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

## Code

`Inline Code`

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code
    loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong


```cpp
#include <iostream>
int main()
{
    std::cout << "Hello world!" << endl;
    return 0;
}
```

## Tables

| Option | Description |
|:------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## Links

<https://assemble.io>

<contact@revolunet.com>

[Assemble](https://assemble.io)

[Upstage](https://github.com/upstage/ "Visit Upstage!")

* [Chapter 1](#headers)
* [Chapter 2](#comment)
* [Chapter 3](#horizontal-rules)

## Footnotes

This is a digital footnote[^1].
This is a footnote with "label"[^label]

[^1]: This is a digital footnote
[^label]: This is a footnote with "label"

## Images

![Minion](https://octodex.github.com/images/minion.png)

![Alt text](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
