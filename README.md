webpack 是一个模块打包器。
webpack 处理带有依赖关系的模块，生成一系列表示这些模块的静态资源。

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
    npm install -g webpack-dev-server --save-dev --registry=https://registry.npm.taobao.org

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