---
title: hello-world
date: 2017-10-30 22:35:37
tags: ES6
categories: hello
reward: true
---
  欢迎来到七月博客，本文章是关于博客的简介。接收参数方面不同，apply()接收两个参数，一个是函数运行的作用域(this)，另一个是参数数组。
<!-- more -->
<The rest of contents | 余下全文>

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### dfsaf
> 1、每个函数都包含两个非继承而来的方法：apply()和call()。
> 2、他们的用途相同，都是在特定的作用域中调用函数。
> 3、接收参数方面不同，apply()接收两个参数，一个是函数运行的作用域(this)，另一个是参数数组。
> 4、call()方法第一个参数与apply()方法相同，但传递给函数的参数必须列举出来。

### ccc
``` javascript
(function(win) {
    win.upp = function(url) {
        this._url = url;
        this._init();
    }
    ;
    upp.prototype = {
        _init: function() {
            var addressPair = this._url.split("?")
              , i = 0
              , keypairs = [];
            this.host = addressPair[0];
            this._params = {};
            if (addressPair.length > 1) {
                keypairs = addressPair[1].split("&");
                for (; i < keypairs.length; i++) {
                    var keypair = keypairs[i].split("=");
                    this.add(keypair[0], keypair[1]);
                }
            }
        },
        add: function(_key, _value) {
            this._params[_key] = _value;
            return this;
        },
        remove: function(key) {
            delete this._params[key];
            return this;
        },
        contains: function(key, value) {
            return this._params[key] !== undefined;
        },
        update: function(key, value) {
            this._params[key] = value;
        },
        get: function(key) {
            return this._params[key];
        },
        all: function() {
            return this._params;
        },
        url: function() {
            var queryStrings = [];
            for (var key in this._params) {
                queryStrings.push(key + "=" + this._params[key]);
            }
            return this.host + (queryStrings.length > 0 ? "?" : "") + queryStrings.join("&");
        }
    };
})(window);
```

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)
