# Webpack是什么
简而言之，Webpack是一个模块化管理和打包前端资源的工具。

它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源，

还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。

通过加载器（loader）的转换，任何形式的资源都可以视作模块，
比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

## Webpack的目标

- 把依赖树拆成可按需加载的块
- 让初始化加载时间尽可能地少
- 每个静态资源都是一个模块
- 模块化集成第三方库
- 尽可能地自定义打包器的每一部分
- 尽可能地自定义打包器的每一部分
- 适合大型项目

## webpack的特别之处

### 代码拆分
webpack 的依赖树中有同步和异步两种依赖方式。其中，异步模块将会被拆成一个新的块，
并且在被优化后，生成一个对应的文件。

### 加载器
webpack 本身只支持处理 JavaScript，但可以通过加载器来把别的资源转为 JavaScript。
因此，每个资源都被当作一个模块。

### 智能解析
webpack 有一个基本支持所有第三方库的智能解析器，甚至还支持带有表达式的依赖表述法，
如 require("./templates/" + name + ".jade")。支持最常用的 CommonJs 和 AMD 这两种模块风格。

### 插件系统
webpack 有一个很出色的插件系统，甚至大部分内置功能都是基于这个插件系统而来的。
这个插件系统允许你根据需要来自定义 webpack，以及通过开源的方式来分发通用插件。


---


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

### 标签方式（无模块系统）
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

注：此思路来自[GWT](http://www.gwtproject.org/doc/latest/DevGuideCodeSplitting.html)。

更多可参考[代码拆分](https://github.com/liunian/webpack-doc/blob/master/code-splitting.md)。

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


# Webpack安装

## node.js

[安装node.js](https://nodejs.org/en/)

node.js自带了一个叫做npm的包管理工具

## Webpack
我们使用npm安装Webpack

    $ npm install webpack -g    

## 在项目中使用Webpack
最好的方法是把 webpack 作为项目的依赖，这样，每个项目都可以使用自己所需要的版本而不必依赖于全局的 webpack。

通过 npm 来创建一个 package.json 文件：

    $ npm init
    
如果不把项目发布到 npm 上，在执行 `npm init` 命令中要求回答的问题的答案则不是很重要。

使用下面的命令来安装 webpack 并把其添加到 packeage.json 中：

    $ npm install webpack --save-dev
    
由于网络问题安装失败的朋友可以使用如下命令进行安装：

    npm install webpack --save-dev --registry=https://registry.npm.taobao.org

## Webpack版本选择

webpack 有稳定版和 beta 版两个可用的版本，其中，beta 版本在版本号中添加了 -beta 的标识。
beta 版本可能带有很多不稳定变更或实验性的功能，并且未完全测试。
可查看变更记录来看各版本的差别。正式项目中应该使用稳定版本。

    $ npm install webpack@1.2.x --save-dev
 
## Webpack开发者工具 

    npm install webpack-dev-server --save-dev 
    
## 复制如下代码到命令行执行，可快速安装

    npm install webpack webpack-dev-server --save-dev --registry=https://registry.npm.taobao.org
    
---
   
# 使用Webpack

## 基本使用方式
最基本的使用webpack的方式是在命令行中输入webpack相关的命令并执行，
此时webpack 会分析入口文件（entry.js）来找寻依赖文件。这些依赖文件（又称之为模块）会包括到 bundle.js 中。
webpack 会给每个模块一个唯一的 id，然后在 bundle.js 中通过该 id 来访问对应的模块。
启动时，只会执行入口模块。一个短小的运行时提供了 require 函数，在引用模块时会执行依赖模块。

如果项目变得越来越大，编译耗时将会越来越长。
所以，我们希望能够展示一些进度条，同时增加颜色

    $ webpack --progress --colors

我们并不希望每一个变更都需要去手动编译，则可以通过以下命令来改善。

    $ webpack --watch --progress --colors 
    
这样，webpack 会缓存未变更的模块而输出变更的模块。

开启 webpack 监控模式后，webpack 会给所有文件添加用于编译的文件监控。
如果有任何变更，将会触发编译。
当缓存开启时，webpack 会在内存中保存所有模块内容并在没变更时直接重用。

但在实际项目中，一般不会这样使用。

通常会结合npm命令来在项目中使用Webpack。

npm 是一个非常好用的用来编译的指令，我们把webpack编译步骤放到 npm run build 中。
通过 npm 我们可以不用去担心项目中使用了什么技术，
你只要调用这个指令就可以了，只要你在 package.json 中设置 scripts 的值就可以了。

把下面的内容添加到 package.json中。

    "scripts": {
        "build": "webpack"
    }

## 设置 webpack-dev-server
如果需要一直输入 npm run build 确实是一件非常无聊的事情，

幸运的是，我们可以把让他安静的运行，让我们设置 webpack-dev-server。

安装webpack-dev-server

    npm i webpack-dev-server --save-dev
    
把下面的内容添加到 package.json中。

    {
        "scripts": {
            "build": "webpack",
            "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
        }
    }
    
> webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器 
> --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号 
> --progress - 显示合并代码进度 
> --colors - 命令行中显示颜色 
> --content-base build - 指向设置的输出目录

访问 http://localhost:8080 会看到效果

## webpack.config.js
在项目根目录手动创建名为webpack.config.js的配置文件, 

Webpack 在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。
默认情况下，会搜索当前目录的 webpack.config.js 文件。

## 浏览器自动刷新
webpack-dev-server阻止了 webpack 生成结果文件到硬盘，而是直接通过内存来提供服务

当运行 webpack-dev-server 的时候，它会监听你的文件修改。当项目重新合并之后，会通知浏览器刷新。

为了能够触发这样的行为，你需要把你的 index.html 放到 build/ 文件夹下，

然后，需要在index.html中增加一个脚本当发生改动的时候去自动刷新应用：

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <script src="http://localhost:8080/webpack-dev-server.js"></script>
        <script src="bundle.js"></script>
    </body>
    </html>
   
在webpack.config.js配置中增加一个入口点

    var path = require('path');

    module.exports = {
        entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
        },
    };
    
现在应用就可以在文件修改之后自动刷新了

## 默认自动刷新方式

在上面我们创建了 index.html 文件来获取更多的自由和控制，这样在http://localhost:8080/就可以自动刷新。

另一种方式是不需要创建index.html, 直接访问http://localhost:8080/webpack-dev-server/bundle 运行应用。

这会触发一个默认的我们不能控制的 index.html ，它同样会触发一个允许iFrame中显示重合并的过程。
webpack 命令会尝试加载当前目录下的 webpack.config.js 文件。


---


# 加载器
加载器是把一个资源文件作为入参转换为另一个资源文件的 node.js 函数。

## 安装加载器
如果加载器发布在 npm 上，那么可以通过下面的两个命令来安装

    $ npm install xxx-loader --save
    $ npm install xxx-loader --save-dev

## 加载器用法

请参见[在项目中使用webpack+react+es6](https://github.com/lizhiyao/learn_webpack_react)    


# 参考
[Webpack Document](http://webpack.github.io/docs/)

[Webpack 中文指南](http://zhaoda.net/webpack-handbook/index.html)

[webpack-doc](https://github.com/liunian/webpack-doc/blob/master/SUMMARY.md)

[Webpack傻瓜式指南（一）](http://zhuanlan.zhihu.com/p/20367175)

[Webpack傻瓜指南（二）开发和部署技巧](http://zhuanlan.zhihu.com/p/20397902)

[Webpack傻瓜指南（三）和React配合开发](http://zhuanlan.zhihu.com/p/20522487)
