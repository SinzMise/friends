# SinzMise's Friends


## 和屋主加友链的要求

- **禁广告**
- 最好**先友后链**
- 最好是我比较熟悉的人；
  - 「熟悉」指的是：在过去一年内，我见过你至少五次。
  - 陌生人的 Pull Requests 最终是否合并则取决于我对你的印象。
- 网站内没有安插有令人不适的内容
    - 示例 1：暴力、血腥、R-18、NSFW 等；
    - 示例 2：非常高对比颜色（这会让人的眼睛很不适）；
    - 示例 3：遍布过多甚至影响正常访问的广告内容；
    - 更详细的「令人不适的内容」的最终解释权归我所有

如果你认为自己符合了要求，就可以提交 Pull Request 了。

## 友链流程

### 将我的网站添加到你的友链列表中

我的信息如下：

- 链接：https://blog.storical.space/
- 头像（128x，WebP）：https://images1.blog.sinzmise.top/profile/icon.avif
  - Gravatar E-Mail Hash：`e873808e83cf6b677b23b760c77523fb660b5db100791b3cb9a99cd5c25f9e84`
- 站点名称：汐塔魔法屋
- 昵称：王九弦SZ·Ninty
- 主题色：`#39C5BB`
- 描述：种下一颗有故事的种子，让它带着魔法和奇迹生根发芽

### 准备好你的网站信息

标准情况下你需要提供描述、头像链接、站点名称、站点截图和网站链接

你的头像应为对称的方形或圆形，否则加载时可能出现一些问题

请确保你提供的信息是适合全年龄段的人群的内容

打开本仓库的 `links.yml` 并在最末尾添加你的站点

下述是一个对你有用的示例：
```yml
- name: 汐塔魔法屋
  link: https://blog.sinzmise.top/
  avatar: https://blog.sinzmise.top/images/icon.png
  descr: 种下一颗有故事的种子，让它带着魔法和奇迹生根发芽
  siteshot: https://image.thum.io/get/allowJPG/wait/20/width/600/crop/950/https://blog.sinzmise.top/
```

> [!IMPORTANT]
> 请严格遵循 YAML 的格式编写。

确认你填写的信息是否无误，并打开一个 Pull Request。

当你的 Pull Request 按流程顺利合并，之后等待Github Action运行，你的网站会显示在我的友链页（或者缓存刷新后）。

## 写在最后

首先，如果你的文章很牛，就有机会添加到大佬分类里面！

其次，严格来说，一旦最后 Pull Request 顺利合并，你的友链将不会被移除。但是，因下述两种原因，你的友链可能在命中时被Github Actions自动移除：

- 出现了无法访问的问题（例如 404、502、522 等）；
  - 由于部分 CDN 可能会拦截我们的检查请求，因此如有检查错误，请您及时告知我们。
- 在整理友链时不小心丢失数据。

你完全可以在出现这种状况时向我提出重新添加友链的要求，但请在发起 Pull Request 时带上 `#LOST` 的 Tag。

