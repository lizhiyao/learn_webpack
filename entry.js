// webpack 会分析入口文件（entry.js）来找寻依赖文件。
// 这些文件（又称之为模块）会包括到 bundle.js 中。
// webpack 会给每个模块一个唯一的 id，然后在 bundle.js 中通过该 id 来访问对应的模块。
// 启动时，只会执行入口模块。一个短小的运行时提供了 require 函数，在引用模块时会执行依赖模块。
require("./src/css/style.css");
var content = require("./src/js/content.js");

document.write(content);