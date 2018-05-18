# scss入门篇  

>[链接](http://www.cnblogs.com/iovec/p/8024408.html)  

### 是 Sass 还是 SCSS？
> SCSS 是 Sass 3 引入的新语法，语法上完全兼容原生 CSS，功能上完全继承 Sass，可以说是 CSS 和 Sass 的完美融合。SCSS 之于 Sass 犹如 CSS3 之于 CSS，ES6 之于 JS。所以别纠结，其实是一个东西啦。

### 一、嵌套写法
**css原生写法**
``` css
.page .content .left-side .profile .name{
    font-size: 2rem;
}
.page .content .left-side .profile .age{
    color: red;
}
```
**scss写法**
``` scss
.page{
    .content{
        .left-side{
            .profile{
                .name{
                    font-size: 2rem;
                }
                .age{
                    color: red;
                }
            }
        }
    }
}
```
**编译后**
``` css
.page .content .left-side .profile .name{font-size: 2rem;}
.page .content .left-side .profile .age{color: red;}
```

### 二、属性值的复用——定义变量
> 变量一直是所有编程语言的标准配置。然而 CSS 就没有，再次证明 CSS 可能是一门假语言。好在 Sass 补上了这个短板。
**css原生写法**
``` css
.success-bg{
    background: #dff0d8;
}
.success-panel{
    .panel-heading{
        background: #dff0d8;
    }
    .panel-body{
        border: 1px solid #dff0d8;
    }
}
```
**scss写法**
``` scss
$success-color: #dff0d8;
.success-bg{
    background: $success-color;
}
.success-panel{
    .panel-heading{
        background: $success-color;
    }
    .panel-body{
        border: 1px solid $success-color;
    }
}
```

### 三、文件级的复用——模块系统
> 模块化是软件工程的第一要务，是大型项目的必需建筑。软件工程的主要目标就是控制复杂度，这也正是模块化的目的。通过将一个大型复杂的工程拆解成一个个的小模块，使得校验、调试、测试都轻而易举。
> CSS原生的 `@import` 提供了一个并没有卵用的假模块系统。Sass 对 `@import` 进行了拓展，实现了一个真正意义上甚至功能更强大的模块系统。Sass 选择对 `@import` 进行扩展，而不是新建一个指令，可见 import 这个关键字的语义之强，JavaScript 模块系统的关键字也是 `import`。
**css原生写法**
``` html
<!-- index.html -->
<link rel="stylesheet" href="/your/site/common.css">
<link rel="stylesheet" href="/your/site/popup.css">
<link rel="stylesheet" href="/your/site/module_a.css">
<link rel="stylesheet" href="/your/site/site.css">
```
**scss写法**
``` scss
/* site.scss */
@import "common";
@import "popup";
@import "module_a";
```
``` html
<!-- index.html -->
<link rel="stylesheet" href="/your/site/site.css">
```

### 四、展示层的复用——混合指令
> 混合(mixin)特别类似于 JavaScript 中的函数，然而 Sass 提供了用于表达式计算的 @function 函数指令，这里就不好这么类比了。但其实就是这么个东西，调用的时候会返回一段样式。
> Mixin是SASS中非常强大的特性之一。定义mixin时，需要在前面加@mixin，使用时需要添加@include来引用该mixin。
**比如下面一段存在重复样式的代码。**
*复用之前*
``` css
.description{
    color: red;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.article{
    color: #444;
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
```
*稍作优化*
``` css
.description, .article{
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.description{
    color: red;
}
.article{
    color: #444;
}
```
*似乎不错，但是之后再新加类似样式时，*
``` css
.description, .article, .style01, .style02{
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.
.
.
.style01{}
.style02{}
```
每次都要改两个地方，很麻烦，很容易漏，尤其是将通用样式分离出来的话更容易出错。
*再做优化：*
``` css
.grey-border-radius{
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.description{
    color: red;
}
.article{
    color: #444;
}
```
似乎好了一点，但这样的话，html 每个使用的标签都需要多加上一个 `.grey-border-radius` 类。很显然这是多余的。这种做法可以说是“凑合”。
*使用 Sass 复用之后：*
``` scss
@mixin grey-border-radius{
    border: 1px solid #e3e3e3;
    border-radius: 2px;
}
.description{
    @include grey-border-radius;
    color: red;
}
.article{
    @include grey-border-radius;
    color: #444;
}
```
*编译后的 css 输出：*
``` css
.description {
  border: 1px solid #e3e3e3;
  border-radius: 2px;
  color: red;
}
.article {
  border: 1px solid #e3e3e3;
  border-radius: 2px;
  color: #444;
}
```
继承

@include aa
@extend aa



@function

$baseFontSize: 10px !default;
$gray: #ccc !default;

@function pxToRem($px) {
    @return $px / baseFontSize * 1rem;
}

body{
    font-size:$baseFontSize;
    color:lighten($gray,10%);
}
.text{
    font-size:pxToRem(16px);
    color:darken($gray,10%);
}


$ite7: true;
$type: m0onster;
.ib{
    display:inline-block;
    @if $ite7 {
        *display:inline;
        *zoom:1;
    }
}
p{
    @if $type == ocean {
        color: blue;
    } @else if $type == matador {
        color:red;
    } @else if $type == monster {
        color: green;
    } @else {
        color: black;
    }
}


三目判断
语法： if($condition, $if_true, $if_false)
三个参数分别表示：条件，条件为真的值，条件为假的值
if(true, 1px, 2px) => 1px 
if(false, 1px, 2px) => 2px

for 循环
for循环有两种形式，分别为：@rot $var from <start> through <end> 和 @for $var from <start> to <end> 。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。

@for $i from 1 through 3{
    .item-#{$i} { width: 2em * $i; }
}
========css
.item-1{
    width: 2em;
}
.item-2{
    width: 4em;
}
.item-3 {
    width: 6em;
}

@for $i from 1 to 3 {
    .item-#{$i} {
        width: 2em * $i;
    }
}

=========css
.item-1 {
    width: 2em;
}
.item-2 {
    width: 4em;
}

@each循环
语法为：@each $var in <list or map>。其中$var表示变量，而list和map表示list的类型数据和map的类型数据。
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $ $animal-list {
    .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png'); 
    }
}
.puma-icon {
    background-image: url('/images/puma.png');
}
.sea-slug-icon {
    bnackground-image: url('/images/sea-slug.png')
}
