# Webpack简介
Webpack 是当下最热门的前端资源模块化管理和打包工具。

它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。

还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。

通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

# 创建Webpack的动机
如今的网站正在朝着Web app演化，具体体现在：

- 在一个页面中包含越来越多的JavaScript代码
- 我们可以在现代的浏览器中做更多的事情
- 即使一个页面中有着越来越多的代码，但是几乎不会再进行整个页面的刷新

以上这几点会导致客户端（浏览器端）有着大量的代码。

如此多的代码需要被组织起来。模块系统给我们提供了把代码拆分成模块的可能。

## 现有的常用的模块系统风格

- `<script>` 标签方式（无模块系统）
- CommonJs
- AMD 及其变种
- ES6 模块

### `<script>` 标签方式（无模块系统）
这是在不使用模块系统的前提下来管理模块代码库的方式。

    <script src="libary1.js"></script>
    <script src="libary2.js"></script>
    <script src="plugin1.js"></script>
    <script src="module1.js"></script>
    <script src="module2.js"></script>
    
模块导出接口到全局对象中，如 window 对象，也通过全局对象来访问依赖模块的接口。  

普遍的问题

> 全局变量冲突
> 强依赖加载顺序
> 开发者需要解决模块和库的依赖关系
> 大项目中列表越来越长而难以维护 

### CommonJs：同步 require
这是node.js使用的方式

这种方式使用同步的 require 来加载依赖并且通过给 exports 添加属性或给 module.exports 赋值来导出接口。

    require("module");
    require("../file.js");
    exports.doStuff = function() {};
    module.exports = someValue;

优点

> 重用服务端模块
> npm 上已经有很多这种模块
> 简单且易于使用

缺点

> 网络请求不适用于同步请求，更适合异步请求
> 不能并行请求多个模块

### AMD：异步 require
因为 CommonJs 的同步 require 方案不适合如浏览器等环境，所以有了异步的定义和导出模块方案。例如：require.js

    require(["module", "../file"], function(module, file) { /* ... */ });
    define("mymodule", ["dep1", "dep2"], function(d1, d2) {
    return someExportedValue;
    });
    
优点

> 适合异步网络请求方式
> 并行加载多模块

缺点

> 更多的编码，更难阅读和编写
> 有不同的方案

### ES6 模块
EcmaScript6 给 JavaScript 增加了模块系统。

    import "jquery";
    export function doStuff() {}
    module "localModule" {}

优点

> 易于静态分析（Typescript）
> 未来的标准

缺点

> 浏览器原生支持需要时间（Babel）
> 这种风格的模块还很少

## 模块的加载方式
因为模块是在客户端执行的，所以首先需要把模块从服务端加载到浏览器。

关于模块加载，有两个极端的方案：

1. 一个模块一个请求
2. 所有模块一个请求

这两种方案都被广泛使用，但都不是最佳的。

### 一个模块一个请求

优点：

> 按需加载

缺点：

> 过多请求导致负载过多，延迟过大，初始化慢

### 所有模块一个请求

优点：

> 更少的负载，更少的延迟

缺点：

> 不需要或还不需要的模块也被加载了

## 分块加载

在大多数情况下，各种极端方案的相互妥协会得到一个更好地方案。

- 编译模块时，把模块拆成更小的块（chunks）

这样，将得到多个更小的请求。模块的每个块（chunks）将是按需加载，初始请求中不包含完整的代码库，从而可以更小。

「拆分点」是可选的，并且可以由开发者自定义。

- 可以组成一个大的代码库

