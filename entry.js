// webpack 会分析入口文件（entry.js）来找寻依赖文件。
// 这些文件（又称之为模块）会包括到 bundle.js 中。
// webpack 会给每个模块一个唯一的 id，然后在 bundle.js 中通过该 id 来访问对应的模块。
// 启动时，只会执行入口模块。一个短小的运行时提供了 require 函数，在引用模块时会执行依赖模块。

// 加载器
// 我们希望在应用中增加一个 css 文件。
// 因为 webpack 本身只能支持 js，所以需要 css-loader 来处理 css 文件，
// 同时还需要一个 style-loader 来在页面中使用 css 文件里定义的样式。
// 执行 npm install css-loader style-loader 来安装加载器。

// 通过在模块请求前添加加载器，模块将会被加载器管道处理。
// 这些加载器特定的方式来处理文件内容，最终转换后的内容将是一个 javascript 模块。
// 注：串联起来的加载器将自右向左执行。
// require("!style!css!./style.css");

// 把配置选项移到配置文件中,增加 webpack.config.js
require("./style.css");
var content = require("./content.js");
document.write(content);