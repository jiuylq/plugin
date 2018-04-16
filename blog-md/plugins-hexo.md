---
title: plugins-hexo
date: 2017-11-05 21:40:59
tags: plugins
categories: plugins
---
  Hexo博客常用插件及用法
<!-- more -->
<The rest of contents | 余下全文>

## hexo
Doc：https://hexo.io/zh-cn/
Api：https://hexo.io/zh-cn/api/
Plugins：https://hexo.io/plugins/
Themes：https://hexo.io/themes/

## hexo-generator-json-content
Github：https://github.com/alexbruno/hexo-generator-json-content
简介：用于生成静态站点数据，提供搜索功能的数据源。
安装：
```
npm install hexo-generator-json-content --save
```
配置：
在博客配置文件_config.yml中添加
```
jsonContent:
  ignore:
    - path/to/a/page
    - url/to/one/post
    - an-entire-category
    - specific.file
    - .ext # a file extension
```

## hexo-neat
Github：https://github.com/rozbo/hexo-neat
简介：自动压缩html、css、js代码
安装：
```
npm install hexo-neat --save
```
配置：
在博客配置文件_config.yml中添加
```
neat_enable: true
```
压缩html代码
```
neat_html:
  enable: true
  exclude:
```
压缩CSS
```
neat_css:
  enable: true
  exclude:
    - '*.min.css'
```
压缩JS
```
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '*.min.js'
```
## hexo-wordcount
Github：https://github.com/willin/hexo-wordcount
A Word Count Plugin for Hexo https://npmjs.org/package/hexo-wordcount
简介：为文章添加文章字数统计、文章预计阅读时间
安装：
```
npm install hexo-wordcount --save
```
使用：
通过以上安装后，你可以在你的模板文件加入以下相关的标签实现本插件的功能
**字数统计:**WordCount
**阅读时长预计:**Min2Read
总字数统计: TotalCount
> Ejs

Post Count:
```
   <span class="post-count"><%= wordcount(post.content) %></span>
```
Post Minutes to Read:
```
   <span class="post-count"><%= min2read(post.content) %></span>
```
Total Count:
```
   <span class="post-count"><%= totalcount(site) %></span>
```

## hexo-generator-json-content