注：此思路来自 [GWT] (http://www.gwtproject.org/doc/latest/DevGuideCodeSplitting.html)。

更多可参考[代码拆分] (https://github.com/liunian/webpack-doc/blob/master/code-splitting.md)。

## 为何仅 JavaScript？
为什么一个模块系统只能帮助开发者打包（模块化）JavaScript？实际上我们还有很多别的静态资源需要处理，如：

- 样式
- 图片
- web 字体
- html 模板
- 其他静态资源（.txt .pdf等）

另外还有一些预编译资源：

- typescript/coffeescript -> javascript
- less/sass -> css
- jade -> 生成模板的 javascript
- i18n 文件 -> 别的资源
- 其他

这些应该同样的使用才对，如：

    require("./style.css");
    require("./style.less");
    require("./template.jade");
    require("./image.png");

## 静态分析
在编译模块时，会尝试用静态分析来获取依赖关系。

一般来说，这只能找到没有表达式的简单形式，但像 require("./template/" + templateName + ".jade") 确实一种常见的用法。

不同的代码库往往使用不同的风格，其中不少的风格还是比较怪异的……

### 解决问题的策略

一个好的解析器应当支持绝大多数的现存代码。如果开发者用了一些不寻常的方法，那么解析器应该提供一个兼容性最好的解决方案。

---

# 安装
1.install node.js

2.npm install webpack -g

3.Use webpack in a project

It’s the best to have webpack also as dependency in your project. 

Through this you can choose a local webpack version and will not be forced to use the single global one.

Add a package.json configuration file for npm with:

    npm init
 
Install and add webpack to the package.json with:

    npm install webpack --save-dev --registry=https://registry.npm.taobao.org
    npm install webpack-dev-server --save-dev --registry=https://registry.npm.taobao.org
    
    
# 配置文件

Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。
默认情况下，会搜索当前目录的 webpack.config.js 文件
(需要自己手动创建该配置文件)

# 加载器
加载器是把一个资源文件作为入参转换为另一个资源文件的 node.js 函数。

## 安装加载器
如果加载器发布在 npm 上，那么可以通过下面的两个命令来安装

    $ npm install xxx-loader --save
    $ npm install xxx-loader --save-dev

## 加载器用法
在项目中，有多种方式来使用加载器。

* 通过 require 语句显示指定
* 通过配置文件来指定
* 通过命令行来指定

## 通过配置文件
可以通过正则来在配置文件中绑定加载器

    {
      module: {
        loaders: [
          { test: /\.jade$/, loader: "jade" },
          // => "jade" loader is used for ".jade" files

          { test: /\.css$/, loader: "style!css" },
          // => "style" and "css" loader is used for ".css" files
          // Alternative syntax:
          { test: /\.css$/, loaders: ["style", "css"] },
        ]
      }
    }

## 加载器示例
我们希望在应用中增加一个 css 文件。
因为 webpack 本身只能支持 js，所以需要 css-loader 来处理 css 文件，
同时还需要一个 style-loader 来在页面中使用 css 文件里定义的样式。
执行 npm install css-loader style-loader 来安装加载器。
    
通过在模块请求前添加加载器，模块将会被加载器管道处理。
这些加载器特定的方式来处理文件内容，最终转换后的内容将是一个 javascript 模块。
注：串联起来的加载器将自右向左执行。
require("!style!css!./style.css");

把配置选项移到配置文件中,增加 webpack.config.js
    
webpack 命令会尝试加载当前目录下的 webpack.config.js 文件。

如果项目变得越来越大，编译耗时将会越来越长。
所以，我们希望能够展示一些进度条，同时增加颜色
$ webpack --progress --colors

我们并不希望每一个变更都需要去手动编译，则可以通过以下命令来改善。
$ webpack --watch --progress --colors 
这样，webpack 会缓存未变更的模块而输出变更的模块。

开启 webpack 监控模式后，webpack 会给所有文件添加用于编译的文件监控。
如果有任何变更，将会触发编译。
当缓存开启时，webpack 会在内存中保存所有模块内容并在没变更时直接重用。

开发服务器是一个更好的选择
$ npm install webpack-dev-server -g
然后
$ webpack-dev-server --progress --colors
这会在 localhost:8080 提供一个小的 express 服务器来提供静态资源以及自动编译的套件。
当有套件重新编译后，会通过 socket.io 来自动更新浏览器页面。
在浏览器中打开 http://localhost:8080/webpack-dev-server/bundle 。

webpack-dev-server 使用了 webpack 监控模式，
同时也阻止了 webpack 生成结果文件到硬盘，而是直接通过内存来提供服务。

# 参考
[Webpack Document] (http://webpack.github.io/docs/)

[Webpack 中文指南] (http://zhaoda.net/webpack-handbook/index.html)

[webpack-doc] (https://github.com/liunian/webpack-doc/blob/master/SUMMARY.md)