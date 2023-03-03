---
title: "Get started with Hugo Stack Theme"
description: I am gonna show you how to use this theme.
date: 2023-03-01T18:09:43+08:00
image: document.jpg
categories:
    - Document
tags: 
    - Theme
hidden: false
comments: true
draft: fase
weight: 1
---

# Markdown
**What is Markdown?**

Markdown is a light-weight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.  *For more information, please visit [Markdown](https://www.markdownguide.org/getting-started/).*

## Markdown syntax
**Blockquotes**

* To create a blockquote, add a > in front of a paragraph.

    ```markdown
    > This is a blockquote.
    ```

* The rendered output looks like this:

    > This is a blockquote.

**Links**

* To create a link, enclose the link text in brackets(e.g.,[display name]) and then follow it immediately with the URL in parentheses(e.g.,(htpps://link.com)).

    ```markdown
    Go to visit [Google](https://google.com)
    ```

* The rendered output looks like this:

    Go to visit [Google](https://google.com)

---

* You can also use it for jumping to the specific section in current Markdown file.

    ```markdown
    Go to the section [Summary](#Summary)
    ```

* The rendered output looks like this:

    Go to the section [Summary](#Summary)

**Images**

* To add an image, add an exclamation mark(!) infront of a `[link]`- mentioned above, for example below:

    ```markdown
    ![Here is an example](/path/picture.jpg)
    ```

* The rendered output woulb be a picture which you link to.

    ![Here is an example](document.jpg)

{{< admonition tip >}}
For more information about Markdown Syntax please visit [Markdown document](https://www.markdownguide.org/basic-syntax/)
{{< /admonition >}}

## Shortcodes

*Shortcodes are simple snippets inside your content files calling built-in or custom templates.*

**quote**

* Here is an example of `quote` below

    *{{\< quote author="author" source="source" url="url">}}*

    *Some text here.*

    *{{\< /quote >}}*

* The rendered output looks like this:
    
{{< quote author="author" source="source" url="url">}}
Some text here.
{{< /quote >}}

**Bilibili video**

* The syntax below:

    *{{\< bilibili VIDEO_ID PART_NUMBER  >}}*

The `VIDEO_ID` can be founded in the URL of the video form [Bilibili](https://www.bilibili.com/). For instance,the VIDEO_ID of `https://www.bilibili.com/video/BV1Sg4y1n7c4/?spm_id_from=333.1007.tianma.18-4-70.click&vd_source=031b1e94f7352ad4e2d00a56d2314e71` is BV1Sg4y1n7c4, and the PART_NUMBER is optional. We embed this video into our page we coul write down: *{{\< bilibili BV1Sg4y1n7c4 >}}*

* The rendered output looks like this:

    {{< bilibili BV1Sg4y1n7c4 >}}

***

**Tecent video**

* To embed a [Tencent video](https://v.qq.com/) we use same syntax of `Bilibili video` but replace bilibili with tencent,and use tencent `VIDEO_ID` instead of bilibili `VIDEO_ID`. Take `https://v.qq.com/x/cover/mzc00200koowgko/h0045wlodzy.html` for an example,the `VIDEO_ID` is `h0045wlodzy`

    {{< tencent h0045wlodzy >}}

***

**YouTube video**

* The syntax below:

    *{{\< youtube  VIDEO_ID PART_NUMBER  >}}*

***

**Local video**

* Sometimes, we are suppose to play our local video, here is the sytax to do so:

    *{{\< video src="VIDEO_URL" autoplay="true" poster="./video-poster.png" >}}*

    `autoplay` and `poster` are optional.

{{< admonition tip >}}
For more information about `Shortcodes` please visit [Hugo-Stack](https://stack.jimmycai.com/writing/shortcodes) and [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/)
{{< /admonition >}}

## Customize our own Shortcode
For learning Japanese, I created a custom `Shortcode`, looks like this: [こんにちは]^('kon ni chi 'wa.)  

**The way how I create my own shortcode:**

1. We create a html file `layouts/partials/function/ruby.html`, and this file's content is below:

    ```html
    {{- /* Ruby */ -}}
    {{- /* [EN]^(English) -> <strong><ruby>EN<rt>English</rt></ruby></strong> */ -}}
    {{- $REin := `\[(.+?)\]\^\((.+?)\)` -}}
    {{- $REout := `<strong><ruby>$1<rt>$2</rt></ruby></strong>` -}}
    {{- return replaceRE $REin $REout . -}}
    ```


2. We create a html file `layouts/partials/article/components/content.html` for exporting our custom content to the `article` so that we can rendered it. this file's content is below:

    ```html
    <section class="article-content">
        <!-- Refer to https://discourse.gohugo.io/t/responsive-tables-in-markdown/10639/5 -->
        {{ $wrappedTable := printf "<div class=\"table-wrapper\">${1}</div>" }}
        <!-- {{ .Content | replaceRE "(<table>(?:.|\n)+?</table>)" $wrappedTable | safeHTML }} -->
        {{- $params := .Site.Params -}}
        {{- $content := dict "Content" .Content "Ruby" $params.page.ruby "Fraction" $params.fraction "Fontawesome" $params.fontawesome | partial "function/content.html"| replaceRE "(<table>(?:.|\n)+?</table>)" $wrappedTable | safeHTML -}}
        {{- $content -}}
    </section>
    ```

3. And the last, we decorate it with css, we create a css file `assets/scss/article/article.scss`, the this file's content is belows:

    ```css
    ruby {
        background: $code-background-color;

        rt {
            color: $global-font-secondary-color;
            font-size: 1.3rem;
        }

        [data-theme="dark"] & {
            background: $code-background-color-dark;

            rt {
            color: $global-font-secondary-color-dark;
            }
        }
    }
    ```

    After that we exports this file by adding `@import "article/article.scss";` to `assets/scss/custom.scss` so that we can use it. 

Ok, everything is perfect, pretty easy right? Now you can use it in all of your articles(posts).

## Epilogue

`Hugo` is my favorite open-source static site generator. Its lightweight, flexible, and incredibly fast performance are all extremely attractive features. With `Hugo`, building a blog is easy, and you can create your own shortcodes to customize the look and feel of your content. I spent some time learning about `Hugo` and creating my own shortcodes, which has been really helpful in styling my blog and making it uniquely mine. It's been a lot of fun!

In particular, I love the `Hugo-stack` blog template. It's a neat and lightweight design that looks great and performs well. If you're looking for a simple, yet powerful blogging platform, I highly recommend giving `Hugo` and the `Hugo-stack` template a try. I hope you'll enjoy them as much as I do!
