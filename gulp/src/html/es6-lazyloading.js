'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// LazyLoad类
var LazyLoad = function () {
  function LazyLoad() {
    _classCallCheck(this, LazyLoad);

    this.scrollListenerFn = this.scrollListenerFn.bind(this);
    this.resizeListenerFn = this.resizeListenerFn.bind(this);
  }

  _createClass(LazyLoad, [{
    key: 'init',
    value: function init(params) {
      this.initParams(params);
      if (!this.elements) return;
      this.scrollTimer = null;
      this.defaultImg && this.addDefaultImg();
      this.resizeListenerFn();
      window.addEventListener('scroll', this.scrollListenerFn);
      window.addEventListener('touchmove', this.scrollListenerFn);
      window.addEventListener(this.resizeEvt, this.resizeListenerFn);
    }
    // 初始化一些必要的参数

  }, {
    key: 'initParams',
    value: function initParams(params) {
      var elements = params.elements;
      if (!elements.length) return;
      this.newElementsDOMArr = Array.prototype.slice.call(elements, 0);
      // 如果是再次调用 init方法，则需要无需进行部分参数的初始化，以及需要清除之前的监听函数
      if (this.elements) {
        this.elements.length !== 0 && this.clearListener();
        this.elements = this.elements.concat(this.newElementsDOMArr);
        return;
      }
      this.elements = this.newElementsDOMArr;
      this.defaultImg = params.defaultImg;
      this.distance = params.distance || 0;
      this.tag = params.tag || 'data-src';
      this.frequency = params.frequency || 14;
      this.isBg = params.isBg || false;
      this.resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
      this.getWH();
    }
  }, {
    key: 'scrollListenerFn',
    value: function scrollListenerFn() {
      var _this = this;

      if (this.scrollTimer) return;
      this.scrollTimer = setTimeout(function () {
        _this.scrollTimer = null;
        _this.isComeToLine();
      }, this.frequency);
    }
  }, {
    key: 'resizeListenerFn',
    value: function resizeListenerFn() {
      this.getWH();
      this.isComeToLine();
    }
    // 判断是否达到懒加载的条件以决定是否进行懒加载的动作

  }, {
    key: 'isComeToLine',
    value: function isComeToLine() {
      var len = this.elements.length;
      var distance = this.distance;
      var continueListener = false;
      for (var i = 0; i < len; i++) {
        var ele = this.elements[i];
        // 说明已经懒加载过了
        if (!ele) continue;
        continueListener = true;
        var rect = ele.getBoundingClientRect();
        if (rect.top > 0 && this.H + distance >= rect.top || rect.top < 0 && rect.top + rect.height >= -this.distance) {
          if (rect.left > 0 && this.W + distance >= rect.left || rect.left < 0 && rect.left + rect.width >= -this.distance) {
            this.loadItem(ele);
            this.elements.splice(i, 1, null);
          }
        }
      }
      // 已经没有需要懒加载的元素了
      !continueListener && this.clearListener();
    }
  }, {
    key: 'clearListener',
    value: function clearListener() {
      window.removeEventListener('scroll', this.scrollListenerFn);
      window.removeEventListener('touchmove', this.scrollListenerFn);
      window.removeEventListener(this.resizeEvt, this.resizeListenerFn);
    }
    // 懒加载图片

  }, {
    key: 'loadItem',
    value: function loadItem(ele) {
      var imgUrl = ele.getAttribute(this.tag);
      imgUrl && (this.isBg ? ele.style.backgroundImage = 'url(' + imgUrl + ')' : ele.setAttribute('src', imgUrl));
    }
    // 添加默认图片或背景图

  }, {
    key: 'addDefaultImg',
    value: function addDefaultImg() {
      var newElements = this.newElementsDOMArr;
      var len = newElements.length;
      var isBg = this.isBg;
      for (var i = 0; i < len; i++) {
        isBg ? newElements[i].style.backgroundImage = 'url(' + this.defaultImg + ')' : newElements[i].setAttribute('src', this.defaultImg);
      }
    }
  }, {
    key: 'getWH',
    value: function getWH() {
      this.W = document.documentElement.clientWidth || window.innerWidth;
      this.H = document.documentElement.clientHeight || window.innerHeight;
    }
  }]);

  return LazyLoad;
}();

// 上面的 LazyLoad就是实现懒加载的类，下面是使用此类的简单示例，配合文件中的 lazyload.html可查看效果

