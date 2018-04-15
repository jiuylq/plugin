/*
*js常用方法总结
*/


/**
 * @desc getClassName
 * @param {HTMLElement} ele
 * @param {String} cls
 * @param {String} tag
 **/
function getClassNames (ele, cls, tag) {
	var classNames = [];
	ele = ele || document;
	tag = tag || '*';
	if (ele.getElementsByClassName) {
		var eles = ele.getElementsByClassName(cls);
		if (tag != '*') {
			for (var i = 0, L = eles.length; i < L; i++) {
				if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
					classNames.push(eles[i]);
				}
			}
		} else {
			classNames = eles;
		}
	} else {
		eles = ele.getElementsByTagName(tag);
		var pattern = new RegExp("(^|\\s)" + cls + "(\\s|$)");
		for (i = 0, L = eles.length; i < L; i++) {
			if (pattern.test(eles[i].className)) {
				classNames.push(eles[i]);
			}
		}
	}
	return classNames;
}




//ie10 
// element.classList.add(className)  //新增
// element.classList.remove(className)  //删除
// element.classList.contains(className)  //是否包含
// element.classList.toggle(className)  //toggle class

/**
 * @desc   为元素添加class
 * @param  {HTMLElement} ele 
 * @param  {String} cls 
 */
//依赖hasClass
function addClass(ele, cls) {
    if(ele.classList){
        ele.classList.add(cls);
    }else if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}


/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele 
 * @param {String} cls 
 * @return {Boolean}
 */
function hasClass(ele, cls) {
    if(ele.classList){
        return (ele.classList.contains(cls));
    }else{
        return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
    }
}

/**
 * @desc 判断元素是否有某个class
 * @param {HTMLElement} ele
 * @param {String} cls
**/
function hasClass2(ele,cls){
    return new RegExp(cls,'gi').test(ele.cls);
}


/**
 * @desc 移除class 依赖hasclass
 * @param {HTMLElement} ele 
 * @param {String} cls 
 */
function removeClass(ele, cls) {
    if(ele.classList){
        ele.classList.remove(cls);
    }else if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * @desc 移除class 依赖hassclass2
 * @param {HTMLElement} ele
 * @param {string} cls
 **/
function removeClass2(element,className){
    if(hasClass2(ele, cls)){
        ele.cls = ele.cls.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'),'');
    }
  }

/**
 * @desc toggleClass
 * @param {HTMLElement} ele
 * @param {String} cls
 **/
function toggleClass(ele, cls){
    if(ele.classList){
        ele.classList.toggle(cls);
    }else{
        if(hasClass(ele, cls)){
            removeClass(ele, cls);
        }else{
            addClass(ele, cls);
        }
    }
}

/** 
 * @desc replaceClass
 * @param {HTMLElement} ele
 * @param {String} newcls
 * @param {String} oldcls
**/
//替换类名("被替换的类名","替换的类名")
function replaceClass(ele, newcls, oldcls) {
    removeClass(ele, oldcls);
    addClass(ele, newcls);
}

// getAttribute() //获取属性
// setAttribute() //设置属性
// ie9
// hasAttribute() //检测属性是否存在
// removeAttribute() //删除属性
// dataset 带连字符的属性对应于驼峰命名法属性名：data-jquery-test属性就变成dataset.jqueryTest属性



/**
 * @desc siblings   previousSibling和nextSibling的运用
 * @param {HTMLElement} ele
 **/
function siblings(ele) {
    var a = []; //定义一个数组，用来存o的兄弟元素 
    var p = ele.previousSibling;
    while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling //最后把上一个节点赋给p 
    }
    a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了 
    var n = ele.nextSibling; //再取o的弟弟 
    while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思 
        if (n.nodeType === 1) {
            a.push(n);
        }
        n = n.nextSibling;
    }
    return a;
}


/**
 * @desc css
 * @param {HTMLElement} ele
 * @param {json} json
 **/
function setCss(ele, json) {
    for (var attr in json) {
        ele.style[attr] = json[attr];
    }
}


/**
 * @desc getStyle
 * @param {HTMLElement} ele
 * @param {String} attr
**/
function getStyle(ele, attr) {   
    var value = ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];   
    return parseFloat(value);
  }

/**
 * @desc forEach 遍历节点
 * @param {HTMLElement} ele
 * @param {Function} callback
**/
function forEach(ele, callback) {
    if([].forEach) {
      [].forEach.call(ele, callback);
    } else {
      for(var i = 0; i < ele.length; i++) {
        callback(ele[i], i);
      }
    }  
}


/**
 * @desc children 获取Element子节点
 * @param {HTMLElement} ele
 * 
 **/
function children(ele) {
    if(ele.children) {
      return ele.children;
    } else {
      var children = [];     
      for (var i = el.children.length; i--;) {       
          if (el.children[i].nodeType != 8)      
            children.unshift(el.children[i]);    
      }
      return children;
    }  
}


/**
 * @desc next 获取下一个兄弟节点
 * @param {HTMLElement} ele
**/
function next(ele) {
    if(ele.nextElementSibling) {
      return ele.nextElementSibling;
    } else {
      do { 
         ele = ele.nextSibling; 
      } while ( ele && ele.nodeType !== 1 );   
      return ele; 
    }
}


/**
 * @desc prev 获取上一个兄弟节点
 * @param {HTMLElement} ele
**/
function prev(ele) {    
    if(ele.previousElementSibling) {    
      return ele.previousElementSibling;    
    } else {    
      do {     
        ele = ele.previousSibling;     
      } while ( ele && ele.nodeType !== 1 );       
      return ele;    
    }  
  }


//位置
/**
 * @desc offset 获取相对于文档的位置
 * @param {HTMLElement} ele
**/
function offset(ele) {
    var rect = ele.getBoundingClientRect()    
    return {      
      top: rect.top + document.body.scrollTop,      
      left: rect.left + document.body.scrollLeft    
    }
}


/**
 * @desc  设置Cookie
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days 
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
 * @desc 根据name读取cookie
 * @param  {String} name 
 * @return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
}


/** 
 * @desc 根据name删除cookie
 * @param  {String} name 
 */
function removeCookie(name) {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, '1', -1);
}

//字符串操作
/**
 * @desc trim 去除空格
 * @param {String} str
**/
function trim(str){
    if(str.trim) {
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g, '');
    }
}


/**
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}


/**
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}


//将当前时间转时间截
var currentTime = Date.parse(new Date())

//将时间截转换为日期  例："2017-12-18 16:26:34"
function formatDate(nows) { 
    var now=new Date(nows); 
    var year=now.getFullYear(); 
    var month=now.getMonth()+1; 
    var date=now.getDate(); 
    var hour=now.getHours(); 
    var minute=now.getMinutes(); 
    var second=now.getSeconds(); 
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    }



/**
 * @desc 判断两个数组是否相等
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @return {Boolean}
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}



//getEleCount('asd56+asdasdwqe','a')
//3
//getEleCount([1,2,3,4,5,66,77,22,55,22],22)
//2
/**
 * @desc getEleCount 返回数组（字符串）一个元素出现的次数
 * @param {String} obj
 * @param {Array} obj
 * @param {String} str
**/
function getEleCount(obj, str) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (str == obj[i]) {
            num++;
        }
    }
    return num;
}


/**

**/