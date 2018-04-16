---
title: markdown-guide
date: 2017-11-05 22:41:34
tags: Markdown
categories: Markdown
---
Markdown 是一种轻量级的「标记语言」，使用用特殊的 Markdown 文档处理器将 Markdown 语法翻译成预设的文档格式、标题大小等，一般用于展示时输出的是 HTML。
<!-- more -->
<The rest of contents | 余下全文>

## Markdown简介

Markdown 是一种轻量级的「标记语言」，使用用特殊的 Markdown 文档处理器将 Markdown 语法翻译成预设的文档格式、标题大小等，一般用于展示时输出的是 HTML。这个教程可以让使用 Markdown 的新手快速熟悉语法和快捷键。本文基于 Ghost 的 Markdown 指南，兼容标准版 Markdown 编辑器和 Github Flavored Markdown。

NOTE: 虽然 Markdown 标记语言不能够实现 HTML 语法上的全部功能，但你可以混合使用 HTML 和 Markdown 语法。此页提供 Markdown 的简单入门指南，而 语法说明 页提供了详细的文档。

## 常用语法

### 标题
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
或
这是一个一级标题
============================
这是一个二级标题
--------------------------------------------------
```
*注：# 和「标题」之间建议保留一个字符的空格，这是最标准的 Markdown 写法。*

### 列表
> 无序列表  

无序列表是使用\*,+,-中任意一种来表示
```
* 文本1
* 文本2
* 文本3
或
+ 文本1
+ 文本2
+ 文本3
或
- 文本1
- 文本2
- 文本3
```

> 有序列表 

```
1. 文本1
2. 文本2
3. 文本3
```
*注：-、1.和文本之间要保留一个字符的空格。*

### 链接和图片
> 链接

+ 行内式
在 Markdown 中，插入链接不需要其他按钮，你只需要使用 [显示文本](链接地址) 这样的语法即可，例如：

```
[title](url "描述")
[hexo](https://hexo.io)
```
[hexo](https://hexo.io "hexo")

+ 参考式
```
[title][id]
  标记: [id]: https://www.baidu.com/ "度娘"
  或者: [id]: https://www.baidu.com/ '度娘' (简书不支持)
  或者 [id]: https://www.baidu.com/ (度娘)
```
[title][121]
[121]: https://www.baidu.com/ "度娘"

+ 隐式链接标记功能
```
[Baidu][]
  标记可以这样写: [Baidu]: http://baidu.com
```
[Baidu][]

[Baidu]: http://baidu.com

+ 参考式链接范例:

```
I get 10 times more traffic from [Google] [1] than from 
     [Yahoo] [2] or [MSN] [3]. 
     [1]:  http://google.com/        "Google"
     [2]: http://search.yahoo.com/  "Yahoo Search"
     [3]: http://search.msn.com/    "MSN Search"
     I get 10 times more traffic from [Google][] than from
     [Yahoo][] or [MSN][].
     [google]: http://google.com/        "Google"
     [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
     [msn]:    http://search.msn.com/    "MSN Search"
```

+ 自动链接
```
示例如下: 
  <http:\\www.baidu.com>
```

> 图片

在 Markdown 中，插入图片不需要其他按钮，你只需要使用 ![](图片链接地址) 这样的语法即可，例如：

```
![图片Alt](图片地址 “图片Title”)
![title](https://hexo.io/img/a.jpg)
![title](https://hexo.io/img/a.jpg "描述")
或
![title][1]
[1]: https://hexo.io/img/a.jpg "描述"
```
*注：插入图片的语法和链接的语法很像，只是前面多了一个 ！。*

### 强调
> Markdown使用性星号(*)和底线(_)作为标记强调字词的符号 
两端被一个*或_包围的单词会被转换成斜体 
两端被两个`*`或`_`包围的单词会被转换成粗体 
`*`或_的两端不能有空白 
用什么符号就以什么符号结尾

```
 示例
 *斜体*
 _斜体_
 **粗体**
 __粗体__
 ***加粗斜体***
 ~~删除线~~
 ```
  *斜体*
 _斜体_
 **粗体**
 __粗体__
 ***加粗斜体***
 ~~删除线~~

### 引用
> 在我们写作的时候经常需要引用他人的文字，这个时候引用这个格式就很有必要了，在 Markdown 中，你只需要在你希望引用的文字前面加上 > 就好了，例如：

```
> 简单引用1
 > 简单引用2
 > 
 > 多行引用
 >> 嵌套引用

 > ## 引用中使用Markdown语法。
 > 
 > 1.   这是第一行列表项。
 > 2.   这是第二行列表项。
 > 
 > 给出一些例子代码：
 > 
 >     return shell_exec("echo $input | $markdown_script");
```
> 简单引用1
 > 简单引用2
 > 
 > 多行引用
 >> 嵌套引用

 >  引用中使用Markdown语法。
 > 
 > 1.   这是第一行列表项。
 > 2.   这是第二行列表项。
 > 
 > 给出一些例子代码：
 > 
 >     return shell_exec("echo $input | $markdown_script");

### 代码引用
> 需要引用代码时，如果引用的语句只有一段，不分行，可以用\`将语句包起来。
如果引用的语句为多行，可以将\`\`\`置于这段代码的首行和末行。

### 分隔线
> 一行中用三个以上的星号、减号、底线来建立一个分隔线,行内不能有其他东西,
也可以在星号或是减号中间插入空格

```
---
```
---

```
 - - -
```
 - - -

```
***
```
***

```
 * * *
```
 * * *

```
——————————————
```
——————————————

### 段落和换行
> 段落

段落是由一个或多个连续的文本行组成,
它的前后要一个以上的空行(显示上看起来像是空的)

>换行

Mardown允许段落内的强迫换行(插入换行符) 
要依赖Markdown来插入`<br/>`标签的话,在`<br/>`插入处要先按入两个以上的空格然后回车

### 表格
> 居中

```
 Tables        | Are           | Cool  
:------------: |:-------------:|:-----:
 col 3 is      | right-aligned | $1600 
 col 2 is      | centered      |   $12 
 zebra stripes | are neat      |    $1 
或
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
 ```
 Tables        | Are           | Cool  
:------------: |:-------------:|:-----:
 col 3 is      | right-aligned | $1600 
 col 2 is      | centered      |   $12 
 zebra stripes | are neat      |    $1 

> 不居中

```
dog | bird | cat
----|------|----
foo | foo  | foo
bar | bar  | bar
baz | baz  | baz
```
dog | bird | cat
----|------|----
foo | foo  | foo
bar | bar  | bar
baz | baz  | baz

```
1、简单方式写表格：

学号|姓名|分数
-|-|-
小明|男|75
小红|女|79
小陆|男|92

2、原生方式写表格：

|学号|姓名|分数|
|-|-|-|
|小明|男|75|
|小红|女|79|
|小陆|男|92|

3、为表格第二列指定方向：

产品|价格
-|-:
Leanote 高级账号|60元/年
Leanote 超级账号|120元/年

```

1、简单方式写表格：

学号|姓名|分数
-|-|-
小明|男|75
小红|女|79
小陆|男|92

2、原生方式写表格：

|学号|姓名|分数|
|-|-|-|
|小明|男|75|
|小红|女|79|
|小陆|男|92|

3、为表格第二列指定方向：

产品|价格
-|-:
Leanote 高级账号|60元/年
Leanote 超级账号|120元/年

### 转义
> 使用反斜杠来插入一些在语法中有其它意义的符号,如*
需要转义的字符:

```
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

### 锚点
网页中，锚点其实就是页内超链接，也就是链接本文档内部的某些元素，实现当前页面中的跳转。比如我这里写下一个锚点，点击回到目录，就能跳转到目录。 在目录中点击这一节，就能跳过来。还有下一节的注脚。这些根本上都是用锚点来实现的。
注意： 
1. Markdown Extra 只支持在标题后插入锚点，其它地方无效。 
2. Leanote 编辑器右侧显示效果区域暂时不支持锚点跳转，所以点来点去发现没有跳转不必惊慌，但是你发布成笔记或博文后是支持跳转的。

```
## 0. 目录{#index}
跳转到[目录](#index)
```

### 注脚
> 在需要添加注脚的文字后加上脚注名字[^注脚名字],称为加注。 然后在文本的任意位置(一般在最后)添加脚注，脚注前必须有对应的脚注名字。

```
使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2] ,你可以使用 Leanote[^Le] 编辑器进行书写。
[^1]:Markdown是一种纯文本标记语言
[^2]:HyperText Markup Language 超文本标记语言
[^Le]:开源笔记平台，支持Markdown和笔记直接发为博文
```

使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2] ,你可以使用 Leanote[^Le] 编辑器进行书写。

[^1]:Markdown是一种纯文本标记语言
[^2]:HyperTextMarkupLanguage超文本标记语言
[^Le]:开源笔记平台，支持Markdown和笔记直接发为博文