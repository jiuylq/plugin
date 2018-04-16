---
title: js-date
date: 2018-01-07 15:51:28
tags: js-date
categories: js
---
谈谈javascript中的日期Date对象
<!-- more -->
<The rest of contents | 余下全文>

## 一、日期对象
> 在javascript中并没有日期型的数据类型，但是提供了一个日期对象可以操作日期和时间。
日期对象的创建：
new Date();  

## 二、将日期对象转换为字符串
> 将日期对象转换为字符串可以使用以下4种方法：
date.toString();//将日期对象转换为字符串时，采用的是本地时间
date.toLocalString();//将日期对象转换为字符串，采用的是本地时间，显示的是地方日期的格式
date.toUTCString();//将日期对象转换为字符串时，采用的是世界时间。
date.toGMTString();//将日期对象转换为字符串时，采用的是GMT时间，但是已被禁止使用，一般用toUTCString()方法来替换。

## 三、将日期对象中的日期和时间转换为字符串
> date.toDateString();//将日期部分转换为字符串，本地时间
date.toLocalDateString();//将日期部分转换为字符串，采用的是本地时间，显示的是地方日期的格式
date.toTimeString();//将时间部分转换为字符串，本地时间
date.toLocalTimeString();将时间部分转换为字符串，采用的是本地时间，显示的是地方日期的格式

## 四、日期对象中的日期
> date.getYear();//获取年份，但不建议使用。
date.getFullYear();//获取年份，，以四位数显式，建议使用       
date.getMonth();//获取月份，值为0-11，一月份为0，二月份为1...
date.getDate();//获取天数，即一个月中的某一天
date.getDay();//获取一周中的第几天，值为0-6，周日为0...

## 五、日期对象中的时间
> date.getHours();//返回小时部分
date.getMinutes();//返回分钟部分
date.getSeconds();//返回秒钟部分    
date.getMilliseconds();//返回毫秒部分
date.getTime();//返回日期对象中的时间与1970年1月1日0时0分0秒所间隔的毫秒数
date.getTimezoneoffset();//返回日期对象中的时间与UTC之间的时差数，单位为秒。

## 六、设置日期对象中的日期e
> date.setYear(year);//不建议使用
date.setFullYear(year,month,day);//year四位数;month：0-11，该参数可省略;day：1-31， 该参数可省略  
date.setMonth(month,day);//month：0-11;day：1-31， 该参数可省略 
date.getDate(day);//day：1-31

## 七、设置日期对象中的时间
> date.getHours(hours,minutes,seconds,milliseconds);//hours:0-23,minutes:0-59,可省略，seconds:0-59,可省略milliseconds:0-999，可省略
date.getMinutes(minutes,seconds,milliseconds);//minutes:0-59,seconds:0-59,可省略milliseconds:0-999，可省略
date.getSeconds(seconds,milliseconds);// seconds:0-59,milliseconds:0-999，可省略 
date.getMilliseconds(milliseconds);//,milliseconds:0-999

## 八、与毫秒相关的方法
> date.setTime(millisecinds);milliseconds代表设置的时间与1970年1月1日0时0分0秒所间隔的毫秒数
date.valueOf();返回日期对象中的时间与1970年1月1日0时0分0秒所间隔的毫秒数
date.parse(str);返回str参数所代表的时间与1970年1月1日0时0分0秒所间隔的毫秒数
date.UTC(year,month,day,hours,minutes,seconds,milliseconds);将参数所代表的日期转换成与1970年1月1日0时0分0秒所间隔的毫秒数

### *实例*
1、获取时间截
``` js
//一
var timestamp = new Date().getTime();   //new Date("2012/7/25 20:11:11").getTime()
//二
var timestamp = (new Date()).valueOf()
// 三
var timestamp = +new Date()  //相当于ToNumber(new Date())
// 四
var timestamp = Date.now()
```
2、格式化时间
``` js
//使用方法：var val=new Date("2012/7/25 20:11:11").getTime() var crtTime = new Date(val); dateFtt("yyyy-MM-dd q hh:mm:ss",crtTime);
function dateFtt(fmt,date) {
var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
}
```

``` js
 /* * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       
     
var date = new Date();      
window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));
```